#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把《药物使用者圣经》目录下的 Markdown 源文件汇编成一份可排版的 LaTeX 书稿。

用法：
    python build_book.py                      # 默认读取上级目录，输出到本目录
    python build_book.py --root ../ --out .    # 显式指定
    python build_book.py --no-images           # 不搬运图片（用于快速试排）

产物：
    book.tex            正文（由 preamble.tex 提供版式）
    images/             正文用到的图片，统一转码成 xelatex 能读的 JPEG/PNG
    build-report.txt    汇编报告：处理了哪些文件、缺哪些图、有哪些孤立文件

注意：源图库里的文件虽然叫 .jpeg/.png，实际内容是 WebP，xelatex 无法直接读取，
因此本脚本用 Pillow 统一重新编码（有 alpha 通道的存 PNG，其余存 JPEG），
并写入 DPI 元数据，好让 LaTeX 按合理的物理尺寸摆放插图。

被排除的文件（不参与汇编）：combined.md、prompt.md、merge_markdown.py，
以及 tex/ 输出目录自身。
"""

from __future__ import annotations

import argparse
import datetime as _dt
import os
import re
import shutil
import sys
from pathlib import Path

# --------------------------------------------------------------------------
# 常量
# --------------------------------------------------------------------------

EXCLUDED_FILES = {"combined.md", "prompt.md", "merge_markdown.py"}
IMAGE_ROOT_MARKER = "/文件/"          # 源文中的图片前缀（相对仓库根）
IMG_DPI = 144                        # 转码后写入的 DPI；决定插图的“自然尺寸”
IMG_MAX_SIDE = 1600                  # 最长边上限（像素）
IMG_QUALITY = 86                     # JPEG 质量
BOOK_TITLE = "药物使用者圣经"
BOOK_SUBTITLE = "The Drug Users Bible"
BOOK_BYLINE = "Dominic Milton Trott 著 · 中文译本"

# --------------------------------------------------------------------------
# 基础工具
# --------------------------------------------------------------------------

_MD_UNESCAPE = re.compile(r"\\([\\`*_{}\[\]()#+\-.!|~<>\"'])")

_LATEX_MAP = {
    "\\": r"\textbackslash{}",
    "{": r"\{",
    "}": r"\}",
    "$": r"\$",
    "&": r"\&",
    "#": r"\#",
    "_": r"\_",
    "%": r"\%",
    "^": r"\textasciicircum{}",
    "~": r"\textasciitilde{}",
}


_UNI_ESCAPE = re.compile(r"\\u([0-9a-fA-F]{4})")


def decode_uni_escapes(text: str) -> str:
    """源文件里个别地方残留着没解码的 \\uXXXX（例如 index.md 里的 \\uff09），补救一下。"""
    return _UNI_ESCAPE.sub(lambda m: chr(int(m.group(1), 16)), text)


def esc(text: str) -> str:
    """Markdown 纯文本 -> LaTeX 安全文本。"""
    text = _MD_UNESCAPE.sub(r"\1", decode_uni_escapes(text))
    return "".join(_LATEX_MAP.get(ch, ch) for ch in text)


def esc_url(url: str) -> str:
    """URL -> \\href 的第一个参数。"""
    for ch, rep in (("\\", r"\\"), ("%", r"\%"), ("#", r"\#"), ("{", r"\{"), ("}", r"\}")):
        url = url.replace(ch, rep)
    return url


def slug_label(rel: str) -> str:
    """把相对路径变成 ASCII 安全的 label。"""
    out = re.sub(r"[^A-Za-z0-9]+", "-", rel).strip("-").lower()
    return out or "x"


# --------------------------------------------------------------------------
# 行内语法
# --------------------------------------------------------------------------

_INLINE_RE = re.compile(
    r"""
      (?P<img>!\[(?P<alt>[^\]]*)\]\(\s*(?P<isrc>[^)\s]*)\s*(?:"[^"]*")?\))
    | (?P<fn>(?:\[(?P<fntext>[^\[\]]*)\])?\[\^(?P<fnid>[^\]\s]+)\])
    | (?P<link>\[(?P<ltext>(?:[^\[\]]|\[[^\[\]]*\])*)\]\(\s*(?P<lurl>[^)\s]*)\s*(?:"[^"]*")?\))
    | (?P<auto><(?P<aurl>(?:https?://|ftp://|mailto:|www\.)[^>\s]*)>)
    | (?P<code>`(?P<ctext>[^`]+)`)
    | (?P<br><\s*br\s*/?\s*>)
    | (?P<anchor><a\s+id\s*=\s*"[^"]*"\s*>\s*</a\s*>)
    | (?P<htmltag></?[A-Za-z][^<>]*>)
    | (?P<bi>\*\*\*(?P<bitext>[^*\n]+)\*\*\*)
    | (?P<bold>\*\*(?P<btext>[^*\n]+)\*\*)
    | (?P<ital>\*(?P<itext>[^*\n]+)\*)
    """,
    re.VERBOSE,
)

_IMG_ONLY_RE = re.compile(r"!\[[^\]]*\]\(\s*([^)\s]*)\s*(?:\"[^\"]*\")?\)")


try:
    from PIL import Image  # type: ignore
except Exception:  # pragma: no cover - 没装 Pillow 时降级
    Image = None  # type: ignore


class ImageStore:
    """把源图库里的图片登记下来，统一转码到 out_dir/images。

    源图库里的文件后缀是 .jpeg/.png，但内容其实是 WebP，xelatex 读不了，
    所以这里一律用 Pillow 重新编码，并写入 DPI，使插图有合理的自然尺寸。
    """

    def __init__(self, out_dir: Path, dpi: int = IMG_DPI,
                 max_side: int = IMG_MAX_SIDE, quality: int = IMG_QUALITY):
        self.dir = out_dir / "images"
        self.dpi = dpi
        self.max_side = max_side
        self.quality = quality
        self.by_src: dict[Path, str] = {}
        self.jobs: dict[str, Path] = {}      # 目标文件名 -> 源文件
        self.converted = 0
        self.copied = 0
        self.cached = 0
        self.failed: list[str] = []

    @staticmethod
    def _needs_alpha(path: Path) -> bool:
        if Image is None:
            return False
        try:
            with Image.open(path) as im:
                if im.mode in ("RGBA", "LA", "PA"):
                    return True
                return im.mode == "P" and "transparency" in im.info
        except Exception:
            return False

    def register(self, src: Path) -> str:
        key = src.resolve()
        if key in self.by_src:
            return self.by_src[key]
        if Image is None:
            name = src.name
        else:
            name = src.stem + (".png" if self._needs_alpha(src) else ".jpg")
        stem, ext = os.path.splitext(name)
        while name in self.jobs and self.jobs[name] != key:
            stem += "_"
            name = stem + ext
        self.jobs[name] = key
        self.by_src[key] = name
        return name

    def emit(self, force: bool = False) -> None:
        if not self.jobs:
            return
        self.dir.mkdir(parents=True, exist_ok=True)
        for name, src in sorted(self.jobs.items()):
            dst = self.dir / name
            if not force and dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
                self.cached += 1
                continue
            if Image is None:
                shutil.copy2(src, dst)
                self.copied += 1
                continue
            try:
                with Image.open(src) as im:
                    im.load()
                    if self.max_side and max(im.size) > self.max_side:
                        scale = self.max_side / max(im.size)
                        im = im.resize(
                            (max(1, round(im.width * scale)), max(1, round(im.height * scale))),
                            Image.LANCZOS,
                        )
                    if dst.suffix == ".png":
                        if im.mode not in ("RGBA", "LA", "P", "L"):
                            im = im.convert("RGBA")
                        im.save(dst, "PNG", dpi=(self.dpi, self.dpi), optimize=True)
                    else:
                        if im.mode != "RGB":
                            im = im.convert("RGB")
                        im.save(dst, "JPEG", quality=self.quality, optimize=True,
                                progressive=True, dpi=(self.dpi, self.dpi))
                self.converted += 1
            except Exception as exc:  # 转码失败就原样复制，至少不丢文件
                self.failed.append("%s (%s)" % (src.name, exc))
                try:
                    shutil.copy2(src, dst)
                    self.copied += 1
                except Exception:
                    pass


class Ctx:
    """转换上下文：负责图片登记与文件内链接解析。"""

    def __init__(self, book_root: Path, repo_root: Path, images: ImageStore):
        self.book_root = book_root
        self.repo_root = repo_root
        self.images = images
        self.cur_dir = book_root
        self.labels: dict[str, str] = {}      # 相对 book_root 的 posix 路径 -> label
        self.images_used: set[str] = set()    # 相对 repo_root 的 posix 路径
        self.images_missing: set[str] = set()
        self.footnotes: dict[str, str] = {}
        self.in_table = False

    # ---- 图片 ----
    def image_name(self, src: str) -> str | None:
        """把 Markdown 里的图片地址解析成 images/ 下的文件名；缺失返回 None。"""
        src = src.strip()
        if not src:
            return None
        if src.startswith(("http://", "https://")):
            return None
        if src.startswith("/"):
            target = (self.repo_root / src.lstrip("/")).resolve()
        else:
            target = (self.cur_dir / src).resolve()
        if target.is_file():
            try:
                self.images_used.add(target.relative_to(self.repo_root).as_posix())
            except ValueError:
                self.images_used.add(target.as_posix())
            return self.images.register(target)
        self.images_missing.add(src)
        return None

    # ---- 内部链接 ----
    def resolve_md(self, url: str) -> str | None:
        url = url.split("#", 1)[0].strip()
        if not url:
            return None
        if url.startswith("/"):
            target = (self.repo_root / url.lstrip("/")).resolve()
        else:
            target = (self.cur_dir / url).resolve()
        try:
            rel = target.relative_to(self.book_root.resolve()).as_posix()
        except ValueError:
            return None
        return self.labels.get(rel)


def render_image(ctx: Ctx, src: str, cell: bool = False) -> str:
    name = ctx.image_name(src)
    if name is None:
        return r"\dubmissing{%s}" % esc(Path(src).name or src)
    return (r"\dubcellimg{%s}" if cell else r"\dubfig{%s}") % name


def inline(ctx: Ctx, text: str) -> str:
    """转换一段行内 Markdown。"""
    out: list[str] = []
    pos = 0
    for m in _INLINE_RE.finditer(text):
        out.append(esc(text[pos:m.start()]))
        pos = m.end()
        kind = m.lastgroup  # 注意：lastgroup 可能是内部命名组，改用显式判断
        if m.group("img") is not None:
            out.append(render_image(ctx, m.group("isrc"), cell=True))
        elif m.group("fn") is not None:
            txt = m.group("fntext") or ""
            note = ctx.footnotes.get(m.group("fnid"), "")
            out.append(inline(ctx, txt) if txt.strip() else "")
            if note:
                out.append(r"\footnote{%s}" % inline(ctx, note))
        elif m.group("link") is not None:
            out.append(render_link(ctx, m.group("ltext"), m.group("lurl")))
        elif m.group("auto") is not None:
            url = m.group("aurl")
            out.append(r"\url{%s}" % esc_url(url if "://" in url or url.startswith("mailto:") else "http://" + url))
        elif m.group("code") is not None:
            out.append(r"\texttt{%s}" % esc(m.group("ctext")))
        elif m.group("br") is not None:
            # `\\` 后面紧跟 `[` 会被当成可选参数，补一个空组挡住
            out.append(r"\newline " if ctx.in_table else "\\\\{}\n")
        elif m.group("anchor") is not None:
            pass
        elif m.group("htmltag") is not None:
            pass
        elif m.group("bi") is not None:
            out.append(r"\textbf{\textit{%s}}" % inline(ctx, m.group("bitext")))
        elif m.group("bold") is not None:
            out.append(r"\textbf{%s}" % inline(ctx, m.group("btext")))
        elif m.group("ital") is not None:
            out.append(r"\textit{%s}" % inline(ctx, m.group("itext")))
        del kind
    out.append(esc(text[pos:]))
    return "".join(out)


_TRAIL_BREAK = re.compile(r"(?:\\\\\{\}|\\newline|\s)+$")


def tidy(s: str) -> str:
    """去掉块末多余的换行命令，避免 “There's no line here to end”。"""
    return _TRAIL_BREAK.sub("", s)


_LOOKS_LIKE_URL = re.compile(
    r"^(?:https?://|ftp://|www\.|[A-Za-z0-9][A-Za-z0-9.-]*\.[A-Za-z]{2,}(?:/|$))[^\s{}]*$")


def render_link(ctx: Ctx, text: str, url: str) -> str:
    raw_text = _MD_UNESCAPE.sub(r"\1", text.strip())
    if _LOOKS_LIKE_URL.match(raw_text):
        # 链接文字本身就是网址：交给 url 宏包，好在 / . - 处断行
        body = r"\nolinkurl{%s}" % raw_text
    else:
        body = inline(ctx, text) if text.strip() else esc(url)
    u = url.strip()
    if u.startswith(("http://", "https://", "ftp://", "mailto:")):
        return r"\href{%s}{%s}" % (esc_url(u), body)
    if u.startswith("www."):
        return r"\href{%s}{%s}" % (esc_url("http://" + u), body)
    if u.startswith("#"):
        return body
    if u.split("#", 1)[0].endswith(".md"):
        lbl = ctx.resolve_md(u)
        if lbl:
            return r"\hyperref[%s]{%s}" % (lbl, body)
        return body
    return body


# --------------------------------------------------------------------------
# 块级语法
# --------------------------------------------------------------------------

_SETEXT_H1 = re.compile(r"^=+\s*$")
_SETEXT_H2 = re.compile(r"^-{2,}\s*$")
_ATX = re.compile(r"^(#{1,6})\s*(.*?)\s*$")
_ULI = re.compile(r"^(\s*)[-*+]\s+(.*)$")
_OLI = re.compile(r"^(\s*)(\d+)[.)]\s+(.*)$")
_SEP_CELL = re.compile(r"^:?-{2,}:?$")
# 纯图片表里可以直接丢掉的表头标签
_IMG_TABLE_LABELS = {"图片", "照片", "图", "图片 · 说明", "Image", "Images", "图片 · 描述"}
_LINKS_ONLY = re.compile(r"^\s*(?:\[[^\]]*\]\([^)\s]*\)\s*)+$")
_LINK_PAIR = re.compile(r"\[([^\]]*)\]\(([^)\s]*)\)")
_COMMENT = re.compile(r"<!--.*?-->", re.DOTALL)
# 导航行里的箭头。部分源文件的箭头在某次转码中退化成了 ASCII 问号，一并认。
_NAV_MARKS = set("◀▶◁▷‹›«»⮜⮞←→⇦⇨⟨⟩<>?")
_NAV_WORDS = {"返回", "回到目录", "目录", "上一节", "下一节", "上一页", "下一页"}
_LEAD_NUM_TITLE = re.compile(r"\*\*\s*\d[\d\\.]*\.?\s+[^*]{1,60}\*\*")
_FOOTNOTE_DEF = re.compile(r"^\[\^([^\]]+)\]:\s*(.*)$")
_FOOTNOTE_REF = re.compile(r"(?:\[(?P<ftext>[^\]]*)\])?\[\^(?P<fid>[^\]]+)\]")


def is_nav_line(s: str) -> bool:
    """判断一行是否为源文件里的上/下一节导航或“返回”链接。"""
    if not _LINKS_ONLY.fullmatch(s):
        return False
    links = _LINK_PAIR.findall(s)
    if not links:
        return False
    for text, url in links:
        u = url.split("#", 1)[0].strip()
        if u and not u.endswith(".md"):
            return False
        t = text.strip()
        if not t:
            return False
        if t[0] in _NAV_MARKS or t[-1] in _NAV_MARKS:
            continue
        if t.strip("".join(_NAV_MARKS) + " ") in _NAV_WORDS:
            continue
        return False
    return True


def clean_title(raw: str) -> str:
    t = raw.strip()
    t = re.sub(r"\s*\{#[^}]*\}\s*$", "", t)          # pandoc 风格的 {#anchor}
    t = re.sub(r"\s*\[\s*\\?#\s*\]\([^)]*\)", "", t)   # [#](#anchor) / [\#](#anchor) 锚点链接
    t = re.sub(r"\s*#+\s*$", "", t)                   # 闭合式 ATX 的尾部 #
    t = t.strip()
    m = re.fullmatch(r"\*\*(.+)\*\*", t)
    if m:
        t = m.group(1)
    m = re.fullmatch(r"\*(.+)\*", t)
    if m:
        t = m.group(1)
    return t.strip()


def extract_footnotes(lines: list[str]) -> tuple[list[str], dict[str, str]]:
    """抽出 `[^id]: 正文` 式脚注定义，返回（去掉定义后的行, id->正文）。"""
    defs: dict[str, str] = {}
    kept: list[str] = []
    cur: str | None = None
    for line in lines:
        m = _FOOTNOTE_DEF.match(line.strip())
        if m:
            cur = m.group(1)
            defs[cur] = m.group(2).strip()
            continue
        if cur is not None and line.startswith(("    ", "\t")) and line.strip():
            defs[cur] += " " + line.strip()
            continue
        cur = None
        kept.append(line)
    return kept, defs


def strip_nav(text: str) -> str:
    """去掉 HTML 注释、导航链接行，并把“空行 + 下划线”的 setext 标题接回去。"""
    text = _COMMENT.sub("", text)
    kept: list[str] = []
    for line in text.splitlines():
        s = line.strip()
        if s and is_nav_line(s):
            continue
        kept.append(line.rstrip())
    # setext 下划线与标题之间夹了空行的，把空行删掉
    out: list[str] = []
    for line in kept:
        s = line.strip()
        if (_SETEXT_H1.fullmatch(s) or _SETEXT_H2.fullmatch(s)) and out:
            j = len(out) - 1
            while j >= 0 and not out[j].strip():
                j -= 1
            if j >= 0 and j != len(out) - 1 and not out[j].strip().startswith("|"):
                del out[j + 1:]
        out.append(line)
    return "\n".join(out)


def split_row(line: str) -> list[str]:
    s = line.strip()
    if s.startswith("|"):
        s = s[1:]
    if s.endswith("|"):
        s = s[:-1]
    return [c.strip() for c in s.split("|")]


def is_sep_row(cells: list[str]) -> bool:
    return bool(cells) and all(_SEP_CELL.fullmatch(c) for c in cells if c != "")and any(c for c in cells)


def cell_images(cell: str) -> list[str]:
    return _IMG_ONLY_RE.findall(cell)


def is_image_cell(cell: str) -> bool:
    imgs = cell_images(cell)
    return bool(imgs) and _IMG_ONLY_RE.sub("", cell).strip() == ""


# --------------------------------------------------------------------------
# 表格渲染
# --------------------------------------------------------------------------


def render_table(ctx: Ctx, header: list[str] | None, rows: list[list[str]]) -> str:
    rows = [r for r in rows if any(c.strip() for c in r)]
    # 表头是图片、或者整张表只有表头一行时，把表头当成正文行
    if header is not None and (
        not rows or all(is_image_cell(c) or not c.strip() for c in header)
    ):
        if any(c.strip() for c in header):
            rows = [header] + rows
        header = None
    if not rows and not header:
        return ""
    ncols = max([len(r) for r in rows] + ([len(header)] if header else [0]))
    for r in rows:
        while len(r) < ncols:
            r.append("")
    if header:
        while len(header) < ncols:
            header.append("")
    header_is_empty = header is None or not any(c.strip() for c in header)
    # 纯标签型表头（例如 "| 图片 |"）在纯图片表里当作可丢弃
    all_cells = [c for r in rows for c in r]

    # ---- A. 「整行图片」与「整行文字」交替的表：当作插图 + 说明 ----
    def is_img_row(r: list[str]) -> bool:
        return any(cell_images(c) for c in r) and all(is_image_cell(c) or not c.strip() for c in r)

    def is_txt_row(r: list[str]) -> bool:
        return not any(cell_images(c) for c in r)

    def join_row(r: list[str]) -> str:
        return " · ".join(c.strip() for c in r if c.strip())

    if rows and any(is_img_row(r) for r in rows) and all(is_img_row(r) or is_txt_row(r) for r in rows):
        parts = []
        if not header_is_empty and header and join_row(header) not in _IMG_TABLE_LABELS:
            parts.append(r"\dubheadC{%s}" % tidy(inline(ctx, join_row(header))))
        k = 0
        while k < len(rows):
            r = rows[k]
            if is_img_row(r):
                imgs = [s for c in r for s in cell_images(c)]
                raw_cap = ""
                if k + 1 < len(rows) and is_txt_row(rows[k + 1]) and join_row(rows[k + 1]):
                    raw_cap = join_row(rows[k + 1])
                    k += 1
                parts.append(emit_figcap(ctx, imgs, raw_cap))
            elif join_row(r):
                parts.append(tidy(inline(ctx, join_row(r))))
                parts.append("")
            k += 1
        return "\n".join(p for p in parts if p)

    # ---- B. 图 + 说明 ----
    if (
        ncols == 2
        and rows
        and all(is_image_cell(r[0]) for r in rows)
        and all(not cell_images(r[1]) for r in rows)
    ):
        return "\n".join(emit_figcap(ctx, cell_images(r[0]), r[1]) for r in rows)

    # ---- C. 速览信息卡（两列、无表头、无图、左列短） ----
    if (
        ncols == 2
        and header_is_empty
        and rows
        and not any(cell_images(c) for r in rows for c in r)
        and all(len(r[0]) <= 24 for r in rows)
        and sum(1 for r in rows if r[0].strip()) >= max(2, len(rows) - 1)
    ):
        ctx.in_table = True
        body = " \\\\\n".join(
            "%s & %s" % (tidy(inline(ctx, r[0])), tidy(inline(ctx, r[1]))) for r in rows
        )
        ctx.in_table = False
        return "\\begin{dubinfo}\n%s \\\\\n\\end{dubinfo}" % body

    # ---- D. 普通表格 ----
    ctx.in_table = True
    colspec = " ".join(["X[l]"] * ncols)
    lines = []
    opts = [
        "colspec={%s}" % colspec,
        "rowsep=2.6pt",
        "colsep=6pt",
        "cells={font=\\small}",
        "hlines={0.4pt, dubrule}",
        "vlines={0.4pt, dubrule}",
    ]
    body_rows = []
    if not header_is_empty:
        opts.append("row{1}={bg=dubtint, font=\\small\\heiti, fg=dubaccentdk}")
        if rows:
            opts.append("rowhead=1")
        body_rows.append(" & ".join(tidy(inline(ctx, c)) for c in header))
    for r in rows:
        body_rows.append(" & ".join(tidy(inline(ctx, c)) for c in r))
    ctx.in_table = False
    lines.append("\\begin{longtblr}{%s}" % (",\n  ".join(opts)))
    lines.append(" \\\\\n".join(body_rows) + " \\\\")
    lines.append("\\end{longtblr}")
    return "\n".join(lines)


_CAPTION_BOX = (r"\begin{center}\begin{minipage}{0.88\linewidth}"
                r"\small\color{dubmute}\setlength{\parskip}{0pt}%s\end{minipage}\end{center}")


def emit_figcap(ctx: Ctx, imgs: list[str], raw_cap: str) -> str:
    """一组图片 + 一段说明文字。短说明居中，长说明两端对齐。"""
    cap = tidy(inline(ctx, raw_cap))
    if not cap.strip():
        return render_image_row(ctx, imgs)
    short = len(raw_cap.strip()) <= 40 and "<br" not in raw_cap.lower()
    if len(imgs) == 1:
        name = ctx.image_name(imgs[0])
        if name:
            return "%s{%s}{%s}" % (r"\dubfigcapc" if short else r"\dubfigcap", name, cap)
    return render_image_row(ctx, imgs) + "\n" + _CAPTION_BOX % (
        (r"\centering " + cap) if short else cap)


def render_image_row(ctx: Ctx, srcs: list[str]) -> str:
    names = []
    missing = []
    for s in srcs:
        n = ctx.image_name(s)
        if n:
            names.append(n)
        else:
            missing.append(Path(s).name or s)
    parts = []
    if len(names) == 1:
        parts.append(r"\dubfig{%s}" % names[0])
    elif len(names) > 1:
        n = len(names)
        w = max(0.16, min(0.44, 0.93 / n))
        inner = "%\n".join(r"\dubinline{%.3f}{%s}" % (w, nm) for nm in names)
        parts.append("\\dubrow{%%\n%s%%\n}" % inner)
    for mm in missing:
        parts.append(r"\dubmissing{%s}" % esc(mm))
    return "\n".join(parts)


# --------------------------------------------------------------------------
# 主转换器
# --------------------------------------------------------------------------


def split_quote_paragraphs(inner: list[str]) -> list[str]:
    """源文件里引用块常常一行一条引文，给相邻的普通行之间补空行，保持分段。"""

    def plain(x: str) -> bool:
        xs = x.strip()
        if not xs:
            return False
        if xs.startswith(("|", "#", ">")):
            return False
        if _ULI.match(x) or _OLI.match(x):
            return False
        return not (_SETEXT_H1.fullmatch(xs) or _SETEXT_H2.fullmatch(xs))

    out: list[str] = []
    for idx, ln in enumerate(inner):
        out.append(ln)
        nxt = inner[idx + 1] if idx + 1 < len(inner) else ""
        if plain(ln) and plain(nxt):
            out.append("")
    return out


def convert(ctx: Ctx, text: str, drop_first_heading: bool = True) -> str:
    lines, ctx.footnotes = extract_footnotes(strip_nav(text).split("\n"))
    return convert_blocks(ctx, lines, drop_first_heading)


def convert_blocks(ctx: Ctx, lines: list[str], drop_first_heading: bool = True) -> str:
    out: list[str] = []
    i = 0
    n = len(lines)
    seen_heading_or_body = False

    def flush_para(buf: list[str]) -> None:
        if not buf:
            return
        joined = "\n".join(buf).strip()
        if not joined:
            buf.clear()
            return
        # 纯图片段落单独成图
        if _IMG_ONLY_RE.sub("", joined).strip() == "" and cell_images(joined):
            out.append(render_image_row(ctx, cell_images(joined)))
        else:
            out.append(tidy(inline(ctx, joined)))
        out.append("")
        buf.clear()

    para: list[str] = []

    while i < n:
        line = lines[i]
        s = line.strip()

        # 空行
        if not s:
            flush_para(para)
            i += 1
            continue

        # 落单的分隔线（没能配上标题的 setext 下划线）
        if re.fullmatch(r"(-{3,}|\*{3,}|_{3,}|={3,})", s):
            flush_para(para)
            i += 1
            continue

        # 表格。源文件里偶有丢了行首 `|` 的表头行，靠下一行是分隔行来认出来
        starts_table = s.startswith("|") or (
            "|" in s and i + 1 < n and lines[i + 1].strip().startswith("|")
            and is_sep_row(split_row(lines[i + 1]))
        )
        if starts_table:
            flush_para(para)
            block = [lines[i]]
            i += 1
            while i < n and lines[i].strip().startswith("|"):
                block.append(lines[i])
                i += 1
            parsed = [split_row(b) for b in block]
            header = None
            rows = parsed
            if len(parsed) >= 2 and is_sep_row(parsed[1]):
                header = parsed[0]
                rows = parsed[2:]
            elif parsed and is_sep_row(parsed[0]):
                rows = parsed[1:]
            tbl = render_table(ctx, header, rows)
            if tbl:
                out.append(tbl)
                out.append("")
            seen_heading_or_body = True
            continue

        # setext 标题
        if i + 1 < n and _SETEXT_H1.fullmatch(lines[i + 1].strip()):
            flush_para(para)
            title = clean_title(s)
            i += 2
            if drop_first_heading and not seen_heading_or_body:
                seen_heading_or_body = True
                continue
            seen_heading_or_body = True
            if title:
                out.append(r"\dubheadA{%s}" % tidy(inline(ctx, title)))
                out.append("")
            continue
        if i + 1 < n and _SETEXT_H2.fullmatch(lines[i + 1].strip()) and not _ULI.match(line):
            flush_para(para)
            title = clean_title(s)
            i += 2
            if drop_first_heading and not seen_heading_or_body:
                seen_heading_or_body = True
                continue
            seen_heading_or_body = True
            if title:
                out.append(r"\dubheadA{%s}" % tidy(inline(ctx, title)))
                out.append("")
            continue

        # ATX 标题
        m = _ATX.match(s)
        if m and (len(m.group(1)) >= 1) and m.group(2):
            flush_para(para)
            lvl = len(m.group(1))
            title = clean_title(m.group(2))
            i += 1
            if drop_first_heading and not seen_heading_or_body and lvl <= 2:
                seen_heading_or_body = True
                continue
            seen_heading_or_body = True
            cmd = r"\dubheadA" if lvl <= 2 else (r"\dubheadB" if lvl == 3 else r"\dubheadC")
            if title:
                out.append("%s{%s}" % (cmd, tidy(inline(ctx, title))))
                out.append("")
            continue

        # 引用
        if s.startswith(">"):
            flush_para(para)
            quotes = []
            while i < n and lines[i].strip().startswith(">"):
                q = re.sub(r"^\s*>\s?", "", lines[i])
                quotes.append(q.rstrip())
                i += 1
            body = convert_blocks(ctx, split_quote_paragraphs(quotes), drop_first_heading=False)
            if body:
                out.append("\\begin{dubquote}\n%s\n\\end{dubquote}" % body)
                out.append("")
            seen_heading_or_body = True
            continue

        # 列表
        if list_marker(line):
            flush_para(para)
            items, i = parse_list(lines, i)
            out.append(render_list(ctx, items))
            out.append("")
            seen_heading_or_body = True
            continue

        # 四空格缩进块
        if re.match(r"^ {4,}\S", line):
            flush_para(para)
            block = []
            while i < n and (re.match(r"^ {4,}\S", lines[i]) or (not lines[i].strip() and block)):
                if not lines[i].strip():
                    # 空行后若不再缩进则结束
                    if i + 1 < n and re.match(r"^ {4,}\S", lines[i + 1]):
                        block.append("")
                        i += 1
                        continue
                    break
                block.append(lines[i].strip())
                i += 1
            body = "\n\n".join(tidy(inline(ctx, b)) for b in block if b.strip())
            if body:
                out.append("\\begin{dubindent}\n%s\n\\end{dubindent}" % body)
                out.append("")
            seen_heading_or_body = True
            continue

        # 文件开头重复一遍编号标题的粗体行（例如 `**3\.7\.1 曼陀罗**`），丢掉
        if drop_first_heading and not seen_heading_or_body and not para and _LEAD_NUM_TITLE.fullmatch(s):
            i += 1
            continue

        # 普通段落
        para.append(line)
        seen_heading_or_body = True
        i += 1

    flush_para(para)
    # 压缩多余空行
    res = "\n".join(out)
    res = re.sub(r"\n{3,}", "\n\n", res).strip()
    return res


_HRULE = re.compile(r"(-{3,}|\*{3,}|_{3,}|={3,}|(?:[-*_]\s+){2,}[-*_])")


class ListItem:
    __slots__ = ("ordered", "number", "body")

    def __init__(self, ordered: bool, number: int, first: str):
        self.ordered = ordered
        self.number = number
        self.body = [first]      # 该项的全部内容行（已去掉相对缩进），递归按块转换


def list_marker(line: str) -> tuple[int, bool, int, int, str] | None:
    """识别列表项行，返回（缩进, 是否有序, 编号, 正文起始列, 正文）。"""
    line = line.expandtabs(4)
    if _HRULE.fullmatch(line.strip()):
        return None
    mo = _OLI.match(line)
    if mo:
        return len(mo.group(1)), True, int(mo.group(2)), mo.start(3), mo.group(3)
    mu = _ULI.match(line)
    if mu:
        return len(mu.group(1)), False, 1, mu.start(2), mu.group(2)
    return None


def _indent_of(line: str) -> int:
    line = line.expandtabs(4)
    return len(line) - len(line.lstrip(" "))


def parse_list(lines: list[str], i: int) -> tuple[list[ListItem], int]:
    """从第 i 行起读一整个列表（含跨空行的松散列表、项内缩进段落、引用与子列表）。

    源文件按 Python-Markdown 习惯用 4 空格缩进项内内容，项与项之间常隔空行，
    所以空行之后只要接着同级列表项或更深的缩进，列表就继续。
    """
    n = len(lines)
    first = list_marker(lines[i])
    assert first is not None
    base = first[0]
    items: list[ListItem] = []
    strip_w = 4                   # 项内续行要去掉的缩进量（相对 base）
    while i < n:
        cur = lines[i].expandtabs(4)
        s = cur.strip()
        ind = _indent_of(cur)
        mk = list_marker(cur)
        if mk and ind <= base:
            # 同级新项
            _, ordered, num, col, text = mk
            items.append(ListItem(ordered, num, text))
            strip_w = max(col - ind, 4)
            i += 1
            continue
        if not s:
            j = i + 1
            while j < n and not lines[j].strip():
                j += 1
            if j < n and (_indent_of(lines[j]) >= base + 2
                          or (list_marker(lines[j]) and _indent_of(lines[j]) >= base)):
                items[-1].body.extend([""] * (j - i))
                i = j
                continue
            break
        if ind > base:
            # 缩进续行：项内段落、引用、子列表等
            items[-1].body.append(cur[min(ind, base + strip_w):])
            i += 1
            continue
        # 惰性续行：紧跟在项内容后、没缩进的普通文字或引用
        if not s.startswith(("|", "#")) and not _HRULE.fullmatch(s):
            items[-1].body.append(s)
            i += 1
            continue
        break
    return items, i


def render_list(ctx: Ctx, items: list[ListItem]) -> str:
    if not items:
        return ""
    lines: list[str] = []
    k = 0
    while k < len(items):
        ordered = items[k].ordered
        if ordered:
            start = items[k].number
            lines.append(r"\begin{enumerate}" + ("[start=%d]" % start if start != 1 else ""))
        else:
            lines.append(r"\begin{itemize}")
        while k < len(items) and items[k].ordered == ordered:
            body = convert_blocks(ctx, items[k].body, drop_first_heading=False)
            # 正文以 [ 开头时会被 \item 当成可选参数，补一个空组挡住
            lines.append(r"\item%s %s" % ("{}" if body.startswith("[") else "", body))
            k += 1
        lines.append(r"\end{enumerate}" if ordered else r"\end{itemize}")
    return "\n".join(lines)


# --------------------------------------------------------------------------
# 目录（index.md）解析
# --------------------------------------------------------------------------

_INDEX_ITEM = re.compile(r"^(?P<ind>\s*)-\s+\[(?P<title>.+?)\]\((?P<href>[^)]+)\)\s*$")
_NUM_PREFIX = re.compile(r"^((?:\d+\.)*\d+)\.?\s+(.*)$")


class Node:
    __slots__ = ("level", "number", "title", "path", "label")

    def __init__(self, level: int, number: str | None, title: str, path: Path | None):
        self.level = level
        self.number = number
        self.title = title
        self.path = path
        self.label = ""


def parse_index(book_root: Path) -> list[Node]:
    index_file = book_root / "index.md"
    nodes: list[Node] = []
    if not index_file.exists():
        return nodes
    text = index_file.read_text(encoding="utf-8", errors="ignore")
    for line in text.splitlines():
        m = _INDEX_ITEM.match(line.rstrip())
        if not m:
            continue
        indent = len(m.group("ind").replace("\t", "    "))
        level = min(indent // 4, 2)
        raw_title = _MD_UNESCAPE.sub(r"\1", decode_uni_escapes(m.group("title"))).strip()
        href = m.group("href").split("#", 1)[0].strip()
        target = (book_root / href).resolve() if href and not href.startswith(("http", "mailto")) else None
        if target is not None and not target.exists():
            target = None
        num = None
        mt = _NUM_PREFIX.match(raw_title)
        if mt:
            num, raw_title = mt.group(1), mt.group(2).strip()
        nodes.append(Node(level, num, raw_title, target))
    return nodes


# --------------------------------------------------------------------------
# 生成
# --------------------------------------------------------------------------

SECTION_CMD = {0: "chapter", 1: "section", 2: "subsection"}
COUNTER_NAME = {0: "chapter", 1: "section", 2: "subsection"}


def counter_resets(level: int, number: str | None) -> str:
    """根据目录里的原始编号设置计数器，使 LaTeX 的编号与原书一致。"""
    if not number:
        return ""
    parts = number.split(".")
    if len(parts) != level + 1:
        return ""
    try:
        last = int(parts[-1])
    except ValueError:
        return ""
    return "\\setcounter{%s}{%d}" % (COUNTER_NAME[level], last - 1)


def build(book_root: Path, out_dir: Path, repo_root: Path,
          copy_images: bool, force_images: bool = False, **img_opts) -> dict:
    out_dir.mkdir(parents=True, exist_ok=True)
    store = ImageStore(out_dir, **img_opts)
    ctx = Ctx(book_root, repo_root, store)

    nodes = parse_index(book_root)

    # 收集全部候选源文件
    all_md = sorted(
        (p for p in book_root.rglob("*.md")
         if p.is_file()
         and p.name not in EXCLUDED_FILES
         and out_dir.resolve() not in p.resolve().parents),
        key=lambda p: p.relative_to(book_root).as_posix().lower(),
    )
    all_rel = {p.relative_to(book_root).as_posix() for p in all_md}

    preface = book_root / "preface.md"
    epilogue = book_root / "epilogue.md"
    # 目录里也列了尾声（以及可能的前言），它们另有专门的输出位置，别再当普通章节排一遍
    specials = {preface.resolve(), epilogue.resolve()}
    nodes = [nd for nd in nodes if nd.path is None or nd.path not in specials]

    used: set[str] = {"index.md"}
    for special in (preface, epilogue):
        if special.exists():
            used.add(special.relative_to(book_root).as_posix())

    # 先登记 label（正文里的交叉引用需要）
    for idx, nd in enumerate(nodes):
        if nd.path is None:
            continue
        rel = nd.path.relative_to(book_root).as_posix()
        nd.label = "sec:" + slug_label(rel)
        ctx.labels.setdefault(rel, nd.label)
        used.add(rel)
    if preface.exists():
        ctx.labels["preface.md"] = "sec:preface"
    if epilogue.exists():
        ctx.labels["epilogue.md"] = "sec:epilogue"

    orphans = sorted(all_rel - used)
    for rel in orphans:
        ctx.labels.setdefault(rel, "sec:" + slug_label(rel))

    # ---- 生成正文 ----
    body: list[str] = []

    def emit_file(path: Path, drop_first: bool = True) -> None:
        ctx.cur_dir = path.parent
        text = path.read_text(encoding="utf-8", errors="ignore")
        latex = convert(ctx, text, drop_first_heading=drop_first)
        if latex.strip():
            body.append(latex)
            body.append("")

    # 前言
    if preface.exists():
        body.append(r"\chapter*{前言}")
        body.append(r"\phantomsection\addcontentsline{toc}{chapter}{前言}")
        body.append(r"\markboth{前言}{前言}")
        body.append(r"\label{sec:preface}")
        body.append("")
        emit_file(preface)

    body.append(r"\mainmatter")
    body.append("")

    for nd in nodes:
        cmd = SECTION_CMD[nd.level]
        reset = counter_resets(nd.level, nd.number)
        if reset:
            body.append(reset)
        title_tex = esc(nd.title)
        body.append("\\%s{%s}" % (cmd, title_tex))
        if nd.label:
            body.append("\\label{%s}" % nd.label)
        body.append("")
        if nd.path is not None:
            emit_file(nd.path)

    # 未被目录引用的文件
    if orphans:
        body.append(r"\appendix")
        body.append(r"\chapter{附录：未列入目录的内容}")
        body.append("")
        for rel in orphans:
            p = book_root / rel
            title = rel
            first = ""
            raw = p.read_text(encoding="utf-8", errors="ignore")
            for ln_i, ln in enumerate(raw.splitlines()):
                if ln.strip():
                    nxt = raw.splitlines()[ln_i + 1] if ln_i + 1 < len(raw.splitlines()) else ""
                    if _SETEXT_H1.fullmatch(nxt.strip()) or _SETEXT_H2.fullmatch(nxt.strip()) or ln.strip().startswith("#"):
                        first = clean_title(ln.lstrip("#").strip())
                    break
            if first:
                title = first
            body.append("\\section{%s}" % esc(title))
            body.append("\\label{%s}" % ctx.labels[rel])
            body.append("")
            emit_file(p)

    # 尾声
    if epilogue.exists():
        body.append(r"\backmatter")
        body.append(r"\chapter*{尾声}")
        body.append(r"\phantomsection\addcontentsline{toc}{chapter}{尾声}")
        body.append(r"\markboth{尾声}{尾声}")
        body.append(r"\label{sec:epilogue}")
        body.append("")
        emit_file(epilogue)

    # ---- 图片转码 ----
    if copy_images:
        store.emit(force=force_images)

    # ---- 写 book.tex ----
    today = _dt.date.today().isoformat()
    doc = TEMPLATE.format(
        title=esc(BOOK_TITLE),
        subtitle=esc(BOOK_SUBTITLE),
        byline=esc(BOOK_BYLINE),
        date=today,
        nfiles=len(used) + len(orphans) - 1,
        body="\n".join(body),
    )
    (out_dir / "book.tex").write_text(doc, encoding="utf-8", newline="\n")

    return {
        "nodes": len(nodes),
        "files": sorted(used | set(orphans)),
        "orphans": orphans,
        "images_used": sorted(ctx.images_used),
        "images_missing": sorted(ctx.images_missing),
        "converted": store.converted,
        "cached": store.cached,
        "copied": store.copied,
        "img_failed": store.failed,
        "pillow": Image is not None,
    }


TEMPLATE = r"""% !TeX program = xelatex
% =====================================================================
%  {title} —— 由 build_book.py 自动汇编，请勿手工编辑本文件。
%  版式定义见 preamble.tex；重新生成：python build_book.py
%  生成时间：{date}
% =====================================================================
\documentclass[UTF8, 11pt, oneside, openany, fontset=windows]{{ctexbook}}

\input{{preamble.tex}}

\hypersetup{{
  pdftitle={{{title}}},
  pdfsubject={{{subtitle}}},
  pdfauthor={{{byline}}},
}}

\begin{{document}}

% ---------------------------- 封面 ----------------------------
\begin{{titlepage}}
\thispagestyle{{empty}}
\centering
\vspace*{{3.2cm}}

{{\color{{dubaccent}}\rule{{\linewidth}}{{2.2pt}}}}
\vspace{{1.0cm}}

{{\heiti\fontsize{{46}}{{54}}\selectfont\color{{dubaccentdk}} {title}\par}}
\vspace{{0.9cm}}
{{\sffamily\LARGE\color{{dubaccent}} {subtitle}\par}}

\vspace{{0.8cm}}
{{\color{{dubaccent}}\rule{{\linewidth}}{{2.2pt}}}}

\vspace{{1.6cm}}
{{\large\color{{dubink}} {byline}\par}}

\vfill

\begin{{minipage}}{{0.86\linewidth}}
\small\color{{dubmute}}\centering
本书由《药物使用者圣经》中文译本目录下的 Markdown 源文件自动汇编排版。\\
内容以伤害减少（harm reduction）为目的，不构成对任何物质使用的鼓励或医学建议。\\[0.6em]
汇编日期：{date} \quad·\quad 源文件 {nfiles} 篇
\end{{minipage}}

\vspace{{1.2cm}}
\end{{titlepage}}

\frontmatter
\pagestyle{{fancy}}

% ---------------------------- 目录 ----------------------------
\cleardoublepage
\pdfbookmark[0]{{目录}}{{toc}}
{{\hypersetup{{linkcolor=dubink}}
\tableofcontents}}

% ---------------------------- 正文 ----------------------------
{body}

\end{{document}}
"""


def main() -> None:
    here = Path(__file__).resolve().parent
    ap = argparse.ArgumentParser(description="把《药物使用者圣经》的 Markdown 汇编为 LaTeX 书稿")
    ap.add_argument("--root", default=str(here.parent), help="Markdown 源目录（默认：本脚本的上级目录）")
    ap.add_argument("--out", default=str(here), help="输出目录（默认：本脚本所在目录）")
    ap.add_argument("--repo-root", default=None, help="仓库根目录，用于解析 /文件/ 开头的图片路径")
    ap.add_argument("--no-images", action="store_true", help="跳过图片转码（用于快速试排）")
    ap.add_argument("--force-images", action="store_true", help="强制重新转码所有图片")
    ap.add_argument("--dpi", type=int, default=IMG_DPI, help="转码后写入的 DPI（默认 %d）" % IMG_DPI)
    ap.add_argument("--max-side", type=int, default=IMG_MAX_SIDE,
                    help="图片最长边像素上限，0 表示不缩放（默认 %d）" % IMG_MAX_SIDE)
    ap.add_argument("--quality", type=int, default=IMG_QUALITY, help="JPEG 质量（默认 %d）" % IMG_QUALITY)
    args = ap.parse_args()

    book_root = Path(args.root).resolve()
    out_dir = Path(args.out).resolve()
    repo_root = Path(args.repo_root).resolve() if args.repo_root else book_root.parent.parent

    if not (book_root / "index.md").exists():
        sys.exit("找不到 %s，请用 --root 指定正确的源目录" % (book_root / "index.md"))

    if Image is None:
        print("警告：未安装 Pillow，图片将原样复制。源图库实际是 WebP，xelatex 可能无法读取。\n"
              "      解决：pip install Pillow", file=sys.stderr)

    info = build(book_root, out_dir, repo_root,
                 copy_images=not args.no_images, force_images=args.force_images,
                 dpi=args.dpi, max_side=args.max_side, quality=args.quality)

    report = []
    report.append("《%s》LaTeX 汇编报告  %s" % (BOOK_TITLE, _dt.datetime.now().isoformat(timespec="seconds")))
    report.append("源目录 : %s" % book_root)
    report.append("仓库根 : %s" % repo_root)
    report.append("输出   : %s" % (out_dir / "book.tex"))
    report.append("")
    report.append("目录条目 : %d" % info["nodes"])
    report.append("源文件   : %d（已排除 %s）" % (len(info["files"]), "、".join(sorted(EXCLUDED_FILES))))
    report.append("图片     : 使用 %d 张（转码 %d / 命中缓存 %d / 原样复制 %d），源库缺失 %d 张"
                  % (len(info["images_used"]), info["converted"], info["cached"],
                     info["copied"], len(info["images_missing"])))
    if not info["pillow"]:
        report.append("           ！未安装 Pillow，图片未转码（源图实为 WebP，xelatex 可能读不了）")
    report.append("")
    if info["img_failed"]:
        report.append("— 转码失败的图片 (%d) —" % len(info["img_failed"]))
        report.extend("  " + f for f in info["img_failed"])
        report.append("")
    if info["orphans"]:
        report.append("— 未被 index.md 引用、已放入附录的文件 (%d) —" % len(info["orphans"]))
        report.extend("  " + o for o in info["orphans"])
        report.append("")
    if info["images_missing"]:
        report.append("— 源库中找不到的图片 (%d) —" % len(info["images_missing"]))
        report.extend("  " + m for m in info["images_missing"])
        report.append("")
    report.append("— 汇编的源文件清单 —")
    report.extend("  " + f for f in info["files"])
    text = "\n".join(report) + "\n"
    (out_dir / "build-report.txt").write_text(text, encoding="utf-8", newline="\n")

    print("\n".join(report[:12]))
    print("\n报告已写入: %s" % (out_dir / "build-report.txt"))


if __name__ == "__main__":
    main()
