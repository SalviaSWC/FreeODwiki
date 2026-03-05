import tkinter as tk
from tkinter import filedialog, scrolledtext, messagebox
from pathlib import Path
from typing import Set, List

def generate_bracket_tree(
    startpath: str = ".",
    ignore_dirs: Set[str] = None,
    ignore_keywords: list[str] = None,
    indent: str = "",
    show_slash_for_dirs: bool = True
) -> str:
    """
    生成递归括号式文件树（节省 token，结构清晰）
    
    示例输出:
    project/
    (
      README.md
      src/
      (
        App.tsx
        components/
        (
          Button.tsx
        )
      )
    )
    """
    if ignore_dirs is None:
        ignore_dirs = {".git", "__pycache__", ".venv", "venv", "node_modules", ".idea", ".DS_Store"}
    if ignore_keywords is None:
        ignore_keywords = []

    ignore_keywords = [kw.lower() for kw in ignore_keywords]

    def is_ignored(name: str) -> bool:
        return name in ignore_dirs or any(kw in name.lower() for kw in ignore_keywords)

    path = Path(startpath).resolve()
    root_name = path.name if path.name else str(path)
    root_prefix = f"{root_name}/" if show_slash_for_dirs else root_name

    def build_tree(current: Path, level: int = 0) -> List[str]:
        lines = []
        try:
            items = [p for p in current.iterdir() if not is_ignored(p.name)]
        except PermissionError:
            return ["(权限不足，无法读取)"]

        items.sort(key=lambda p: (p.is_file(), p.name.lower()))

        if not items:
            return []

        # 开括号（除了根以外）
        if level > 0:
            lines.append("(")

        for item in items:
            name = item.name
            if item.is_dir():
                if show_slash_for_dirs:
                    name += "/"
                sub_lines = build_tree(item, level + 1)
                if sub_lines:
                    lines.append(indent * level + name)
                    lines.extend(sub_lines)
            else:
                lines.append(indent * level + name)

        # 闭括号（除了根以外）
        if level > 0:
            lines.append(indent * (level - 1) + ")")

        return lines

    tree_lines = [root_prefix]
    sub = build_tree(path, 1)
    if sub:
        tree_lines.extend(sub)
    else:
        tree_lines.append(indent + "(空目录或全部忽略)")

    return " ".join(tree_lines)


class DirectoryTreeApp:
    def __init__(self, root):
        self.root = root
        self.root.title("括号式文件树生成器 (递归结构 · 节省 tokens)")
        self.root.geometry("800x600")
        self.root.resizable(True, True)

        input_frame = tk.Frame(root)
        input_frame.pack(pady=10, padx=10, fill=tk.X)

        tk.Label(input_frame, text="起始目录:").grid(row=0, column=0, sticky=tk.W, pady=5)
        self.path_var = tk.StringVar(value=".")
        tk.Entry(input_frame, textvariable=self.path_var, width=60).grid(row=0, column=1, padx=5)
        tk.Button(input_frame, text="浏览...", command=self.browse_directory).grid(row=0, column=2)

        tk.Label(input_frame, text="忽略关键词（多个用 & 分隔，包含即忽略，忽略大小写）:").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.keyword_var = tk.StringVar()
        self.keyword_var.set("个人文件夹&报告&补档&脚本&药物应对措施&精神药理学&社会学&文件&.github&PiHKAL&TiHKAL&右美沙芬FAQ")
        tk.Entry(input_frame, textvariable=self.keyword_var, width=60).grid(row=1, column=1, padx=5, columnspan=2, sticky=tk.W+tk.E)

        tk.Button(input_frame, text="生成括号式文件树", command=self.generate_tree, bg="#4CAF50", fg="white", font=("Arial", 10, "bold")).grid(row=2, column=0, columnspan=3, pady=10)

        output_frame = tk.Frame(root)
        output_frame.pack(padx=10, pady=5, fill=tk.BOTH, expand=True)

        self.text_widget = scrolledtext.ScrolledText(output_frame, font=("Consolas", 10))
        self.text_widget.pack(fill=tk.BOTH, expand=True)

        tk.Label(output_frame, text="输出格式：递归括号结构，适合大目录、token敏感场景", fg="gray").pack(pady=5)

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
            messagebox.showerror("错误", "路径不存在或不是目录")
            return

        ignore_keywords = [k.strip() for k in keywords_input.split('&') if k.strip()]

        try:
            tree = generate_bracket_tree(startpath, ignore_keywords=ignore_keywords)
            self.text_widget.delete(1.0, tk.END)
            self.text_widget.insert(tk.END, tree)
        except Exception as e:
            messagebox.showerror("错误", f"生成失败:\n{str(e)}")

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
            initialfile="bracket_tree.txt"
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