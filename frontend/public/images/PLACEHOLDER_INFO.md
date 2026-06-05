# Images Placeholder Necessaires

## Images a Creer ou Remplacer

### 1. /images/placeholder-company.jpg
**Utilisation** : Page Team.jsx - Image par defaut de l'entreprise
**Dimensions recommandees** : 1000x800px
**Format** : JPG ou PNG
**Description** : Photo d'un batiment moderne, bureau ou chantier

### 2. /images/bannieres/hero-default.jpg
**Utilisation** : Page Home.jsx - Image hero par defaut
**Dimensions recommandees** : 1920x1080px
**Format** : JPG
**Description** : Paysage urbain, terrain amenage ou projet immobilier

## Images Existantes Utilisees

Les images suivantes sont deja presentes et utilisees :
- /images/bannieres/viabiliser.png
- /images/bannieres/Hotel.png
- /images/logo_immobilier.png
- /images/photo-95cf3dfb.jpg (atelier)

## Solution Temporaire

En attendant les vraies images, vous pouvez :
1. Copier une image existante et la renommer
2. Utiliser une image de votre choix
3. Generer des placeholders avec un outil en ligne

## Commandes pour Creer des Placeholders

### Option 1 : Copier une image existante
```powershell
# Pour placeholder-company.jpg
Copy-Item "frontend/public/images/photo-95cf3dfb.jpg" "frontend/public/images/placeholder-company.jpg"

# Pour hero-default.jpg
Copy-Item "frontend/public/images/bannieres/viabiliser.png" "frontend/public/images/bannieres/hero-default.jpg"
```

### Option 2 : Telecharger depuis un service de placeholder
Visitez : https://placehold.co/
- placeholder-company.jpg : https://placehold.co/1000x800/1a3d32/ffffff/jpg?text=Immobilier+Pluriel
- hero-default.jpg : https://placehold.co/1920x1080/1a3d32/ffffff/jpg?text=Amenagement+Territoire
