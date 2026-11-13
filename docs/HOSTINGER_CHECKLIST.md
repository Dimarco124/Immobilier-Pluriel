# ✅ Checklist Complète de Déploiement Hostinger

## 📋 AVANT DE COMMENCER

```
PRÉREQUIS - À FAIRE EN LOCAL
├─ [ ] Code pushé sur GitHub
├─ [ ] Domaine acheté et disponible
├─ [ ] Plan Hostinger Business/Cloud activé
├─ [ ] SSH activé dans Hostinger
└─ [ ] Fichier .env.example complet
```

---

## 🔧 PHASE 1 : Configuration Hostinger

### 1.1 Accès Hosting

```
cPanel HOSTINGER
├─ [ ] Login cPanel (username + password)
├─ [ ] Vérifier PHP version 8.2+
├─ [ ] Vérifier extensios PHP (cURL, OpenSSL, PDO)
├─ [ ] SSH Access → Activer
└─ [ ] Prendre note des détails SSH
    ├─ SSH Host: ssh.hostinger.com
    ├─ Port: 22
    ├─ Username: [votre_username]
    └─ Password: [votre_password]
```

### 1.2 Domaine & DNS

```
Domaine
├─ [ ] Domaine principal : immobilierpluriel.com
├─ [ ] Nameservers pointent vers Hostinger
├─ [ ] Attendre la propagation DNS (max 48h)
└─ [ ] Vérifier avec : nslookup immobilierpluriel.com

Sous-domaine API
├─ [ ] Créer api.immobilierpluriel.com
├─ [ ] Pointer vers backend/public
└─ [ ] SSL généré automatiquement
```

### 1.3 Base de Données

```
MySQL Database Setup
├─ [ ] Via cPanel → Databases → MySQL Databases
├─ [ ] Database name: username_immobilier_db
├─ [ ] User name: username_immobilier_user
├─ [ ] Password: Mot_de_passe_fort_123!
├─ [ ] All privileges: ✓
└─ [ ] Tester la connexion
    └─ Command: mysql -u user -p database
```

### 1.4 Email

```
Email Configuration
├─ [ ] Via cPanel → Email Accounts
├─ [ ] Créer: noreply@immobilierpluriel.com
├─ [ ] Password: Mot_de_passe_fort
├─ [ ] Tester accès au webmail
└─ [ ] Noter les détails SMTP
    ├─ Host: mail.immobilierpluriel.com
    ├─ Port: 465
    ├─ Encryption: TLS
    └─ Auth: noreply@immobilierpluriel.com
```

---

## 🔐 PHASE 2 : SSH & Configuration

### 2.1 Connexion SSH

```
SSH Connection
├─ [ ] Ouvrir Terminal/PowerShell
├─ [ ] Connexion: ssh username@ssh.hostinger.com
├─ [ ] Entrer le password
├─ [ ] Tester commandes
│   ├─ [ ] php -v (doit retourner PHP 8.2+)
│   ├─ [ ] composer --version (doit retourner Composer)
│   └─ [ ] node -v && npm -v
└─ [ ] Connexion réussie ✓
```

### 2.2 Répertoires

```
Directory Setup
├─ [ ] mkdir -p ~/applications
├─ [ ] mkdir -p ~/domains/immobilierpluriel.com/public_html
├─ [ ] mkdir -p ~/backups
├─ [ ] Vérifier ownership: chown -R username:username ~/
└─ [ ] Vérifier permissions: ls -la ~/applications
```

### 2.3 SSH Keys (Optionnel - Recommandé)

```
SSH Key Authentication
├─ [ ] Générer clé locale: ssh-keygen -t rsa -b 4096
├─ [ ] Copier clé publique vers Hostinger
├─ [ ] Ajouter à ~/.ssh/authorized_keys
├─ [ ] Tester connexion sans password
└─ [ ] Éditer ~/.ssh/config pour alias
```

---

## 📥 PHASE 3 : Cloner le Code

### 3.1 Git Setup

