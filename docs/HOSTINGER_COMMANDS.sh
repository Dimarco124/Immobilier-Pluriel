#!/bin/bash

# ============================================================================
# IMMOBILIER PLURIEL - HOSTINGER DEPLOYMENT COMMANDS
# Script complet de déploiement - À exécuter ligne par ligne
# ============================================================================

echo "🚀 Déploiement Immobilier Pluriel sur Hostinger"
echo "==============================================="
echo ""

# Configuration
APP_DIR="/home/username/applications/immobilier-pluriel"
BACKEND_DIR="$APP_DIR/backend"
FRONTEND_DIR="$APP_DIR/frontend"
PUBLIC_HTML="/home/username/domains/immobilierpluriel.com/public_html"

# ============================================================================
# 1. CONNEXION SSH & PRÉPARATION
# ============================================================================

echo "📋 ÉTAPE 1 : Connexion SSH"
echo "Commande à exécuter :"
echo "ssh username@ssh.hostinger.com"
echo ""
echo "Puis exécuter les commandes suivantes..."
echo ""

# Vérifier PHP
echo "✓ Vérifier PHP:"
php -v

# Vérifier Composer
echo "✓ Vérifier Composer:"
composer --version

# Vérifier Node.js
echo "✓ Vérifier Node.js:"
node -v
npm -v

echo ""

# ============================================================================
# 2. CLONER LE CODE
# ============================================================================

echo "📥 ÉTAPE 2 : Cloner le Code"
echo "================================================"

# Créer répertoires
mkdir -p ~/applications
mkdir -p ~/domains/immobilierpluriel.com/public_html
mkdir -p ~/backups

# Cloner
cd ~/applications
git clone git@github.com:votre-org/immobilier-pluriel.git immobilier-pluriel

# Vérifier
cd $APP_DIR
ls -la

echo "✓ Code cloné avec succès"
echo ""

# ============================================================================
# 3. BACKEND LARAVEL
# ============================================================================

echo "🔧 ÉTAPE 3 : Configuration Backend Laravel"
echo "=========================================="
echo ""

cd $BACKEND_DIR

# Copier .env
cp .env.example .env

# ÉDITER MANUELLEMENT LE .env
echo "⚠️  ÉDITER MANUELLEMENT le fichier .env :"
echo "nano $BACKEND_DIR/.env"
echo ""
echo "Changer les valeurs :"
echo "  APP_URL=https://immobilierpluriel.com"
echo "  APP_ENV=production"
echo "  APP_DEBUG=false"
echo "  DB_HOST=127.0.0.1"
echo "  DB_DATABASE=username_immobilier_db"
echo "  DB_USERNAME=username_immobilier_user"
echo "  DB_PASSWORD=VOTRE_MOT_DE_PASSE"
echo "  MAIL_HOST=mail.immobilierpluriel.com"
echo "  MAIL_USERNAME=noreply@immobilierpluriel.com"
echo "  MAIL_PASSWORD=VOTRE_EMAIL_PASSWORD"
echo ""
echo "Puis continuer..."
read -p "Appuyez sur Entrée une fois le .env édité"

# Générer APP_KEY
echo "🔑 Générer APP_KEY:"
php artisan key:generate

# Installer composer
echo "📦 Installer les dépendances Composer:"
composer install --no-dev --optimize-autoloader

# Permissions
echo "🔐 Configurer les permissions:"
chmod -R 755 $BACKEND_DIR
chmod -R 775 $BACKEND_DIR/storage
chmod -R 775 $BACKEND_DIR/bootstrap/cache
chmod -R 755 $BACKEND_DIR/public

# Vérifier permissions
echo "✓ Vérifier les permissions:"
ls -la $BACKEND_DIR | grep storage

# Migrations
echo ""
echo "🗄️  Exécuter les migrations:"
php artisan migrate --force
php artisan db:seed --force
php artisan db:test-messages
php artisan db:terrain-views

# Optimisations
echo ""
echo "⚡ Optimiser Laravel:"
php artisan config:cache
php artisan route:cache
php artisan view:cache
composer dumpautoload --optimize

echo "✓ Backend configuré avec succès"
echo ""

# ============================================================================
# 4. FRONTEND REACT
# ============================================================================

echo "🎨 ÉTAPE 4 : Configuration Frontend React"
echo "========================================="
echo ""

cd $FRONTEND_DIR

# Installer npm
echo "📦 Installer npm:"
npm install

# Créer .env
echo "VITE_API_URL=https://api.immobilierpluriel.com/api" > .env

# Vérifier .env
echo "✓ Vérifier .env:"
cat .env

# Build
echo ""
echo "🏗️  Build du frontend:"
npm run build

# Vérifier
echo "✓ Vérifier le répertoire dist/"
ls dist/ | head -10

echo "✓ Frontend construit avec succès"
echo ""

# ============================================================================
# 5. DÉPLOYER LES FICHIERS FRONTEND
# ============================================================================

echo "📋 ÉTAPE 5 : Déployer les Fichiers Frontend"
echo "==========================================="
echo ""

