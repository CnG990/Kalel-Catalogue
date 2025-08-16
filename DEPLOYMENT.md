# 🚀 Déploiement du Catalogue Kalel Sa Match

## Options de déploiement

### 1. GitHub (Recommandé)

#### Prérequis
- Compte GitHub
- Token GitHub personnel avec permissions `repo`

#### Étapes

1. **Créer un token GitHub**
   - Allez sur GitHub.com → Settings → Developer settings → Personal access tokens
   - Créez un nouveau token avec les permissions `repo`
   - Copiez le token

2. **Utiliser le script PowerShell**
   ```powershell
   .\upload-catalogue.ps1 -GitHubToken "VOTRE_TOKEN_GITHUB"
   ```

3. **Ou utiliser Git (si installé)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Catalogue Kalel Sa Match"
   git branch -M main
   git remote add origin https://github.com/CnG990/Kalel-Catalogue.git
   git push -u origin main
   ```

### 2. Netlify

1. **Connectez votre repository GitHub à Netlify**
2. **Configuration de build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` ou plus récent

### 3. Vercel

1. **Connectez votre repository GitHub à Vercel**
2. **Configuration automatique**
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

### 4. VPS + Docker

1. **Cloner le repository**
   ```bash
   git clone https://github.com/CnG990/Kalel-Catalogue.git
   cd Kalel-Catalogue
   ```

2. **Build et déployer**
   ```bash
   docker-compose up -d
   ```

## 📁 Structure des fichiers

```
kalel-catalogue/
├── src/
│   ├── components/
│   │   └── CataloguePage.tsx    # Page principale du catalogue
│   ├── services/
│   │   └── pdfService.ts        # Service de génération PDF
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   ├── logo.png                 # Logo principal
│   └── logo sans background.png # Logo pour PDF
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🔧 Configuration

### Variables d'environnement
Créez un fichier `.env` :
```env
VITE_APP_TITLE=Kalel Sa Match
VITE_APP_DESCRIPTION=Catalogue de la solution de gestion de terrains
```

### Personnalisation
- **Couleurs** : Modifiez `tailwind.config.js`
- **Contenu** : Modifiez `src/components/CataloguePage.tsx`
- **PDF** : Modifiez `src/services/pdfService.ts`

## 📞 Support

- **WhatsApp** : +221 78 594 92 74
- **Email** : cheikhngom99@gmail.com
- **Site** : https://kalel-sa-match.com

## 📄 Licence

Projet privé - Kalel Sa Match © 2024
