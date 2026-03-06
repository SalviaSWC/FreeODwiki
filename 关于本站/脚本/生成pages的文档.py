import shutil
import os
import re
import subprocess
from pathlib import Path
import sys
import stat
# import 生成sitemap  # 如果需要，取消注释

source_dir = r"D:\Projects\FreeODwiki"          # 源目录
dest_dir   = r"D:\Projects\Freeodwiki_pages"    # 目标目录
dest_src_dir = os.path.join(dest_dir, "src")
url = r"https://salviaswc.github.io/FreeODwiki"
repo_prefix = r"/FreeODwiki"

# 生成sitemap.generate_sitemap(source_dir, url)  # 如果需要，取消注释

mkdocs_yml = r"""
site_name: FreeODwiki——可自由编辑的开源Overdose百科 
site_url: https://salviaswc.github.io/FreeODwiki
site_author: FreeODwiki贡献者们
site_description: FreeODwiki是一个开源项目，旨在让每一位ODer都能有效地获取和分享有关Overdose和精神活性物质的信息，并在减少上述事物对ODer造成的伤害的同时，为上述事物提供一个独特的视角。  # 站点描述
docs_dir: src  # 相对路径
site_dir: site  # 相对路径
theme: 
  name: material  
  favicon: 文件/FreeODwiki2.png     # 改成你实际放的路径
  logo: 文件/FreeODwiki2.png 
use_directory_urls: false
markdown_extensions:
  - pymdownx.tilde
  - pymdownx.tasklist:
      custom_checkbox: true          
  - admonition
  - pymdownx.details
  - pymdownx.superfences
  - footnotes

plugins:
    - awesome-nav
"""

with open(os.path.join(dest_dir, "mkdocs.yml"), mode="w", encoding="utf-8") as f:
    f.write(mkdocs_yml)

def remove_readonly(func, path, exc_info):
    """当遇到权限问题时，去掉只读属性再重试"""
    if isinstance(exc_info[1], PermissionError) and exc_info[1].winerror == 5:
        try:
            os.chmod(path, stat.S_IWRITE)
            func(path)
            return
        except Exception:
            pass
    raise exc_info[1]

if os.path.exists(dest_src_dir):
    shutil.rmtree(dest_src_dir, onerror=remove_readonly)
    print("已清空目标目录")

os.makedirs(dest_src_dir)

shutil.copytree(source_dir, dest_src_dir, dirs_exist_ok=True)

print("复制完成！")
print(f"源：{source_dir}")
print(f"目标：{dest_src_dir}")

# ── 辅助函数 ──
def is_external(link: str) -> bool:
    """判断是否为外部链接（http/https/mailto/data 等）"""
    link = link.strip()
    return link.startswith(('http://', 'https://', 'mailto:', 'data:', '//'))

def resolve_target_path(current_file: Path, link_path: str, docs_root: Path) -> Path | None:
    """解析链接目标的真实源文件路径（返回 None 表示外部链接或无效）"""
    clean_path = link_path.split('#')[0].split('?')[0].strip()
    if is_external(clean_path):
        return None

    if clean_path.startswith('/'):
        target = (docs_root / clean_path.lstrip('/')).resolve()
    else:
        target = (current_file.parent / clean_path).resolve(strict=False)

    return target

def remove_dead_links_in_file(filepath: Path, docs_root: Path) -> tuple[bool, str]:
    """移除死链接：图片整段删除，文本链接保留文字"""
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        return False, f"读取失败: {e}"

    original = content

    # 1. 处理图片链接 ![alt](path) - 优化正则，支持更多变体
    def replace_image(match):
        alt = match.group(1)
        link = match.group(2)
        target = resolve_target_path(filepath, link, docs_root)
        if target is None:  # 外部，保留
            return match.group(0)
        if target.exists() and target.suffix.lower() in ['.png', '.jpg', '.jpeg', '.gif', '.svg']:  # 只检查图片扩展
            return match.group(0)
        else:
            # print(f"    ✗ 移除死图片: {link}")
            return ""

    content = re.sub(r'!\[([^\]]*?)\]\(([^)]+?)\)', replace_image, content)

    # 2. 处理文本链接 [text](path)
    def replace_text(match):
        text = match.group(1)
        link = match.group(2)
        target = resolve_target_path(filepath, link, docs_root)
        if target is None:  # 外部，保留
            return match.group(0)
        if target.suffix.lower() == ".pdf":
            return match.group(0)
        if target.exists():
            return match.group(0)
        # print(f"    ✗ 移除死文本链接: {link} （保留文字: {text}）")
        return text

    content = re.sub(r'(?<!\!)\[([^\]]+?)\]\(([^)]+?)\)', replace_text, content)

    if content == original:
        return True, "无死链接变更"

    try:
        filepath.write_text(content, encoding='utf-8')
        return True, "死链接已处理"
    except Exception as e:
        return False, f"写入失败: {e}"

