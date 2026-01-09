import os
import re

# 用途：删除wikijs导致的前摇，以免影响观感。

def remove_front_matter(file_path):
    """
    Removes YAML front matter from the beginning of a Markdown file if present.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to match front matter starting with ---, content, then ---
    pattern = r'^---\ntitle: (.*?)\ndescription: (.*?)\npublished: (.*?)\n---\n'
    match = re.match(pattern, content, re.DOTALL)
    
    if match:
        # Remove the matched front matter and write the rest back
        new_content = content[match.end():]
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed front matter from {file_path}")
    else:
        print(f"No front matter found in {file_path}")

def process_directory(root_dir):
    """
    Recursively processes all .md files in the given directory and subdirectories.
    """
    for subdir, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(subdir, file)
                remove_front_matter(file_path)

# Usage: Process the current directory
if __name__ == "__main__":
    process_directory('.')
