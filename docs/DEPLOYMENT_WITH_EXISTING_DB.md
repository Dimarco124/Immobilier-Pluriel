# 🚀 Déploiement Complet avec Votre Base de Données Existante

**Ce guide combine le déploiement Hostinger + Migration de votre BD actuelle**

---

## 📋 Plan d'Action

```
PHASE 1 : Préparer votre BD locale (5 min)
  └─ Exporter la base de données
  
PHASE 2 : Configuration Hostinger (5 min)
  └─ Créer l'infrastructure
  
PHASE 3 : Uploader la BD (3 min)
  └─ Transférer le backup
  
PHASE 4 : Importer la BD (2 min)
  └─ Restaurer les données
  
PHASE 5 : Déployer l'Application (25 min)
  └─ Backend + Frontend
  
PHASE 6 : Tests & Vérification (5 min)
  └─ Vérifier tout fonctionne

TOTAL : 45 minutes
```

---

## ✅ PHASE 1 : Exporter Votre BD Locale (5 min)

### Si vous utilisez MySQL localement

```bash
# Exporter complètement
mysqldump -u root -p immobilier_db > backup_complete.sql

# Vérifier
ls -lh backup_complete.sql
wc -l backup_complete.sql
```

### Si vous utilisez SQLite localement

```bash
# Localiser le fichier SQLite
find . -name "database.sqlite" 2>/dev/null

# Exporter
sqlite3 backend/database/database.sqlite .dump > backup_complete.sql

# Vérifier
ls -lh backup_complete.sql
```

### Garder une Copie Locale

```bash
# Créer un dossier backups
mkdir -p ~/backups/immobilier-pluriel

# Copier le backup
cp backup_complete.sql ~/backups/immobilier-pluriel/backup_$(date +%Y%m%d_%H%M%S).sql

# Vérifier
ls ~/backups/immobilier-pluriel/
```

---

## ✅ PHASE 2 : Configuration Hostinger (5 min)

### Suivre le guide principal pour :

1. **Accès cPanel** → Vérifier PHP 8.2+, activer SSH
2. **Créer la Base de Données** :
   ```
   cPanel → Databases → MySQL Databases
   - Name: username_immobilier_db
   - User: username_immobilier_user
   - Password: Mot_de_passe_fort_123!
   - All Privileges: ✓
   ```
