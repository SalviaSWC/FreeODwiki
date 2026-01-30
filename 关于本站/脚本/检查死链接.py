import os
import re
import tkinter as tk
from tkinter import filedialog, ttk, messagebox
from threading import Thread
from collections import defaultdict

# 默认白名单（去掉开头的 / 用于匹配）
DEFAULT_WHITELIST = [
    "个人文件夹/", "报告/", "补档/", "脚本/",
    "药物应对措施/", "精神药理学/", "社会学/"
]

def is_ignored(path, rule):
    if rule.endswith('/'):
        return path.startswith(rule)
    return path == rule

def parse_markdown_link(line):
    pattern = r'(?<!\!)\[([^\]]*)\]\(\s*([^)\s"]+)(?:\s+["\']([^"\']*)["\'])?\s*\)'
    return [(m.group(1).strip(), m.group(2).strip(), m.group(3).strip() if m.group(3) else None)
            for m in re.finditer(pattern, line)]

def get_target_path(current_dir, root_dir, url):
    url = url.split('#')[0].rstrip('/').strip()
    if not url:
        return None
    if re.match(r'^(http|https|mailto|ftp|//|#)', url, re.IGNORECASE):
        return None
    
    if url.startswith('/'):
        target = os.path.normpath(os.path.join(root_dir, url.lstrip('/')))
    else:
        target = os.path.normpath(os.path.join(current_dir, url))
    return target

def scan_directory(root_dir, ignore_list, whitelist_list, treat_empty_as_dead, tree1, tree2, status_label):
    file_to_errors = defaultdict(list)          # rel_file → [(line_num, full_link, url, target_abs, is_empty)]
    target_to_referrers = defaultdict(list)     # target_abs → [(rel_file, line_num, url)]
    empty_file_count = 0

    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if not filename.lower().endswith('.md'):
                continue
            file_path = os.path.join(dirpath, filename)
            rel_file = os.path.relpath(file_path, root_dir).replace('\\', '/')
            
            if any(is_ignored(rel_file, ig) for ig in ignore_list):
                continue
            
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
            except Exception:
                continue
            
            for line_num, line in enumerate(lines, 1):
                for text, url, _ in parse_markdown_link(line):
                    target_path = get_target_path(os.path.dirname(file_path), root_dir, url)
                    if target_path is None:
                        continue
                    
                    target_rel = os.path.relpath(target_path, root_dir).replace('\\', '/')
                    
                    whitelisted = any(is_ignored(target_rel, wl) for wl in whitelist_list)
                    if whitelisted:
                        continue
                    
                    exists = os.path.isfile(target_path)
                    is_empty = False
                    if exists:
                        try:
                            is_empty = (os.path.getsize(target_path) == 0)
                        except:
                            pass
                    
                    if not exists or (treat_empty_as_dead and is_empty):
                        full_link = f'[{text}]({url})'
                        file_to_errors[rel_file].append((line_num, full_link, url, target_path, is_empty))
                        target_to_referrers[target_path].append((rel_file, line_num, url))
                        if is_empty:
                            empty_file_count += 1

    total_errors = sum(len(v) for v in file_to_errors.values())
    
    tree1.master.after(0, update_gui, tree1, tree2, file_to_errors, target_to_referrers,
                       root_dir, total_errors, empty_file_count, status_label)

def build_tree_dict(file_to_errors):
    root = {'count': 0, 'children': defaultdict(dict), 'is_dir': True}
    for rel_file, errors in file_to_errors.items():
        parts = rel_file.split('/')
        current = root
        current['count'] += len(errors)
        for part in parts[:-1]:
            if part not in current['children']:
                current['children'][part] = {'count': 0, 'children': defaultdict(dict), 'is_dir': True}
            current = current['children'][part]
            current['count'] += len(errors)
        leaf = parts[-1]
        current['children'][leaf] = {'count': len(errors), 'children': {}, 'is_dir': False, 'errors': errors}
    return root

