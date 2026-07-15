# ═══════════════════════════════════════════════════════════════════════════
#  prep-images.ps1 — batch-convert product photos to the selector's spec
#
#  Turns any folder of mixed photos into 512x512 transparent PNGs, padded to
#  square, named ready to drop into public/img/.
#
#  ONE-TIME SETUP (installs ImageMagick):
#      winget install ImageMagick.ImageMagick
#      # then close and reopen PowerShell
#
#  USAGE — from this folder:
#      .\prep-images.ps1 -In "D:\path\to\raw-photos"
#
#  Optional switches:
#      -Out "public\img"     where to write   (default: .\public\img)
#      -StripWhite           make a white background transparent — OPTIONAL,
#                            and usually unnecessary. The tool renders photos on
#                            a white tile, so plain white-backdrop photos already
#                            look right. Only use this if your backgrounds are a
#                            colour other than white. It punches out white parts
#                            OF THE PRODUCT too (labels, text, LEDs).
#      -Pad 0.10             padding around the product (default 10%)
# ═══════════════════════════════════════════════════════════════════════════

param(
  [Parameter(Mandatory = $true)][string]$In,
  [string]$Out = ".\public\img",
  [switch]$StripWhite,
  [double]$Pad = 0.10
)

# --- checks ---------------------------------------------------------------
if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
  Write-Host "ImageMagick not found." -ForegroundColor Red
  Write-Host "Install it with:  winget install ImageMagick.ImageMagick"
  Write-Host "Then close and reopen PowerShell and run this again."
  exit 1
}
if (-not (Test-Path $In)) { Write-Host "Input folder not found: $In" -ForegroundColor Red; exit 1 }
New-Item -ItemType Directory -Force -Path $Out | Out-Null

# 512 canvas, product resized to fit inside the padded area
$canvas = 512
$inner  = [int]($canvas * (1 - 2 * $Pad))   # 460 at the default 10%

$files = Get-ChildItem -Path $In -File |
         Where-Object { $_.Extension -match '^\.(png|jpg|jpeg|tif|tiff|bmp|gif|webp)$' }

if ($files.Count -eq 0) { Write-Host "No images found in $In" -ForegroundColor Yellow; exit 0 }

Write-Host "Processing $($files.Count) image(s) -> $canvas x $canvas PNG in $Out`n"

$ok = 0; $bad = 0
foreach ($f in $files) {
  $dest = Join-Path $Out ($f.BaseName + ".png")
  $args = @($f.FullName)

  # Optional: knock out a white background. -fuzz gives tolerance for JPEG
  # noise and soft studio backdrops.
  if ($StripWhite) { $args += @("-fuzz", "8%", "-transparent", "white") }

  # Trim surrounding empty space so every product fills the frame consistently,
  # then fit inside the padded box and centre it on a transparent canvas.
  $args += @(
    "-trim", "+repage",
    "-resize", "${inner}x${inner}",
    "-background", "none",
    "-gravity", "center",
    "-extent", "${canvas}x${canvas}",
    "-strip",
    "-define", "png:compression-level=9",
    $dest
  )

  & magick @args 2>$null
  if ($LASTEXITCODE -eq 0) {
    $kb = [math]::Round((Get-Item $dest).Length / 1KB)
    $warn = if ($kb -gt 80) { "  (over 80 KB - consider TinyPNG)" } else { "" }
    Write-Host ("  OK   {0,-34} {1,5} KB{2}" -f $f.Name, $kb, $warn)
    $ok++
  } else {
    Write-Host ("  FAIL {0}" -f $f.Name) -ForegroundColor Red
    $bad++
  }
}

Write-Host "`n$ok converted, $bad failed. Output: $Out" -ForegroundColor Green
Write-Host "Filenames are unchanged apart from the extension - the tool matches"
Write-Host "either the part number (501RG0046.png) or the model (ML624.png)."
if ($StripWhite) {
  Write-Host "`nYou used -StripWhite: open a few results and check that white parts" -ForegroundColor Yellow
  Write-Host "of the products (labels, text, LEDs) have not gone see-through." -ForegroundColor Yellow
}