def replace_md_to_html_in_file(filepath: Path) -> tuple[bool, str]:
    """只替换剩余（有效）链接中的 .md → .html，可选添加 repo_prefix"""
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        return False, f"读取失败: {e}"

    # 替换 .md → .html（包括 #anchor）
    new_content = re.sub(
        r'\]\(([^)#\s]*?\.md)(#[^)]*)?\)',
        lambda m: f']({m.group(1)[:-3]}.html{m.group(2) or ""})',
        content
    )

    new_content = re.sub(
        r'\]\((/[^)#\s]+)(#[^)]*)?\)',
        lambda m: f']({repo_prefix}{m.group(1)}{m.group(2) or ""})',
        new_content
    )

    if new_content == content:
        return True, "无 .md 链接变更"

    try:
        filepath.write_text(new_content, encoding='utf-8')
        return True, "已替换 .md → .html"
    except Exception as e:
        return False, f"写入失败: {e}"

# 新函数：post-build 添加 <base> 到所有 HTML
def add_base_to_html(site_dir: str, repo_prefix: str) -> int:
    site_path = Path(site_dir)
    html_files = list(site_path.rglob("*.html"))
    modified_count = 0
    for html_file in html_files:
        try:
            content = html_file.read_text(encoding='utf-8')
            if '<base href="' in content:  # 已存在，跳过
                continue
            # 在 <head> 后插入 <base>
            new_content = re.sub(
                r'(<head[^>]*>)',
                r'\1\n    <base href="' + repo_prefix + '/">',
                content,
                flags=re.IGNORECASE
            )
            if new_content != content:
                html_file.write_text(new_content, encoding='utf-8')
                modified_count += 1
                # print(f"    ✓ 添加 <base> 到: {html_file.relative_to(site_path)}")
        except Exception as e:
            print(f"处理 {html_file} 出错: {e}")
    print(f"已修改 {modified_count} 个 HTML 文件添加 <base>")
    return modified_count

# ── 主处理流程 ──
def process_src_folder(src_path: Path):
    if not src_path.exists():
        print("错误：src/ 目录不存在")
        return False

    md_files = list(src_path.rglob("*.md"))
    if not md_files:
        print("src/ 中未找到 .md 文件")
        return True

    print(f"找到 {len(md_files)} 个 .md 文件，开始处理...\n")

    processed = 0
    for md_file in md_files:
        rel_path = md_file.relative_to(Path(dest_dir))
        # print(f"处理文件: {rel_path}")

        # 步骤1：移除死链接
        ok, msg = remove_dead_links_in_file(md_file, src_path)
        if not ok:
            print(f"  {rel_path}: {msg}")

        # 步骤2：替换 .md → .html
        ok, msg = replace_md_to_html_in_file(md_file)
        if not ok:
            print(f"  {rel_path}: {msg}")

        processed += 1

    print(f"\n全部处理完成（{processed} 个文件）")
    return True

def build_mkdocs():
    print("\n开始运行 mkdocs build...")
    result = subprocess.run(["mkdocs", "build"], capture_output=True, text=True, cwd=dest_dir)
    if result.returncode != 0:
        print("mkdocs build 失败：")
        print(result.stderr)
        return False
    else:
        print("mkdocs build 成功")
        return True

def main():
    os.chdir(dest_dir)
    print("=== MkDocs 死链接自动清理 + 构建 + 预览工具 ===\n")

    src_path = Path(dest_src_dir)
    if not process_src_folder(src_path):
        if input("\n预处理出现问题，是否继续 build？(y/N): ").lower() != 'y':
            sys.exit(1)

    if not build_mkdocs():
        if input("\nmkdocs build 失败，是否继续？(y/N): ").lower() != 'y':
            sys.exit(1)

    # 新步骤：添加 <base> 到 site/ 中的 HTML
    site_dir = os.path.join(dest_dir, "site")
    add_base_to_html(site_dir, repo_prefix)

    # # 可选：本地预览（不带 /FreeODwiki/，因为本地是根）
    # if input("\n是否本地预览 (mkdocs serve)？(y/N): ").lower() == 'y':
    #     subprocess.run(["mkdocs", "serve"], cwd=dest_dir)

    print("\n完成！现在你可以手动 push site/ 到 gh-pages 分支。部署后链接应正常（带 /FreeODwiki/）。")

if __name__ == "__main__":
    main()