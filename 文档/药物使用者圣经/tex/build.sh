#!/usr/bin/env bash
# 《药物使用者圣经》一键构建（Git Bash / WSL / Linux / macOS）
#
#   ./build.sh                  生成 book.tex 并编译出 book.pdf
#   ./build.sh --no-images      跳过图片转码
#   ./build.sh --force-images   强制重新转码全部图片
#   ./build.sh --clean          先清中间文件再构建
#   ./build.sh --clean-only     只清理
#
# 依赖：Python 3 + Pillow（pip install Pillow）、xelatex

set -euo pipefail
cd "$(dirname "$0")"

PASSES=3
GEN_ARGS=()
DO_CLEAN=0
CLEAN_ONLY=0

for arg in "$@"; do
  case "$arg" in
    --no-images)    GEN_ARGS+=(--no-images) ;;
    --force-images) GEN_ARGS+=(--force-images) ;;
    --clean)        DO_CLEAN=1 ;;
    --clean-only)   DO_CLEAN=1; CLEAN_ONLY=1 ;;
    --passes=*)     PASSES="${arg#*=}" ;;
    -h|--help)      sed -n '2,12p' "$0"; exit 0 ;;
    *) echo "未知参数: $arg" >&2; exit 2 ;;
  esac
done

clean() {
  rm -f book.aux book.log book.toc book.out book.xdv \
        book.fls book.fdb_latexmk book.synctex.gz
  echo "已清理中间文件。"
}

[ "$DO_CLEAN" = 1 ] && clean
[ "$CLEAN_ONLY" = 1 ] && exit 0

# Windows 上 PATH 里常有个只会打开应用商店的 python3 存根，所以实际跑一下再选
PY=""
for cand in python3 python py; do
  if command -v "$cand" >/dev/null 2>&1 && "$cand" -c "import sys" >/dev/null 2>&1; then
    PY="$cand"; break
  fi
done
[ -n "$PY" ] || { echo "找不到可用的 python 3" >&2; exit 1; }
command -v xelatex >/dev/null || { echo "找不到 xelatex，请安装 TeX Live/MiKTeX" >&2; exit 1; }
"$PY" -c "import PIL" 2>/dev/null || \
  echo "警告：未安装 Pillow。源图实为 WebP，xelatex 读不了，请先 pip install Pillow。" >&2

echo "[1/2] 汇编 Markdown -> book.tex ..."
PYTHONIOENCODING=utf-8 "$PY" build_book.py "${GEN_ARGS[@]+"${GEN_ARGS[@]}"}"

echo "[2/2] XeLaTeX 编译（${PASSES} 遍）..."
for i in $(seq 1 "$PASSES"); do
  echo "      第 ${i}/${PASSES} 遍"
  xelatex -interaction=nonstopmode -file-line-error book.tex >/dev/null
done

[ -f book.pdf ] || { echo "编译没有产出 book.pdf，详见 book.log" >&2; exit 1; }

pages=$(grep -o 'Output written on book.pdf ([0-9]* pages' book.log | tail -1 | grep -o '[0-9]*' || echo '?')
errs=$(grep -cE '^(\./book\.tex:[0-9]+:|! )' book.log || true)
over=$(grep -c 'Overfull \\[hv]box' book.log || true)
size=$(du -h book.pdf | cut -f1)

echo
echo "完成：book.pdf  ${pages} 页，${size}"
echo "      报错 ${errs} 处，溢出框 ${over} 处"
echo "      汇编报告见 build-report.txt"
