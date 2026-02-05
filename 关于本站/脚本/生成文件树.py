import tkinter as tk
from tkinter import filedialog, scrolledtext, messagebox
from pathlib import Path
from typing import Set

def generate_file_path_list(
    startpath: str = ".",
    ignore_dirs: Set[str] = None,
    ignore_keywords: list[str] = None
) -> str:
    """
    生成每行一个文件全路径的列表（仅文件，不包括目录本身）。
    路径相对于起始目录的根目录名开头，例如：my-project/README.md
    这比树状结构更紧凑，大幅节省 tokens，适合直接复制给 LLM。
    
    Args:
        startpath: 起始目录路径
        ignore_dirs: 精确匹配忽略的目录/文件名
        ignore_keywords: 包含任一关键词的路径项将被完全忽略（不进入子目录）
    
    Returns:
        多行字符串，每行一个文件的全路径
    """
    if ignore_dirs is None:
        ignore_dirs = {".git", "__pycache__", ".venv", "venv", "node_modules", ".idea", ".DS_Store"}
    if ignore_keywords is None:
        ignore_keywords = []

    ignore_keywords = [kw.lower() for kw in ignore_keywords]

    def is_ignored(name: str) -> bool:
        if name in ignore_dirs:
            return True
        if any(kw in name.lower() for kw in ignore_keywords):
            return True
        return False

    path = Path(startpath).resolve()
    
    file_paths = []
    
    # 根前缀：项目名/
    root_prefix = f"{path.name}/" if path.name else f"{path}/"
    
    def collect(current_path: Path, prefix: str):
        try:
            contents = [p for p in current_path.iterdir() if not is_ignored(p.name)]
        except PermissionError:
            return  # 跳过无权限目录
        
        # 目录在前排序（虽然目录不显示，但影响遍历顺序）
        contents.sort(key=lambda p: (p.is_file(), p.name.lower()))
        
        for item in contents:
            item_str = prefix + item.name
            if item.is_dir():
                collect(item, item_str + "/")
            else:
                file_paths.append(item_str.lstrip(startpath))
    
    collect(path, root_prefix)
    
    # 按路径字母顺序排序
    file_paths.sort(key=str.lower)
    
    if not file_paths:
        return "(无文件或所有文件已被忽略)"
    
    return "\n".join(file_paths)


class DirectoryTreeApp:
    def __init__(self, root):
        self.root = root
        self.root.title("文件路径列表生成器 (节省 tokens，适合 LLM)")
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
        tk.Label(input_frame, text="忽略关键词（多个用 & 分隔，包含即忽略，忽略大小写）:").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.keyword_var = tk.StringVar()
        tk.Entry(input_frame, textvariable=self.keyword_var, width=60).grid(row=1, column=1, padx=5, columnspan=2, sticky=tk.W+tk.E)

        # 生成按钮
        tk.Button(input_frame, text="生成文件路径列表", command=self.generate_tree, bg="#4CAF50", fg="white", font=("Arial", 10, "bold")).grid(row=2, column=0, columnspan=3, pady=10)

        # === 输出区域 ===
        output_frame = tk.Frame(root)
        output_frame.pack(padx=10, pady=5, fill=tk.BOTH, expand=True)

        self.text_widget = scrolledtext.ScrolledText(output_frame, font=("Consolas", 10))
        self.text_widget.pack(fill=tk.BOTH, expand=True)

        # 底部说明
        tk.Label(output_frame, text="输出格式：每行一个文件的全路径（仅文件，不显示空目录），适合直接复制给 LLM 使用", fg="gray").pack(pady=5)

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

        ignore_keywords = [k.strip() for k in keywords_input.split('&') if k.strip()]

        try:
            file_list = generate_file_path_list(startpath, ignore_keywords=ignore_keywords)
            self.text_widget.delete(1.0, tk.END)
            self.text_widget.insert(tk.END, file_list)
        except Exception as e:
            messagebox.showerror("错误", f"生成时出错:\n{str(e)}")

    def copy_to_clipboard(self):
        content = self.text_widget.get(1.0, tk.END).strip()
        if content:
            self.root.clipboard_clear()
            self.root.clipboard_append(content)
            self.root.update()
            messagebox.showinfo("成功", "已复制到剪贴板")

    def save_to_file(self):
        content = self.text_widget.get(1.0, tk.END).strip()
        if not content:
            messagebox.showwarning("警告", "没有内容可保存")
            return
        filepath = filedialog.asksaveasfilename(
            defaultextension=".txt",
            filetypes=[("Text files", "*.txt"), ("All files", "*.*")],
            initialfile="file_list.txt"
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