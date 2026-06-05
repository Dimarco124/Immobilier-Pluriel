# ✅ Checklist Git - Vérification de Sécurité

## 🔍 Analyse de Sécurité

### ✅ SAFE - Fichiers pouvant être commitées

#### Backend
- ✅ `app/` - Code source (contrôleurs, modèles, commandes)
- ✅ `routes/` - Définition des routes
- ✅ `config/` - Configuration (sauf .env)
- ✅ `database/migrations/` - Migrations
- ✅ `database/seeders/` - Seeders avec données démo
- ✅ `bootstrap/` - Bootstrap files
- ✅ `public/` - Assets publics
- ✅ `composer.json` et `composer.lock` - Dépendances

#### Frontend
- ✅ `src/` - Code source (composants, pages, styles)
- ✅ `public/` - Assets publics
- ✅ `package.json` et `package-lock.json` - Dépendances
- ✅ `vite.config.js` - Configuration Vite
- ✅ `tsconfig.json` / `eslint.config.js` - Configurations

#### Root
- ✅ `.gitignore` - Fichiers à ignorer
- ✅ `README.md` - Documentation
- ✅ `SECURITY.md` - Guide de sécurité
- ✅ `.editorconfig` - Configuration éditeur

### ❌ NEVER - Fichiers à NE JAMAIS commiter

#### Backend
- ❌ `.env` - Variables d'environnement sensibles
  - APP_KEY (clé chiffrée)
  - Identifiants DB
  - Clés API
  - Clés d'email
  
- ❌ `database/database.sqlite` - Base de données locale
  - Contient les données de développement
  
- ❌ `vendor/` - Dépendances PHP
  - Trop volumineux
  - Peut être régénéré avec `composer install`
  
- ❌ `storage/logs/` - Fichiers de logs
  - Contient des informations sensibles
  
- ❌ `storage/framework/cache/` - Cache
  
- ❌ `public/storage` - Lien symbolique
  
- ❌ `.phpunit.result.cache` - Cache de tests
  
- ❌ `bootstrap/cache/packages.php` - Cache de packages

#### Frontend
- ❌ `.env` et `.env.local` - Variables d'environnement
  
- ❌ `node_modules/` - Dépendances Node
  - Peut être régénéré avec `npm install`
  
- ❌ `dist/` - Build compilée
  - Générée par `npm run build`

#### Root
- ❌ `.vscode/` - Paramètres IDE personnels
  
- ❌ `.idea/` - Paramètres JetBrains personnels
  
- ❌ `.DS_Store` - Fichier système macOS

## 📋 Commandes Git Préparatoires

### 1. Vérifier l'état actuel
```bash
git status
```

### 2. Vérifier les fichiers ignorés
```bash
git check-ignore -v *
git check-ignore -v backend/*
git check-ignore -v frontend/*
```

### 3. Voir ce qui sera commité
```bash
git add .
git status
```

### 4. Avant de pousser
```bash
# Vérifier qu'aucun fichier sensible n'est stagé
git diff --cached --name-only

# Exemple de sortie BONNE
# app/Http/Controllers/AdminController.php
# app/Models/User.php
# .gitignore
# README.md

# Exemple de sortie MAUVAISE (à éviter)
# .env                          ❌ DANGER
# database/database.sqlite      ❌ DANGER
# storage/logs/app.log          ❌ DANGER
```

## 🚀 Procédure de Push Sécurisé

### 1. Créer un nouveau repository (une seule fois)
```bash
git init
git add .
git commit -m "Initial commit: Immobilier Pluriel project"
```

### 2. Ajouter le remote (une seule fois)
```bash
git remote add origin https://github.com/votre-org/immobilier-pluriel.git
git branch -M main
git push -u origin main
```

### 3. Pour les pushes suivants
```bash
git add .
git commit -m "Description du changement"
git push
```

## 📝 Content Check Before Push

### ✅ À Vérifier

1. **Pas de .env**
   ```bash
   git ls-files | grep "\.env"  # Ne devrait retourner rien
   ```

2. **Pas de database.sqlite**
   ```bash
   git ls-files | grep "\.sqlite"  # Ne devrait retourner rien
   ```

3. **Pas de node_modules**
   ```bash
   git ls-files | grep "node_modules"  # Ne devrait retourner rien
   ```

4. **Pas de vendor**
   ```bash
   git ls-files | grep "vendor"  # Ne devrait retourner rien
   ```

5. **Vérifier les fichiers sensibles explicitement**
   ```bash
   git ls-files | grep -E "(\.env|\.key|\.sqlite|node_modules|vendor|\.log)"
   # Doit retourner rien ou seulement .env.example
   ```

## 🔒 Sécurité Supplémentaire

### 1. Ajouter un pre-commit hook (optionnel)
```bash
#!/bin/bash
# .git/hooks/pre-commit

# Vérifier qu'aucun fichier sensible n'est stagé
if git diff --cached --name-only | grep -E "\.env$|database\.sqlite|node_modules|vendor"; then
    echo "❌ ERREUR: Tentative de commit de fichiers sensibles!"
    exit 1
fi
```

### 2. Protéger les branches sensibles
Sur GitHub/GitLab, configurer les règles de protection de branche :
- Exiger des reviews
- Exiger que les tests passent
- Exiger les mises à jour

### 3. Secret Scanner
Utiliser des outils comme :
- GitHub Secret Scanning
- GitLab Secret Scanning
- TruffleHog

## 📊 Résumé Fichiers à Commiter

```
✅ ~150-200 fichiers peuvent être commitées (code source)
❌ ~1000+ fichiers à ignorer (dépendances, données sensibles)

Taille estimée du repo après push:
- Code source: ~2-5 MB
- Dépendances: Récupérées via package.json/composer.json
- Base de données: Créée via migrations
```

## 🎯 Commandes Rapides

```bash
# Voir tous les fichiers qui SERONT commitées
git add -n .

# Voir l'état des fichiers non commitées
git status

# Voir ce qui sera commitées
git diff --cached

# Annuler des changements
git reset HEAD <fichier>

# Voir les fichiers ignorés
git check-ignore -v -a .
```

---

**✅ Le projet EST PRÊT À ÊTRE PUSHÉ sur GitHub/GitLab**

Aucune donnée sensible n'est exposée si vous suivez ce checklist.
