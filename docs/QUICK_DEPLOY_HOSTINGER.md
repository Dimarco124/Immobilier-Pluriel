# ⚡ Déploiement Rapide Hostinger (30 minutes)

## 🎯 Résumé Rapide

Pour ceux qui veulent deployer en 30-45 minutes.

---

## 1️⃣ Configuration Hostinger (5 min)

### Via cPanel Dashboard

```
1. Hostinger → Hosting → Manage
2. Advanced → SSH Access → Activer
3. Tools → PHP Info → Vérifier PHP 8.2+
4. Databases → MySQL Databases → Créer:
   - DB: username_immobilier_db
   - User: username_immobilier_user
   - Password: Mot_de_passe_fort_123!
```

---

## 2️⃣ SSH & Code (5 min)

```bash
# 1. Connexion SSH
ssh username@ssh.hostinger.com

# 2. Créer les répertoires
mkdir -p ~/applications
cd ~/applications

# 3. Cloner le code
git clone https://github.com/votre-org/immobilier-pluriel.git
cd immobilier-pluriel

# 4. Afficher la structure
ls -la
# Output: backend/, frontend/, .gitignore, README.md
```

---

## 3️⃣ Backend Laravel (10 min)

```bash
# 1. Aller au backend
cd backend

# 2. Copier .env
cp .env.example .env

# 3. Éditer .env (les valeurs clés)
nano .env

# Changer:
# APP_URL=https://immobilierpluriel.com
# APP_ENV=production
# APP_DEBUG=false
# DB_HOST=127.0.0.1
# DB_DATABASE=username_immobilier_db
# DB_USERNAME=username_immobilier_user
# DB_PASSWORD=Mot_de_passe_fort_123!

# 4. Générer APP_KEY
php artisan key:generate

# 5. Installer dépendances
composer install --no-dev --optimize-autoloader

# 6. Permissions
chmod -R 755 .
chmod -R 775 storage bootstrap/cache

# 7. Migrations (créer tables)
php artisan migrate --force
php artisan db:seed --force

# 8. Optimiser
php artisan config:cache
php artisan route:cache
```

---

## 4️⃣ Frontend React (10 min)

```bash
# 1. Aller au frontend
cd ../frontend

# 2. Installer npm
npm install

# 3. Build
npm run build

# 4. Copier les fichiers dans le public_html
# Via cPanel :
# File Manager → public_html → Vider le dossier
# Upload les fichiers du dossier 'dist/'

# OU via SSH :
mkdir -p ~/domains/immobilierpluriel.com/public_html
rm -rf ~/domains/immobilierpluriel.com/public_html/*
cp -r dist/* ~/domains/immobilierpluriel.com/public_html/
```

---

## 5️⃣ Configurer le Domaine (5 min)

### Via cPanel

1. **Addon Domains** ou **Domains**
2. Créer sous-domaine : `api.immobilierpluriel.com`
3. Pointer vers : `/home/username/applications/immobilier-pluriel/backend/public`
4. Auto SSL → Generate SSL → Vérifier ✓

---

## 6️⃣ Tester (5 min)

```bash
# 1. Frontend
https://immobilierpluriel.com

# 2. API
https://api.immobilierpluriel.com/api/hero-slides

# 3. Admin
https://immobilierpluriel.com/admin
# Login: Admin@immobilierpluriel.com / Pluriel@2024

# 4. Formulaire de contact
# Envoyer un test
# Vérifier dans : Admin → Messages
```

---

## 🆘 Erreurs Communes

| Erreur | Solution |
|--------|----------|
| 500 Error | `tail -f backend/storage/logs/laravel.log` |
| Database Error | Vérifier DB_PASSWORD dans .env |
| React Page Vide | Copier dist/ dans public_html |
| SSL Error | Attendre 5 min, puis recharger |
| Email Non Reçu | Vérifier MAIL_FROM dans .env |

---

## ✅ Checklist

- [ ] SSH accès OK
- [ ] Code cloné
- [ ] .env configuré
- [ ] Dépendances installées
- [ ] Migrations exécutées
- [ ] Frontend compilé
- [ ] Fichiers copiés dans public_html
- [ ] SSL activé
- [ ] Tests OK

---

## 📞 Besoin d'Aide ?

Voir le guide complet : **DEPLOYMENT_HOSTINGER.md**

```bash
cat DEPLOYMENT_HOSTINGER.md
```

---

**Temps total estimé : 30-45 minutes**

Bonne chance ! 🚀
