<#
  Script opcional para inicializar git, crear repo remoto usando gh (GitHub CLI) si está disponible
  y pushear el proyecto. Requiere que tengas configurado git y gh (autenticado).
  Ejecuta en PowerShell: .\publish-to-github.ps1 -RepoName "mi-repo-masa" -Description "Sitio educativo sobre la capa de ozono"
#>

param(
  [string]$RepoName = "masa-site",
  [string]$Description = "Sitio educativo sobre la capa de ozono",
  [switch]$Public
)

$cwd = Get-Location
if(-not (Test-Path (Join-Path $cwd '.git'))){
  git init
  git add .
  git commit -m "Initial commit"
}

# Prefer gh if disponible
$gh = Get-Command gh -ErrorAction SilentlyContinue
if($gh){
  if($Public.IsPresent){
    $visibility = '--public'
  } else { $visibility = '--private' }
  Write-Host "Creando repo con gh..."
  gh repo create $RepoName --description "$Description" $visibility --source . --remote origin --push
  Write-Host "Repositorio creado y push realizado (o ya existente)."
} else {
  Write-Host "gh (GitHub CLI) no está instalado. Intentando crear remote manual..."
  $remoteUrl = Read-Host "Introduce la URL del remote (p.ej. https://github.com/usuario/mi-repo.git)"
  if($remoteUrl){
    git remote add origin $remoteUrl
    git branch -M main
    git push -u origin main
    Write-Host "Push realizado."
  } else {
    Write-Host "Operación cancelada. Instala GitHub CLI (gh) para crear el repo automáticamente o introduce manualmente el remote."
  }
}
