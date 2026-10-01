# 《药物使用者圣经》LaTeX 汇编

把 `文档/药物使用者圣经/` 下的 Markdown 源文件汇编成一本排好版的 PDF。

## 快速开始

```powershell
# Windows / PowerShell
cd 文档\药物使用者圣经\tex
.\build.ps1
```

```bash
# Git Bash / WSL / Linux / macOS
cd 文档/药物使用者圣经/tex
./build.sh
```

产出 `book.pdf`（约 568 页）。

## 依赖

| 依赖 | 用途 |
|---|---|
| Python 3 | 运行 `build_book.py` |
| [Pillow](https://pypi.org/project/Pillow/) | 图片转码，`pip install Pillow` |
| TeX Live / MiKTeX 的 **xelatex** | 排版中文 |

用到的宏包（TeX Live 完整安装均自带）：`ctex`、`tabularray`、`tcolorbox`、
`fontspec`、`geometry`、`fancyhdr`、`hyperref`、`bookmark`、`microtype`、
`enumitem`、`needspace`、`emptypage`、`graphicx`。

中文字体走 ctex 的 `fontset=windows`（宋体／黑体／楷体／仿宋）。换字体改
`book.tex` 里 `\documentclass` 的 `fontset=`，或在 `preamble.tex` 里显式
`\setCJKmainfont`。

## 文件

| 文件 | 说明 |
|---|---|
| `build_book.py` | 汇编器：读 `index.md` 定结构，把各 Markdown 转成 LaTeX |
| `preamble.tex` | **版式定义**。想调页边距、配色、标题样式、插图尺寸就改这里 |
| `build.ps1` / `build.sh` | 一键构建（生成 + 三遍 xelatex） |
| `book.tex` | 生成物，**不要手改**，每次构建都会被覆盖 |
| `images/` | 生成物：正文用到的图片，已转码成 xelatex 能读的格式 |
| `build-report.txt` | 生成物：汇编报告（处理了哪些文件、缺哪些图） |
| `book.pdf` | 最终成品 |

## 汇编规则

**收录范围**：`文档/药物使用者圣经/` 下的全部 `.md`，但排除
`combined.md`、`prompt.md`、`merge_markdown.py`，以及 `tex/` 目录自身。

**层级**由 `index.md` 的缩进决定，并沿用其中的原始编号：

| index.md 缩进 | LaTeX | 例 |
|---|---|---|
| 0 空格 | `\chapter` | 2. 化学景观 |
| 4 空格 | `\section` | 2.3 兴奋剂 |
| 8 空格 | `\subsection` | 2.3.13 Cocaine |

`index.md` 里标的编号会通过 `\setcounter` 写回计数器，所以像「第 2 章从 2.2
开始、没有 2.1」这种原书的跳号也能照样保留。`preface.md`、`epilogue.md` 分别
作为不编号的「前言」「尾声」。没有被 `index.md` 引用到的文件会进附录（目前没有）。

**各文件内部**的标题统一降级成不编号小标题（进 PDF 书签，不进正文目录），
文件开头重复一遍章节名的那行标题会被丢掉。`[◀返回]`、`[⮜ 上一节][下一节 ⮞]`
这类导航行也会被剥掉。

**表格**按内容分流：

- 纯图片的表 → 居中插图；一行多图自动并排
- 「图片 + 说明」两列，或单列的「图片行 + 说明行」 → 带说明的插图
- 两列、无表头、左列是短标签 → **速览信息卡**（药物条目开头那个带左侧色条的框）
- 其余 → 可跨页的表格，带表头底色和「（接下页）」提示

**插图尺寸**：转码时按 144 DPI 写元数据，LaTeX 再按「原始尺寸、但不超过
0.70 倍行宽 / 0.40 倍版心高」摆放。所以分子结构图保持小巧，照片铺到接近满宽。

## 关于图片

源图库 `文件/` 里的文件后缀是 `.jpeg` / `.png`，但**内容实际是 WebP**，
xelatex 无法直接读取。`build_book.py` 因此用 Pillow 统一重新编码：带 alpha
通道的存 PNG，其余存 JPEG，最长边缩到 1600 px，质量 86。

调整：

```bash
python build_book.py --dpi 144 --max-side 2000 --quality 92 --force-images
```

图片按时间戳缓存，源图没变就不会重复转码；`--force-images` 强制重来。

目前源图库缺 13 张图（`image53/54/135/136/144/145/296/320/321/322/483/626.jpeg`
和 `toc.png`），正文中会显示一个「图片缺失」占位框，完整清单见
`build-report.txt`。
