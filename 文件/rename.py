import pathlib

def rename_svg_files(directory: str) -> None:
    """重命名目录下所有以 .svg.png 结尾的文件，去掉 .png 后缀。

    Args:
        directory (str): 要处理的目录路径，例如 '.' 表示当前目录。
    """
    
    for file in pathlib.Path(directory).glob("*.svg.png"):
        try:
            file.rename(file.name.removesuffix(".png"))
        except FileExistsError:
            print(f"{file} 的重命名版本已存在")
        else:
            print(f"已重命名 {file}")
        
rename_svg_files('.')