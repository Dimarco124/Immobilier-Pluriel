# 💾 Guide Complet : Migrer votre Base de Données Actuelle vers Hostinger

## 🎯 Objectif

Transférer votre **base de données locale complète** (avec tous les terrains, messages, utilisateurs, etc.) vers Hostinger **SANS perdre aucune donnée**.

---

## 📊 Prérequis

### Sur Votre Ordinateur (Local)

- ✅ MySQL/SQLite/PostgreSQL avec les données actuelles
- ✅ Accès à la base de données
- ✅ Terminal/Command Prompt
- ✅ Droits d'accès à la base de données

### Sur Hostinger

- ✅ Plan Business/Cloud activé
- ✅ MySQL Database créée : `username_immobilier_db`
- ✅ User créé : `username_immobilier_user`
- ✅ SSH accès disponible

---

## 🔧 ÉTAPE 1 : Exporter Votre Base de Données Locale

### 1.1 Identifier Votre Type de Database

```bash
# Voir le fichier .env local
cat backend/.env | grep DB_

# Résultat possible :
# DB_CONNECTION=sqlite
# DB_DATABASE=/path/to/database.sqlite

# OU

# DB_CONNECTION=mysql
# DB_HOST=localhost
# DB_PORT=3306
# DB_DATABASE=immobilier_db
# DB_USERNAME=root
# DB_PASSWORD=password
```

### 1.2 Exporter depuis SQLite (si vous utilisez SQLite localement)

```bash
# Localiser le fichier SQLite
find . -name "database.sqlite" -o -name "*.sqlite" -o -name "*.sqlite3"

# Résultat typique:
# ./backend/database/database.sqlite

# Exporter en SQL
sqlite3 backend/database/database.sqlite .dump > backup_sqlite.sql

# Vérifier la taille du backup
ls -lh backup_sqlite.sql
# Doit être entre 100 KB et plusieurs MB selon les données
```

### 1.3 Exporter depuis MySQL (si vous utilisez MySQL localement)

```bash
# Exporter la base complète
mysqldump -u root -p immobilier_db > backup_mysql.sql

# Entrer le mot de passe quand demandé

# Vérifier
ls -lh backup_mysql.sql
```

### 1.4 Exporter depuis PostgreSQL (si applicable)

```bash
# Exporter la base complète
pg_dump -U postgres immobilier_db > backup_postgresql.sql

# Vérifier
ls -lh backup_postgresql.sql
```

### 1.5 Vérifier le Backup

```bash
# Voir les premières lignes
head -20 backup_*.sql

# Doit afficher quelque chose comme:
# -- SQLite format 3
# CREATE TABLE users (
# INSERT INTO users VALUES (1, 'Admin', ...);

# Ou pour MySQL:
# -- MySQL dump 10.13
# CREATE TABLE `users` (
# INSERT INTO `users` VALUES (1, 'Admin', ...);
```

---

## 📤 ÉTAPE 2 : Uploader le Backup sur Hostinger

### 2.1 Via SFTP (Recommandé)

**Utiliser FileZilla ou WinSCP :**

```
1. Ouvrir FileZilla
2. Fichier → Manager des sites
3. Créer un nouveau site :
   - Host: ssh.hostinger.com
   - Port: 22
   - Protocol: SFTP
   - User: username
   - Password: votre_password
4. Connecter
5. Naviguer vers : /home/username/backups/
6. Drag & Drop le fichier backup_*.sql
```

**Ou en ligne de commande :**

```bash
# Via SCP (depuis votre ordinateur)
scp backup_mysql.sql username@ssh.hostinger.com:/home/username/backups/

# Vérifier sur Hostinger
ssh username@ssh.hostinger.com
ls -lh ~/backups/backup_mysql.sql
```

### 2.2 Via cPanel File Manager

1. Aller à **cPanel** → **File Manager**
2. Naviguer vers `/home/username/backups/`
3. Cliquer **Upload Files**
4. Sélectionner votre backup SQL
5. Attendre la fin de l'upload

---

## 🔄 ÉTAPE 3 : Préparer la Base de Données Hostinger

### 3.1 Se Connecter à SSH

```bash
ssh username@ssh.hostinger.com
cd ~/backups/
ls -lh backup_*.sql
```

### 3.2 Créer la Base de Données Vide (si pas fait)

```bash
# Se connecter à MySQL
mysql -u username_immobilier_user -p

# Entrer le password

# Puis exécuter :
CREATE DATABASE IF NOT EXISTS username_immobilier_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
# Doit afficher username_immobilier_db
```

