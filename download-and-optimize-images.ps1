<#
  Script para descargar y generar versiones responsivas de imágenes.
  Nota: usa System.Drawing para redimensionar (funciona en Windows con .NET Framework).
  Ejecuta: .\download-and-optimize-images.ps1
#>
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$outDir = Join-Path $PSScriptRoot 'assets'
if(-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$images = @{
  'ozone' = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200'
  'ozone2' = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200'
  'ozone3' = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200'
}

$sizes = @(400,800,1200)
foreach($key in $images.Keys){
  $url = $images[$key]
  $orig = Join-Path $outDir ($key + '-orig.jpg')
  Write-Host "Descargando $orig ..."
  Invoke-WebRequest -Uri $url -OutFile $orig
  Add-Type -AssemblyName System.Drawing
  $img = [System.Drawing.Image]::FromFile($orig)
  foreach($w in $sizes){
    $ratio = $w / [double]$img.Width
    $h = [int]([Math]::Round($img.Height * $ratio))
    $thumb = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($thumb)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $w, $h)
    $out = Join-Path $outDir ($key + "-$w.jpg")
    $thumb.Save($out, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose(); $thumb.Dispose()
    Write-Host "Guardado $out"
  }
  $img.Dispose()
}

Write-Host "Listo. Revisa assets/ para las versiones responsivas (400,800,1200)."
