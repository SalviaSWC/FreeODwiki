<#
    《药物使用者圣经》一键构建（Windows / PowerShell）

    用法：
        .\build.ps1                 # 生成 book.tex 并编译出 book.pdf
        .\build.ps1 -NoImages       # 跳过图片转码（图片已就位时更快）
        .\build.ps1 -ForceImages    # 强制重新转码全部图片
        .\build.ps1 -Clean          # 先清掉中间文件再构建
        .\build.ps1 -CleanOnly      # 只清理，不构建

    依赖：Python 3 + Pillow（pip install Pillow）、TeX Live/MiKTeX 的 xelatex
#>
[CmdletBinding()]
param(
    [switch]$Clean,
    [switch]$CleanOnly,
    [switch]$NoImages,
    [switch]$ForceImages,
    [int]$Passes = 3
)

$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

$intermediates = @(
    'book.aux', 'book.log', 'book.toc', 'book.out', 'book.xdv',
    'book.fls', 'book.fdb_latexmk', 'book.synctex.gz'
)

function Remove-Intermediates {
    foreach ($f in $intermediates) {
        if (Test-Path -LiteralPath $f) { Remove-Item -LiteralPath $f -Force }
    }
    Write-Host '已清理中间文件。' -ForegroundColor DarkGray
}

if ($Clean -or $CleanOnly) { Remove-Intermediates }
if ($CleanOnly) { return }

# ---- 1. 找 python / xelatex ----
$python = (Get-Command python -ErrorAction SilentlyContinue)
if (-not $python) { $python = (Get-Command python3 -ErrorAction SilentlyContinue) }
if (-not $python) { throw '找不到 python，请先安装 Python 3。' }

if (-not (Get-Command xelatex -ErrorAction SilentlyContinue)) {
    throw '找不到 xelatex，请先安装 TeX Live 或 MiKTeX，并确保它在 PATH 中。'
}

& $python.Source -c "import PIL" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Warning '未安装 Pillow。源图库里的文件虽名为 .jpeg/.png，实际是 WebP，xelatex 读不了。请先 pip install Pillow。'
}

# ---- 2. 生成 book.tex ----
Write-Host '[1/2] 汇编 Markdown -> book.tex ...' -ForegroundColor Cyan
$genArgs = @('build_book.py')
if ($NoImages)    { $genArgs += '--no-images' }
if ($ForceImages) { $genArgs += '--force-images' }
& $python.Source @genArgs
if ($LASTEXITCODE -ne 0) { throw 'build_book.py 执行失败。' }

# ---- 3. 编译 ----
Write-Host "[2/2] XeLaTeX 编译（$Passes 遍，目录与交叉引用需要多遍）..." -ForegroundColor Cyan
for ($i = 1; $i -le $Passes; $i++) {
    Write-Host ("      第 {0}/{1} 遍" -f $i, $Passes) -ForegroundColor DarkGray
    & xelatex -interaction=nonstopmode -file-line-error book.tex | Out-Null
}

if (-not (Test-Path -LiteralPath 'book.pdf')) { throw '编译没有产出 book.pdf，详见 book.log。' }

# ---- 4. 小结 ----
$log = Get-Content -LiteralPath 'book.log' -Encoding UTF8 -ErrorAction SilentlyContinue
$errors   = @($log | Select-String -Pattern '^(\./book\.tex:\d+:|! )').Count
$overfull = @($log | Select-String -Pattern 'Overfull \\[hv]box').Count
$pages    = ($log | Select-String -Pattern 'Output written on book\.pdf \((\d+) pages' | Select-Object -Last 1)
$pageNum  = if ($pages) { $pages.Matches[0].Groups[1].Value } else { '?' }
$size     = [math]::Round((Get-Item -LiteralPath 'book.pdf').Length / 1MB, 1)

Write-Host ''
Write-Host ("完成：book.pdf  {0} 页，{1} MB" -f $pageNum, $size) -ForegroundColor Green
Write-Host ("      报错 {0} 处，溢出框 {1} 处" -f $errors, $overfull) -ForegroundColor DarkGray
Write-Host  '      汇编报告见 build-report.txt' -ForegroundColor DarkGray
