import os
import re
import tkinter as tk
from tkinter import filedialog, ttk, messagebox
from threading import Thread
from collections import defaultdict, Counter

def is_ignored(path, rule):
    """判断路径是否匹配规则（目录规则以/结尾表示前缀匹配，路径和规则均不以/开头）"""
    if rule.endswith('/'):
        return path.startswith(rule)
    else:
        return path == rule

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
        if leaf:
            current['children'][leaf] = {'count': len(errors), 'children': {}, 'is_dir': False, 'errors': errors}
    
    return root

def scan_directory(root_dir, ignore_list, whitelist_list, tree1, tree2, status_label):
    file_to_errors = defaultdict(list)
    dead_targets = Counter()
    
    link_pattern = re.compile(r'(?<!\!)\[([^\]]*)\]\(([^)]+)\)')
    
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if not filename.lower().endswith('.md'):
                continue
            file_path = os.path.join(dirpath, filename)
            rel_file = os.path.relpath(file_path, root_dir).replace('\\', '/')
            
            # 忽略源文件/目录
            if any(is_ignored(rel_file, ig) for ig in ignore_list):
                continue
            
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
            except Exception:
                continue
            
            for line_num, line in enumerate(lines, 1):
                for match in link_pattern.finditer(line):
                    link_text, url = match.groups()
                    url = url.strip()
                    
                    target_path = get_target_path(os.path.dirname(file_path), root_dir, url)
                    if target_path is None:
                        continue
                    
                    target_rel = os.path.relpath(target_path, root_dir).replace('\\', '/')
                    
                    # 白名单目标（即使不存在也视为有效）
                    whitelisted = any(is_ignored(target_rel, wl) for wl in whitelist_list)
                    exists = os.path.isfile(target_path)
                    
                    if not exists and not whitelisted:
                        full_link = f'[{link_text}]({url})'
                        file_to_errors[rel_file].append((line_num, full_link, url, target_path))
                        dead_targets[target_path] += 1
    
    total_errors = sum(len(v) for v in file_to_errors.values())
    
    tree1.master.after(0, update_gui, tree1, tree2, file_to_errors, dead_targets, root_dir, total_errors, status_label)

def update_gui(tree1, tree2, file_to_errors, dead_targets, root_dir, total_errors, status_label):
    tree1.delete(*tree1.get_children())
    tree2.delete(*tree2.get_children())
    
    # Tab1：树状结构
    tree_dict = build_tree_dict(file_to_errors)
    
    def insert_recursive(parent_iid, node, prefix):
        for name in sorted(node['children'].keys()):
            child = node['children'][name]
            child_prefix = prefix + name
            if child['is_dir']:
                display_name = name + '/'
                iid = child_prefix + '/'
                tree1.insert(parent_iid, 'end', iid=iid, text=display_name,
                             values=(display_name, child['count'], '', '', '', ''), tags=('dir',))
                insert_recursive(iid, child, child_prefix + '/')
            else:
                iid = child_prefix
                tree1.insert(parent_iid, 'end', iid=iid, text=name,
                             values=(name, child['count'], '', '', '', ''), tags=('file',))
                for line_num, full_link, _, target_path in sorted(child['errors'], key=lambda x: x[0]):
                    rel_target = os.path.relpath(target_path, root_dir).replace('\\', '/')
                    ref_count = dead_targets.get(target_path, 0)
                    display_link = f"{full_link} → {rel_target}"
                    tree1.insert(iid, 'end', values=('', '', line_num, display_link, rel_target, ref_count))
    
    # 添加根节点（便于查看总错误数）
    if file_to_errors:
        tree1.insert('', 'end', iid='root/', text='项目根目录/', open=True,
                     values=('项目根目录/', total_errors, '', '', '', ''), tags=('dir', 'bold'))
        insert_recursive('root/', tree_dict, '')
    else:
        tree1.insert('', 'end', text='无死链接', values=('无死链接', '', '', '', '', ''))
    
    # Tab2：不存在目标统计
    for target_path, cnt in dead_targets.most_common():
        rel_target = os.path.relpath(target_path, root_dir).replace('\\', '/')
        tree2.insert('', 'end', values=(rel_target, cnt))
    
    status_label.config(text=f"检查完成，发现 {total_errors} 处死链接，涉及 {len(dead_targets)} 个不存在的目标文件")

def start_scan(dir_var, ignore_var, whitelist_var, tree1, tree2, status_label):
    root_dir = dir_var.get().strip()
    if not root_dir or not os.path.isdir(root_dir):
        messagebox.showerror("错误", "请先选择有效的目录")
        return
    
    ignore_str = ignore_var.get()
    whitelist_str = whitelist_var.get()
    
    ignore_list = [s.strip().lstrip('/') for s in ignore_str.split(',') if s.strip()]
    whitelist_list = [s.strip().lstrip('/') for s in whitelist_str.split(',') if s.strip()]
    
    status_label.config(text="正在扫描，请稍等（大型项目可能需要几分钟）...")
    tree1.delete(*tree1.get_children())
    tree2.delete(*tree2.get_children())
    
    Thread(target=scan_directory, args=(root_dir, ignore_list, whitelist_list, tree1, tree2, status_label), daemon=True).start()

