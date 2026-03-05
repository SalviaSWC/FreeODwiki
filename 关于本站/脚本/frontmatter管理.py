import frontmatter
import os
import sys
import pathlib

frontmatter = frontmatter.Frontmatter()

path = r"D:\Projects\FreeODwiki\\"

files = pathlib.Path(path).rglob("*.md")

for file in files:
    print(f"Processing file: {file}")
    try:
        post = frontmatter.read_file(file)
        
        # remove editor | date | published
        
        # Save changes back to the file
        frontmatter.dump(post, file)
        print(f"Successfully updated frontmatter for: {file}")
    except Exception as e:
        print(f"Error processing file {file}: {e}")

# ps = frontmatter.read_file(r"D:\Projects\FreeODwiki\关于本站\脚本\tmp.md")

# 递归读取该文件夹

# # post 是一个 Post 对象
# print(post.metadata)          # 得到 dict，所有的 frontmatter 键值对
# print(post.content)           # 得到正文（去掉 frontmatter 后的 markdown 内容）
# print(post['title'])          # 直接像 dict 一样访问
# print(post.get('tags', []))   # 支持默认值

# # 2. 修改 frontmatter
# post['title'] = "新标题"
# post['tags'] = ['python', 'mkdocs', 'frontmatter']
# post['draft'] = True

# # 3. 写回文件（会自动格式化 YAML）
# frontmatter.dump(post, '文章.md')   # 覆盖原文件

# # 或者保存到新文件
# with open('新文章.md', 'w', encoding='utf-8') as f:
#     frontmatter.dump(post, f)