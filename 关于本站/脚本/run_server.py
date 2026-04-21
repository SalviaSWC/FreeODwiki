import os
import re
import shutil
import stat
import subprocess
import sys
from pathlib import Path

# import 生成sitemap
# 生成sitemap.generate_sitemap(source_dir, url)

MKDOCS_YML = r"""
site_name: FreeODwiki——可自由编辑的开源Overdose百科 
site_url: https://freeodwiki.org
site_author: FreeODwiki贡献者们
site_description: FreeODwiki是一个开源项目，旨在让每一位ODer都能有效地获取和分享有关Overdose和精神活性物质的信息，并在减少上述事物对ODer造成的伤害的同时，为上述事物提供一个独特的视角。  # 站点描述
docs_dir: .\src  # 你的 Markdown 文件夹路径（相对路径或绝对路径）
site_dir: .\site

use_directory_urls: false

repo_name: SalviaSWC/FreeODwiki
repo_url: https://github.com/SalviaSWC/FreeODwiki

extra_css:
  - extra.css

plugins:
 - search
 - awesome-nav
 - glightbox
 #  - optimize

markdown_extensions:
  - abbr
  - admonition
  - attr_list
  - def_list
  - footnotes
  - md_in_html
  - material.extensions.preview:
      configurations:
        - targets:
            include:
              - 药物/*
              - 药效/*
              - 文档/*
  - pymdownx.arithmatex:
      generic: true
  - pymdownx.betterem:
      smart_enable: all
  - pymdownx.snippets
  - pymdownx.blocks.caption
  - pymdownx.critic
  - pymdownx.caret
  - pymdownx.details
#  - pymdownx.emoji:
#      emoji_generator: !!python/name:material.extensions.emoji.to_svg
#      emoji_index: !!python/name:material.extensions.emoji.twemoji
  - pymdownx.highlight:
      anchor_linenums: true
      line_spans: __span
      pygments_lang_class: true
  - pymdownx.inlinehilite
  - pymdownx.keys
  - pymdownx.magiclink:
      normalize_issue_symbols: true
      repo_url_shorthand: true
      user: SalviaSWC
      repo: FreeODwiki
  - pymdownx.mark
  - pymdownx.smartsymbols
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
  - pymdownx.tabbed:
      alternate_style: true
      slugify: !!python/object/apply:pymdownx.slugs.slugify {}
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.tilde
#   - pymdownx.slugs:
#       slugify: !!python/object/apply:pymdownx.slugs.slugify {}
  - toc:
      slugify: !!python/object/apply:pymdownx.slugs.slugify {} # Unicode 支持
      permalink: true # 各级标题锚点
  
theme:
  language: zh
  name: material  
  favicon: 文件/FreeODwiki2.png
  logo: 文件/FreeODwiki2.png

  features:
    - navigation.top
    - navigation.path # 显示路径（二级目录之后显示）
    - navigation.tabs # 导航顶栏（一级目录）
    - navigation.tabs.sticky # 固定导航顶栏，下滑不消失
    - navigation.indexes # 目录索引页，开启后自动绑定 index.md
    - content.tooltips
    - content.footnote.tooltips
    - content.code.copy
    - search.share
    - search.suggest
    - search.highlight
  
  palette:

    # Palette toggle for automatic mode
    - media: "(prefers-color-scheme)"
      toggle:
        icon: material/brightness-auto
        name: Switch to light mode

    # Palette toggle for light mode
    - media: "(prefers-color-scheme: light)"
      scheme: default 
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode

    # Palette toggle for dark mode
    - media: "(prefers-color-scheme: dark)"
      scheme: slate
      toggle:
        icon: material/brightness-4
        name: Switch to system preference
"""


# ── 辅助函数 ──
def remove_readonly(func, path, exc_info):
    """当遇到权限问题时，去掉只读属性再重试"""
    # 只处理真正的权限拒绝错误 (WinError 5)
    if isinstance(exc_info, PermissionError) and exc_info.winerror == 5:
        try:
            # 去掉只读属性（给写权限）
            os.chmod(path, stat.S_IWRITE)
            # 再尝试一次删除
            func(path)
            return
        except Exception:
            pass
    # 如果不是权限问题，或者改权限也失败，就抛出原错误
    raise exc_info


