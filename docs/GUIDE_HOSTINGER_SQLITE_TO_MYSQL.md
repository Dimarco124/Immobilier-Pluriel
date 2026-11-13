# 🚀 GUIDE HOSTINGER - SQLite vers MySQL (Adapté)

**Durée totale : 40 minutes**

---

# 📋 TABLE DES MATIÈRES

1. [Exporter SQLite localement](#étape-1--exporter-votre-base-sqlite-localement)
2. [S'inscrire/Accéder à Hostinger](#étape-2--sinscrireaccéder-à-hostinger)
3. [Configuration du cPanel](#étape-3--configuration-du-cpanel)
4. [Créer la base MySQL](#étape-4--créer-la-base-de-données-mysql)
5. [Uploader le backup SQL](#étape-5--uploader-votre-backup)
6. [Importer la base](#étape-6--importer-la-base-de-données)
7. [Se connecter en SSH](#étape-7--se-connecter-en-ssh)
8. [Cloner le code](#étape-8--cloner-le-code)
9. [Configurer le Backend MySQL](#étape-9--configurer-le-backend)
10. [Configurer le Frontend](#étape-10--configurer-le-frontend)
11. [Tester](#étape-11--tester)

---

# ⏰ PHASE 1 : EXPORTER VOTRE BASE SQLITE LOCALEMENT (5 minutes)

## Étape 1 : Exporter votre Base SQLite Localement

### Lisez d'abord

**Avant de continuer, lisez :** `EXPORT_SQLITE_TO_SQL.md`

Ce guide explique comment exporter votre SQLite en SQL.

**Une fois que vous avez le fichier `backup_immobilier.sql`, revenez ici.**

---

# 🌐 PHASE 2 : HOSTINGER CONFIGURATION

## Étape 2 : S'inscrire/Accéder à Hostinger

### Aller sur Hostinger

1. **Ouvrir le navigateur**
2. **Aller à :** https://hostinger.com
3. **Cliquer sur "Plans"** ou "Sign In" si déjà compte

### Si vous achetez :

1. **Choisir le plan** : "Business" ou "Cloud Hosting"
2. **Ajouter le domaine** : immobilierpluriel.com
3. **Compléter le paiement**
4. **Attendre l'email de confirmation** (5-10 minutes)

### Après l'achat

```
Vous recevrez un email avec :
- Hosting Account Username (exemple: u123456789)
- Hosting Account Password (exemple: P@ssw0rd123)
- cPanel URL (exemple: cPanel.hostinger.com)
```

**Sauvegardez ces identifiants !**

---

## Étape 3 : Configuration du cPanel

### Accéder au cPanel

1. **Ouvrir l'email Hostinger**
2. **Cliquer sur le lien cPanel** ou aller à : `https://cPanel.hostinger.com`
3. **Login :**
   - Username: u123456789 (ce que vous avez reçu)
   - Password: P@ssw0rd123 (ce que vous avez reçu)
   - **Cliquer "Log In"**

### Vous êtes maintenant dans le cPanel

**Vous devez voir un tableau de bord avec plusieurs options**

### Vérifier PHP 8.2+

1. **Dans la barre de recherche du cPanel**, tapez : `PHP Info`
2. **Cliquer sur "PHP Info"** ou "Select PHP Version"
3. **Vérifier que vous avez PHP 8.2 ou supérieur**
   - Si c'est 8.0 ou 8.1, cliquer le bouton pour sélectionner 8.2+

### Activer SSH

1. **Dans le cPanel**, aller à : **Advanced** → **SSH Access**
2. **Si c'est écrit "Enable"**, cliquer le bouton
3. **Vous verrez :**
   ```
   SSH Host: ssh.hostinger.com
   Port: 22
   Username: u123456789
   Password: P@ssw0rd123
   ```
   **Notez bien ces informations.**

---

## Étape 4 : Créer la Base de Données MySQL

### Dans le cPanel

1. **Aller à : Databases** → **MySQL Databases**
2. **Vous verrez un formulaire "Create New Database"**

### Remplir le formulaire :

**Database Name :**
```
immobilier_db
```

**Cliquer "Create Database"**

### Créer l'utilisateur

1. **Dans la même page, voir la section "MySQL Users"**
2. **Username :**
   ```
   immobilier_user
   ```
3. **Password :** (générer une clé forte)
   ```
   Vr8!kL@m9pQxZ2wN
   ```
   **Copier ce password quelque part en sécurité**

4. **Cliquer "Create User"**

### Ajouter les privilèges

1. **Voir la section "Add User To Database"**
2. **Sélectionner :**
   - User: `immobilier_user`
   - Database: `immobilier_db`
   - **Cliquer "Add"**
3. **Cocher "ALL PRIVILEGES"**
4. **Cliquer "Make Changes"**

**Parfait ! Votre base MySQL est prête.**

---

# 📤 PHASE 3 : UPLOADER LE BACKUP

## Étape 5 : Uploader votre Backup SQL

### Via cPanel File Manager (Le Plus Simple)

1. **Dans le cPanel**, aller à : **Files** → **File Manager**
2. **Créer un dossier pour les backups :**
   - Cliquer le bouton **"+ Folder"**
   - Nommer : `backups`
   - Cliquer "Create"
3. **Entrer dans le dossier `backups`**
4. **Cliquer le bouton "Upload"**
5. **Sélectionner le fichier** : `backup_immobilier.sql`
6. **Attendre la fin de l'upload** (progressbar)

---

# 📥 PHASE 4 : IMPORTER LA BASE DE DONNÉES

## Étape 6 : Importer le Backup SQL

### Via phpMyAdmin du cPanel

1. **Dans le cPanel**, aller à : **Databases** → **phpMyAdmin**
2. **Vous êtes automatiquement connecté**
3. **Voir la barre latérale gauche**
4. **Cliquer sur votre base de données :** `u123456789_immobilier_db`
5. **Cliquer l'onglet "Import"**
6. **Cliquer "Choose File"**
7. **Sélectionner** : `backup_immobilier.sql` (depuis votre cPanel uploads/backups)
8. **Cliquer "Import"**
9. **Attendre le message de succès**

### Vérifier que ça a marché

1. **Cliquer l'onglet "Databases"** (en haut)
2. **Cliquer sur votre base de données**
3. **Vous devez voir les tables :**
   - terrains
   - contact_submissions
   - projects
   - users
   - news
   - Et plein d'autres...

4. **Cliquer sur "terrains"** et regarder les données

**Excellent ! Vos données sont maintenant sur Hostinger MySQL.**

---

# 🔐 PHASE 5 : CONNEXION SSH

## Étape 7 : Se Connecter en SSH

### Sur votre ordinateur, ouvrir Terminal/PowerShell

**DOSSIER ACTUEL :** N'importe quel dossier

```bash
ssh u123456789@ssh.hostinger.com
```

**Quand demandé :**
```
Are you sure you want to continue connecting (yes/no)? → yes
Password: P@ssw0rd123
```

**Vous devez voir quelque chose comme :**
```
u123456789@server ~$
```

**Vous êtes connecté à Hostinger !**

### Créer les répertoires

**DOSSIER ACTUEL :** N'importe quel dossier (après SSH)

**Copier cette commande entière :**

```bash
mkdir -p ~/applications ~/domains/immobilierpluriel.com/public_html ~/backups
```

**Appuyer sur Entrée**

---

# 📥 PHASE 6 : CLONER LE CODE

## Étape 8 : Cloner votre Code depuis GitHub

### D'abord, générer une clé SSH sur Hostinger

**DOSSIER ACTUEL :** N'importe quel dossier

**Copier cette commande :**

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github -C "hostinger@immobilierpluriel.com"
```

**Quand demandé pour passphrase, juste appuyer sur Entrée 2 fois**

### Afficher la clé publique

```bash
cat ~/.ssh/github.pub
```

**Copier tout ce qui s'affiche (commence par ssh-rsa)**

### Ajouter la clé à GitHub

1. **Aller à GitHub** : https://github.com/settings/ssh/new
2. **Title :** `Hostinger Deployment`
3. **Key :** Coller la clé que vous avez copiée
4. **Cliquer "Add SSH key"**

### Configurer Git sur Hostinger

**DOSSIER ACTUEL :** N'importe quel dossier

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@gmail.com"
ssh-add ~/.ssh/github
```

### Cloner le repository

**DOSSIER ACTUEL :** Allez dans `/home/u123456789/applications`

```bash
cd ~/applications
```

**Maintenant vous êtes dans `~/applications`. Cloner :**

```bash
git clone git@github.com:votre-org/immobilier-pluriel.git
```

**Vérifier que ça a marché :**

```bash
cd immobilier-pluriel
ls -la
```

**Vous devez voir :**
```
backend/
frontend/
.gitignore
README.md
```

---

# ⚙️ PHASE 7 : CONFIGURER LE BACKEND POUR MYSQL

## Étape 9 : Configurer Laravel Backend (MySQL)

### Aller au répertoire backend

**DOSSIER ACTUEL :** `/home/u123456789/applications/immobilier-pluriel`

**Allez dans backend :**

```bash
cd ~/applications/immobilier-pluriel/backend
```

**DOSSIER ACTUEL MAINTENANT :** `/home/u123456789/applications/immobilier-pluriel/backend`

### Copier et éditer le .env

```bash
cp .env.example .env
nano .env
```

**L'éditeur nano s'ouvre. Vous devez trouver et modifier :**

```
APP_NAME="Immobilier Pluriel"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://immobilierpluriel.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u123456789_immobilier_db
DB_USERNAME=immobilier_user
DB_PASSWORD=Vr8!kL@m9pQxZ2wN

MAIL_MAILER=smtp
MAIL_HOST=mail.immobilierpluriel.com
MAIL_PORT=465
MAIL_USERNAME=noreply@immobilierpluriel.com
MAIL_PASSWORD=votre_email_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@immobilierpluriel.com
```

**Pour naviguer dans nano :**
- Flèches pour bouger
- Ctrl+W pour rechercher
- Ctrl+K pour effacer une ligne

**Quand fini, sauvegarder :**
- Appuyer Ctrl+O
- Appuyer Entrée
- Appuyer Ctrl+X

### Générer la clé APP_KEY

**DOSSIER ACTUEL :** `/home/u123456789/applications/immobilier-pluriel/backend`

```bash
php artisan key:generate
```

**Vous devez voir :**
```
Application key set successfully.
```

### Installer les dépendances

**DOSSIER ACTUEL :** `/home/u123456789/applications/immobilier-pluriel/backend` (idem)

```bash
composer install --no-dev --optimize-autoloader
```

**Cela peut prendre 2-3 minutes. Attendez la fin.**

### Configurer les permissions

**DOSSIER ACTUEL :** `/home/u123456789/applications/immobilier-pluriel/backend` (idem)

```bash
chmod -R 755 .
chmod -R 775 storage bootstrap/cache
chmod -R 755 public
```

### Vérifier la connexion à la base de données MySQL

**DOSSIER ACTUEL :** `/home/u123456789/applications/immobilier-pluriel/backend` (idem)

```bash
php artisan tinker
```

**Dans tinker, copier :**

```bash
DB::table('terrains')->count()
```

**Vous devez voir le nombre de terrains (25 par exemple)**

**Quitter tinker :**

```bash
exit
```

### Optimiser Laravel

**DOSSIER ACTUEL :** `/home/u123456789/applications/immobilier-pluriel/backend` (idem)

```bash
php artisan config:cache
php artisan route:cache
```

---

# 🎨 PHASE 8 : CONFIGURER LE FRONTEND

## Étape 10 : Configurer React Frontend

### Aller au répertoire frontend

**DOSSIER ACTUEL :** `/home/u123456789/applications/immobilier-pluriel/backend`

**Allez dans frontend :**

```bash
cd ~/applications/immobilier-pluriel/frontend
```

**DOSSIER ACTUEL MAINTENANT :** `/home/u123456789/applications/immobilier-pluriel/frontend`

### Installer npm

**DOSSIER ACTUEL :** `/home/u123456789/applications/immobilier-pluriel/frontend`

```bash
npm install
```

**Cela peut prendre 3-5 minutes. C'est normal.**

### Créer le .env

**DOSSIER ACTUEL :** `/home/u123456789/applications/immobilier-pluriel/frontend` (idem)

```bash
echo 'VITE_API_URL=https://api.immobilierpluriel.com/api' > .env
```

**Vérifier :**

```bash
cat .env
```

### Compiler le frontend

**DOSSIER ACTUEL :** `/home/u123456789/applications/immobilier-pluriel/frontend` (idem)

```bash
npm run build
```

**Attendre que ce soit fini. Vous devez voir :**
```
✓ built in XXs
```

### Copier les fichiers compilés

**DOSSIER ACTUEL :** `/home/u123456789/applications/immobilier-pluriel/frontend` (idem)

```bash
rm -rf ~/domains/immobilierpluriel.com/public_html/*
cp -r dist/* ~/domains/immobilierpluriel.com/public_html/
```

### Créer les .htaccess

**Pour le frontend (React Router) :**

**DOSSIER ACTUEL :** N'importe quel dossier

```bash
cat > ~/domains/immobilierpluriel.com/public_html/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
    RewriteRule ^(.*)$ https://%1/$1 [L,R=301]
    
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
EOF
```

**Pour le backend (Laravel API) :**

**DOSSIER ACTUEL :** N'importe quel dossier (peut rester le même)

```bash
cat > ~/applications/immobilier-pluriel/backend/public/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews
    </IfModule>

    RewriteEngine On

    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)/$ /$1 [L,R=301]

    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
EOF
```

---

# 🧪 PHASE 9 : TESTER

## Étape 11 : Tester le Site

### Attendre quelques minutes (5 minutes)

**La propagation DNS peut prendre du temps**

### Test 1 : Frontend

**Ouvrir dans le navigateur :**
```
https://immobilierpluriel.com
```

**Vérifier :**
- ✓ Page charge
- ✓ Vous voyez vos terrains
- ✓ Les images s'affichent
- ✓ Pas d'erreurs en rouge

### Test 2 : API

**Ouvrir dans le navigateur :**
```
https://api.immobilierpluriel.com/api/terrains
```

**Vous devez voir un JSON avec vos terrains**

### Test 3 : Admin

**Ouvrir :**
```
https://immobilierpluriel.com/admin
```

**Login :**
- Email: `Admin@immobilierpluriel.com`
- Password: `Pluriel@2024`

**Vérifier :**
- ✓ Connexion fonctionne
- ✓ Dashboard affiche les stats
- ✓ Les messages s'affichent
- ✓ Les terrains s'affichent

### Test 4 : Formulaire de Contact

**Aller à :**
```
https://immobilierpluriel.com/contact
```

**Remplir et envoyer un message**

**Aller dans l'admin et vérifier que le message est là :**
```
Admin → Messages
```

---

# ✅ RÉSUMÉ FINAL

## Votre Site est En Ligne ! 🎉

```
Frontend :   https://immobilierpluriel.com
API :        https://api.immobilierpluriel.com/api
Admin :      https://immobilierpluriel.com/admin
```

### Checklist Complète

- [x] Base SQLite exportée en SQL
- [x] Hostinger configuré
- [x] Base MySQL créée sur Hostinger
- [x] Backup SQL importé
- [x] Code cloné
- [x] Backend configuré pour MySQL
- [x] Frontend compilé
- [x] SSL/HTTPS activé
- [x] Tests réussis

---

# 🆘 Si Erreur

### Erreur 500 sur l'API

**DOSSIER ACTUEL :** Allez dans le backend

```bash
cd ~/applications/immobilier-pluriel/backend
```

**DOSSIER ACTUEL MAINTENANT :** `/home/u123456789/applications/immobilier-pluriel/backend`

```bash
tail -f storage/logs/laravel.log
```

**Regardez les erreurs. Allez au problème et corrigez le .env**

### Erreur Database Connection MySQL

**DOSSIER ACTUEL :** N'importe quel dossier

**Vérifier le .env :**

```bash
grep DB_ ~/applications/immobilier-pluriel/backend/.env
```

**Doit afficher :**
```
DB_HOST=127.0.0.1
DB_DATABASE=u123456789_immobilier_db
DB_USERNAME=immobilier_user
DB_PASSWORD=Vr8!kL@m9pQxZ2wN
```

**Si pas bon, éditer :**

```bash
nano ~/applications/immobilier-pluriel/backend/.env
```

### Page React Vide

**DOSSIER ACTUEL :** N'importe quel dossier

**Vérifier les fichiers :**

```bash
ls ~/domains/immobilierpluriel.com/public_html/
```

**Doit afficher index.html, assets/, etc**

---

# 📞 Support

- Hostinger Support: https://hostinger.com/support
- Lire aussi: README.md, SECURITY.md

---

**Bravo ! Votre site Immobilier Pluriel est maintenant en ligne avec MySQL et toutes vos données ! 🚀**