```
Git Configuration
├─ [ ] Générer SSH key sur Hostinger: ssh-keygen -t rsa
├─ [ ] Ajouter clé publique à GitHub Settings → SSH Keys
├─ [ ] Tester: ssh -T git@github.com
│   └─ Doit retourner: "Hi username! You've successfully authenticated"
└─ [ ] Configurer git:
    ├─ [ ] git config --global user.name "Your Name"
    ├─ [ ] git config --global user.email "your@email.com"
    └─ [ ] git config --global pull.rebase false
```

### 3.2 Cloner Repository

```
Clone Code
├─ [ ] cd ~/applications
├─ [ ] git clone git@github.com:votre-org/immobilier-pluriel.git
├─ [ ] Attendre le téléchargement (~50 MB)
├─ [ ] Vérifier la structure:
│   ├─ [ ] ls -la
│   ├─ [ ] backend/ ✓
│   ├─ [ ] frontend/ ✓
│   ├─ [ ] .gitignore ✓
│   └─ [ ] README.md ✓
└─ [ ] Clonage réussi ✓
```

---

## 🔧 PHASE 4 : Backend Laravel

### 4.1 Installation

```
Backend Setup
├─ [ ] cd ~/applications/immobilier-pluriel/backend
├─ [ ] cp .env.example .env
├─ [ ] Éditer .env:
│   ├─ [ ] APP_NAME="Immobilier Pluriel"
│   ├─ [ ] APP_ENV=production
│   ├─ [ ] APP_DEBUG=false
│   ├─ [ ] APP_URL=https://immobilierpluriel.com
│   ├─ [ ] DB_HOST=127.0.0.1
│   ├─ [ ] DB_DATABASE=username_immobilier_db
│   ├─ [ ] DB_USERNAME=username_immobilier_user
│   ├─ [ ] DB_PASSWORD=Mot_de_passe_fort_123!
│   ├─ [ ] MAIL_HOST=mail.immobilierpluriel.com
│   ├─ [ ] MAIL_USERNAME=noreply@immobilierpluriel.com
│   ├─ [ ] MAIL_PASSWORD=email_password
│   └─ [ ] MAIL_FROM_ADDRESS=noreply@immobilierpluriel.com
└─ [ ] Sauvegarder le fichier
```

### 4.2 Dépendances & Clé

```
PHP & Composer
├─ [ ] php artisan key:generate
│   └─ Doit générer: APP_KEY=base64:...
├─ [ ] composer install --no-dev --optimize-autoloader
│   └─ Peut prendre 2-3 minutes
├─ [ ] Vérifier vendor/ créé: ls vendor | wc -l
│   └─ Doit avoir 500+ répertoires
└─ [ ] Installation réussie ✓
```

### 4.3 Permissions

```
File Permissions
├─ [ ] chmod -R 755 .
├─ [ ] chmod -R 775 storage
├─ [ ] chmod -R 775 bootstrap/cache
├─ [ ] chmod -R 755 public
└─ [ ] Vérifier: ls -la | grep storage
    └─ Doit afficher: drwxrwxr-x ... storage
```

### 4.4 Database

```
Database Migration
├─ [ ] Vérifier connexion MySQL
│   └─ mysql -u username_immobilier_user -p username_immobilier_db
├─ [ ] php artisan migrate --force
│   └─ Doit créer ~10 tables
├─ [ ] php artisan db:seed --force
│   └─ Doit insérer les données
├─ [ ] php artisan db:test-messages
│   └─ Doit créer 5 messages de test
├─ [ ] php artisan db:terrain-views
│   └─ Doit ajouter des vues
└─ [ ] Vérifier les tables:
    └─ mysql> SELECT COUNT(*) FROM terrains;
       └─ Doit retourner: 25
```

### 4.5 Optimisations

```
Laravel Optimization
├─ [ ] php artisan config:cache
├─ [ ] php artisan route:cache
├─ [ ] php artisan view:cache
├─ [ ] composer dumpautoload --optimize
├─ [ ] Vérifier bootstrap/cache/:
│   ├─ [ ] packages.php ✓
│   ├─ [ ] services.php ✓
│   ├─ [ ] config.php ✓
│   └─ [ ] routes.php ✓
└─ [ ] Optimisations complètes ✓
```