def update_gui(tree1, tree2, file_to_errors, target_to_referrers, root_dir, total_errors, empty_count, status_label):
    tree1.delete(*tree1.get_children())
    tree2.delete(*tree2.get_children())
    
    # Tab1：源文件树
    tree_dict = build_tree_dict(file_to_errors)
    
    def insert_recursive(parent_iid, node, prefix):
        for name in sorted(node['children'].keys()):
            child = node['children'][name]
            child_prefix = prefix + name
            if child['is_dir']:
                iid = child_prefix + '/'
                tree1.insert(parent_iid, 'end', iid=iid, text=name + '/',
                             values=(name + '/', child['count'], '', '', '', '', ''), tags=('dir',))
                insert_recursive(iid, child, child_prefix + '/')
            else:
                iid = child_prefix
                tree1.insert(parent_iid, 'end', iid=iid, text=name,
                             values=(name, child['count'], '', '', '', '', ''), tags=('file',))
                for line_num, full_link, _, target_path, is_empty in sorted(child['errors'], key=lambda x: x[0]):
                    rel_target = os.path.relpath(target_path, root_dir).replace('\\', '/')
                    tag = 'empty' if is_empty else ''
                    detail = f"{line_num}: {full_link}"
                    if is_empty:
                        detail += "  【空文件】"
                    tree1.insert(iid, 'end', values=('', '', detail, rel_target, target_path, '', ''), tags=('error', tag))
    
    if file_to_errors:
        root_iid = tree1.insert('', 'end', iid='root/', text='项目根目录/', open=True,
                                values=('项目根目录/', total_errors, '', '', '', '', ''), tags=('dir', 'bold'))
        insert_recursive(root_iid, tree_dict, '')
    else:
        tree1.insert('', 'end', text='无死链接', values=('', '', '', '', '', '', ''))
    
    # Tab2：目标统计（树状，按引用展开）
    for target_path, referrers in sorted(target_to_referrers.items(), key=lambda x: len(x[1]), reverse=True):
        rel_target = os.path.relpath(target_path, root_dir).replace('\\', '/')
        count = len(referrers)
        is_empty = os.path.isfile(target_path) and os.path.getsize(target_path) == 0
        
        parent_iid = tree2.insert('', 'end', text=rel_target,
                                  values=(rel_target, count, '是' if is_empty else '否', target_path, ''))
        
        for ref_file, ref_line, ref_url in sorted(referrers, key=lambda x: (x[0], x[1])):
            tree2.insert(parent_iid, 'end', values=('', '', f"{ref_file}:{ref_line}", '', ''))
    
    status_text = f"完成 | 死链接：{total_errors}"
    if empty_count > 0:
        status_text += f" | 其中指向空文件：{empty_count}"
    status_label.config(text=status_text)

def start_scan(dir_var, ignore_var, whitelist_var, empty_var, tree1, tree2, status_label):
    root_dir = dir_var.get().strip()
    if not root_dir or not os.path.isdir(root_dir):
        messagebox.showerror("错误", "请选择有效的根目录")
        return
    
    ignore_list = [s.strip().lstrip('/') for s in ignore_var.get().split(',') if s.strip()] or DEFAULT_WHITELIST
    whitelist_list = [s.strip().lstrip('/') for s in whitelist_var.get().split(',') if s.strip()] or DEFAULT_WHITELIST
    treat_empty = empty_var.get()
    
    status_label.config(text="扫描中... 大型项目可能需要几分钟")
    tree1.delete(*tree1.get_children())
    tree2.delete(*tree2.get_children())
    
    Thread(target=scan_directory, args=(root_dir, ignore_list, whitelist_list, treat_empty, tree1, tree2, status_label), daemon=True).start()

# ────────────────────────────────────────────────
# GUI
# ────────────────────────────────────────────────

root = tk.Tk()
root.title("Markdown 死链接检查工具 v5（支持空文件判定 + 绝对/相对路径）")
root.geometry("1450x850")

tk.Label(root, text="项目根目录：").pack(anchor='w', padx=10, pady=5)
dir_frame = tk.Frame(root)
dir_frame.pack(fill='x', padx=10)
dir_var = tk.StringVar()
tk.Entry(dir_frame, textvariable=dir_var, width=100).pack(side='left', expand=True, fill='x')
tk.Button(dir_frame, text="浏览", command=lambda: dir_var.set(filedialog.askdirectory())).pack(side='right')

ignore_frame = tk.Frame(root)
ignore_frame.pack(fill='x', padx=10, pady=5)
tk.Label(ignore_frame, text="忽略源路径（逗号分隔，目录以/结尾）").pack(anchor='w')
ignore_var = tk.StringVar(value=",".join(DEFAULT_WHITELIST))
tk.Entry(ignore_frame, textvariable=ignore_var).pack(fill='x')

