# Script robuste pour uploader le catalogue vers GitHub
# Gère l'encodage UTF-8 correctement

Write-Host "Upload du catalogue Kalel Sa Match vers GitHub..." -ForegroundColor Green

# Configuration
$Username = "CnG990"
$Repository = "Kalel-Catalogue"
$Branch = "main"

# Demander le token GitHub
$GitHubToken = Read-Host "Entrez votre token GitHub" -AsSecureString
$GitHubToken = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($GitHubToken))

if ([string]::IsNullOrEmpty($GitHubToken)) {
    Write-Host "Token GitHub requis!" -ForegroundColor Red
    exit 1
}

# Fonction pour encoder en base64 avec gestion d'encodage
function Convert-ToBase64 {
    param([string]$FilePath)
    
    try {
        # Lire le fichier en tant que bytes
        $bytes = [System.IO.File]::ReadAllBytes($FilePath)
        return [System.Convert]::ToBase64String($bytes)
    }
    catch {
        Write-Host "Erreur lecture fichier $FilePath : $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Fonction pour upload un fichier
function Upload-FileToGitHub {
    param(
        [string]$FilePath,
        [string]$Content,
        [string]$Message
    )
    
    if ([string]::IsNullOrEmpty($Content)) {
        Write-Host "Contenu vide pour $FilePath" -ForegroundColor Yellow
        return
    }
    
    $headers = @{
        "Authorization" = "token $GitHubToken"
        "Accept" = "application/vnd.github.v3+json"
    }
    
    $body = @{
        message = $Message
        content = $Content
        branch = $Branch
    } | ConvertTo-Json -Depth 10
    
    $uri = "https://api.github.com/repos/$Username/$Repository/contents/$FilePath"
    
    try {
        $response = Invoke-RestMethod -Uri $uri -Method Put -Headers $headers -Body $body -ContentType "application/json"
        Write-Host "Uploadé: $FilePath" -ForegroundColor Green
        return $response
    }
    catch {
        Write-Host "Erreur pour $FilePath : $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Fichiers à uploader (sans caractères spéciaux dans les noms)
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
    "src/services/pdfService.ts"
)

Write-Host "Upload de $($filesToUpload.Count) fichiers..." -ForegroundColor Blue

# Upload des fichiers
foreach ($file in $filesToUpload) {
    if (Test-Path $file) {
        Write-Host "Traitement de $file..." -ForegroundColor Yellow
        $content = Convert-ToBase64 -FilePath $file
        if ($content) {
            $message = "Update $file - Catalogue Kalel Sa Match v2.0"
            Upload-FileToGitHub -FilePath $file -Content $content -Message $message
            Start-Sleep -Milliseconds 2000  # Pause plus longue
        }
    } else {
        Write-Host "Fichier non trouvé: $file" -ForegroundColor Yellow
    }
}

Write-Host "Upload terminé!" -ForegroundColor Green
Write-Host "Repository: https://github.com/$Username/$Repository" -ForegroundColor Cyan
Write-Host "Deploiement: https://ksm-catalogue.vercel.app" -ForegroundColor Cyan

