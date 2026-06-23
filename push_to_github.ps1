# Script à exécuter depuis le dossier du projet
# Clic droit > "Exécuter avec PowerShell"
# (ou ouvre un terminal dans ce dossier et tape : .\push_to_github.ps1)

Set-Location $PSScriptRoot

$BRANCH = "feat/submit-page-supabase-schema"

Write-Host "Suppression du verrou git..." -ForegroundColor Yellow
Remove-Item ".git\index.lock" -Force -ErrorAction SilentlyContinue

Write-Host "Récupération des derniers commits GitHub..." -ForegroundColor Yellow
git fetch origin

Write-Host "Mise à jour de main en local..." -ForegroundColor Yellow
git checkout main
git merge --ff-only origin/main

Write-Host "Création de la branche $BRANCH..." -ForegroundColor Cyan
git checkout -b $BRANCH

Write-Host "Ajout des fichiers modifiés..." -ForegroundColor Yellow
git add .

Write-Host "Commit..." -ForegroundColor Yellow
git commit -m "feat: page submit deal, schema Supabase complet, lien Navbar"

Write-Host "Push de la branche..." -ForegroundColor Yellow
git push origin $BRANCH

Write-Host ""
Write-Host "Branche poussée ! Ouvre la PR ici :" -ForegroundColor Green
Write-Host "https://github.com/dhouha-boussalem/girlabs/compare/$BRANCH" -ForegroundColor Cyan
Write-Host ""
Write-Host "Appuie sur Entrée pour fermer."
Read-Host
