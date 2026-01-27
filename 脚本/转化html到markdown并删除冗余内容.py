import tkinter as tk
import re
from tkinter import scrolledtext
from tkinter import messagebox
from html_to_markdown import convert_to_markdown
# 如果提示包缺失，（由于tkinter一般是自带的），请通过运行pip install html-to-markdown安装这个包

# 将输入的html文本转化为markdown的工具

# 由于写作时我们正在处理psywiki的翻译，因此含有一个特判psywiki的菜单并将其去除的部分



def process_html():
    try:
        # 获取文本框全部内容
        html_text = text_widget.get("1.0", "end-1c")
        if not html_text.strip():
            messagebox.showinfo("提示", "请输入 HTML 文本")
            return
        
        # 先转换为 Markdown
        markdown_text = convert_to_markdown(html_text)
        
        # 去除从 "Retrieved from ‘<https..." 这一行及之后的内容
        # 匹配任意开头，直到遇到 Retrieved from ‘<http...>’ （允许 http/https，允许前后空白/换行）
        pattern = r'^(.*?)(?:Retrieved\s+from\s*‘<https?://[^>]+>’\s*(?:\n|$))'
        match = re.match(pattern, markdown_text, re.DOTALL | re.IGNORECASE)
        
        if match:
            cleaned_text = match.group(1).rstrip()
        else:
            cleaned_text = markdown_text.rstrip()  # 没匹配到就保留原样（去除末尾空白）
        
        # 清空并写入处理后的结果
        text_widget.delete("1.0", "end")
        text_widget.insert("1.0", cleaned_text)
        
    except Exception as e:
        messagebox.showerror("错误", f"处理失败：{str(e)}")

def exit_app():
    root.destroy()

# 创建主窗口
root = tk.Tk()
root.title("HTML 转 Markdown 工具")
root.geometry("800x600")
root.minsize(600, 400)

# 说明标签
label = tk.Label(root, text="请输入 HTML 文本，点击“处理”按钮转换为 Markdown", 
                 font=("微软雅黑", 12), pady=10)
label.pack()

# 带滚动条的多行文本框
text_widget = scrolledtext.ScrolledText(root, wrap=tk.WORD, font=("微软雅黑", 11))
text_widget.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

# 按钮框架
button_frame = tk.Frame(root)
button_frame.pack(pady=10)

# 处理按钮
process_button = tk.Button(button_frame, text="处理", width=15, height=2,
                          bg="#4CAF50", fg="white", font=("微软雅黑", 11),
                          command=process_html)
process_button.pack(side=tk.LEFT, padx=20)

# 退出按钮
exit_button = tk.Button(button_frame, text="退出", width=15, height=2,
                       bg="#f44336", fg="white", font=("微软雅黑", 11),
                       command=exit_app)
exit_button.pack(side=tk.LEFT, padx=20)

# 启动主循环
root.mainloop()