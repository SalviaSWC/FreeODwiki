#!/usr/bin/env python3
"""Concatenate the markdown files in this directory in the index order and strip navigation lines.

Usage:
    python merge_markdown.py
    python merge_markdown.py --root "D:/Projects/FreeODwiki/文档/药物使用者圣经"
    python merge_markdown.py --output merged.md
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path


RETURN_LINE_RE = re.compile(r'^\[\s*◀.*?\]\([^)]+\)\s*$', re.UNICODE)
FOOTER_LINE_RE = re.compile(
    r'^\[[^\]]+\]\([^)]+\)(?:\s*\[[^\]]+\]\([^)]+\))?\s*$',
    re.UNICODE,
)


def normalize_target(root: Path, raw_target: str) -> Path | None:
    target = raw_target.strip()
    if not target or target.startswith(("http://", "https://", "mailto:", "#")):
        return None
    target = target.split("#", 1)[0].strip()
    if not target:
        return None
    candidate = (root / target).resolve()
    try:
        candidate.relative_to(root.resolve())
    except ValueError:
        return None
    return candidate if candidate.suffix.lower() == ".md" else None


def parse_index_order(root: Path) -> list[Path]:
    index_file = root / "index.md"
    ordered: list[Path] = []
    seen: set[Path] = set()

    if index_file.exists():
        text = index_file.read_text(encoding="utf-8", errors="ignore")
        for match in re.finditer(r'\[[^\]]+\]\(([^)]+)\)', text):
            target = match.group(1)
            candidate = normalize_target(root, target)
            if candidate is not None and candidate.exists() and candidate not in seen:
                ordered.append(candidate)
                seen.add(candidate)

    remaining = sorted(
        (p for p in root.rglob("*.md") if p.is_file()),
        key=lambda p: p.relative_to(root).as_posix().lower(),
    )
    for path in remaining:
        if path not in seen and path.name.lower() != "index.md":
            ordered.append(path)
            seen.add(path)

    return ordered


def strip_navigation_lines(text: str) -> str:
    cleaned_lines: list[str] = []
    for line in text.splitlines():
        stripped = line.strip()
        if not stripped:
            cleaned_lines.append("")
            continue
        if RETURN_LINE_RE.fullmatch(stripped):
            continue
        if FOOTER_LINE_RE.fullmatch(stripped) and ("⮜" in stripped or "⮞" in stripped or "◀" in stripped):
            continue
        cleaned_lines.append(line.rstrip())
    return "\n".join(cleaned_lines).strip() + "\n"


def merge_markdown(root: Path, output_path: Path) -> list[Path]:
    ordered_files = parse_index_order(root)
    combined_parts: list[str] = []

    for path in ordered_files:
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        cleaned = strip_navigation_lines(text)
        if cleaned.strip():
            combined_parts.append(cleaned.rstrip())

    output_path.write_text(
        "\n\n\n".join(combined_parts) + "\n",
        encoding="utf-8",
    )
    return ordered_files


def main() -> None:
    parser = argparse.ArgumentParser(description="Merge markdown files in a book directory into one file.")
    parser.add_argument(
        "--root",
        default=str(Path(__file__).resolve().parent),
        help="Directory containing the markdown files (default: current folder)",
    )
    parser.add_argument(
        "--output",
        default="combined.md",
        help="Output file name (default: combined.md)",
    )
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.exists() or not root.is_dir():
        raise SystemExit(f"Directory not found: {root}")

    output_path = (root / args.output).resolve()
    files = merge_markdown(root, output_path)
    print(f"Processed {len(files)} markdown files")
    print(f"Saved merged output to: {output_path}")


if __name__ == "__main__":
    main()
