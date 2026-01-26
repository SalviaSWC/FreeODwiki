import os
import re
import tkinter as tk
from tkinter import filedialog, ttk, messagebox
from threading import Thread
from collections import defaultdict, Counter

def get_target_path(current_dir, root_dir, url):
    """计算目标绝对路径（统一 VSCode/GitHub 模式，不补任何扩展名）"""
    url = url.split('#')[0].rstrip('/').strip()
    if not url:
        return None
    
    # 外部链接、纯锚点或特殊协议直接跳过（不视为内部死链接）
    if re.match(r'^(http|https|mailto|ftp|//|#)', url, re.IGNORECASE):
        return None
    
    if url.startswith('/'):
        target = os.path.normpath(os.path.join(root_dir, url.lstrip('/')))
    else:
        target = os.path.normpath(os.path.join(current_dir, url))
    
    return target

def scan_directory(root_dir, tree1, tree2, status_label):
    file_to_errors = defaultdict(list)  # rel_file -> [(line_num, full_link, orig_url, target_abs)]
    dead_targets = Counter()           # target_abs -> 引用次数
    
    link_pattern = re.compile(r'(?<!\!)\[([^\]]*)\]\(([^)]+)\)')  # 只匹配非图片内部链接
    
    total_files = sum(len(files) for _, _, files in os.walk(root_dir) if any(f.lower().endswith('.md') for f in files))
    processed = 0
    
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if not filename.lower().endswith('.md'):
                continue
            file_path = os.path.join(dirpath, filename)
            rel_file = os.path.relpath(file_path, root_dir)
            
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
                        continue  # 外部链接，不计死链接
                    
                    if not os.path.isfile(target_path):
                        full_link = f'[{link_text}]({url})'
                        file_to_errors[rel_file].append((line_num, full_link, url, target_path))
                        dead_targets[target_path] += 1
            
            processed += 1
    
    total_errors = sum(len(v) for v in file_to_errors.values())
    
    # 更新 GUI（主线程）
    tree1.master.after(0, update_gui, tree1, tree2, file_to_errors, dead_targets, root_dir, total_errors, status_label)

def update_gui(tree1, tree2, file_to_errors, dead_targets, root_dir, total_errors, status_label):
    tree1.delete(*tree1.get_children())
    tree2.delete(*tree2.get_children())
    
    # Tab1：按文件分组
    for rel_file in sorted(file_to_errors.keys()):
        errors = file_to_errors[rel_file]
        count = len(errors)
        iid = tree1.insert('', 'end', values=(rel_file, count, '', '', '', ''), tags='file')
        
        for line_num, full_link, orig_url, target_path in sorted(errors, key=lambda x: x[0]):
            rel_target = os.path.relpath(target_path, root_dir)
            ref_count = dead_targets[target_path]
            display_link = f"{full_link} → {rel_target}"
            tree1.insert(iid, 'end', values=('', '', line_num, display_link, rel_target, ref_count))
    
    # Tab2：不存在目标统计（降序）
    for target_path, cnt in dead_targets.most_common():
        rel_target = os.path.relpath(target_path, root_dir)
        tree2.insert('', 'end', values=(rel_target, cnt))
    
    status_label.config(text=f"检查完成，发现 {total_errors} 处死链接，涉及 {len(dead_targets)} 个不存在的目标文件")

def start_scan(dir_var, tree1, tree2, status_label):
    root_dir = dir_var.get().strip()
    if not root_dir or not os.path.isdir(root_dir):
        messagebox.showerror("错误", "请先选择有效的目录")
        return
    
    status_label.config(text="正在扫描，请稍等（大型项目可能需要几分钟）...")
    tree1.delete(*tree1.get_children())
    tree2.delete(*tree2.get_children())
    
    Thread(target=scan_directory, args=(root_dir, tree1, tree2, status_label), daemon=True).start()

# GUI 主程序
root = tk.Tk()
root.title("Markdown 内部死链接检查工具（统一 VSCode/GitHub 模式）")
root.geometry("1200x700")

# 目录选择
tk.Label(root, text="根目录：").pack(anchor='w', padx=10, pady=5)
dir_frame = tk.Frame(root)
dir_frame.pack(fill='x', padx=10)
dir_var = tk.StringVar()
tk.Entry(dir_frame, textvariable=dir_var, width=100).pack(side='left', expand=True, fill='x')
tk.Button(dir_frame, text="浏览", command=lambda: dir_var.set(filedialog.askdirectory())).pack(side='right')

# 开始按钮
tk.Button(root, text="开始检查", command=lambda: start_scan(dir_var, tree1, tree2, status_label),
          bg='green', fg='white', font=('Arial', 12, 'bold')).pack(pady=15)

# 状态标签
status_label = tk.Label(root, text="就绪", fg='blue', font=('Arial', 10))
status_label.pack(pady=5)

# Notebook（两个标签页）
notebook = ttk.Notebook(root)
notebook.pack(expand=True, fill='both', padx=10, pady=10)

# Tab1：按文件分组
tab1 = ttk.Frame(notebook)
notebook.add(tab1, text="按文件分组的死链接（点击 + 展开查看详情）")

frame1 = tk.Frame(tab1)
frame1.pack(expand=True, fill='both')

columns1 = ('file', 'errors', 'line', 'link', 'target', 'refs')
tree1 = ttk.Treeview(frame1, columns=columns1, show='headings')
tree1.heading('file', text='文件名（相对路径）')
tree1.heading('errors', text='错误数')
tree1.heading('line', text='行号')
tree1.heading('link', text='原文链接 → 目标（相对）')
tree1.heading('target', text='指向目标（相对）')
tree1.heading('refs', text='被引用次数')

tree1.column('file', width=350)
tree1.column('errors', width=100, anchor='center')
tree1.column('line', width=80, anchor='center')
tree1.column('link', width=500)
tree1.column('target', width=350)
tree1.column('refs', width=120, anchor='center')

tree1.tag_configure('file', font=('Arial', 10, 'bold'))

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