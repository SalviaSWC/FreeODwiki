import tkinter as tk
from tkinter import filedialog, scrolledtext, messagebox
from pathlib import Path
from typing import Set

def generate_directory_tree(
    startpath: str = ".",
    ignore_dirs: Set[str] = None,
    ignore_keywords: list[str] = None
) -> str:
    """
    生成 Markdown 友好的目录树字符串。
    
    Args:
        startpath: 起始目录路径
        ignore_dirs: 精确匹配需要忽略的目录/文件名集合（默认常见干扰项）
        ignore_keywords: 如果文件名或目录名包含这些子字符串中的任何一个（忽略大小写），则忽略该项
    
    Returns:
        多行字符串形式的目录树
    """
    if ignore_dirs is None:
        ignore_dirs = {".git", "__pycache__", ".venv", "venv", "node_modules", ".idea", ".DS_Store"}
    if ignore_keywords is None:
        ignore_keywords = []

    # 转换为小写
    ignore_keywords = [kw.lower() for kw in ignore_keywords]

    path = Path(startpath).resolve()
    
    def _generate(current_path: Path, prefix: str = "") -> list[str]:
        lines = []
        # 获取内容并过滤
        contents = [
            p for p in current_path.iterdir()
            if p.name not in ignore_dirs
            and not any(kw in p.name.lower() for kw in ignore_keywords)
        ]
        # 排序：目录在前，名称小写排序
        contents.sort(key=lambda p: (p.is_file(), p.name.lower()))
        
        for idx, item in enumerate(contents):
            is_last = idx == len(contents) - 1
            connector = "└── " if is_last else "├── "
            line = prefix + connector + item.name
            if item.is_dir():
                line += "/"
            lines.append(line)
            
            if item.is_dir():
                extension = "    " if is_last else "│   "
                lines.extend(_generate(item, prefix + extension))
        
        return lines
    
    # 根目录行
    root_name = path.name if path.name else str(path)
    root_line = f"{root_name}/"
    tree_lines = [root_line]
    sub_lines = _generate(path)
    if sub_lines:
        tree_lines.extend(sub_lines)
    else:
        tree_lines.append("(空目录或所有内容已忽略)")
    
    return "\n".join(tree_lines)


class DirectoryTreeApp:
    def __init__(self, root):
        self.root = root
        self.root.title("目录树生成器 (Markdown 友好格式)")
        self.root.geometry("800x600")
        self.root.resizable(True, True)

        # === 输入区域 ===
        input_frame = tk.Frame(root)
        input_frame.pack(pady=10, padx=10, fill=tk.X)

        # 起始路径
        tk.Label(input_frame, text="起始目录:").grid(row=0, column=0, sticky=tk.W, pady=5)
        self.path_var = tk.StringVar(value=".")
        tk.Entry(input_frame, textvariable=self.path_var, width=60).grid(row=0, column=1, padx=5)
        tk.Button(input_frame, text="浏览...", command=self.browse_directory).grid(row=0, column=2)

        # 忽略关键词（多个用 & 分隔）
        tk.Label(input_frame, text="忽略关键词（多个用 & 分隔，忽略大小写）:").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.keyword_var = tk.StringVar()
        tk.Entry(input_frame, textvariable=self.keyword_var, width=60).grid(row=1, column=1, padx=5, columnspan=2, sticky=tk.W+tk.E)

        # 生成按钮
        tk.Button(input_frame, text="生成目录树", command=self.generate_tree, bg="#4CAF50", fg="white", font=("Arial", 10, "bold")).grid(row=2, column=0, columnspan=3, pady=10)

        # === 输出区域 ===
        output_frame = tk.Frame(root)
        output_frame.pack(padx=10, pady=5, fill=tk.BOTH, expand=True)

        self.text_widget = scrolledtext.ScrolledText(output_frame, font=("Consolas", 10))
        self.text_widget.pack(fill=tk.BOTH, expand=True)

        # 底部按钮
        bottom_frame = tk.Frame(root)
        bottom_frame.pack(pady=5)
        tk.Button(bottom_frame, text="复制到剪贴板", command=self.copy_to_clipboard).pack(side=tk.LEFT, padx=5)
        tk.Button(bottom_frame, text="保存到文件", command=self.save_to_file).pack(side=tk.LEFT, padx=5)
        tk.Button(bottom_frame, text="清空", command=self.clear_output).pack(side=tk.LEFT, padx=5)

    def browse_directory(self):
        directory = filedialog.askdirectory(initialdir=self.path_var.get())
        if directory:
            self.path_var.set(directory)

    def generate_tree(self):
        startpath = self.path_var.get().strip()
        keywords_input = self.keyword_var.get().strip()

        if not startpath:
            messagebox.showwarning("警告", "请指定起始目录")
            return

        path = Path(startpath)
        if not path.exists() or not path.is_dir():
            messagebox.showerror("错误", "指定的路径不存在或不是目录")
            return

        # 解析多个关键词（用 & 分隔，trim空格，过滤空项）
        # 如果想换分隔符，如逗号，只需改 split('&') 为 split(',')
        ignore_keywords = [k.strip() for k in keywords_input.split('&') if k.strip()]

        try:
            tree = generate_directory_tree(startpath, ignore_keywords=ignore_keywords)
            self.text_widget.delete(1.0, tk.END)
            self.text_widget.insert(tk.END, tree)
        except Exception as e:
            messagebox.showerror("错误", f"生成目录树时出错:\n{str(e)}")

    def copy_to_clipboard(self):
        content = self.text_widget.get(1.0, tk.END).strip()
        if content:
            self.root.clipboard_clear()
            self.root.clipboard_append(content)
            self.root.update()  # 确保剪贴板更新
            messagebox.showinfo("成功", "已复制到剪贴板")

    def save_to_file(self):
        content = self.text_widget.get(1.0, tk.END).strip()
        if not content:
            messagebox.showwarning("警告", "没有内容可保存")
            return
        filepath = filedialog.asksaveasfilename(
            defaultextension=".txt",
            filetypes=[("Text files", "*.txt"), ("All files", "*.*")],
            initialfile="project_tree.txt"
        )
        if filepath:
            try:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(content)
                messagebox.showinfo("成功", f"已保存到:\n{filepath}")
            except Exception as e:
                messagebox.showerror("错误", f"保存失败:\n{str(e)}")

    def clear_output(self):
        self.text_widget.delete(1.0, tk.END)


if __name__ == "__main__":
    root = tk.Tk()
    app = DirectoryTreeApp(root)
    root.mainloop()