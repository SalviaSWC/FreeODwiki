import re
from pathlib import Path
from typing import List, Tuple

# 匹配标题中带有括号英文的模式
# ^#{1,6}\s+          → 1~6级标题 + 空格
# ([^\(\n]+?)         → 捕获中文部分（非贪婪，直到遇到左括号）
# \s*\([^()\n]+?\)    → (英文部分)，允许括号前后有空格
# \s*$                → 后面可以有空格，到行尾
PATTERN = re.compile(r'^(#{1,1})\s+([^\(\n]+?)\s*\([^()\n]+?\)\s*$', re.MULTILINE)

def process_file(filepath: Path) -> List[Tuple[str, str]]:
    """处理单个文件，返回 (原始行, 修改后行) 的列表"""
    changes = []
    
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        print(f"无法读取 {filepath} : {e}")
        return changes

    new_lines = []
    modified = False

    for line in content.splitlines():
        match = PATTERN.match(line.rstrip())
        if match:
            level, chinese = match.groups()
            new_line = f"{level} {chinese.strip()}"
            if line.rstrip() != new_line:
                changes.append((line.rstrip(), new_line))
                modified = True
                new_lines.append(new_line)
            else:
                new_lines.append(line)
        else:
            new_lines.append(line)

    if modified:
        # 只在有实际变化时才写回文件
        filepath.write_text('\n'.join(new_lines) + '\n', encoding='utf-8')
    
    return changes


def main():
    root = Path.cwd()
    print(f"开始扫描目录：{root}\n")

    total_files = 0
    modified_files = 0

    for md_file in root.rglob("*.md"):
        total_files += 1
        changes = process_file(md_file)
        
        if changes:
            modified_files += 1
            print(f"\n{'='*60}")
            print(f"文件已修改：{md_file}")
            print(f"{'-'*40}")
            for old, new in changes:
                print(f"旧: {old}")
                print(f"新: {new}")
                print()

    print(f"\n{'='*60}")
    print(f"扫描完成！共找到 {total_files} 个 .md 文件")
    print(f"其中 {modified_files} 个文件进行了修改")


if __name__ == "__main__":
    main()