---

## 💾 ÉTAPE 4 : Importer le Backup dans Hostinger

### 4.1 Importer via MySQL CLI

```bash
# Option 1 : Importer directement
mysql -u username_immobilier_user -p username_immobilier_db < ~/backups/backup_mysql.sql

# Entrer le password

# Cela peut prendre quelques secondes à quelques minutes selon la taille

# Vérifier que c'est terminé
echo "Import terminé"
```

### 4.2 Importer via cPanel (Alternative)

1. Aller à **cPanel** → **phpMyAdmin**
2. Sélectionner la base : `username_immobilier_db`
3. Aller à l'onglet **Import**
4. Cliquer **Choose File**
5. Sélectionner le fichier `backup_mysql.sql`
6. Cliquer **Import**
7. Attendre la fin (peut prendre quelques minutes)

### 4.3 Importer via SSH (Streaming - Plus rapide pour gros fichiers)

```bash
# Pour les fichiers > 100 MB
cat ~/backups/backup_mysql.sql | mysql -u username_immobilier_user -p username_immobilier_db

# Entrer le password
# Cela streaming le fichier au lieu de le charger en mémoire
```

---

## ✅ ÉTAPE 5 : Vérifier l'Import

### 5.1 Vérifier les Tables

```bash
# Se connecter à MySQL
mysql -u username_immobilier_user -p username_immobilier_db

# Lister les tables
SHOW TABLES;

# Résultat attendu :
# +---------------------------------+
# | Tables_in_username_immobilier_db |
# +---------------------------------+
# | cache                           |
# | contact_submissions             |
# | cta_sections                    |
# | featured_projects               |
# | footer_columns                  |
# | footer_links                    |
# | hero_slides                     |
# | jobs                            |
# | legal_sections                  |
# | navigation_links                |
# | news                            |
# | page_headers                    |
# | personal_access_tokens          |
# | principles                      |
# | projects                        |
# | services                        |
# | site_settings                   |
# | social_links                    |
# | stats                           |
# | team_members                    |
# | terrains                        |
# | testimonials                    |
# | users                           |
# | vision_sections                 |
# | vision_stats                    |
# +---------------------------------+
```

### 5.2 Vérifier les Données

```bash
# Compter les terrains
SELECT COUNT(*) FROM terrains;
# Doit afficher le même nombre qu'en local

# Compter les messages
SELECT COUNT(*) FROM contact_submissions;

# Voir les utilisateurs
SELECT * FROM users;

# Voir quelques terrains
SELECT id, title, location, price FROM terrains LIMIT 5;

# Quitter
EXIT;
```

### 5.3 Script de Vérification Complet

```bash
# Créer un script de vérification
cat > ~/verify_db.sh << 'EOF'
#!/bin/bash

echo "🔍 Vérification de la Base de Données"
echo "====================================="
echo ""

# Se connecter et exécuter les vérifications
mysql -u username_immobilier_user -p username_immobilier_db << SQL
-- Tables
SELECT 'Tables:' as 'Vérification';
SHOW TABLES;

-- Compter les enregistrements
SELECT 'Données:' as 'Vérification';
SELECT 'Terrains:', COUNT(*) FROM terrains;
SELECT 'Utilisateurs:', COUNT(*) FROM users;
SELECT 'Messages de contact:', COUNT(*) FROM contact_submissions;
SELECT 'Projets:', COUNT(*) FROM projects;
SELECT 'Actualités:', COUNT(*) FROM news;

-- Vérifier l'utilisateur admin
SELECT 'Utilisateur Admin:' as 'Vérification';
SELECT id, name, email FROM users WHERE email LIKE '%admin%';
SQL

echo ""
echo "✅ Vérification terminée"
EOF

chmod +x ~/verify_db.sh
./verify_db.sh
```

---

## 🚀 ÉTAPE 6 : Déployer le Backend avec la Nouvelle BD

### 6.1 Configurer le .env sur Hostinger

```bash
# Aller au backend
cd ~/applications/immobilier-pluriel/backend

# Éditer .env
nano .env

# Vérifier/Modifier :
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=username_immobilier_db
# DB_USERNAME=username_immobilier_user
# DB_PASSWORD=votre_password

# Sauvegarder : Ctrl+O → Entrée → Ctrl+X
```

### 6.2 Vérifier la Connexion

```bash
# Test de connexion PHP
php artisan tinker

# Dans tinker :
DB::table('terrains')->count()
# Doit retourner le nombre de terrains

DB::table('users')->first()
# Doit afficher l'admin

exit
```

