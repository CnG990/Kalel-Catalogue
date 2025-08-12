# Script pour uploader le projet vers GitHub via l'API
# Nécessite un token GitHub personnel

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubToken,
    
    [Parameter(Mandatory=$true)]
    [string]$Username = "CnG990",
    
    [Parameter(Mandatory=$true)]
    [string]$Repository = "Kalel-Catalogue"
)

Write-Host "🚀 Upload du projet vers GitHub via API..." -ForegroundColor Green

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

# Fichiers à uploader (excluant node_modules et autres)
$filesToUpload = @(
    "package.json",
    "vite.config.ts",
    "tsconfig.json",
    "tsconfig.node.json",
    "tailwind.config.js",
    "postcss.config.js",
    "index.html",
    "vercel.json",
    "README.md",
    "GITHUB_SETUP.md",
    "push-to-github.ps1",
    "src/main.tsx",
    "src/App.tsx",
    "src/index.css",
    "src/components/CataloguePage.tsx",
    "public/logo.png"
)

# Upload des fichiers
foreach ($file in $filesToUpload) {
    if (Test-Path $file) {
        $content = Convert-ToBase64 -FilePath $file
        $message = "Add $file - Initial commit"
        Upload-FileToGitHub -FilePath $file -Content $content -Message $message
    } else {
        Write-Host "⚠️ Fichier non trouvé: $file" -ForegroundColor Yellow
    }
}

Write-Host "✅ Upload terminé!" -ForegroundColor Green
Write-Host "🌐 Repository: https://github.com/$Username/$Repository" -ForegroundColor Cyan

