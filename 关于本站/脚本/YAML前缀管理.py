import os
import tkinter as tk
from tkinter import ttk, filedialog, messagebox, simpledialog

# ===================== Front Matter & YAML 简单读写 =====================

def extract_front_matter(text):
    """
    从 Markdown 文本中提取 Front Matter（简单版）。
    返回 (front_dict, body_text, has_front_matter)
    """
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
        # 没有结束分隔线，当作没有 front matter
        return {}, text, False

    front_dict = parse_simple_yaml('\n'.join(yaml_lines))
    body_lines = lines[end_index + 1:]
    body_text = '\n'.join(body_lines)
    return front_dict, body_text, True


def build_front_matter(front_dict):
    """
    根据字典生成 YAML Front Matter 字符串（带 --- 包裹）。
    """
    lines = ['---']
    for k, v in front_dict.items():
        # 简单处理：如果值中包含冒号或换行，此示例不做复杂转义
        # 只处理最简单的字符串/数字/bool
        if isinstance(v, bool):
            v_str = 'true' if v else 'false'
        else:
            v_str = str(v)
        lines.append(f"{k}: {v_str}")
    lines.append('---')
    return '\n'.join(lines) + '\n'


def parse_simple_yaml(yaml_text):
    """
    非严格 YAML 解析，只支持简单的 key: value 行。
    - 忽略空行和以 # 开头的注释行
    - 不支持缩进、列表、复杂结构
    """
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

        # 简单类型推断
        if value.lower() in ('true', 'false'):
            value_parsed = (value.lower() == 'true')
        else:
            # 尝试转为数字
            try:
                if '.' in value:
                    value_parsed = float(value)
                else:
                    value_parsed = int(value)
            except ValueError:
                # 去掉可能的引号
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


def save_markdown_file(path, front_dict, body_text, has_front_matter):
    """
    将 front_dict 写回到文件。如果原本没有 Front Matter，则在开头插入。
    """
    front_block = build_front_matter(front_dict)
    if has_front_matter:
        # 已有 front matter，前面的部分被 extract_front_matter 去掉了
        full_text = front_block + body_text.lstrip('\n')
    else:
        # 原文件没有 front matter，插入到最前面
        full_text = front_block + body_text
    with open(path, 'w', encoding='utf-8') as f:
        f.write(full_text)


# ===================== GUI 主应用 =====================

class FrontMatterEditorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Markdown YAML Front Matter 浏览与批量编辑")

        # 当前浏览目录 & 批量编辑目录
        self.browse_dir = tk.StringVar()
        self.batch_dir = tk.StringVar()

        # 当前选中的文件及内容
        self.current_file_path = None
        self.current_front_dict = {}
        self.current_body_text = ""
        self.current_has_front_matter = False

        self._build_ui()

    def _build_ui(self):
        # ===== 顶部：目录选择区域 =====
        top_frame = tk.Frame(self.root)
        top_frame.pack(fill=tk.X, padx=5, pady=5)

        # 浏览目录
        tk.Label(top_frame, text="浏览目录：").grid(row=0, column=0, sticky="w")
        tk.Entry(top_frame, textvariable=self.browse_dir, width=50)\
            .grid(row=0, column=1, sticky="we", padx=5)
        tk.Button(top_frame, text="选择...", command=self.choose_browse_dir)\
            .grid(row=0, column=2, padx=5)

        # 批量编辑目录
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

        # 当前文件标签
        self.label_current_file = tk.Label(right_frame, text="当前文件：无", anchor="w")
        self.label_current_file.pack(fill=tk.X, padx=5, pady=5)

        # 简单说明
        tk.Label(
            right_frame,
            text="Front Matter YAML（例如：meta-description, title 等）\n"
                 "只支持简单 key: value，每行一对。"
        ).pack(anchor="w", padx=5)

        # 文本区
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
            text="批量应用到‘批量编辑目录’内所有 .md",
            command=self.batch_apply_front_matter
        ).pack(side=tk.LEFT, padx=5)

    # ===== 顶部目录选择 =====

    def choose_browse_dir(self):
        path = filedialog.askdirectory()
        if not path:
            return
        self.browse_dir.set(path)
        self._build_tree(path)

    def choose_batch_dir(self):
        path = filedialog.askdirectory()
        if not path:
            return
        self.batch_dir.set(path)

    # ===== 树状目录相关 =====

    def _build_tree(self, root_path):
        # 清空旧内容
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
                # 加一个“假”子节点用于懒加载
                self.tree.insert(node, "end", text="...", values=("__dummy__",))

    def on_tree_open(self, event):
        node = self.tree.focus()
        if not node:
            return
        # 懒加载目录的真实内容
        path = self.tree.item(node, "values")[0]
        if not os.path.isdir(path):
            return
        children = self.tree.get_children(node)
        if len(children) == 1:
            first_child = children[0]
            if self.tree.item(first_child, "values")[0] == "__dummy__":
                self.tree.delete(first_child)
                self._insert_subitems(node, path)

    def on_tree_select(self, event):
        node = self.tree.focus()
        if not node:
            return

        path = self.tree.item(node, "values")[0]
        if not os.path.isfile(path) or not path.lower().endswith(".md"):
            self.current_file_path = None
            self.current_front_dict = {}
            self.current_body_text = ""
            self.current_has_front_matter = False
            self.label_current_file.config(text=f"当前文件：{path}（非 .md 或非文件）")
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

        # 显示 YAML 文本（简单 key: value）
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
            save_markdown_file(
                self.current_file_path,
                new_front,
                self.current_body_text,
                self.current_has_front_matter
            )
        except Exception as e:
            messagebox.showerror("写入失败", f"无法写入文件：\n{self.current_file_path}\n\n错误：{e}")
            return

        self.current_front_dict = new_front
        self.current_has_front_matter = True
        messagebox.showinfo("成功", "当前文件 Front Matter 已保存。")

    # ===== 批量编辑 =====

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
                "继续执行不会删除原有 Front Matter，只是不做任何字段更新。\n\n确认继续？"
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
                    old_front, body, has_fm = extract_front_matter(text)

                    # 合并：同名键被覆盖，其他键保留
                    new_front = dict(old_front)
                    new_front.update(batch_front)

                    save_markdown_file(fpath, new_front, body, has_fm or bool(new_front))
                    count += 1
                except Exception as e:
                    errors.append(f"{fpath}: {e}")

        msg = f"批量处理完成，共处理 {count} 个 .md 文件。"
        if errors:
            msg += f"\n其中 {len(errors)} 个文件出错。"
        messagebox.showinfo("批量编辑完成", msg)

        if errors:
            # 可选：输出错误详情
            detail = "\n".join(errors[:30])
            messagebox.showwarning("部分文件出错（前 30 条）", detail)


def main():
    root = tk.Tk()
    app = FrontMatterEditorApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()