---

## 🎨 PHASE 5 : Frontend React

### 5.1 Installation

```
Frontend Setup
├─ [ ] cd ~/applications/immobilier-pluriel/frontend
├─ [ ] npm install
│   └─ Peut prendre 3-5 minutes
├─ [ ] Vérifier node_modules créé
│   └─ ls node_modules | wc -l
│   └─ Doit avoir 1000+ modules
└─ [ ] Installation réussie ✓
```

### 5.2 Configuration

```
Frontend Configuration
├─ [ ] Créer .env:
│   ├─ [ ] nano .env
│   ├─ [ ] VITE_API_URL=https://api.immobilierpluriel.com/api
│   │   OU
│   │   VITE_API_URL=https://immobilierpluriel.com/api
│   └─ [ ] Sauvegarder
└─ [ ] Vérifier .env:
    └─ cat .env | grep VITE_API_URL
```

### 5.3 Build

```
React Build
├─ [ ] npm run build
│   └─ Peut prendre 1-2 minutes
├─ [ ] Vérifier dist/ créé:
│   ├─ [ ] ls dist/
│   ├─ [ ] index.html ✓
│   ├─ [ ] assets/ ✓
│   └─ [ ] Compter fichiers: ls dist | wc -l
│       └─ Doit avoir 50+ fichiers
└─ [ ] Build réussi ✓
```

### 5.4 Déploiement Fichiers

```
Deploy Frontend Files
├─ [ ] Via cPanel File Manager:
│   ├─ [ ] Accéder à public_html
│   ├─ [ ] Supprimer tous les fichiers existants
│   ├─ [ ] Upload dossier 'dist/'
│   └─ [ ] Ou via SSH:
└─ [ ] Via SSH (alternatif):
    ├─ [ ] rm -rf ~/domains/immobilierpluriel.com/public_html/*
    ├─ [ ] cp -r dist/* ~/domains/immobilierpluriel.com/public_html/
    └─ [ ] Vérifier: ls ~/domains/immobilierpluriel.com/public_html/
        └─ Doit afficher: index.html, assets/, ...
```

---

## 🔌 PHASE 6 : Configuration Serveur Web

### 6.1 Apache Setup

```
Apache Configuration
├─ [ ] Créer .htaccess pour React Router
│   └─ File: ~/domains/immobilierpluriel.com/public_html/.htaccess
│   └─ Voir DEPLOYMENT_HOSTINGER.md pour le contenu
├─ [ ] Créer .htaccess pour Laravel API
│   └─ File: ~/applications/immobilier-pluriel/backend/public/.htaccess
│   └─ Voir DEPLOYMENT_HOSTINGER.md pour le contenu
└─ [ ] Recharger Apache:
    └─ systemctl reload apache2 (si accès root)
    └─ OU attendre ~5 minutes (Hostinger recharge auto)
```

### 6.2 Sous-domaine API

```
API Subdomain Setup
├─ [ ] Via cPanel → Addon Domains
├─ [ ] Ajouter domaine: api.immobilierpluriel.com
├─ [ ] Document root: ~/applications/immobilier-pluriel/backend/public
├─ [ ] Activer auto SSL
├─ [ ] Attendre propagation (~5 min)
└─ [ ] Vérifier: https://api.immobilierpluriel.com/api/hero-slides
    └─ Doit retourner un JSON
```

### 6.3 SSL/TLS

```
SSL Certificate
├─ [ ] Via cPanel → Auto SSL
├─ [ ] Cliquer "Generate" pour chaque domaine
├─ [ ] Vérifier ✓ pour:
│   ├─ [ ] immobilierpluriel.com
│   ├─ [ ] www.immobilierpluriel.com
│   ├─ [ ] api.immobilierpluriel.com
│   └─ [ ] www.api.immobilierpluriel.com
├─ [ ] Attendre génération (~5 min)
└─ [ ] Vérifier en ligne:
    └─ https://www.ssllabs.com/ssltest/
```