# Vider public_html
echo "🗑️  Vider le répertoire public_html:"
rm -rf $PUBLIC_HTML/*

# Copier les fichiers
echo "📋 Copier les fichiers du frontend:"
cp -r $FRONTEND_DIR/dist/* $PUBLIC_HTML/

# Vérifier
echo "✓ Vérifier les fichiers copiés:"
ls -la $PUBLIC_HTML | head -15

echo "✓ Frontend déployé avec succès"
echo ""

# ============================================================================
# 6. CRÉER LES .htaccess
# ============================================================================

echo "⚙️  ÉTAPE 6 : Créer les .htaccess"
echo "================================"
echo ""

# .htaccess pour le frontend (React Router)
echo "📝 Créer .htaccess frontend (React Router):"
cat > $PUBLIC_HTML/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Forcer HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
    
    # Rediriger www vers non-www
    RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
    RewriteRule ^(.*)$ https://%1/$1 [L,R=301]
    
    # React Router - Rediriger toutes les routes vers index.html
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    
    # Gzip Compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE text/javascript application/javascript
        AddOutputFilterByType DEFLATE application/json
    </IfModule>
</IfModule>
EOF

echo "✓ .htaccess frontend créé"

# .htaccess pour le backend (Laravel)
echo "📝 Créer .htaccess backend (Laravel):"
cat > $BACKEND_DIR/public/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews
    </IfModule>

    RewriteEngine On

    # Forcer HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)/$ /$1 [L,R=301]

    # Handle Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
EOF

echo "✓ .htaccess backend créé"
echo ""

# ============================================================================
# 7. TESTS
# ============================================================================

echo "🧪 ÉTAPE 7 : Tests"
echo "================="
echo ""

# Test API
echo "🔍 Tester l'API:"
echo "Commande: curl https://api.immobilierpluriel.com/api/hero-slides"
echo ""

# Test Frontend
echo "🔍 Tester le Frontend:"
echo "URL: https://immobilierpluriel.com"
echo ""

# Test Admin
echo "🔍 Tester l'Admin:"
echo "URL: https://immobilierpluriel.com/admin"
echo "Email: Admin@immobilierpluriel.com"
echo "Password: Pluriel@2024"
echo ""

# ============================================================================
# 8. MONITORING
# ============================================================================

echo "📊 ÉTAPE 8 : Monitoring"
echo "====================="
echo ""

# Voir les logs Laravel
echo "📖 Voir les logs Laravel:"
echo "Commande: tail -f $BACKEND_DIR/storage/logs/laravel.log"
echo ""

# Voir les logs Apache
echo "📖 Voir les logs Apache:"
echo "Commande: tail -f /var/log/apache2/error.log"
echo ""

# ============================================================================
# 9. BACKUP SCRIPT
# ============================================================================

echo "💾 ÉTAPE 9 : Configurer les Backups"
echo "==================================="
echo ""

# Créer script de backup
cat > ~/backup.sh << 'EOF'
#!/bin/bash

BACKUP_DIR="/home/username/backups"
DATE=$(date +%Y%m%d_%H%M%S)

echo "🔄 Début du backup..."

# Backup Database
echo "💾 Sauvegarde Database..."
mysqldump -u username_immobilier_user -p'PASSWORD' username_immobilier_db > $BACKUP_DIR/db_$DATE.sql

# Backup Code
echo "💾 Sauvegarde Code..."
tar -czf $BACKUP_DIR/code_$DATE.tar.gz /home/username/applications/immobilier-pluriel

echo "✓ Backup terminé"
echo "Fichiers: $BACKUP_DIR/"
ls -lah $BACKUP_DIR | tail -5
EOF

chmod +x ~/backup.sh

echo "✓ Script de backup créé: ~/backup.sh"
echo ""

# ============================================================================
# 10. DÉPLOIEMENT SCRIPT
# ============================================================================

echo "🚀 ÉTAPE 10 : Créer Script de Déploiement Futur"
echo "=============================================="
echo ""

cat > ~/deploy.sh << 'EOF'
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
echo "📊 Voir les logs: tail -f $APP_DIR/backend/storage/logs/laravel.log"
EOF

chmod +x ~/deploy.sh

echo "✓ Script de déploiement créé: ~/deploy.sh"
echo ""

# ============================================================================
# RÉSUMÉ
# ============================================================================

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║           ✅ DÉPLOIEMENT COMPLET                        ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Site Status:"
echo "  🌐 Frontend: https://immobilierpluriel.com"
echo "  🔌 API: https://api.immobilierpluriel.com/api"
echo "  🛠️  Admin: https://immobilierpluriel.com/admin"
echo ""
echo "📝 Logs:"
echo "  📖 Laravel: tail -f $BACKEND_DIR/storage/logs/laravel.log"
echo "  📖 Apache: tail -f /var/log/apache2/error.log"
echo ""
echo "💾 Backups:"
echo "  🔄 Exécuter: ~/backup.sh"
echo ""
echo "🚀 Futur Déploiements:"
echo "  🔄 Exécuter: ~/deploy.sh"
echo ""
echo "✅ Toutes les étapes sont terminées !"
echo ""
