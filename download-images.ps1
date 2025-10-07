<#
  Script opcional: descarga imágenes públicas de ejemplo dentro de la carpeta assets.
  Ejecuta en PowerShell: .\download-images.ps1
  Nota: requiere conexión a Internet.
#>
# Forzar TLS1.2 (necesario en algunos entornos)
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$out = Join-Path $PSScriptRoot 'assets'
if(-not (Test-Path $out)) { New-Item -ItemType Directory -Path $out | Out-Null }
$urls = @{
  'ozone1.jpg' = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200'
  'ozone2.jpg' = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200'
  'ozone3.jpg' = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200'
}

foreach($name in $urls.Keys){
  $dest = Join-Path $out $name
  Write-Host "Descargando $name ..."
  try{
    Invoke-WebRequest -Uri $urls[$name] -OutFile $dest
    Write-Host "Guardado en $dest"
  } catch {
    $msg = $_.Exception.Message -replace "`n"," "
    Write-Host ("Error al descargar {0}: {1}" -f $name, $msg) -ForegroundColor Yellow
  }
}

Write-Host "Listo. Reemplaza o actualiza las referencias en index.html si lo deseas."
