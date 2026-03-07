$ErrorActionPreference = "Stop"
$KeyPath = Join-Path $PSScriptRoot "trae_deploy_key"
& ssh-keygen -t ed25519 -f $KeyPath -N "" -C "trae-pvpa-bot" | Out-Null
Write-Host "Generated deploy key:"
Write-Host "$KeyPath"
Write-Host "$KeyPath.pub"