# GUI 主程序
root = tk.Tk()
root.title("Markdown 内部死链接检查工具（树状视图 + 忽略/白名单）")
root.geometry("1300x750")

# 目录选择
tk.Label(root, text="根目录：").pack(anchor='w', padx=10, pady=5)
dir_frame = tk.Frame(root)
dir_frame.pack(fill='x', padx=10)
dir_var = tk.StringVar()
tk.Entry(dir_frame, textvariable=dir_var, width=100).pack(side='left', expand=True, fill='x')
tk.Button(dir_frame, text="浏览", command=lambda: dir_var.set(filedialog.askdirectory())).pack(side='right')

# 忽略源文件/目录
ignore_frame = tk.Frame(root)
ignore_frame.pack(fill='x', padx=10, pady=5)
tk.Label(ignore_frame, text="忽略检查的源文件/目录（逗号分隔，目录以/结尾，如 文档/补档/, temp/file.md）：").pack(anchor='w')
ignore_var = tk.StringVar(value="/文档/补档/")
tk.Entry(ignore_frame, textvariable=ignore_var).pack(fill='x')

# 白名单目标
whitelist_frame = tk.Frame(root)
whitelist_frame.pack(fill='x', padx=10, pady=5)
tk.Label(whitelist_frame, text="白名单目标文件/目录（即使不存在也视为有效，规则同上）：").pack(anchor='w')
whitelist_var = tk.StringVar(value="/文档/补档/")
tk.Entry(whitelist_frame, textvariable=whitelist_var).pack(fill='x')

# 开始按钮
tk.Button(root, text="开始检查", command=lambda: start_scan(dir_var, ignore_var, whitelist_var, tree1, tree2, status_label),
          bg='green', fg='white', font=('Arial', 12, 'bold')).pack(pady=15)

# 状态标签
status_label = tk.Label(root, text="就绪", fg='blue', font=('Arial', 10))
status_label.pack(pady=5)

# Notebook
notebook = ttk.Notebook(root)
notebook.pack(expand=True, fill='both', padx=10, pady=10)

# Tab1：树状视图
tab1 = ttk.Frame(notebook)
notebook.add(tab1, text="目录树状死链接（展开查看详情）")

frame1 = tk.Frame(tab1)
frame1.pack(expand=True, fill='both')

columns1 = ('path', 'errors', 'line', 'link', 'target', 'refs')
tree1 = ttk.Treeview(frame1, columns=columns1, show='tree headings', selectmode='extended')
tree1.heading('#0', text='目录/文件名')
tree1.heading('errors', text='错误数')
tree1.heading('line', text='行号')
tree1.heading('link', text='原文链接 → 目标（相对）')
tree1.heading('target', text='指向目标（相对）')
tree1.heading('refs', text='被引用次数')

tree1.column('#0', width=400, anchor='w')
tree1.column('errors', width=100, anchor='center')
tree1.column('line', width=80, anchor='center')
tree1.column('link', width=500)
tree1.column('target', width=350)
tree1.column('refs', width=120, anchor='center')

tree1.tag_configure('dir', font=('Arial', 10, 'bold'), background='#f0f0f0')
tree1.tag_configure('bold', font=('Arial', 11, 'bold'))
tree1.tag_configure('file', font=('Arial', 10))

vbar1 = ttk.Scrollbar(frame1, orient='vertical', command=tree1.yview)
hbar1 = ttk.Scrollbar(frame1, orient='horizontal', command=tree1.xview)
tree1.configure(yscrollcommand=vbar1.set, xscrollcommand=hbar1.set)

tree1.pack(side='left', expand=True, fill='both')
vbar1.pack(side='right', fill='y')
hbar1.pack(side='bottom', fill='x')

# Tab2：不存在目标统计
tab2 = ttk.Frame(notebook)
notebook.add(tab2, text="不存在的目标文件统计（按出现次数降序）")

frame2 = tk.Frame(tab2)
frame2.pack(expand=True, fill='both')

columns2 = ('target', 'count')
tree2 = ttk.Treeview(frame2, columns=columns2, show='headings')
tree2.heading('target', text='不存在的目标文件（相对路径）')
tree2.heading('count', text='出现次数')

tree2.column('target', width=800)
tree2.column('count', width=120, anchor='center')

vbar2 = ttk.Scrollbar(frame2, orient='vertical', command=tree2.yview)
hbar2 = ttk.Scrollbar(frame2, orient='horizontal', command=tree2.xview)
tree2.configure(yscrollcommand=vbar2.set, xscrollcommand=hbar2.set)

tree2.pack(side='left', expand=True, fill='both')
vbar2.pack(side='right', fill='y')
hbar2.pack(side='bottom', fill='x')

root.mainloop()