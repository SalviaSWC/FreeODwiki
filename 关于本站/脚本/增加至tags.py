import os
import re

def update_tags_in_yaml_headers(folder_path, target_tag):
    yaml_pattern = re.compile(
        r'^---\s*\n(.*?\n)---\s*\n', re.DOTALL | re.MULTILINE
    )
    tags_pattern = re.compile(r'^(tags:\s*)(.*)$', re.MULTILINE)

    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                yaml_match = yaml_pattern.match(content)
                if not yaml_match:
                    continue

                yaml_block = yaml_match.group(0)
                yaml_body = yaml_match.group(1)

                tags_match = tags_pattern.search(yaml_body)
                if tags_match:
                    tags_line = tags_match.group(0)
                    tags_value = tags_match.group(2).strip()
                    tags_list = [t.strip() for t in tags_value.split(',') if t.strip()]
                    if target_tag not in tags_list:
                        if tags_value:
                            new_tags_value = tags_value + ',' + target_tag
                        else:
                            new_tags_value = target_tag
                        new_tags_line = f"tags: {new_tags_value}"
                        new_yaml_body = yaml_body.replace(tags_line, new_tags_line)
                        new_yaml_block = f"---\n{new_yaml_body}---\n"
                        new_content = new_yaml_block + content[len(yaml_block):]
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated tags in: {file_path}")
                else:
                    # 没有tags字段，插入一行
                    new_yaml_body = yaml_body + f"tags: {target_tag}\n"
                    new_yaml_block = f"---\n{new_yaml_body}---\n"
                    new_content = new_yaml_block + content[len(yaml_block):]
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Added tags in: {file_path}")

if __name__ == "__main__":
    folder_path = r"d:\Projects\FreeODwiki"  # 修改为你的目标文件夹
    target_tag = "FreeODwiki是一个开源项目，提供有关OD、Overdose、药物滥用、药物过量、吸毒、毒品、禁毒等话题的知识。"  # 修改为你要添加的标签
    update_tags_in_yaml_headers(folder_path, target_tag)