3. **Créer le Sous-domaine API** (optionnel pour l'instant)

---

## ✅ PHASE 3 : Uploader le Backup (3 min)

### Via SCP (Ligne de commande)

```bash
# Depuis votre ordinateur
scp backup_complete.sql username@ssh.hostinger.com:/home/username/backups/

# Vérifier sur Hostinger
ssh username@ssh.hostinger.com
ls -lh ~/backups/backup_complete.sql
```

### Via SFTP (FileZilla)

1. Ouvrir FileZilla
2. Connexion SFTP à ssh.hostinger.com
3. Naviguer vers `/home/username/backups/`
4. Uploader `backup_complete.sql`

---

## ✅ PHASE 4 : Importer la BD (2 min)

### Importer dans Hostinger

```bash
# Se connecter à Hostinger
ssh username@ssh.hostinger.com

# Aller au répertoire backups
cd ~/backups/

# Importer (pour MySQL local → MySQL Hostinger)
mysql -u username_immobilier_user -p username_immobilier_db < backup_complete.sql

# Ou pour SQLite local → MySQL Hostinger (généralement fonctionne)
mysql -u username_immobilier_user -p username_immobilier_db < backup_complete.sql

# Entrer le password quand demandé
```

### Vérifier l'Import

```bash
# Se connecter à MySQL
mysql -u username_immobilier_user -p username_immobilier_db

# Vérifier les tables
SHOW TABLES;

# Vérifier les données
SELECT COUNT(*) as 'Total Terrains' FROM terrains;
SELECT COUNT(*) as 'Total Messages' FROM contact_submissions;
SELECT COUNT(*) as 'Total Projets' FROM projects;

# Quitter
EXIT;
```

---

## ✅ PHASE 5 : Déployer l'Application (25 min)

### Maintenant, déployer le code (voir DEPLOYMENT_HOSTINGER.md)

```bash
# Backend
cd ~/applications/immobilier-pluriel/backend
cp .env.example .env

# ÉDITER .env avec :
# DB_HOST=127.0.0.1
# DB_DATABASE=username_immobilier_db
# DB_USERNAME=username_immobilier_user
# DB_PASSWORD=Mot_de_passe_fort_123!
nano .env

# Installer
php artisan key:generate
composer install --no-dev --optimize-autoloader
chmod -R 775 storage bootstrap/cache

# NE PAS exécuter les migrations (données déjà là)
# Au lieu de : php artisan migrate --force
# Juste vérifier qu'elles ont tournées :
php artisan migrate:status

# Optimiser
php artisan config:cache
php artisan route:cache
```

### Frontend (même procédure)

```bash
cd ../frontend
npm install
nano .env
# VITE_API_URL=https://api.immobilierpluriel.com/api

npm run build
cp -r dist/* ~/domains/immobilierpluriel.com/public_html/
```

---

## ✅ PHASE 6 : Tests & Vérification (5 min)

### Tester que VOS données sont là

```bash
# API - Vérifier vos terrains
curl https://api.immobilierpluriel.com/api/terrains | grep -c "id"
# Doit retourner le nombre de terrains

# API - Vérifier vos messages
curl https://api.immobilierpluriel.com/api/contact
# Doit retourner les messages de contact

# Frontend
https://immobilierpluriel.com
# Doit afficher VOS terrains avec les VRAIS prix

# Admin
https://immobilierpluriel.com/admin
# Email: Admin@immobilierpluriel.com
# Password: Pluriel@2024
# Dashboard doit montrer VOS statistiques réelles
```

---

## 🚨 Important : NE PAS Exécuter les Migrations

```bash
# ❌ NE PAS FAIRE :
php artisan migrate --force

# ✅ FAIRE À LA PLACE :
# Vérifier qu'elles ont tournées (via l'import)
php artisan migrate:status

# Les données sont déjà importées, les migrations sont "Ran"
```

---

## 💾 Points Importants

### ✅ Données CONSERVÉES

- ✓ Tous les terrains
- ✓ Tous les messages de contact
- ✓ Tous les projets
- ✓ Toutes les actualités
- ✓ Tous les utilisateurs
- ✓ Toutes les images/fichiers
- ✓ Toutes les configurations

### ⚠️ À Faire

- Mettre à jour les URLs d'images si nécessaire
- Vérifier les chemins d'accès aux fichiers
- Tester tous les formulaires

### ❌ À NE PAS OUBLIER

- Ne pas exécuter `php artisan migrate --force` (données déjà présentes)
- Ne pas effacer le backup local
- Configurer les backups automatiques

---

## 🔄 Workflows Futurs

### Ajouter des Données Après Déploiement

**Via l'Admin Panel :**
```
1. https://immobilierpluriel.com/admin
2. Cliquer "Terrains" → "+ Ajouter"
3. Remplir les données
4. Sauvegarder
```

**Les nouvelles données seront directement dans Hostinger**

### Syncroniser Changements Locaux

```bash
# Si vous changez des choses localement et voulez les avoir en prod :

# 1. Exporter
mysqldump -u root -p immobilier_db > backup_updated.sql

# 2. Uploader
scp backup_updated.sql username@ssh.hostinger.com:/home/username/backups/

# 3. Importer
ssh username@ssh.hostinger.com
mysql -u username_immobilier_user -p username_immobilier_db < ~/backups/backup_updated.sql
```

---

## 📊 Résultat Final

```
✅ Application en ligne : https://immobilierpluriel.com
✅ API en ligne : https://api.immobilierpluriel.com/api
✅ Admin en ligne : https://immobilierpluriel.com/admin
✅ TOUTES VOS DONNÉES IMPORTÉES ET VISIBLES
✅ Backups configurés
✅ Production Ready
```

---

## 🆘 Problèmes Courants

### "Database migration error"
```bash
# Cause : Données déjà importées
# Solution : NE PAS exécuter migrate --force
php artisan migrate:status  # Doit montrer "Ran"
```

### "Table already exists"
```bash
# Cause : Données dupliquées
# Solution : Importer une seule fois
# Ou : DROP DATABASE et recommencer
```

### "No such table: terrains"
```bash
# Cause : Import n'a pas fonctionné
# Solution : Vérifier le fichier SQL et réimporter
mysql -u user -p db < backup.sql
```

### "FOREIGN KEY constraint failed"
```bash
# Cause : Tables avec références
# Solution : MySQL résout généralement ça
# Si problème : mysql> SET FOREIGN_KEY_CHECKS=0;
```

---

## 📞 Aide Rapide

- **Problème import** → Voir `MIGRATE_DATABASE_HOSTINGER.md`
- **Problème déploiement** → Voir `DEPLOYMENT_HOSTINGER.md`
- **Problème général** → Voir `HOSTINGER_COMMANDS.sh`

---

**✅ Vous êtes prêt ! Votre site et vos données sont maintenant en ligne ! 🎉**
