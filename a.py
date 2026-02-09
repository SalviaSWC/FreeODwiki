import os
import tkinter as tk
from tkinter import filedialog, messagebox

def select_directory():
    directory = filedialog.askdirectory(title="选择要处理的目录")
    if directory:
        entry_dir.delete(0, tk.END)
        entry_dir.insert(0, directory)

def delete_files():
    directory = entry_dir.get()
    if not directory:
        messagebox.showerror("错误", "请先选择目录！")
        return
    
    files_to_delete = []
    for filename in os.listdir(directory):
        if "副本" in filename:
            files_to_delete.append(os.path.join(directory, filename))
    
    if not files_to_delete:
        messagebox.showinfo("信息", "没有找到含有'副本'的文件。")
        return
    
    confirm = messagebox.askyesno("确认删除", f"将删除 {len(files_to_delete)} 个文件:\n" + "\n".join(files_to_delete) + "\n\n确认删除吗？")
    if confirm:
        for file_path in files_to_delete:
            try:
                os.remove(file_path)
            except Exception as e:
                messagebox.showerror("错误", f"删除文件 {file_path} 失败: {e}")
                return
        messagebox.showinfo("完成", "删除完成！")
    else:
        messagebox.showinfo("取消", "删除操作已取消。")

# 创建主窗口
root = tk.Tk()
root.title("删除含有'副本'的文件")
root.geometry("400x200")

# 目录输入框
label_dir = tk.Label(root, text="目录路径:")
label_dir.pack(pady=10)
entry_dir = tk.Entry(root, width=50)
entry_dir.pack()

# 选择目录按钮
btn_select = tk.Button(root, text="选择目录", command=select_directory)
btn_select.pack(pady=10)

# 删除按钮
btn_delete = tk.Button(root, text="删除文件", command=delete_files)
btn_delete.pack(pady=10)

root.mainloop()