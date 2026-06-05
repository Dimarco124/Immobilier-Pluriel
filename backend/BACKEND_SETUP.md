# Backend Laravel

API Laravel pour le site Immobilier Pluriel.

## Serveur local

```bash
cd backend
php artisan serve --host=127.0.0.1 --port=8000
```

URL API locale:

```text
http://127.0.0.1:8000/api
```

## Compte admin par defaut

```text
Email: admin@immobilier-pluriel.ci
Password: password
```

Connexion:

```http
POST /api/admin/login
```

Les routes admin CRUD utilisent ensuite le token Sanctum:

```http
Authorization: Bearer <token>
```

## Base de donnees

La base locale actuelle utilise SQLite pour permettre de tester tout de suite.

Pour passer a MySQL, creer une base `mon_immobilier`, puis mettre ces valeurs dans `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mon_immobilier
DB_USERNAME=root
DB_PASSWORD=
```

Puis lancer:

```bash
php artisan migrate:fresh --seed
```

## Endpoints publics principaux

```text
GET /api/hero-slides
GET /api/stats
GET /api/vision
GET /api/services
GET /api/terrains
GET /api/terrains/{id}
GET /api/projects
GET /api/projects/{id-ou-slug}
GET /api/news
GET /api/news/{id-ou-slug}
GET /api/team
GET /api/company-info
GET /api/navigation
GET /api/social-links
GET /api/contact-info
GET /api/site-settings
POST /api/contact
```

## Endpoints admin CRUD

```text
GET|POST /api/admin/{resource}
GET|PUT|PATCH|DELETE /api/admin/{resource}/{id}
```

Ressources disponibles:

```text
company-info, hero-slides, featured-projects, stats, vision-sections,
vision-stats, services, terrains, projects, news, team-members, principles,
page-headers, cta-sections, contact-info, contact-submissions,
navigation-links, social-links, footer-columns, footer-links, site-settings
```