### 6.3 Mettre en Cache

```bash
# Actualiser les caches
php artisan config:cache
php artisan cache:clear

# Vérifier que tout fonctionne
php artisan migrate:status
# Doit afficher toutes les migrations comme "Ran"
```

---

## 🧪 ÉTAPE 7 : Tester les Données en Production

### 7.1 Tester l'API avec les Vraies Données

```bash
# Tester les terrains
curl https://api.immobilierpluriel.com/api/terrains | head -50

# Doit afficher les terrains importés en JSON

# Tester les projets
curl https://api.immobilierpluriel.com/api/projects

# Tester les actualités
curl https://api.immobilierpluriel.com/api/news

# Tester les messages de contact (vérifier les messages existants)
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://api.immobilierpluriel.com/admin/contact-submissions
```

### 7.2 Tester l'Admin Panel

```
1. Aller à https://immobilierpluriel.com/admin
2. Login avec Admin@immobilierpluriel.com / Pluriel@2024
3. Dashboard doit afficher :
   ✓ Nombre de terrains (25+)
   ✓ Nombre de projets (8+)
   ✓ Messages de contact reçus
   ✓ Activités récentes
4. Cliquer sur "Messages"
   ✓ Tous vos messages doivent être là
5. Cliquer sur un message
   ✓ Les détails doivent s'afficher
```

### 7.3 Tester le Frontend

```
1. Aller à https://immobilierpluriel.com
2. Vérifier :
   ✓ Page d'accueil charge avec les vraies données
   ✓ Les terrains s'affichent correctement
   ✓ Les projets s'affichent
   ✓ Les actualités s'affichent
3. Aller à /terrains
   ✓ Tous vos terrains doivent s'afficher
4. Cliquer sur un terrain
   ✓ Les détails doivent être corrects
```

---

## 🔒 ÉTAPE 8 : Sécuriser et Nettoyer

### 8.1 Sauvegarder le Backup Localement

```bash
# Sur votre ordinateur, garder le backup en sécurité
mkdir -p ~/backups/immobilier-pluriel
cp backup_mysql.sql ~/backups/immobilier-pluriel/backup_$(date +%Y%m%d).sql

# Vérifier
ls -lh ~/backups/immobilier-pluriel/
```

### 8.2 Nettoyer Hostinger

```bash
# Supprimer le fichier de backup (optionnel)
rm ~/backups/backup_mysql.sql

# OU le garder pour les restaurations futures
# Recommandé : le garder
```

### 8.3 Configurer des Backups Automatiques

```bash
# Créer un script de backup quotidien
cat > ~/daily_backup.sh << 'EOF'
#!/bin/bash

BACKUP_DIR="/home/username/backups"
DATE=$(date +%Y%m%d_%H%M%S)

echo "💾 Backup quotidien..."

# Backup de la database
mysqldump -u username_immobilier_user -p'PASSWORD' username_immobilier_db > $BACKUP_DIR/db_$DATE.sql

# Backup du code
tar -czf $BACKUP_DIR/code_$DATE.tar.gz /home/username/applications/immobilier-pluriel

# Garder seulement les 7 derniers backups
find $BACKUP_DIR -name "db_*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "code_*.tar.gz" -mtime +7 -delete

echo "✅ Backup terminé"
ls -lh $BACKUP_DIR | tail -10
EOF

chmod +x ~/daily_backup.sh

# Ajouter à crontab pour s'exécuter à 2h du matin chaque jour
crontab -e

# Ajouter cette ligne :
# 0 2 * * * /home/username/daily_backup.sh >> /home/username/backup.log 2>&1
```

---

## ⚠️ Cas Spéciaux

### Cas 1 : Base de Données Très Grande (> 500 MB)

```bash
# Exporter avec compression (local)
mysqldump -u root -p immobilier_db | gzip > backup_mysql.sql.gz

# Sur Hostinger, décompresser et importer
gunzip < ~/backups/backup_mysql.sql.gz | mysql -u username_immobilier_user -p username_immobilier_db
```

### Cas 2 : Migration depuis PostgreSQL vers MySQL

```bash
# Exporter depuis PostgreSQL
pg_dump -U postgres immobilier_db > backup_postgresql.sql

# Convertir en MySQL (via un outil comme pgdump2mysql)
# OU manually adjust the SQL syntax

# Puis importer sur Hostinger
mysql -u username_immobilier_user -p username_immobilier_db < backup_postgresql.sql
```

### Cas 3 : La Base est Trop Grande pour Uploader

