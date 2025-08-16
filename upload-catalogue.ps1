# Script pour uploader le catalogue Kalel Sa Match vers GitHub
# Nécessite un token GitHub personnel

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubToken,
    
    [string]$Username = "CnG990",
    [string]$Repository = "Kalel-Catalogue"
)

Write-Host "🚀 Upload du catalogue Kalel Sa Match vers GitHub..." -ForegroundColor Green

# Fonction pour encoder en base64
function Convert-ToBase64 {
    param([string]$FilePath)
    $bytes = [System.IO.File]::ReadAllBytes($FilePath)
    return [System.Convert]::ToBase64String($bytes)
}

# Fonction pour upload un fichier
function Upload-FileToGitHub {
    param(
        [string]$FilePath,
        [string]$Content,
        [string]$Message
    )
    
    $headers = @{
        "Authorization" = "token $GitHubToken"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    $body = @{
        message = $Message
        content = $Content
    } | ConvertTo-Json
    
    $uri = "https://api.github.com/repos/$Username/$Repository/contents/$FilePath"
    
    try {
        $response = Invoke-RestMethod -Uri $uri -Method Put -Headers $headers -Body $body -ContentType "application/json"
        Write-Host "✅ Uploadé: $FilePath" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "❌ Erreur pour $FilePath : $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Fichiers principaux à uploader
$filesToUpload = @(
    "package.json",
    "vite.config.ts",
    "tsconfig.json",
    "tsconfig.node.json",
    "tailwind.config.js",
    "postcss.config.js",
    "index.html",
    "README.md",
    ".gitignore",
    "src/main.tsx",
    "src/App.tsx",
    "src/index.css",
    "src/components/CataloguePage.tsx",
    "src/services/pdfService.ts",
    "public/logo.png",
    "public/logo sans background.png"
)

Write-Host "📁 Upload de $($filesToUpload.Count) fichiers..." -ForegroundColor Blue

# Upload des fichiers
foreach ($file in $filesToUpload) {
    if (Test-Path $file) {
        $content = Convert-ToBase64 -FilePath $file
        $message = "Add $file - Catalogue Kalel Sa Match"
        Upload-FileToGitHub -FilePath $file -Content $content -Message $message
        Start-Sleep -Milliseconds 500  # Pause pour éviter les limites d'API
    } else {
        Write-Host "⚠️ Fichier non trouvé: $file" -ForegroundColor Yellow
    }
}

Write-Host "✅ Upload terminé!" -ForegroundColor Green
Write-Host "🌐 Repository: https://github.com/$Username/$Repository" -ForegroundColor Cyan
Write-Host "📖 Pour utiliser ce script:" -ForegroundColor Yellow
Write-Host "   .\upload-catalogue.ps1 -GitHubToken 'VOTRE_TOKEN_GITHUB'" -ForegroundColor White
