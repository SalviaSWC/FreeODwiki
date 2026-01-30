import os
import datetime
import xml.etree.ElementTree as ET
from xml.dom import minidom
import tkinter as tk
from tkinter import filedialog, messagebox

def generate_sitemap(root_dir, base_url):
    allowed_extensions = ('.md', '.html', '.htm')
    entries = []

    for dirpath, dirnames, filenames in os.walk(root_dir):
        # 跳过常见不需要的目录
        dirnames[:] = [d for d in dirnames if not d.startswith('.') and d not in 
                       ['.git', 'node_modules', '__pycache__', '.github', 'assets', 'images', 'static', 'js', 'css', 'files']]

        rel_dir = os.path.relpath(dirpath, root_dir)
        if rel_dir == '.':
            rel_dir = ''

        for filename in filenames:
            lowercase_name = filename.lower()
            if lowercase_name.endswith(allowed_extensions) and not filename.startswith('.'):
                file_path = os.path.join(dirpath, filename)

                # lastmod：精确到秒，UTC 时间，标准 ISO 格式
                mtime = os.path.getmtime(file_path)
                dt = datetime.datetime.fromtimestamp(mtime, tz=datetime.timezone.utc)
                lastmod = dt.strftime('%Y-%m-%dT%H:%M:%SZ')

                # 计算相对路径（去掉扩展名）
                rel_path = os.path.join(rel_dir, filename) if rel_dir else filename
                path_no_ext = os.path.splitext(rel_path)[0]
                base_name = os.path.basename(path_no_ext).lower()

                # 处理首页：home.md / index.md / readme.md → 目录形式
                is_root_home = (rel_dir == '' and base_name in ('home', 'index', 'readme'))
                is_sub_home = (base_name in ('home', 'index', 'readme'))

                if is_root_home:
                    url_path = ''  # 根目录
                elif is_sub_home:
                    url_path = os.path.dirname(path_no_ext).replace(os.sep, '/')
                    if url_path == '.':
                        url_path = ''
                else:
                    url_path = path_no_ext.replace(os.sep, '/')

                full_url = base_url.rstrip('/') + '/' + url_path.lstrip('/')
                full_url = full_url.rstrip('/') + '/'  # 所有目录形式以 / 结尾（包括根）

                # priority 和 changefreq 规则
                if is_root_home:
                    changefreq = 'daily'
                    priority = '1.0'
                elif is_sub_home:
                    changefreq = 'weekly'
                    priority = '0.9'
                else:
                    changefreq = 'weekly'
                    priority = '0.8'

                entries.append((full_url, lastmod, changefreq, priority))

    # 去重并排序
    entries = sorted(set(entries), key=lambda x: x[0])

    # 生成 XML
    urlset = ET.Element('urlset', xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    for full_url, lastmod, changefreq, priority in entries:
        url_elem = ET.SubElement(urlset, 'url')
        loc = ET.SubElement(url_elem, 'loc')
        loc.text = full_url
        mod = ET.SubElement(url_elem, 'lastmod')
        mod.text = lastmod
        cf = ET.SubElement(url_elem, 'changefreq')
        cf.text = changefreq
        pr = ET.SubElement(url_elem, 'priority')
        pr.text = priority

    # 美化 XML
    rough_string = ET.tostring(urlset, 'utf-8')
    reparsed = minidom.parseString(rough_string)
    pretty_xml = reparsed.toprettyxml(indent="  ")
    pretty_xml = '\n'.join(line for line in pretty_xml.split('\n') if line.strip())

    output_path = os.path.join(root_dir, 'sitemap.xml')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(pretty_xml)

    return len(entries)


# ==================== Tkinter GUI ====================
def select_directory():
    directory = filedialog.askdirectory(title="选择 repo 根目录（包含 .md 或 .html 文件的目录）")
    if directory:
        dir_var.set(directory)

def start_generate():
    directory = dir_var.get().strip()
    if not directory or not os.path.isdir(directory):
        messagebox.showwarning("警告", "请先选择有效的目录！")
        return

    base = entry_base.get().strip()
    if not base or not base.startswith('http'):
        messagebox.showwarning("警告", "基础 URL 不正确（必须包含 https://）")
        return

    try:
        num = generate_sitemap(directory, base)
        messagebox.showinfo("成功", f"生成完成！\n共 {num} 个 URL\nsitemap.xml 已保存到选中目录")
    except Exception as e:
        messagebox.showerror("错误", f"生成失败：{str(e)}")

# 主窗口
root = tk.Tk()
root.title("Sitemap.xml 生成器")
root.geometry("580x300")
root.resizable(False, False)

tk.Label(root, text="Sitemap 生成工具（适合 Markdown/HTML wiki 项目）", font=("Segoe UI", 14, "bold")).pack(pady=15)

dir_var = tk.StringVar()
tk.Label(root, text="扫描目录（repo 根目录）：").pack(anchor="w", padx=30)
tk.Entry(root, textvariable=dir_var, width=65).pack(padx=30, pady=5)
tk.Button(root, text="选择目录", command=select_directory).pack(pady=5)

tk.Label(root, text="网站基础 URL（默认 https://freeod.wiki，可修改）：").pack(anchor="w", padx=30, pady=(15,0))
entry_base = tk.Entry(root, width=65)
entry_base.insert(0, "https://freeod.wiki")
entry_base.pack(padx=30, pady=5)

tk.Button(root, text="开始生成 sitemap.xml", bg="#2196F3", fg="white", font=("Segoe UI", 12, "bold"), height=2, command=start_generate).pack(pady=20)

tk.Label(root, text="提示：自动处理 home.md → 目录形式\n"
                    "根目录的 README.md/home.md：daily + 1.0\n"
                    "子目录的 home.md：weekly + 0.9\n"
                    "其他页面：weekly + 0.8\n"
                    "生成后请手动检查 sitemap.xml", foreground="gray").pack()

root.mainloop()