---

## 🧪 PHASE 7 : Tests & Vérifications

### 7.1 Tests Frontend

```
Frontend Tests
├─ [ ] Ouvrir: https://immobilierpluriel.com
├─ [ ] Vérifications visuelles:
│   ├─ [ ] Page charge complètement
│   ├─ [ ] Pas d'erreurs dans console (F12)
│   ├─ [ ] Images affichées correctement
│   ├─ [ ] CSS appliqué correctement
│   ├─ [ ] Navigation fonctionne
│   └─ [ ] Responsive sur mobile
├─ [ ] Performance:
│   ├─ [ ] Temps de chargement < 5 secondes
│   ├─ [ ] Google Lighthouse score > 80
│   └─ [ ] Pas de console errors
└─ [ ] Frontend OK ✓
```

### 7.2 Tests API

```
API Tests
├─ [ ] Tester endpoint :
│   └─ curl https://api.immobilierpluriel.com/api/hero-slides
│   └─ Doit retourner 200 OK + JSON
├─ [ ] Tester autres endpoints:
│   ├─ [ ] /api/terrains (200)
│   ├─ [ ] /api/projects (200)
│   ├─ [ ] /api/news (200)
│   ├─ [ ] /api/team (200)
│   └─ [ ] /api/site-settings (200)
├─ [ ] Tester POST contact:
│   ├─ [ ] Envoyer message via /api/contact
│   ├─ [ ] Message doit être en DB
│   └─ [ ] Email reçu (si configuré)
└─ [ ] API OK ✓
```

### 7.3 Tests Admin

```
Admin Panel Tests
├─ [ ] Ouvrir: https://immobilierpluriel.com/admin
├─ [ ] Login:
│   ├─ [ ] Email: Admin@immobilierpluriel.com
│   ├─ [ ] Password: Pluriel@2024
│   └─ [ ] Submit
├─ [ ] Vérifications:
│   ├─ [ ] Dashboard charge
│   ├─ [ ] Stats affichées
│   ├─ [ ] Messages affichés
│   ├─ [ ] Voir détail message fonctionne
│   ├─ [ ] Messages marqués comme lu fonctionne
│   ├─ [ ] CRUD terrains fonctionne
│   ├─ [ ] Upload d'images fonctionne
│   └─ [ ] Tous les menus accessibles
└─ [ ] Admin OK ✓
```

### 7.4 Tests Base de Données

```
Database Tests
├─ [ ] Connexion:
│   ├─ [ ] mysql -u username_immobilier_user -p
│   ├─ [ ] Password: [votre_password]
│   ├─ [ ] USE username_immobilier_db;
│   └─ [ ] Connected ✓
├─ [ ] Tables:
│   ├─ [ ] SHOW TABLES; → 10+ tables
│   ├─ [ ] SELECT COUNT(*) FROM terrains; → 25
│   ├─ [ ] SELECT COUNT(*) FROM users; → 1
│   ├─ [ ] SELECT COUNT(*) FROM contact_submissions; → 5+
│   └─ [ ] Toutes les tables OK ✓
└─ [ ] Database OK ✓
```

---

## 📊 PHASE 8 : Performance & Optimisations

### 8.1 Monitoring

```
Performance Monitoring
├─ [ ] cPanel → Metrics
├─ [ ] Consulter:
│   ├─ [ ] CPU Usage (< 50%)
│   ├─ [ ] Memory Usage (< 70%)
│   ├─ [ ] Disk Usage (< 50%)
│   └─ [ ] Bandwidth Usage
├─ [ ] Logs:
│   ├─ [ ] cPanel → Logs
│   ├─ [ ] Error logs: Aucune erreur
│   └─ [ ] Access logs: Requêtes normales
└─ [ ] Monitoring OK ✓
```

### 8.2 Backups

