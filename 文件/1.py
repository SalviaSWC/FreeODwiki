import os

def rename_svg_files(directory):
    """
    重命名目录下所有以 .svg.png 结尾的文件，去掉 .png 后缀。
    
    参数:
    directory (str): 要处理的目录路径，例如 '.' 表示当前目录。
    """
    for filename in os.listdir(directory):
        # 检查文件是否以 .svg.png 结尾
        if filename.endswith(".svg.png"):
            # 生成新文件名：去掉最后的 4 个字符 (.png)
            new_filename = filename[:-4]
            # 获取完整路径
            old_path = os.path.join(directory, filename)
            new_path = os.path.join(directory, new_filename)
            # 重命名文件
            try:
                os.rename(old_path, new_path)
                print(f"已重命名: {filename} -> {new_filename}")
            except FileExistsError as e:
                print(f"{filename}, {e}")
# 示例用法：替换为你的目录路径
rename_svg_files('.')  # 当前目录
# 或者
# rename_svg_files('/path/to/your/directory')