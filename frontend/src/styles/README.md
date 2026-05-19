# Structure CSS du Projet

## Organisation des fichiers

```
styles/
├── components/
│   ├── Header.css          # Header flottant premium
│   └── Footer.css          # Footer
│
├── pages/
│   ├── Home.css           # Page d'accueil
│   ├── AboutUs.css        # Page Équipe
│   ├── Services.css       # Page Services
│   ├── Terrains.css       # Page Terrains (liste)
│   ├── Portfolio.css      # Page Réalisations
│   ├── News.css           # Page Actualités
│   └── Contact.css        # Page Contact
│
├── Hero.css               # Section Hero (page d'accueil)
└── Terrains.css           # Section Terrains (carousel page d'accueil)
```

## Ordre d'import dans main.jsx

1. **Fonts** (Cormorant Garamond, Manrope)
2. **Base** (index.css)
3. **Components** (Header, Footer)
4. **Sections** (Hero, Terrains carousel)
5. **Pages** (Home, AboutUs, Services, etc.)
6. **Legacy** (modern-pages.css, responsive-fix.css, global-overrides.css)

## Principe

- Chaque composant a son propre fichier CSS
- Chaque page a son propre fichier CSS
- Les sections réutilisables ont leur propre fichier
- Facilite la maintenance et les modifications

## Header et Footer

**Question :** Pourquoi Home.jsx n'appelle pas Header et Footer ?

**Réponse :** Parce qu'ils sont appelés dans **App.jsx** !

```jsx
// App.jsx
<Header />
<main>
  <Routes>
    <Route path="/" element={<Home />} />
    ...
  </Routes>
</main>
<Footer />
```

Le Header et Footer sont **globaux** et s'affichent sur toutes les pages automatiquement.