```bash
# Option 1 : Streaming direct (recommandé)
# Sur Hostinger, créer un tunnel pour lire depuis votre PC
ssh -R 3306:localhost:3306 username@ssh.hostinger.com

# Puis depuis votre PC :
mysqldump -u root -p immobilier_db | mysql -h localhost -u username_immobilier_user -p username_immobilier_db

# Option 2 : Importer par parties
# Diviser le backup en plusieurs fichiers
split -l 50000 backup_mysql.sql backup_part_

# Importer chaque partie
for file in backup_part_*; do
    mysql -u username_immobilier_user -p username_immobilier_db < $file
done
```

### Cas 4 : Garder la Base Locale ET Hostinger Synchronisées

```bash
# Script de sync bi-directionnelle (avancé)
cat > ~/sync_db.sh << 'EOF'
#!/bin/bash

echo "🔄 Synchronisation des bases de données..."

# Exporter depuis local
mysqldump -u root -p immobilier_db > /tmp/local_backup.sql

# Exporter depuis Hostinger
ssh username@ssh.hostinger.com "mysqldump -u username_immobilier_user -p'PASSWORD' username_immobilier_db" > /tmp/hostinger_backup.sql

# Comparer les fichiers
if diff /tmp/local_backup.sql /tmp/hostinger_backup.sql > /dev/null; then
    echo "✅ Les bases sont synchronisées"
else
    echo "⚠️  Les bases sont différentes"
    echo "Local:"
    wc -l /tmp/local_backup.sql
    echo "Hostinger:"
    wc -l /tmp/hostinger_backup.sql
fi
EOF

chmod +x ~/sync_db.sh
```

---

## 📋 Checklist Migration

```
AVANT DE COMMENCER :
  ✓ Vérifier la base locale est complète
  ✓ Créer un backup sur l'ordinateur
  ✓ Vérifier la connexion Hostinger
  ✓ Vérifier la base vide sur Hostinger

EXPORT :
  ✓ Exporter la base locale (mysqldump ou sqlite3)
  ✓ Vérifier la taille du backup
  ✓ Vérifier le contenu du backup (head)

UPLOAD :
  ✓ Uploader le backup sur Hostinger
  ✓ Vérifier le fichier sur Hostinger

IMPORT :
  ✓ Importer le backup
  ✓ Vérifier les tables créées
  ✓ Vérifier les données importées (count)
  ✓ Vérifier les utilisateurs

CONFIGURATION :
  ✓ Mettre à jour le .env avec les credentials Hostinger
  ✓ Tester la connexion (php artisan tinker)
  ✓ Rafraîchir les caches

TESTS :
  ✓ Tester l'API (curl /api/terrains)
  ✓ Tester l'admin login
  ✓ Tester l'affichage des données
  ✓ Vérifier les messages de contact
  ✓ Vérifier tous les terrains

SÉCURITÉ :
  ✓ Garder le backup localement
  ✓ Configurer les backups automatiques
  ✓ Vérifier les permissions
  ✓ Vérifier APP_DEBUG=false

✅ MIGRATION COMPLÈTE !
```

---

## 🆘 Troubleshooting

| Erreur | Cause | Solution |
|--------|-------|----------|
| "Access denied for user" | Mauvais password | Vérifier le password dans .env |
| "Database does not exist" | BD pas créée | `CREATE DATABASE` avant import |
| "Table already exists" | Données duppliquées | `DROP DATABASE` et recommencer |
| "Out of memory" | Fichier trop gros | Utiliser streaming (`cat file \| mysql`) |
| "Syntax error" | Fichier SQL corrompu | Vérifier le backup local |
| "Foreign key constraint" | Ordre d'import incorrect | MySQL peut réordonner automatiquement |
| "Connection refused" | Hostinger offline | Attendre ou contacter support |

---

## 📞 Support

- **Hostinger Support** : https://hostinger.com/support
- **Lire aussi** : `DEPLOYMENT_HOSTINGER.md`
- **Backup Guide** : `SECURITY.md`

---

## ✅ Résultat Final

Après ces étapes, vous aurez :

✅ **Base de données complète** transférée sur Hostinger  
✅ **Tous vos terrains** disponibles sur le site en ligne  
✅ **Tous vos messages de contact** dans l'admin  
✅ **Tous vos utilisateurs** synchronisés  
✅ **Tous vos projets et actualités** visibles  
✅ **Backups automatiques** configurés  
✅ **Zéro perte de données**  

**Votre site Immobilier Pluriel est maintenant complètement en ligne avec toutes vos données ! 🚀**
