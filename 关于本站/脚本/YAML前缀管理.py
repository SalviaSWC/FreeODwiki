import os
import tkinter as tk
from tkinter import ttk, filedialog, messagebox, simpledialog

# ===================== Front Matter & YAML 简单读写 =====================

def extract_front_matter(text):
    lines = text.splitlines(keepends=False)
    if len(lines) < 3:
        return {}, text, False
    if not lines[0].strip() == '---':
        return {}, text, False

    yaml_lines = []
    end_index = None
    for i in range(1, len(lines)):
        if lines[i].strip() == '---':
            end_index = i
            break
        yaml_lines.append(lines[i])

    if end_index is None:
        return {}, text, False

    front_dict = parse_simple_yaml('\n'.join(yaml_lines))
    body_lines = lines[end_index + 1:]
    body_text = '\n'.join(body_lines)
    return front_dict, body_text, True


def build_front_matter(front_dict):
    lines = ['---']
    for k, v in front_dict.items():
        if isinstance(v, bool):
            v_str = 'true' if v else 'false'
        else:
            v_str = str(v)
        lines.append(f"{k}: {v_str}")
    lines.append('---')
    return '\n'.join(lines) + '\n'


def parse_simple_yaml(yaml_text):
    result = {}
    for line in yaml_text.splitlines():
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        if ':' not in line:
            continue
        key, value = line.split(':', 1)
        key = key.strip()
        value = value.strip()

        if value.lower() in ('true', 'false'):
            value_parsed = (value.lower() == 'true')
        else:
            try:
                if '.' in value:
                    value_parsed = float(value)
                else:
                    value_parsed = int(value)
            except ValueError:
                if ((value.startswith('"') and value.endswith('"')) or
                        (value.startswith("'") and value.endswith("'"))):
                    value_parsed = value[1:-1]
                else:
                    value_parsed = value
        result[key] = value_parsed
    return result


def load_markdown_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()


def save_markdown_file(path, front_dict, body_text):
    """
    保存时统一处理：如果 front_dict 不为空，写入 frontmatter（末尾加空行）；
    如果为空，直接写 body_text（实现删除整个 frontmatter 的效果）。
    """
    if front_dict:
        front_block = build_front_matter(front_dict).rstrip('\n')
        full_text = front_block + '\n\n' + body_text.lstrip('\n')
    else:
        full_text = body_text
    with open(path, 'w', encoding='utf-8') as f:
        f.write(full_text)


# ===================== GUI 主应用 =====================

class FrontMatterEditorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Markdown YAML Front Matter 浏览与批量编辑")

        self.browse_dir = tk.StringVar()
        self.batch_dir = tk.StringVar()

        self.current_file_path = None
        self.current_front_dict = {}
        self.current_body_text = ""
        self.current_has_front_matter = False

        self._build_ui()

    def _build_ui(self):
        # ===== 顶部：目录选择区域 =====
        top_frame = tk.Frame(self.root)
        top_frame.pack(fill=tk.X, padx=5, pady=5)

        tk.Label(top_frame, text="浏览目录：").grid(row=0, column=0, sticky="w")
        tk.Entry(top_frame, textvariable=self.browse_dir, width=50)\
            .grid(row=0, column=1, sticky="we", padx=5)
        tk.Button(top_frame, text="选择...", command=self.choose_browse_dir)\
            .grid(row=0, column=2, padx=5)

        tk.Label(top_frame, text="批量编辑目录：")\
            .grid(row=1, column=0, sticky="w", pady=(5, 0))
        tk.Entry(top_frame, textvariable=self.batch_dir, width=50)\
            .grid(row=1, column=1, sticky="we", padx=5, pady=(5, 0))
        tk.Button(top_frame, text="选择...", command=self.choose_batch_dir)\
            .grid(row=1, column=2, padx=5, pady=(5, 0))

        top_frame.columnconfigure(1, weight=1)

        # ===== 中间：左右分栏 =====
        main_pane = tk.PanedWindow(self.root, orient=tk.HORIZONTAL)
        main_pane.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

        # 左侧：树状目录
        left_frame = tk.Frame(main_pane)
        self.tree = ttk.Treeview(left_frame, show="tree")
        ysb = ttk.Scrollbar(left_frame, orient='vertical', command=self.tree.yview)
        self.tree.configure(yscroll=ysb.set)

        self.tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        ysb.pack(side=tk.RIGHT, fill=tk.Y)

        self.tree.bind("<<TreeviewOpen>>", self.on_tree_open)
        self.tree.bind("<<TreeviewSelect>>", self.on_tree_select)

        main_pane.add(left_frame, minsize=200)

        # 右侧：YAML 文本编辑 + 按钮
        right_frame = tk.Frame(main_pane)
        main_pane.add(right_frame, minsize=300)

        self.label_current_file = tk.Label(right_frame, text="当前文件：无", anchor="w")
        self.label_current_file.pack(fill=tk.X, padx=5, pady=5)

        tk.Label(
            right_frame,
            text="Front Matter YAML（例如：title, description, keywords 等）\n"
                 "只支持简单 key: value，每行一对。"
        ).pack(anchor="w", padx=5)

        text_frame = tk.Frame(right_frame)
        text_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

        self.text_yaml = tk.Text(text_frame, wrap="none", height=20)
        y_scroll = ttk.Scrollbar(text_frame, orient='vertical', command=self.text_yaml.yview)
        x_scroll = ttk.Scrollbar(text_frame, orient='horizontal', command=self.text_yaml.xview)
        self.text_yaml.configure(yscrollcommand=y_scroll.set, xscrollcommand=x_scroll.set)

        self.text_yaml.grid(row=0, column=0, sticky="nsew")
        y_scroll.grid(row=0, column=1, sticky="ns")
        x_scroll.grid(row=1, column=0, sticky="we")

        text_frame.rowconfigure(0, weight=1)
        text_frame.columnconfigure(0, weight=1)

        # 按钮行
        btn_frame = tk.Frame(right_frame)
        btn_frame.pack(fill=tk.X, padx=5, pady=5)

        tk.Button(
            btn_frame,
            text="保存当前文件 Front Matter",
            command=self.save_current_front_matter
        ).pack(side=tk.LEFT, padx=5)

        tk.Button(
            btn_frame,
            text="批量应用右侧完整 Front Matter",
            command=self.batch_apply_front_matter
        ).pack(side=tk.LEFT, padx=5)

        tk.Button(
            btn_frame,
            text="批量设置单个字段（添加/更新/删除）",
            command=self.batch_set_single_field
        ).pack(side=tk.LEFT, padx=5)

    # ===== 目录选择 =====
    def choose_browse_dir(self):
        path = filedialog.askdirectory()
        if path:
            self.browse_dir.set(path)
            self._build_tree(path)

    def choose_batch_dir(self):
        path = filedialog.askdirectory()
        if path:
            self.batch_dir.set(path)

    # ===== 树状目录相关 =====
    def _build_tree(self, root_path):
        for item in self.tree.get_children():
            self.tree.delete(item)

        root_node = self.tree.insert("", "end", text=root_path, open=False, values=(root_path,))
        self._insert_subitems(root_node, root_path)

    def _insert_subitems(self, parent, path):
        try:
            entries = os.listdir(path)
        except (PermissionError, FileNotFoundError):
            return

        entries.sort()
        for name in entries:
            fullpath = os.path.join(path, name)
            node = self.tree.insert(parent, "end", text=name, values=(fullpath,))
            if os.path.isdir(fullpath):
                self.tree.insert(node, "end", text="...", values=("__dummy__",))

    def on_tree_open(self, event):
        node = self.tree.focus()
        if not node:
            return
        path = self.tree.item(node, "values")[0]
        if not os.path.isdir(path):
            return
        children = self.tree.get_children(node)
        if len(children) == 1 and self.tree.item(children[0], "values")[0] == "__dummy__":
            self.tree.delete(children[0])
            self._insert_subitems(node, path)

    def on_tree_select(self, event):
        node = self.tree.focus()
        if not node:
            return

        path = self.tree.item(node, "values")[0]
        if not os.path.isfile(path) or not path.lower().endswith(".md"):
            self.current_file_path = None
            self.label_current_file.config(text=f"当前文件：{path}（非 .md 或目录）")
            self.text_yaml.delete("1.0", tk.END)
            return

        self.load_file(path)

    # ===== 文件读取 / 保存 =====
    def load_file(self, path):
        try:
            text = load_markdown_file(path)
        except Exception as e:
            messagebox.showerror("读取失败", f"无法读取文件：\n{path}\n\n错误：{e}")
            return

        front_dict, body_text, has_fm = extract_front_matter(text)

        self.current_file_path = path
        self.current_front_dict = front_dict
        self.current_body_text = body_text
        self.current_has_front_matter = has_fm

        self.label_current_file.config(text=f"当前文件：{path}")

        # 显示 YAML
        self.text_yaml.delete("1.0", tk.END)
        lines = []
        for k, v in front_dict.items():
            if isinstance(v, bool):
                v_str = "true" if v else "false"
            else:
                v_str = str(v)
            lines.append(f"{k}: {v_str}")
        if lines:
            self.text_yaml.insert("1.0", "\n".join(lines))

    def save_current_front_matter(self):
        if not self.current_file_path:
            messagebox.showinfo("提示", "当前未选中任何 .md 文件。")
            return

        yaml_text = self.text_yaml.get("1.0", tk.END)
        new_front = parse_simple_yaml(yaml_text)

        try:
            save_markdown_file(self.current_file_path, new_front, self.current_body_text)
        except Exception as e:
            messagebox.showerror("写入失败", f"无法写入文件：\n{self.current_file_path}\n\n错误：{e}")
            return

        self.current_front_dict = new_front
        self.current_has_front_matter = bool(new_front)
        messagebox.showinfo("成功", "当前文件 Front Matter 已保存。")

    # ===== 批量应用右侧完整 Front Matter（原有功能，合并覆盖） =====
    def batch_apply_front_matter(self):
        batch_root = self.batch_dir.get().strip()
        if not batch_root:
            messagebox.showinfo("提示", "请先选择批量编辑目录。")
            return

        yaml_text = self.text_yaml.get("1.0", tk.END)
        batch_front = parse_simple_yaml(yaml_text)

        if not batch_front:
            if not messagebox.askyesno(
                "确认",
                "右侧 Front Matter 区域为空。\n"
                "继续执行不会删除原有字段，只是不更新任何内容。\n\n确认继续？"
            ):
                return

        count = 0
        errors = []

        for root_dir, _, files in os.walk(batch_root):
            for name in files:
                if not name.lower().endswith(".md"):
                    continue
                fpath = os.path.join(root_dir, name)
                try:
                    text = load_markdown_file(fpath)
                    old_front, body, _ = extract_front_matter(text)

                    new_front = dict(old_front)
                    new_front.update(batch_front)

                    save_markdown_file(fpath, new_front, body)
                    count += 1
                except Exception as e:
                    errors.append(f"{fpath}: {e}")

        msg = f"批量处理完成，共处理 {count} 个 .md 文件。"
        if errors:
            msg += f"\n其中 {len(errors)} 个文件出错。"
        messagebox.showinfo("批量编辑完成", msg)

        if errors:
            detail = "\n".join(errors[:30])
            messagebox.showwarning("部分文件出错（前 30 条）", detail)

    # ===== 新增：批量设置单个字段（添加/更新/删除） =====
    def batch_set_single_field(self):
        batch_root = self.batch_dir.get().strip()
        if not batch_root:
            messagebox.showinfo("提示", "请先选择批量编辑目录。")
            return

        dialog = tk.Toplevel(self.root)
        dialog.title("批量设置单个字段")
        dialog.transient(self.root)
        dialog.grab_set()
        dialog.geometry("600x400")

        tk.Label(dialog, text="字段名（key，例如 description、keywords）：").pack(anchor="w", padx=20, pady=(20,5))
        entry_key = tk.Entry(dialog, width=70)
        entry_key.pack(padx=20, fill="x")

        tk.Label(dialog, text="新值（value，留空表示删除该字段）：").pack(anchor="w", padx=20, pady=(15,5))
        text_value = tk.Text(dialog, height=12)
        text_value.pack(padx=20, fill="both", expand=True)

        def on_ok():
            key = entry_key.get().strip()
            if not key:
                messagebox.showerror("错误", "字段名不能为空！")
                return
            value = text_value.get("1.0", tk.END).strip()

            dialog.destroy()
            self._perform_batch_single(key, value)

        def on_cancel():
            dialog.destroy()

        btn_frame = tk.Frame(dialog)
        btn_frame.pack(pady=20)
        tk.Button(btn_frame, text="确定", width=12, command=on_ok).pack(side=tk.LEFT, padx=20)
        tk.Button(btn_frame, text="取消", width=12, command=on_cancel).pack(side=tk.LEFT, padx=20)

    def _perform_batch_single(self, key, value):
        batch_root = self.batch_dir.get().strip()
        delete_mode = (value == "")

        if delete_mode:
            if not messagebox.askyesno("确认删除", f"将从所有文件中删除字段 '{key}'（如果存在）。\n确认继续？"):
                return

        count_processed = 0
        count_updated = 0
        count_deleted = 0
        errors = []

        for root_dir, _, files in os.walk(batch_root):
            for name in files:
                if not name.lower().endswith(".md"):
                    continue
                fpath = os.path.join(root_dir, name)
                try:
                    text = load_markdown_file(fpath)
                    old_front, body, has_fm = extract_front_matter(text)

                    new_front = dict(old_front)
                    changed = False

                    if delete_mode:
                        if key in new_front:
                            del new_front[key]
                            changed = True
                            count_deleted += 1
                    else:
                        old_val = new_front.get(key)
                        if old_val != value:
                            new_front[key] = value
                            changed = True
                            count_updated += 1

                    # 只有真正发生变化或 frontmatter 存在状态改变时才写入
                    if changed or (bool(new_front) != has_fm):
                        save_markdown_file(fpath, new_front, body)

                    count_processed += 1
                except Exception as e:
                    errors.append(f"{fpath}: {e}")

        msg = f"批量单个字段处理完成，共处理 {count_processed} 个 .md 文件。\n"
        if not delete_mode:
            msg += f"其中 {count_updated} 个文件被更新/添加字段 '{key}'。"
        else:
            msg += f"其中 {count_deleted} 个文件删除了字段 '{key}'。"
        if errors:
            msg += f"\n其中 {len(errors)} 个文件出错。"
        messagebox.showinfo("完成", msg)

        if errors:
            detail = "\n".join(errors[:30])
            messagebox.showwarning("部分文件出错（前 30 条）", detail)


def main():
    root = tk.Tk()
    app = FrontMatterEditorApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()