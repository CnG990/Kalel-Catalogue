# Script pour pousser le projet Kalel-Catalogue vers GitHub
# Utilisez ce script après avoir installé Git

Write-Host "🚀 Poussage du projet Kalel-Catalogue vers GitHub..." -ForegroundColor Green

# Vérifier si Git est installé
try {
    git --version
    Write-Host "✅ Git est installé" -ForegroundColor Green
} catch {
    Write-Host "❌ Git n'est pas installé. Veuillez installer Git d'abord." -ForegroundColor Red
    Write-Host "Téléchargez Git depuis: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}

# Ajouter le remote origin
Write-Host "📡 Ajout du remote GitHub..." -ForegroundColor Blue
git remote add origin https://github.com/CnG990/Kalel-Catalogue.git

# Vérifier le remote
Write-Host "🔍 Vérification du remote..." -ForegroundColor Blue
git remote -v

# Pousser vers GitHub
Write-Host "⬆️ Poussage vers GitHub..." -ForegroundColor Blue
git branch -M main
git push -u origin main

Write-Host "✅ Projet poussé avec succès vers GitHub!" -ForegroundColor Green
Write-Host "🌐 Repository: https://github.com/CnG990/Kalel-Catalogue" -ForegroundColor Cyan

