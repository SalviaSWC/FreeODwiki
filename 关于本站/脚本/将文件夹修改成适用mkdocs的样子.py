import tkinter as tk
from tkinter import filedialog, messagebox, ttk
import os
import re
from pathlib import Path


def process_markdown_file(filepath: Path, prefix: str) -> tuple[bool, str]:
    """
    处理单个 .md 文件：
    1. 替换 ](/* → ](/{prefix}/
    2. 替换链接中的 .md → .html
    """
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        return False, f"读取失败: {e}"

    # 第一步：把 ](/* 替换成 ](/{prefix}/
    # 匹配 ]( 开头，后面跟着 / 的情况（不包括 http/https 开头的外部链接）
    if prefix:
        content = re.sub(
            r'\]\(\s*/([^)]*?)\)',
            lambda m: f'](/{prefix}/{m.group(1)})',
            content
        )

    # 第二步：把链接中的 .md 替换成 .html
    # 匹配 ](...xxx.md) 或 ](...xxx.md#anchor) 这样的模式
    content = re.sub(
        r'\]\(([^)]*?\.md)(#[^)]*)?\)',
        lambda m: f']({m.group(1).replace(".md", ".html")}{m.group(2) or ""})',
        content
    )

    try:
        filepath.write_text(content, encoding='utf-8')
        return True, ""
    except Exception as e:
        return False, f"写入失败: {e}"


def rename_md_to_html(filepath: Path) -> tuple[bool, str]:
    """把 .md 文件改名为 .html"""
    if not filepath.suffix.lower() == '.md':
        return False, "不是 .md 文件"

    new_path = filepath.with_suffix('.html')

    if new_path.exists():
        return False, f"目标文件已存在: {new_path.name}"

    try:
        filepath.rename(new_path)
        return True, ""
    except Exception as e:
        return False, f"重命名失败: {e}"


def start_processing():
    folder = folder_var.get().strip()
    prefix = prefix_var.get().strip()

    if not folder or not os.path.isdir(folder):
        messagebox.showerror("错误", "请先选择一个有效的文件夹")
        return

    if not prefix:
        messagebox.showwarning("提示", "前缀为空，将只做 .md → .html 的替换")
        # 你也可以直接 return，这里允许空前缀继续执行

    status_text.delete(1.0, tk.END)
    status_text.insert(tk.END, f"开始处理文件夹：{folder}\n")
    status_text.insert(tk.END, f"链接前缀：/{prefix}/\n\n")

    processed = 0
    renamed = 0
    errors = 0

    # 递归遍历所有 .md 文件
    root_path = Path(folder)
    for md_file in root_path.rglob("*.md"):
        rel_path = md_file.relative_to(root_path)
        status_text.insert(tk.END, f"处理: {rel_path}\n")

        # 1. 修改内容
        ok, msg = process_markdown_file(md_file, prefix)
        if ok:
            status_text.insert(tk.END, "  ✓ 内容修改成功\n")
        else:
            status_text.insert(tk.END, f"  ✗ {msg}\n")
            errors += 1
            continue

        # 2. 重命名文件
        # ok, msg = rename_md_to_html(md_file)
        # if ok:
        #     status_text.insert(tk.END, f"  → 重命名为 {md_file.with_suffix('.html').name}\n")
        #     renamed += 1
        # else:
        #     status_text.insert(tk.END, f"  ✗ 重命名失败：{msg}\n")
        #     errors += 1

        processed += 1
        status_text.see(tk.END)
        root.update()

    status_text.insert(tk.END, "\n" + "="*60 + "\n")
    status_text.insert(tk.END, f"处理完成！\n")
    status_text.insert(tk.END, f"共处理文件: {processed} 个\n")
    status_text.insert(tk.END, f"成功重命名: {renamed} 个\n")
    status_text.insert(tk.END, f"发生错误: {errors} 个\n")


def choose_folder():
    path = filedialog.askdirectory(title="请选择包含 .md 文件的文件夹")
    if path:
        folder_var.set(path)


# ── 主程序 ────────────────────────────────────────────────

root = tk.Tk()
root.title("Markdown 链接批量修正 & 改后缀工具")
root.geometry("780x580")
root.resizable(True, True)

# 变量
folder_var = tk.StringVar()
prefix_var = tk.StringVar(value="docs")  # 默认前缀，可修改

# ── UI 布局 ──

tk.Label(root, text="目标文件夹：", font=("Microsoft YaHei", 11)).pack(pady=(15, 5), anchor="w", padx=15)

frame1 = tk.Frame(root)
frame1.pack(fill="x", padx=15)
tk.Entry(frame1, textvariable=folder_var, width=60, font=("Consolas", 10)).pack(side="left", expand=True, fill="x")
tk.Button(frame1, text="浏览...", command=choose_folder, width=10).pack(side="right", padx=(10, 0))

tk.Label(root, text="链接前缀（会插入到 / 后面，例如填 docs 则变成 /docs/... )：", font=("Microsoft YaHei", 11)).pack(pady=(15, 5), anchor="w", padx=15)
tk.Entry(root, textvariable=prefix_var, width=50, font=("Consolas", 11)).pack(padx=15, fill="x")

tk.Label(root, text="执行后会：", fg="#555", font=("Microsoft YaHei", 10)).pack(anchor="w", padx=15, pady=(12, 4))
tk.Label(root, text="  •  把 ](/* 替换为 ](/{前缀}/*", fg="#006600", anchor="w", padx=30).pack(anchor="w")
tk.Label(root, text="  •  把链接中的 .md 替换为 .html", fg="#006600", anchor="w", padx=30).pack(anchor="w")
tk.Label(root, text="严禁在main中使用！", fg="#006600", anchor="w", padx=30).pack(anchor="w")
# tk.Label(root, text="  •  把所有 .md 文件改名为 .html", fg="#006600", anchor="w", padx=30).pack(anchor="w")

btn = tk.Button(root, text="开始处理", font=("Microsoft YaHei", 12, "bold"),
                bg="#4CAF50", fg="white", padx=20, pady=10,
                command=start_processing)
btn.pack(pady=20)

status_text = tk.Text(root, height=18, font=("Consolas", 10), bg="#fdfdfd")
status_text.pack(padx=15, pady=(0, 15), fill="both", expand=True)

scrollbar = ttk.Scrollbar(root, orient="vertical", command=status_text.yview)
scrollbar.pack(side="right", fill="y", pady=(0, 15), padx=(0, 15))
status_text.configure(yscrollcommand=scrollbar.set)

root.mainloop()