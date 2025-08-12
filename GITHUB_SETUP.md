# 🚀 Guide pour pousser vers GitHub

## Prérequis
1. **Git installé** : Téléchargez depuis [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. **Compte GitHub** : Connectez-vous à votre compte GitHub

## Étapes pour pousser le projet

### 1. Installer Git (si pas déjà fait)
```bash
# Téléchargez et installez Git depuis https://git-scm.com/downloads
```

### 2. Configurer Git (première utilisation)
```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

### 3. Pousser vers GitHub
```bash
# Dans le dossier kalel-catalogue
git remote add origin https://github.com/CnG990/Kalel-Catalogue.git
git branch -M main
git push -u origin main
```

### 4. Ou utiliser le script PowerShell
```powershell
# Exécuter le script
.\push-to-github.ps1
```

## 🔗 Repository GitHub
- **URL** : https://github.com/CnG990/Kalel-Catalogue
- **Status** : Repository créé et prêt à recevoir le code

## 📦 Après le push

### Déployer sur Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Importez le repository `Kalel-Catalogue`
4. Déployez automatiquement

### Déployer sur Netlify
1. Allez sur [netlify.com](https://netlify.com)
2. Connectez votre compte GitHub
3. Importez le repository `Kalel-Catalogue`
4. Configurez le build command : `npm run build`
5. Déployez

## 🎯 Prochaines étapes
- [ ] Pousser le code vers GitHub
- [ ] Configurer le déploiement automatique
- [ ] Tester le site en production
- [ ] Partager l'URL du site

## 📞 Support
Si vous rencontrez des problèmes :
1. Vérifiez que Git est bien installé
2. Vérifiez vos identifiants GitHub
3. Assurez-vous d'avoir les permissions sur le repository