def is_external(link: str) -> bool:
    """判断是否为外部链接（http/https/mailto/data 等）"""
    link = link.strip()
    return link.startswith(("http://", "https://", "mailto:", "data:", "//"))


def resolve_target_path(
    current_file: Path, link_path: str, docs_root: Path
) -> Path | None:
    """解析链接目标的真实源文件路径（返回 None 表示外部链接或无效）"""
    # 去除 #anchor 和 ?query
    clean_path = link_path.split("#")[0].split("?")[0].strip()
    if is_external(clean_path):
        return None

    if clean_path.startswith("/"):
        # 根相对链接：从 docs_root 开始
        target = (docs_root / clean_path.lstrip("/")).resolve()
    else:
        # 相对链接（包括 ./ ../）
        target = (current_file.parent / clean_path).resolve(strict=False)

    return target


def remove_dead_links_in_file(
    filepath: Path, docs_root: Path
) -> tuple[bool, str]:
    """移除死链接：图片整段删除，文本链接保留文字"""
    try:
        content = filepath.read_text(encoding="utf-8")
    except Exception as e:
        return False, f"读取失败: {e}"

    original = content

    # 1. 处理图片链接 ![alt](path)
    def replace_image(match: re.Match):
        alt = match.group(1)
        link = match.group(2)
        target = resolve_target_path(filepath, link, docs_root)
        if target is None:  # 外部链接，保留
            return match.group(0)
        if target.exists():
            return match.group(0)  # 存在，保留
        # 不存在 → 完全移除整段图片语法
        # print(f"    ✗ 移除死图片: {link}")
        return ""

    content = re.sub(r"!\[([^\]]*)\]\(([^)]+)\)", replace_image, content)

    # 2. 处理文本链接 [text](path)
    def replace_text(match: re.Match):
        text = match.group(1)
        link = match.group(2)
        target = resolve_target_path(filepath, link, docs_root)
        if target is None:  # 外部链接，保留
            return match.group(0)
        if target.suffix == ".pdf":
            return match.group(0)
        if target.exists():
            return match.group(0)  # 存在，保留
        # 不存在 → 只保留文字，去除链接
        # print(f"    ✗ 移除死文本链接: {link} （保留文字: {text}）")
        return text

    content = re.sub(
        r"(?<!\!)\[([^\]]+)\]\(([^)]+)\)", replace_text, content
    )  # (?<!\!) 避免匹配图片

    if content == original:
        return True, "无死链接变更"

    try:
        filepath.write_text(content, encoding="utf-8")
        return True, "死链接已处理"
    except Exception as e:
        return False, f"写入失败: {e}"


def replace_md_to_html_in_file(filepath: Path) -> tuple[bool, str]:
    """只替换剩余（有效）链接中的 .md → .html"""
    try:
        content = filepath.read_text(encoding="utf-8")
    except Exception as e:
        return False, f"读取失败: {e}"

    # 只替换链接中的 .md → .html（包括 #anchor）
    new_content = re.sub(
        r"\]\(([^)#\s]*?\.md)(#[^)]*)?\)",
        lambda m: f']({m.group(1)[:-3]}.html{m.group(2) or ""})',
        content,
    )

    if new_content == content:
        return True, "无 .md 链接变更"

    try:
        filepath.write_text(new_content, encoding="utf-8")
        return True, "已替换 .md → .html"
    except Exception as e:
        return False, f"写入失败: {e}"


# ── 主处理流程 ──
def process_src_folder(src_path: Path, target_dir: str) -> bool:
    if not src_path.exists():
        print("错误：src/ 目录不存在")
        return False

    md_files = list(src_path.rglob("*.md"))
    if not md_files:
        print("src/ 中未找到 .md 文件")
        return True

    print(f"找到 {len(md_files)} 个 .md 文件，开始处理...")

    processed = 0
    for md_file in md_files:
        rel_path = md_file.relative_to(target_dir)
        # print(f"处理文件: {rel_path}")

        # 步骤1：移除死链接（图片删除、文本保留文字）
        ok, msg = remove_dead_links_in_file(md_file, src_path)

        # 步骤2：替换剩余链接 .md → .html
        ok, msg = replace_md_to_html_in_file(md_file)

        processed += 1

    print(f"全部处理完成（{processed} 个文件）")
    return True


