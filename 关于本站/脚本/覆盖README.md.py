import os


def overwrite_readme_with_home(root_dir, source_dir, root_name, source_name):
    """
    Overwrites README.md with the content of index.md if both exist in the root directory.
    """
    home_path = os.path.join(source_dir, source_name)
    readme_path = os.path.join(root_dir, root_name)
    
    if os.path.exists(home_path):
        # Read content from index.md
        with open(home_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Write to README.md (overwriting it)
        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Overwrote {readme_path} with content from {home_path}")
    else:
        print(f"index.md not found in {root_dir}. Skipping overwrite.")

    

overwrite_readme_with_home(r"./", "./", "README.md", "index.md")
overwrite_readme_with_home(r"./", "./药物/", "药物.md", "index.md")
overwrite_readme_with_home(r"./", "./文档/", "文档.md", "index.md")
overwrite_readme_with_home(r"./", "./报告/", "报告.md", "index.md")
overwrite_readme_with_home(r"./", "./药效/", "药效.md", "index.md")