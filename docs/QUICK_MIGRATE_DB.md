# ⚡ Migration Rapide de Base de Données (10 minutes)

## 🎯 Résumé - 4 Commandes Seulement

### Sur Votre Ordinateur (Local)

```bash
# 1. Exporter la base de données
mysqldump -u root -p immobilier_db > backup.sql

# OU si vous utilisez SQLite :
sqlite3 backend/database/database.sqlite .dump > backup.sql

# 2. Vérifier le backup
ls -lh backup.sql
head -20 backup.sql
```

### Sur Hostinger (SSH)

```bash
# 3. Uploader et importer
scp backup.sql username@ssh.hostinger.com:/home/username/backups/
ssh username@ssh.hostinger.com

# 4. Importer la base
mysql -u username_immobilier_user -p username_immobilier_db < ~/backups/backup.sql

# 5. Vérifier
mysql -u username_immobilier_user -p username_immobilier_db << EOF
SELECT COUNT(*) FROM terrains;
SELECT COUNT(*) FROM contact_submissions;
EXIT;
EOF
```

---

## ✅ Checklist 30 Secondes

```
Local :
  [ ] mysqldump -u root -p immobilier_db > backup.sql
  [ ] ls -lh backup.sql (doit être > 1 MB)

Hostinger :
  [ ] scp backup.sql username@ssh.hostinger.com:/home/username/backups/
  [ ] mysql ... < backup.sql
  [ ] Vérifier les counts

Terminé ✓
```

---

## 🚨 Si Erreur

| Erreur | Solution |
|--------|----------|
| "Access denied" | Vérifier le password |
| "Database does not exist" | Créer DB avant : `CREATE DATABASE` |
| "Syntax error" | Votre backup est corrompu, recommencer |

---

Pour plus de détails → voir `MIGRATE_DATABASE_HOSTINGER.md`