whitelist_frame = tk.Frame(root)
whitelist_frame.pack(fill='x', padx=10, pady=5)
tk.Label(whitelist_frame, text="白名单目标路径（逗号分隔，目录以/结尾）").pack(anchor='w')
whitelist_var = tk.StringVar(value=",".join(DEFAULT_WHITELIST))
tk.Entry(whitelist_frame, textvariable=whitelist_var).pack(fill='x')

# 新增：空文件选项
empty_frame = tk.Frame(root)
empty_frame.pack(anchor='w', padx=10, pady=8)
empty_var = tk.BooleanVar(value=False)
tk.Checkbutton(empty_frame, text="将空文件（0字节）视为不存在 → 指向它的链接算死链接", variable=empty_var).pack(anchor='w')

tk.Button(root, text="开始扫描", command=lambda: start_scan(dir_var, ignore_var, whitelist_var, empty_var, tree1, tree2, status_label),
          bg='#2e7d32', fg='white', font=('Arial', 12, 'bold')).pack(pady=12)

status_label = tk.Label(root, text="就绪", fg='#1565c0', font=('Arial', 10))
status_label.pack(pady=5)

notebook = ttk.Notebook(root)
notebook.pack(expand=True, fill='both', padx=10, pady=5)

# Tab1 - 源文件树
tab1 = ttk.Frame(notebook)
notebook.add(tab1, text="死链接源文件（按目录树）")

frame1 = tk.Frame(tab1)
frame1.pack(expand=True, fill='both')

columns1 = ('name', 'count', 'detail', 'rel_target', 'abs_target', '', '')
tree1 = ttk.Treeview(frame1, columns=columns1, show='tree headings')
tree1.heading('#0', text='目录 / 文件')
tree1.heading('count', text='错误数')
tree1.heading('detail', text='行号 : 链接 【空文件】')
tree1.heading('rel_target', text='相对路径错误')
tree1.heading('abs_target', text='绝对路径错误')

tree1.column('#0', width=380, anchor='w')
tree1.column('count', width=90, anchor='center')
tree1.column('detail', width=520)
tree1.column('rel_target', width=340)
tree1.column('abs_target', width=380)

tree1.tag_configure('dir', font=('Arial', 10, 'bold'), background='#f5f5f5')
tree1.tag_configure('bold', font=('Arial', 11, 'bold'))
tree1.tag_configure('file', font=('Arial', 10))
tree1.tag_configure('empty', foreground='darkorange', font=('Arial', 10, 'italic'))

vbar1 = ttk.Scrollbar(frame1, orient='vertical', command=tree1.yview)
hbar1 = ttk.Scrollbar(frame1, orient='horizontal', command=tree1.xview)
tree1.configure(yscroll=vbar1.set, xscroll=hbar1.set)
tree1.pack(side='left', fill='both', expand=True)
vbar1.pack(side='right', fill='y')
hbar1.pack(side='bottom', fill='x')

# Tab2 - 目标文件树
tab2 = ttk.Frame(notebook)
notebook.add(tab2, text="不存在/空的目标文件（展开查看引用）")

frame2 = tk.Frame(tab2)
frame2.pack(expand=True, fill='both')

columns2 = ('target', 'count', 'is_empty', 'abs_path', '')
tree2 = ttk.Treeview(frame2, columns=columns2, show='tree headings')
tree2.heading('#0', text='目标文件（相对）')
tree2.heading('count', text='被引用次数')
tree2.heading('is_empty', text='空文件？')
tree2.heading('abs_path', text='绝对路径')

tree2.column('#0', width=500)
tree2.column('count', width=120, anchor='center')
tree2.column('is_empty', width=100, anchor='center')
tree2.column('abs_path', width=500)

vbar2 = ttk.Scrollbar(frame2, orient='vertical', command=tree2.yview)
hbar2 = ttk.Scrollbar(frame2, orient='horizontal', command=tree2.xview)
tree2.configure(yscroll=vbar2.set, xscroll=hbar2.set)
tree2.pack(side='left', fill='both', expand=True)
vbar2.pack(side='right', fill='y')
hbar2.pack(side='bottom', fill='x')

root.mainloop()