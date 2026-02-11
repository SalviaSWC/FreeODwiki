import shutil
import os
import re
import subprocess
from pathlib import Path
import sys
import stat

# 替换成你真实的路径
source_dir = r"D:\Projects\FreeODwiki"          # 源目录
dest_dir   = r"D:\servers\freeodwiki"          # 目标目录
dest_src_dir = dest_dir + r"\src"

mkdocs_yml = r"""
site_name: FreeODwiki——可自由编辑的开源OD百科 
site_url: https://freeodwiki.org
site_description: FreeODwiki是一个开源项目，旨在让每一位ODer都能有效地为所有ODer们提供有关od和精神活性物质的信息，并减少上述事物造成的伤害。  # 站点描述
docs_dir: D:\servers\freeodwiki\src  # 你的 Markdown 文件夹路径（相对路径或绝对路径）
site_dir: D:\servers\freeodwiki\site
nav:  # 可选：自定义导航菜单，根据你的文件结构调整
  - 主页 : home.md
  - 💊药物索引 : 药物/home.md
  - 🧠药效索引 : 药效/home.md
  - ✏️报告索引 : 报告/home.md
  - 📚文档索引 : 文档/home.md
theme: 
  name: material  
use_directory_urls: false
markdown_extensions:
  - admonition
  - pymdownx.details
  - pymdownx.superfences
"""

with open(dest_dir + "\mkdocs.yml", mode="w", encoding="utf-8") as f:
    f.write(mkdocs_yml)

def remove_readonly(func, path, exc_info):
    """当遇到权限问题时，去掉只读属性再重试"""
    # 只处理真正的权限拒绝错误 (WinError 5)
    if isinstance(exc_info[1], PermissionError) and exc_info[1].winerror == 5:
        try:
            # 去掉只读属性（给写权限）
            os.chmod(path, stat.S_IWRITE)
            # 再尝试一次删除
            func(path)
            return
        except Exception:
            pass
    # 如果不是权限问题，或者改权限也失败，就抛出原错误
    raise exc_info[1]



if os.path.exists(dest_src_dir):
    shutil.rmtree(dest_src_dir, onerror=remove_readonly)
    print("已清空目标目录")



# 步骤2：重新创建空的目录
os.makedirs(dest_src_dir)

# 步骤3：把源目录完整复制过去
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
    # 去除 #anchor 和 ?query
    clean_path = link_path.split('#')[0].split('?')[0].strip()
    if is_external(clean_path):
        return None

    if clean_path.startswith('/'):
        # 根相对链接：从 docs_root 开始
        target = (docs_root / clean_path.lstrip('/')).resolve()
    else:
        # 相对链接（包括 ./ ../）
        target = (current_file.parent / clean_path).resolve(strict=False)

    return target


def remove_dead_links_in_file(filepath: Path, docs_root: Path) -> tuple[bool, str]:
    """移除死链接：图片整段删除，文本链接保留文字"""
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        return False, f"读取失败: {e}"

    original = content

    # 1. 处理图片链接 ![alt](path)
    def replace_image(match):
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

    content = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', replace_image, content)

    # 2. 处理文本链接 [text](path)
    def replace_text(match):
        text = match.group(1)
        link = match.group(2)
        target = resolve_target_path(filepath, link, docs_root)
        if target is None:  # 外部链接，保留
            return match.group(0)
        if target.exists():
            return match.group(0)  # 存在，保留
        # 不存在 → 只保留文字，去除链接
        # print(f"    ✗ 移除死文本链接: {link} （保留文字: {text}）")
        return text

    content = re.sub(r'(?<!\!)\[([^\]]+)\]\(([^)]+)\)', replace_text, content)  # (?<!\!) 避免匹配图片

    if content == original:
        return True, "无死链接变更"

    try:
        filepath.write_text(content, encoding='utf-8')
        return True, "死链接已处理"
    except Exception as e:
        return False, f"写入失败: {e}"


def replace_md_to_html_in_file(filepath: Path) -> tuple[bool, str]:
    """只替换剩余（有效）链接中的 .md → .html"""
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        return False, f"读取失败: {e}"

    # 只替换链接中的 .md → .html（包括 #anchor）
    new_content = re.sub(
        r'\]\(([^)#\s]*?\.md)(#[^)]*)?\)',
        lambda m: f']({m.group(1)[:-3]}.html{m.group(2) or ""})',
        content
    )

    if new_content == content:
        return True, "无 .md 链接变更"

    try:
        filepath.write_text(new_content, encoding='utf-8')
        return True, "已替换 .md → .html"
    except Exception as e:
        return False, f"写入失败: {e}"


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
        rel_path = md_file.relative_to(dest_dir)
        print(f"处理文件: {rel_path}")

        # 步骤1：移除死链接（图片删除、文本保留文字）
        ok, msg = remove_dead_links_in_file(md_file, src_path)


        # 步骤2：替换剩余链接 .md → .html
        ok, msg = replace_md_to_html_in_file(md_file)

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


def start_server():
    site_path = Path(dest_dir) / "site"
    if not site_path.exists():
        print("错误：site/ 目录不存在（build 可能失败）")
        return

    print(f"\n启动本地服务器：http://localhost:8000")
    print("按 Ctrl+C 停止服务器")
    os.chdir(site_path)
    subprocess.run(["python", "-m", "http.server", "8000"], cwd=dest_dir + r"\site")


def main():
    os.chdir(dest_dir)
    print("=== MkDocs 死链接自动清理 + 构建 + 预览工具 ===\n")

    src_path = Path(dest_src_dir)
    if not process_src_folder(src_path):
        if input("\n预处理出现问题，是否继续 build？(y/N): ").lower() != 'y':
            sys.exit(1)

    if not build_mkdocs():
        if input("\nmkdocs build 失败，是否仍要启动服务器？(y/N): ").lower() != 'y':
            sys.exit(1)

    start_server()


if __name__ == "__main__":
    main()

# PermissionError: [WinError 5] 拒绝访问。: 'D:\\servers\\freeodwiki\\src\\.git\\objects\\00\\104df42d586da365c53f3888d55e89e3caaac7'
