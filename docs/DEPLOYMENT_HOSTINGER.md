# 🚀 Guide Complet de Déploiement sur Hostinger

## 📊 Architecture du Projet

```
┌─────────────────────────────────────────────────────────┐
│                    HOSTINGER VPS/Cloud                 │
├──────────────────┬──────────────────┬──────────────────┤
│  Laravel API     │  React Frontend  │   MySQL Database │
│  Port 8000       │  Port 3000/80    │   Port 3306      │
│  /api/*          │  /                │   Production DB │
└──────────────────┴──────────────────┴──────────────────┘
```

---

## 📋 Prérequis

### Compte Hostinger Requis
- ✅ Plan **Business** ou **Cloud Hosting** (minimum)
- ✅ Accès SSH activé
- ✅ PHP 8.2+ supporté
- ✅ Node.js supporté
- ✅ SSL/TLS gratuit inclus

### Sur Votre Ordinateur
- ✅ Git installé
- ✅ SSH key généré
- ✅ Code pushé sur GitHub

---

## 🎯 ÉTAPE 1 : Configuration Initiale Hostinger

### 1.1 Accéder au Panneau de Contrôle

1. Connectez-vous à [Hostinger.com](https://hostinger.com)
2. Aller à **Hosting** → Votre domaine
3. Cliquer sur **Manage**

### 1.2 Configurer le Domaine

1. Dans le panneau, aller à **Domains**
2. Sélectionner votre domaine (ex: immobilierpluriel.com)
3. Cliquer sur **Manage DNS**
4. Noter les **Nameservers** Hostinger

**Chez votre registraire (ex: Namecheap):**
- Mettre à jour les nameservers vers ceux de Hostinger

### 1.3 Vérifier PHP et Extensions

1. Aller à **Tools** → **PHP Info**
2. Vérifier PHP 8.2+ est activé
3. Vérifier les extensions :
   - ✅ cURL
   - ✅ OpenSSL
   - ✅ PDO
   - ✅ JSON
   - ✅ Tokenizer

### 1.4 Activer SSH

1. Aller à **Advanced** → **SSH Access**
2. Si désactivé, cliquer sur **Enable**
3. Note les détails de connexion :
   - **SSH Host** : `ssh.hostinger.com` ou votre hostname
   - **SSH Port** : `22` (ou port spécifié)
   - **Username** : votre cpanel username
   - **Password** : votre cpanel password

---

## 🔑 ÉTAPE 2 : Connexion SSH et Préparation

### 2.1 Accéder par SSH

**Windows (PowerShell / Git Bash):**
```bash
ssh username@ssh.hostinger.com -p 22
# Entrer votre mot de passe
```

**macOS/Linux:**
```bash
ssh username@ssh.hostinger.com
```

**Avec clé SSH (recommandé):**
```bash
# Générer une clé SSH localement
ssh-keygen -t rsa -b 4096 -f ~/.ssh/hostinger

# Copier la clé publique dans Hostinger (SFTP ou panel)
cat ~/.ssh/hostinger.pub
# Ajouter dans ~/.ssh/authorized_keys sur Hostinger

# Puis connecter avec :
ssh -i ~/.ssh/hostinger username@ssh.hostinger.com
```

### 2.2 Vérifier l'Environnement

```bash
# Vérifier PHP
php -v
# Output: PHP 8.2.x

# Vérifier Composer
composer --version
# Output: Composer version

# Vérifier Node.js
node -v
npm -v
```

---

## 📁 ÉTAPE 3 : Préparation des Répertoires

### 3.1 Structure Recommandée

```bash
# Se placer dans le répertoire home
cd ~

# Créer les répertoires
mkdir -p /home/username/applications
mkdir -p /home/username/domains/immobilierpluriel.com/public_html

# Variables pour la suite
export APP_NAME="immobilier-pluriel"
export APP_DIR="/home/username/applications/$APP_NAME"
export PUBLIC_HTML="/home/username/domains/immobilierpluriel.com/public_html"
```

### 3.2 Vérifier Ownership

```bash
# Vérifier le propriétaire
ls -la /home/username/domains/

# Doit être : username:username
# Si ce n'est pas le cas :
chown -R username:username /home/username/domains/
```

---

## 🔒 ÉTAPE 4 : Cloner le Projet Git

### 4.1 Générer SSH Key pour GitHub

```bash
# Générer une clé SSH sur Hostinger
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github -C "hostinger@immobilierpluriel.com"

# Afficher la clé publique
cat ~/.ssh/github.pub
```

### 4.2 Ajouter la Clé à GitHub

1. Aller sur GitHub → Settings → **SSH and GPG keys**
2. Cliquer **New SSH key**
3. Coller le contenu de `~/.ssh/github.pub`
4. Nommer : "Hostinger Deployment"
5. Sauvegarder

### 4.3 Cloner le Repository

```bash
# Configurer Git pour utiliser la clé SSH
ssh-add ~/.ssh/github

# Cloner le projet
cd /home/username/applications
git clone git@github.com:votre-org/immobilier-pluriel.git $APP_NAME
cd $APP_NAME

# Vérifier
ls -la
# Doit afficher : backend/, frontend/, .gitignore, README.md
```

---

## ⚙️ ÉTAPE 5 : Configuration Backend Laravel

### 5.1 Préparation des Fichiers

```bash
cd /home/username/applications/immobilier-pluriel/backend

# Copier .env
cp .env.example .env

# Générer la clé APP_KEY
php artisan key:generate
```

### 5.2 Éditer le .env

```bash
# Ouvrir le fichier .env
nano .env
```

**Configuration à mettre à jour :**

```env
APP_NAME="Immobilier Pluriel"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://immobilierpluriel.com

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=immobilier_pluriel_db
DB_USERNAME=immobilier_user
DB_PASSWORD=VOTRE_MOT_DE_PASSE_SECURISE

# Mail
MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_USERNAME=votre-email@immobilierpluriel.com
MAIL_PASSWORD=votre_email_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@immobilierpluriel.com

# Session
SESSION_DRIVER=database
SESSION_ENCRYPT=true
SESSION_SECURE_COOKIE=true

# API Frontend URL
FRONTEND_URL=https://immobilierpluriel.com
```

**Sauvegarder:** `Ctrl+O` → Entrée → `Ctrl+X`

### 5.3 Installer les Dépendances PHP

```bash
# Aller au backend
cd /home/username/applications/immobilier-pluriel/backend

# Installer composer
composer install --no-dev --optimize-autoloader

# Cela peut prendre 2-3 minutes
```

### 5.4 Permissions des Répertoires

```bash
cd /home/username/applications/immobilier-pluriel/backend

# Donner les bonnes permissions
chmod -R 755 .
chmod -R 775 storage bootstrap/cache
chmod -R 755 public

# Vérifier
ls -la | grep storage
# Doit afficher rwxrwxr-x
```

### 5.5 Créer la Base de Données

```bash
# Se connecter à MySQL via Hostinger
# Option 1 : Via SSH
mysql -u immobilier_user -p

# Puis exécuter :
CREATE DATABASE IF NOT EXISTS immobilier_pluriel_db;
USE immobilier_pluriel_db;
```

**Alternative via cPanel :**
1. Aller au **cPanel** → **Databases** → **MySQL Databases**
2. Créer : `username_immobilier_db`
3. Créer utilisateur : `username_immobilier_user`
4. Ajouter tous les privilèges

### 5.6 Exécuter les Migrations

```bash
cd /home/username/applications/immobilier-pluriel/backend

# Migrations
php artisan migrate --force

# Seeders (données)
php artisan db:seed --force

# Générer les données de test
php artisan db:test-messages
php artisan db:terrain-views

# Vérifier
php artisan migrate:status
```

### 5.7 Optimiser Laravel

```bash
cd /home/username/applications/immobilier-pluriel/backend

# Compiler config
php artisan config:cache

# Compiler routes
php artisan route:cache

# Compiler views
php artisan view:cache

# Compiler optimized autoloader
composer dumpautoload --optimize
```

---

## 🌐 ÉTAPE 6 : Configuration Frontend React

### 6.1 Installer les Dépendances

```bash
cd /home/username/applications/immobilier-pluriel/frontend

# Installer npm
npm install

# Peut prendre 3-5 minutes
```

### 6.2 Créer le .env

```bash
# Copier l'exemple
cp .env.example .env

# Éditer
nano .env
```

**Contenu :**
```env
VITE_API_URL=https://immobilierpluriel.com/api
```

### 6.3 Compiler pour Production

```bash
cd /home/username/applications/immobilier-pluriel/frontend

# Build
npm run build

# Cela crée un répertoire 'dist/'
ls -la | grep dist
```

### 6.4 Copier les Fichiers Compilés

```bash
# Vider le répertoire public_html
rm -rf /home/username/domains/immobilierpluriel.com/public_html/*

# Copier les fichiers compilés
cp -r /home/username/applications/immobilier-pluriel/frontend/dist/* \
      /home/username/domains/immobilierpluriel.com/public_html/

# Vérifier
ls -la /home/username/domains/immobilierpluriel.com/public_html/
```

---

## 🔌 ÉTAPE 7 : Configuration du Serveur Web (Apache/Nginx)

### 7.1 Vérifier le Serveur Web

```bash
# Voir quel serveur est utilisé
ps aux | grep -E "apache|nginx"

# Hostinger utilise généralement Apache
```

### 7.2 Créer .htaccess pour Laravel

```bash
cd /home/username/applications/immobilier-pluriel/backend

# Créer le fichier
cat > public/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews
    </IfModule>

    RewriteEngine On

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)/$ /$1 [L,R=301]

    # Handle Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
EOF
```

### 7.3 Virtual Host pour Laravel API

**Via cPanel :**
1. Aller à **Addon Domains** ou **Domains**
2. Créer un sous-domaine : `api.immobilierpluriel.com`
3. Le pointer vers `/home/username/applications/immobilier-pluriel/backend/public`

**Ou via SSH (si accès root) :**
```bash
# Créer le vhost
cat > /etc/apache2/sites-available/api.immobilierpluriel.com.conf << 'EOF'
<VirtualHost *:80>
    ServerName api.immobilierpluriel.com
    ServerAlias www.api.immobilierpluriel.com
    
    DocumentRoot /home/username/applications/immobilier-pluriel/backend/public
    
    <Directory /home/username/applications/immobilier-pluriel/backend/public>
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog /var/log/apache2/api.immobilierpluriel.com.error.log
    CustomLog /var/log/apache2/api.immobilierpluriel.com.access.log combined
</VirtualHost>
EOF

# Activer
a2ensite api.immobilierpluriel.com.conf
systemctl reload apache2
```

---

## 🔐 ÉTAPE 8 : SSL/TLS et Redirection HTTPS

### 8.1 Activer SSL via cPanel

1. Aller à **cPanel** → **Auto SSL**
2. Cliquer sur **Generate**
3. Attendre la génération (quelques secondes)
4. Vérifier le ✓ pour votre domaine

### 8.2 Forcer HTTPS

**Pour le frontend (public_html/.htaccess) :**
```bash
cat > /home/username/domains/immobilierpluriel.com/public_html/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Forcer HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # Rediriger www vers non-www
    RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
    RewriteRule ^(.*)$ https://%1/$1 [L,R=301]
    
    # React Router
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
EOF
```

**Pour l'API backend :**
```bash
cat > /home/username/applications/immobilier-pluriel/backend/public/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Forcer HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # Laravel routing
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
EOF
```

---

## 🧪 ÉTAPE 9 : Tests et Vérifications

### 9.1 Tester l'API

```bash
# Vérifier que l'API répond
curl -I https://api.immobilierpluriel.com/api/hero-slides

# Doit retourner 200 OK
```

### 9.2 Tester le Frontend

```bash
# Ouvrir dans le navigateur
https://immobilierpluriel.com

# Vérifier :
# ✅ Page charge
# ✅ CSS chargé correctement
# ✅ Images affichées
# ✅ Aucune erreur console
```

### 9.3 Tester l'Admin

```bash
# Aller à
https://immobilierpluriel.com/admin

# Se connecter avec :
# Email: Admin@immobilierpluriel.com
# Password: Pluriel@2024

# Vérifier :
# ✅ Connexion fonctionne
# ✅ Dashboard affiche les données
# ✅ Messages de contact s'affichent
```

### 9.4 Tester la Base de Données

```bash
# Se connecter à l'API
mysql -u immobilier_user -p immobilier_pluriel_db

# Vérifier les tables
SHOW TABLES;

# Compter les messages
SELECT COUNT(*) FROM contact_submissions;
```

---

## 📊 ÉTAPE 10 : Performance et Optimisations

### 10.1 Activer la Compression Gzip

```bash
# Vérifier si mod_deflate est activé
apache2ctl -M | grep deflate

# Si activé, ajouter à public_html/.htaccess
cat >> /home/username/domains/immobilierpluriel.com/public_html/.htaccess << 'EOF'

# Gzip Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript application/javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>
EOF
```

### 10.2 Cache Browser

```bash
# Ajouter au .htaccess du frontend
cat >> /home/username/domains/immobilierpluriel.com/public_html/.htaccess << 'EOF'

# Cache Busting
<IfModule mod_expires.c>
    ExpiresActive On
    
    # Images
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    
    # CSS/JS
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    
    # Fonts
    ExpiresByType font/ttf "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
</IfModule>
EOF
```

### 10.3 Optimiser les Queries Laravel

```bash
# Ajouter au backend .env
QUERY_CACHE=true
DB_QUERY_LOG=false  # Désactiver les logs de requête en prod
```

---

## 🔄 ÉTAPE 11 : Mises à Jour Futures

### 11.1 Script de Déploiement

```bash
# Créer un script de déploiement
cat > /home/username/deploy.sh << 'EOF'
#!/bin/bash

APP_DIR="/home/username/applications/immobilier-pluriel"

echo "🔄 Début du déploiement..."

# Backend
cd $APP_DIR/backend
echo "📥 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
composer install --no-dev --optimize-autoloader

echo "🔧 Running migrations..."
php artisan migrate --force

echo "⚡ Optimizing..."
php artisan config:cache
php artisan route:cache

# Frontend
cd $APP_DIR/frontend
echo "📥 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "🏗️ Building..."
npm run build

echo "📋 Copying files..."
rm -rf /home/username/domains/immobilierpluriel.com/public_html/*
cp -r dist/* /home/username/domains/immobilierpluriel.com/public_html/

echo "✅ Déploiement terminé !"
EOF

# Donner les permissions
chmod +x /home/username/deploy.sh
```

### 11.2 Cron Job pour Backups

```bash
# Ajouter à crontab
crontab -e

# Ajouter :
0 2 * * * mysqldump -u immobilier_user -p'PASSWORD' immobilier_pluriel_db > /home/username/backups/db_$(date +%Y%m%d).sql

# Backup du code
0 3 * * 0 tar -czf /home/username/backups/code_$(date +%Y%m%d).tar.gz /home/username/applications/immobilier-pluriel
```

---

## 📧 ÉTAPE 12 : Configuration Email

### 12.1 Utiliser l'Email Hostinger

```bash
# Via cPanel -> Email Accounts
# Créer : noreply@immobilierpluriel.com

# Puis dans .env :
MAIL_MAILER=smtp
MAIL_HOST=mail.immobilierpluriel.com
MAIL_PORT=465
MAIL_USERNAME=noreply@immobilierpluriel.com
MAIL_PASSWORD=votre_password
MAIL_ENCRYPTION=tls
```

### 12.2 Alternative : SendGrid (Recommandé)

```bash
# S'inscrire sur SendGrid : https://sendgrid.com

# Puis dans .env :
MAIL_MAILER=sendgrid
SENDGRID_API_KEY=votre_sendgrid_api_key
```

---

## 🎯 ÉTAPE 13 : Monitoring et Logs

### 13.1 Logs Applicatifs

```bash
# Voir les logs Laravel
tail -f /home/username/applications/immobilier-pluriel/backend/storage/logs/laravel.log

# Voir les logs Apache
tail -f /var/log/apache2/error.log
tail -f /var/log/apache2/access.log
```

### 13.2 Monitoring Hostinger

1. Aller au cPanel
2. Aller à **Metrics**
3. Consulter :
   - CPU Usage
   - Memory Usage
   - Disk Usage
   - Bandwidth

---

## ✅ Checklist Final

- [ ] Domaine pointe vers Hostinger
- [ ] SSH configuré et accessible
- [ ] Code cloné depuis Git
- [ ] .env configuré correctement
- [ ] Database créée et migrée
- [ ] Laravel déployé et accessible
- [ ] React compilé et copié
- [ ] SSL/HTTPS activé
- [ ] Email configuré
- [ ] Redirection HTTP vers HTTPS
- [ ] Admin login fonctionne
- [ ] Formulaire de contact reçoit les messages
- [ ] Backups configurés
- [ ] Logs consultables
- [ ] Performance acceptable

---

## 🆘 Troubleshooting

### Erreur 500 sur l'API

```bash
# Vérifier les logs
tail -f /home/username/applications/immobilier-pluriel/backend/storage/logs/laravel.log

# Vérifier les permissions
chmod -R 775 storage bootstrap/cache

# Vérifier le .env
cat /home/username/applications/immobilier-pluriel/backend/.env | grep APP_KEY
```

### React ne charge pas

```bash
# Vérifier que dist/ est copié
ls -la /home/username/domains/immobilierpluriel.com/public_html/

# Vérifier les logs Apache
tail -f /var/log/apache2/error.log

# Vérifier le .htaccess
cat /home/username/domains/immobilierpluriel.com/public_html/.htaccess
```

### Database Connection Error

```bash
# Vérifier la connexion MySQL
mysql -h 127.0.0.1 -u immobilier_user -p immobilier_pluriel_db

# Vérifier les credentials dans .env
cat /home/username/applications/immobilier-pluriel/backend/.env | grep DB_
```

---

## 📞 Support Hostinger

- 💬 Live Chat : https://hostinger.com/support
- 📧 Email Support
- 📖 Knowledge Base : https://hostinger.com/tutorials

---

**🎉 Votre application Immobilier Pluriel est maintenant en ligne !**

Visitez : https://immobilierpluriel.com ✅
