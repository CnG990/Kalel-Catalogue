Write-Host "Upload rapide vers GitHub" -ForegroundColor Green

# Verifier Git
try {
    git --version
    Write-Host "Git detecte!" -ForegroundColor Green
    
    git remote add origin https://github.com/CnG990/Kalel-Catalogue.git
    git branch -M main
    git push -u origin main
    
    Write-Host "Projet uploade avec Git!" -ForegroundColor Green
} catch {
    Write-Host "Git non disponible" -ForegroundColor Red
    Write-Host "Installer Git: https://git-scm.com/downloads" -ForegroundColor Yellow
}