def build_mkdocs(target_dir: str, dirty=False, capture_output=True):
    args = ["mkdocs", "build"]
    if dirty:
        args.append("--dirty")

    print(f"开始运行 {" ".join(args)}...")

    result = subprocess.run(
        args,
        capture_output=capture_output,
        text=True,
        cwd=target_dir,
    )
    if result.returncode != 0:
        print(f"mkdocs build 失败({result.returncode})：")
        print(result.stderr)
        return False
    else:
        print("mkdocs build 成功")
        return True


def start_server(target_dir: str):
    site_path = Path(target_dir) / "site"
    if not site_path.exists():
        print("错误：site/ 目录不存在（build 可能失败）")
        return

    print(f"\n启动本地服务器：http://localhost:8000")
    print("按 Ctrl+C 停止服务器")
    os.chdir(site_path)
    subprocess.run(
        ["python", "-m", "http.server", "8000"], cwd=target_dir + r"\site"
    )


def main():
    import argparse

    class Args(argparse.Namespace):
        source_dir: str
        target_dir: str
        debug: bool
        capture_output: bool

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "source_dir",
        default=r"D:\Projects\FreeODwiki",
        nargs="?",
        help="源目录，默认值是为了保持向后兼容而设置的。",
    )
    parser.add_argument(
        "target_dir",
        default=r"D:\servers\freeodwiki",
        nargs="?",
        help="目标目录，默认值是为了保持向后兼容而设置的。",
    )
    parser.add_argument(
        "-d",
        "--debug",
        action="store_true",
        help="开启后会跳过预处理步骤，并将 dirty 参数传入 mkdocs，这将对构建流程进行极大的加速。仅作为调试用途。",
    )
    parser.add_argument(
        "-s",
        "--show_output",
        dest="capture_output",
        action="store_false",  # 进行一个取反
        help="启用时不会捕获 mkdocs build 的输出，这可以防止你过于无聊。",
    )
    args = parser.parse_args(namespace=Args)
    source_dir = args.source_dir
    target_dir = args.target_dir
    target_src_dir = args.target_dir + r"\src"

    with open(target_dir + r"\mkdocs.yml", mode="w", encoding="utf-8") as f:
        f.write(MKDOCS_YML)

    if os.path.exists(target_src_dir):
        shutil.rmtree(target_src_dir, onexc=remove_readonly)
        print("已清空目标目录")

    # 步骤2：重新创建空的目录
    os.makedirs(target_src_dir)

    # 步骤3：把源目录完整复制过去
    shutil.copytree(source_dir, target_src_dir, dirs_exist_ok=True)

    print("复制完成！")
    print(f"源：{source_dir}")
    print(f"目标：{target_src_dir}")
    print()

    os.chdir(target_dir)

    print("=== MkDocs 死链接自动清理 + 构建 + 预览工具 ===")
    if args.debug:
        print("...预处理已被跳过")
    else:
        src_path = Path(target_src_dir)
        if not process_src_folder(src_path, target_dir):
            if (
                input("\n预处理出现问题，是否继续 build？(y/n): ")
                .lower()
                .startswith("n")
            ):
                sys.exit(1)

    print()
    if not build_mkdocs(target_dir, args.debug, args.capture_output):
        if (
            input("\nmkdocs build 失败，是否仍要启动服务器？(y/n): ")
            .lower()
            .startswith("n")
        ):
            sys.exit(2)

    start_server(target_dir)


if __name__ == "__main__":
    main()

# PermissionError: [WinError 5] 拒绝访问。: 'D:\\servers\\freeodwiki\\src\\.git\\objects\\00\\104df42d586da365c53f3888d55e89e3caaac7'
