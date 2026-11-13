# 📊 Guide : Exporter SQLite vers SQL

**Durée : 5 minutes**

---

## Étape 1 : Exporter votre base SQLite

### Sur votre ordinateur (PowerShell)

**DOSSIER ACTUEL :** `C:\MON WEB\mon_immobilier\site-web`

**Copier cette commande :**

```powershell
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump" --protocol=TCP -u root -p --no-password immobilier_db > backup_immobilier.sql
```

Attendez... cette commande est pour MySQL, pas SQLite.

**Pour SQLite, c'est différent. Installez d'abord sqlite3 :**

### Option A : Utiliser sqlite3 en ligne de commande

**Vérifiez d'abord si sqlite3 est installé :**

```powershell
sqlite3 --version
```

**Si vous voyez une version (ex: 3.40.0), c'est bon. Continuez.**

**Si "sqlite3 not found", installez-le via Chocolatey :**

```powershell
choco install sqlite
```

### Option B : Si sqlite3 n'est pas disponible, utilisez PHP

**DOSSIER ACTUEL :** `C:\MON WEB\mon_immobilier\site-web`

Votre projet Laravel a accès à PHP. On va l'utiliser pour exporter.

**Créez un fichier `export-db.php` :**

```powershell
$cat > export-db.php << 'EOF'
<?php
// Exporter SQLite en SQL

$dbPath = 'backend/database/database.sqlite';

if (!file_exists($dbPath)) {
    die("Base de données non trouvée: $dbPath\n");
}

$pdo = new PDO("sqlite:$dbPath");

// Récupérer toutes les tables
$tables = $pdo->query("
    SELECT name FROM sqlite_master 
    WHERE type='table' 
    AND name NOT LIKE 'sqlite_%'
")->fetchAll(PDO::FETCH_COLUMN);

$sql = "-- Exported from SQLite\n";
$sql .= "-- Date: " . date('Y-m-d H:i:s') . "\n\n";

foreach ($tables as $table) {
    // Structure de la table
    $createTable = $pdo->query("SELECT sql FROM sqlite_master WHERE type='table' AND name='$table'")->fetchColumn();
    
    // Convertir la syntaxe SQLite vers MySQL
    $createTable = str_replace('AUTOINCREMENT', 'AUTO_INCREMENT', $createTable);
    $sql .= $createTable . ";\n\n";
    
    // Données
    $rows = $pdo->query("SELECT * FROM $table")->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($rows as $row) {
        $columns = implode(', ', array_keys($row));
        $values = implode(', ', array_map(fn($v) => is_null($v) ? 'NULL' : "'" . str_replace("'", "''", $v) . "'", array_values($row)));
        $sql .= "INSERT INTO $table ($columns) VALUES ($values);\n";
    }
    
    $sql .= "\n";
}

// Écrire dans un fichier
file_put_contents('backup_immobilier.sql', $sql);
echo "✓ Export réussi : backup_immobilier.sql\n";
?>
EOF
```

**Ensuite, exécutez le script :**

```powershell
php export-db.php
```

**Vous devez voir :**
```
✓ Export réussi : backup_immobilier.sql
```

### Vérifier le backup

```powershell
ls -lh backup_immobilier.sql
```

**Vous devez voir un fichier SQL créé**

---

## Étape 2 : Créer la base MySQL localement (Optionnel - pour tester)

Si vous voulez tester l'import **avant** de déployer sur Hostinger :

**DOSSIER ACTUEL :** N'importe quel dossier

```powershell
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql" -u root
```

**Dans le prompt MySQL, tapez :**

```sql
CREATE DATABASE immobilier_db_test;
USE immobilier_db_test;
```

**Sortez de MySQL :**

```
exit
```

**Importez le backup :**

```powershell
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql" -u root immobilier_db_test < backup_immobilier.sql
```

**Vérifiez :**

```powershell
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql" -u root immobilier_db_test -e "SELECT COUNT(*) as terrains FROM terrains;"
```

**Vous devez voir : 25 (ou votre nombre de terrains)**

---

## ✅ C'est fait !

Vous avez maintenant :
- ✅ `backup_immobilier.sql` - Votre base exportée en SQL
- ✅ Prêt à importer sur Hostinger

**Prochaine étape : Importer sur Hostinger**

Allez à : `GUIDE_COMPLET_HOSTINGER_SQLITE_TO_MYSQL.md`