```
Backup Configuration
├─ [ ] cPanel → Backups
├─ [ ] Créer backup manuel:
│   └─ [ ] Full backup
├─ [ ] Configurer backup automatique:
│   ├─ [ ] Frequency: Quotidien
│   ├─ [ ] Retention: 7 jours
│   └─ [ ] Type: Full backup
└─ [ ] Backups OK ✓
```

### 8.3 Cron Jobs

```
Cron Jobs Setup (Optionnel)
├─ [ ] cPanel → Cron Jobs
├─ [ ] Ajouter tâche de déploiement:
│   ├─ [ ] Commande: /home/username/deploy.sh
│   ├─ [ ] Fréquence: À la demande
│   └─ [ ] Email si erreur
├─ [ ] Ajouter tâche de nettoyage:
│   ├─ [ ] Commande: php artisan cache:clear
│   ├─ [ ] Fréquence: Toutes les 24h
│   └─ [ ] Email si erreur
└─ [ ] Cron Jobs OK ✓
```

---

## 🎯 PHASE 9 : Production Finale

### 9.1 Dernière Vérification

```
Final Checks
├─ [ ] APP_DEBUG=false dans .env
├─ [ ] Sessions encryptées (SESSION_ENCRYPT=true)
├─ [ ] HTTPS forcé sur tous les domaines
├─ [ ] Pas de fichiers sensibles exposés
├─ [ ] Logs configurés
├─ [ ] Email fonctionne
├─ [ ] Base de données sauvegardée
├─ [ ] SSL valide sur tous les domaines
└─ [ ] Prêt pour production ✓
```

### 9.2 Annonce Publique

```
Launch Checklist
├─ [ ] Site testé en production
├─ [ ] Tous les formulaires testés
├─ [ ] Contact email testé
├─ [ ] Performance acceptable
├─ [ ] Aucun 404/500 errors
├─ [ ] Admin login fonctionne
├─ [ ] Alerter l'équipe
└─ [ ] 🎉 SITE EN LIGNE ✓
```

---

## 🆘 TROUBLESHOOTING RAPIDE

| Problème | Solution |
|----------|----------|
| 500 Error | `tail -f storage/logs/laravel.log` |
| Database Error | Vérifier DB credentials dans .env |
| React Page Vide | Copier dist/ dans public_html |
| CSS/JS Ne Charge Pas | Vérifier .htaccess RewriteEngine On |
| Email Ne Se Reçoit Pas | Vérifier MAIL_FROM dans .env |
| Admin Login Failed | Vérifier API connection |
| Slow Page Load | Vérifier CPU/Memory dans cPanel |
| SSL Certificate Error | Attendre 5 min, puis recharger |

---

## 📞 RESSOURCES

- 📖 Guide Complet : `DEPLOYMENT_HOSTINGER.md`
- ⚡ Déploiement Rapide : `QUICK_DEPLOY_HOSTINGER.md`
- 🔒 Guide Sécurité : `SECURITY.md`
- 📘 README : `README.md`
- 🐛 Hostinger Support : https://hostinger.com/support

---

## ✅ STATUT FINAL

```
┌─────────────────────────────────────────┐
│      🎉 DÉPLOIEMENT COMPLET ✓           │
├─────────────────────────────────────────┤
│ Backend API ................ ✅ Online   │
│ Frontend ................... ✅ Online   │
│ Admin Panel ................ ✅ Online   │
│ Database ................... ✅ Online   │
│ SSL/HTTPS .................. ✅ Enabled  │
│ Email ...................... ✅ Configured│
│ Backups .................... ✅ Enabled  │
│ Monitoring ................. ✅ Enabled  │
│                                         │
│ STATUS: 🟢 PRODUCTION READY            │
└─────────────────────────────────────────┘

Site: https://immobilierpluriel.com
Admin: https://immobilierpluriel.com/admin
API: https://api.immobilierpluriel.com/api
```

---

**Date de déploiement: [À COMPLÉTER]**  
**Heure en ligne: [À COMPLÉTER]**  
**Responsable: [À COMPLÉTER]**

---

**Félicitations pour votre lancement ! 🚀**
