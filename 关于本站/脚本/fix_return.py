import re
from pathlib import Path
from difflib import unified_diff

PATTERN_HASHTAG = re.compile(
    r"\n*^(\[.?返回\].+?\))\n+# (.+?)\n",
    re.MULTILINE,
)
PATTERN_UNDERLINE = re.compile(
    r"\n*^(\[.?返回\].+?\))\n+?(.+?)\n=+\n",
    re.MULTILINE,
)
REPLACEMENT = r"# \2\n\n\1\n"

for file in Path(".").rglob("*.md"):
    content = file.read_text("utf-8")

    fixed_content = content
    for pattern in {PATTERN_HASHTAG, PATTERN_UNDERLINE}:
        if pattern.match(content):
            fixed_content = pattern.sub(REPLACEMENT, content)

    diff = [
        *unified_diff(
            content.splitlines(),
            fixed_content.splitlines(),
            n=2,
        )
    ]
    if diff:
        if not input("\n".join(diff) + "\n>").lower().startswith(("n", "f")):
            file.write_text(fixed_content, "utf-8")
