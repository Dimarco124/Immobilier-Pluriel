export const company = {
  name: 'Immobilier Pluriel',
  shortName: 'Savane',
  tagline: "Une grande entreprise qui aménage, construit et valorise le territoire.",
  description:
    "Immobilier Pluriel transforme des visions en projets concrets grâce à une expertise intégrée couvrant le foncier, l’aménagement, la construction et le développement d’infrastructures durables.",
};

export const stats = [
  { value: '8', label: 'Services intégrés' },
  { value: '120+', label: 'projets accompagnés' },
  { value: '24', label: 'mois de suivi chantier' },
  { value: '4', label: 'pôles régionaux actifs' },
];

/** Section accueil « Notre vision » — chiffres clés */
export const visionStats = [
  { value: '17', suffix: '+', label: "Années d'expérience", hint: 'Depuis 2009' },
  { value: '120', suffix: '+', label: 'Projets accompagnés', hint: 'Foncier à agro-industrie' },
  { value: '850', suffix: '+', label: 'Hectares structurés', hint: 'Lotissements & VRD' },
  { value: '8', suffix: '', label: "Pôles d'expertise", hint: 'Expertises intégrées' },
];

/** Citation dirigeante — section vision */
export const visionQuote = {
  text: "Notre rôle n'est pas seulement de vendre du foncier : nous concevons des territoires viables, avec des réseaux, des délais tenus et une valeur durable pour les habitants comme pour les investisseurs.",
  author: 'Awa Traoré',
  role: 'Directrice générale, Immobilier Pluriel',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
};

export const services = [
  {
    title: 'Lotissement & Urbanisme',
    summary: "Transformer des terres brutes en quartiers résidentiels structurés et viabilisés.",
    example:
      "Sur une zone de 20 hectares, nous concevons le plan de masse, réalisons le terrassement et installons les réseaux avant la mise en vente.",
    result: 'Des espaces de vie organisés, sécurisés et prêts pour la construction.',
    icon: 'lotissement',
    image: '/images/services/lotissement.jpg',
  },
  {
    title: "Aménagement Foncier",
    summary: 'Valorisation de grandes réserves foncières pour des projets d’envergure.',
    example:
      "Nous préparons des plateformes industrielles ou commerciales avec un ensoleillement et une orientation optimisés.",
    result: 'Des terrains à fort potentiel de valorisation pour investisseurs.',
    icon: 'terrain',
    image: '/images/services/terrain.jpg',
  },
  {
    title: 'Génie Civil & Structure',
    summary: 'Mise en œuvre de structures robustes pour tout type de bâtiment.',
    example:
      "Nos équipes assurent le ferraillage et le coulage de dalles haute résistance pour des complexes industriels.",
    result: 'Une solidité structurelle garantie pour des ouvrages durables.',
    icon: 'metal',
    image: '/images/services/metal.jpg',
  },
  {
    title: 'Hôtellerie de Standing',
    summary: 'Conception architecturale et réalisation de complexes touristiques haut de gamme.',
    example:
      "Réalisation de resorts with espaces de détente, piscines olympiques et finitions de luxe.",
    result: 'Des établissements prestigieux livrés avec un souci du détail architectural.',
    icon: 'hotel',
    image: '/images/services/hotel.jpg',
  },
  {
    title: 'Logistique & Entreposage',
    summary: 'Gestion intelligente des espaces de stockage et des flux de marchandises.',
    example:
      "Mise en place de plateformes de distribution modernes avec rayonnages optimisés et gestion informatisée.",
    result: 'Une chaîne logistique fluide et un stockage sécurisé à grande échelle.',
    icon: 'truck',
    image: '/images/services/truck.jpg',
  },
  {
    title: 'Développement Agro-industriel',
    summary: 'Création d’exploitations agricoles modernes et durables.',
    example:
      "Mise en place de pépinières et de systèmes de culture irrigués pour une production constante.",
    result: 'Des projets agricoles rentables utilisant les meilleures techniques de culture.',
    icon: 'farm',
    image: '/images/services/farm.jpg',
  },
  {
    title: 'Études & Ingénierie',
    summary: 'Bureau d’études techniques pour la conception et le suivi de vos projets.',
    example:
      "Élaboration de plans de structure, calculs de charge et suivi de conformité sur chantier.",
    result: 'Une expertise technique pointue pour sécuriser chaque étape de vos travaux.',
    icon: 'formation',
    image: '/images/services/formation.jpg',
  },
  {
    title: 'Voirie & Réseaux (VRD)',
    summary: 'Réalisation des infrastructures routières et des réseaux d’assainissement.',
    example:
      "Ouverture de voies bitumées, installation de caniveaux de drainage et réseaux d'eau potable.",
    result: 'Des zones parfaitement desservies et protégées contre les intempéries.',
    icon: 'voirie',
    image: '/images/services/image.jfif',
  },
];

export const team = [
  {
    name: 'Awa Traoré',
    role: 'Directrice Générale',
    bio: 'Pilote la stratégie, les grands comptes et les partenariats institutionnels.',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Moussa Koné',
    role: 'Directeur Technique',
    bio: 'Supervise les études, les chantiers, les lots VRD et les ouvrages complexes.',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Fatou Diallo',
    role: 'Responsable Aménagement',
    bio: 'Coordonne les lotissements, les plans d ensemble et la relation avec les collectivités.',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Issa Bamba',
    role: 'Responsable Développement',
    bio: 'Développe les projets terrains, hôtellerie et solutions agro-industrielles.',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
];

export const projects = [
  {
    id: 'savane-horizon',
    title: 'Quartier Savane Horizon',
    location: 'Ouagadougou',
    category: 'Lotissement',
    year: '2025',
    highlight: '120 lots viabilisés',
    description:
      'Un ancien terrain nu transformé en quartier résidentiel avec voirie, eau potable et électrification.',
    longDescription:
      "Le projet Savane Horizon est une référence en matière d'aménagement urbain. Sur une surface totale de 15 hectares, nous avons structuré un quartier moderne répondant aux normes internationales. L'accent a été mis sur la durabilité des infrastructures et l'intégration d'espaces verts pour le bien-être des futurs résidents.",
    keyFeatures: [
      "Voirie bitumée avec drainage intégré",
      "Réseau électrique moyenne tension",
      "Adduction d'eau potable sur chaque lot",
      "Éclairage public solaire intelligent"
    ],
    results: [
      "Sécurité foncière garantie"
    ],
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Exemple de vidéo
    gallery: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80']
  },
  {
    id: 'route-koudougou',
    title: 'Route d accès de Koudougou',
    location: 'Centre-Ouest',
    category: 'Ouverture de voies',
    year: '2024',
    highlight: '10 km de route',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Exemple de vidéo
    description:
      'Une voie principale et des accès secondaires pour reconnecter une zone rurale au réseau économique.',
    longDescription:
      "Ce projet de désenclavement a consisté en l'ouverture et le reprofilage lourd de 10 km de voies. Un défi technique majeur relevé par nos équipes pour permettre la circulation en toute saison, facilitant ainsi l'évacuation des produits agricoles vers les centres urbains.",
    keyFeatures: [
      "Terrassement et compactage haute densité",
      "Construction de 3 ponts de franchissement",
      "Signalisation horizontale et verticale",
      "Fossés de drainage bétonnés"
    ],
    results: [
      "Réduction du temps de trajet de 50%",
      "Accès facilité pour 5 000 villageois",
      "Augmentation des échanges commerciaux locaux"
    ],
    image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80']
  },
  {
    id: 'savane-prestige',
    title: 'Hôtel Savane Prestige',
    location: 'Abidjan',
    category: 'Hôtellerie',
    year: '2025',
    highlight: '120 chambres',
    description:
      'Un hôtel haut de gamme livré avec espaces de réception, restauration et services premium.',
    longDescription:
      "Savane Prestige redéfinit le luxe hôtelier à Abidjan. Immobilier Pluriel a assuré la maîtrise d'œuvre complète, de la conception architecturale à la décoration intérieure. Un projet complexe alliant esthétique moderne et exigences techniques d'un établissement 4 étoiles.",
    keyFeatures: [
      "Structure béton armé haute résistance",
      "Système de climatisation centralisé VRV",
      "Domotique intégrée dans les chambres",
      "Cuisine professionnelle aux normes HACCP"
    ],
    results: [
      "Certification internationale obtenue",
      "Création de 80 emplois directs",
      "Taux d'occupation moyen de 75% dès l'ouverture"
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80']
  },
  {
    id: 'plateforme-agro',
    title: 'Plateforme agro-logistique',
    location: 'Bobo-Dioulasso',
    category: 'Agroalimentaire',
    year: '2024',
    highlight: 'Chaîne du froid intégrée',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description:
      'Un ensemble de stockage, transformation et transport pour relier les exploitations aux marchés.',
    longDescription:
      "Cette plateforme est le maillon essentiel de la chaîne de valeur agricole régionale. Nous avons conçu des entrepôts frigorifiques de grande capacité et des unités de pré-transformation pour minimiser les pertes post-récolte et maximiser les revenus des producteurs.",
    keyFeatures: [
      "Chambres froides à température contrôlée",
      "Zone de tri et de conditionnement automatisée",
      "Quais de chargement pour camions frigorifiques",
      "Système de traçabilité informatisé"
    ],
    results: [
      "Réduction des pertes post-récolte de 30%",
      "Capacité de stockage de 5 000 tonnes",
      "Lien direct créé avec les marchés export"
    ],
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80']
  },
  {
    id: 'hangar-industriel',
    title: 'Hangar Industriel Zone Nord',
    location: 'Ouagadougou',
    category: 'Construction Métallique',
    year: '2025',
    highlight: '5000 m2 couverts',
    description:
      'Réalisation d une structure métallique de grande portée pour le stockage de produits manufacturés.',
    longDescription:
      "Un projet de construction métallique d'envergure réalisé en un temps record. La structure de 5000 m² sans poteaux intermédiaires offre une flexibilité maximale pour le stockage et la logistique industrielle.",
    keyFeatures: [
      "Charpente métallique en acier haute limite élastique",
      "Bardage double peau avec isolation thermique",
      "Dalle béton quartzée anti-poussière",
      "Portes sectionnelles motorisées"
    ],
    results: [
      "Livraison en seulement 6 mois",
      "Espace de stockage optimisé à 100%",
      "Conformité totale aux normes de sécurité incendie"
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80']
  },
  {
    id: 'residence-savane',
    title: 'Résidence Savane Parc',
    location: 'Abidjan',
    category: 'Immobilier',
    year: '2025',
    highlight: '24 appartements F4',
    description: 'Un complexe résidentiel moderne alliant confort et sécurité.',
    longDescription: "La résidence Savane Parc propose des appartements haut de gamme dans un cadre verdoyant et sécurisé.",
    keyFeatures: ["Ascenseurs haut débit", "Piscine commune", "Parking sous-sol", "Sécurité 24h/24"],
    results: ["100% vendu avant livraison"],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80']
  },
  {
    id: 'centre-commercial',
    title: 'Grand Centre Savane Mall',
    location: 'Bouaké',
    category: 'Commerce',
    year: '2026',
    highlight: '50 boutiques',
    description: 'Le plus grand centre commercial de la région.',
    longDescription: "Un espace shopping et loisirs moderne pour dynamiser l'économie locale.",
    keyFeatures: ["Food court", "Supermarché", "Cinéma", "Zone de jeux"],
    results: ["Création de 200 emplois"],
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1200&q=80']
  },
  {
    id: 'ferme-moderne',
    title: 'Ferme Avicole Intégrée',
    location: 'Yamoussoukro',
    category: 'Agriculture',
    year: '2025',
    highlight: '50 000 têtes',
    description: 'Une unité de production avicole automatisée.',
    longDescription: "Une ferme utilisant les dernières technologies pour une production de qualité.",
    keyFeatures: ["Alimentation automatisée", "Contrôle climatique", "Abattoir aux normes"],
    results: ["Leader régional en production d'œufs"],
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80']
  }
];

export const news = [
  {
    id: 'lotissement-45-hectares',
    title: 'Lancement d un nouveau lotissement de 45 hectares',
    category: 'Aménagement',
    author: 'Direction Technique',
    date: '15 Mai 2026',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Immobilier Pluriel démarre un projet de quartier moderne avec voirie, assainissement et éclairage public.',
    content: `
      <p>Nous avons le plaisir d'annoncer le lancement officiel de notre nouveau projet de lotissement d'envergure, s'étendant sur plus de 45 hectares. Ce projet ambiieux, baptisé "Horizon Sud", vise à créer un nouveau pôle de vie moderne et structuré, répondant à la demande croissante en logements de qualité.</p>

      <h3>Une vision urbaine intégrée</h3>
      <p>Le projet "Horizon Sud" n'est pas qu'un simple découpage de parcelles. C'est une véritable ville dans la ville que nous concevons. Nos urbanistes ont travaillé pendant 12 mois pour optimiser la circulation, maximiser les espaces verts et garantir une sécurité optimale aux futurs résidents.</p>

      <blockquote>"Notre objectif est de livrer un quartier où chaque habitant se sent en harmonie avec son environnement tout en bénéficiant des commodités les plus modernes." - Moussa Koné, Directeur Technique.</blockquote>

      <h3>Les points clés du projet :</h3>
      <ul>
        <li><strong>Viabilisation complète :</strong> Plus de 400 parcelles résidentielles prêtes à la construction.</li>
        <li><strong>Infrastructures durables :</strong> Ouverture de voies bitumées avec un système de drainage pluvial haute capacité.</li>
        <li><strong>Énergie et Réseaux :</strong> Électrification souterraine et éclairage public solaire intelligent.</li>
        <li><strong>Services de proximité :</strong> Réservation de 5 hectares pour des écoles, un centre de santé et des commerces de proximité.</li>
      </ul>

      <p>Immobilier Pluriel s'engage une fois de plus à transformer le paysage urbain en offrant des solutions d'habitat sécurisées et de haute qualité. Les travaux de terrassement ont déjà débuté et avancent conformément au planning établi, avec une livraison des premières parcelles prévue pour fin 2026.</p>
    `,
    tags: ['Urbanisme', 'Infrastructure', 'Innovation'],
    gallery: ['/images/photo-048f5b05.jpg', '/images/photo-3299f3b7.jpg']
  },
  {
    id: 'accord-hotel-affaires',
    title: 'Signature d un accord pour un hôtel d affaires',
    category: 'Hôtellerie',
    author: 'Pôle Développement',
    date: '28 Avril 2026',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Le groupe accompagne un investisseur privé dans la conception et la réalisation d un hôtel 4 étoiles.',
    content: `
      <p>Un nouvel accord stratégique a été signé entre Immobilier Pluriel et un groupe d'investisseurs internationaux pour la réalisation d'un complexe hôtelier de haut standing. Cet établissement 4 étoiles sera situé dans la zone aéroportuaire, en plein essor économique.</p>

      <h3>Un hub pour les voyageurs d'affaires</h3>
      <p>Le futur établissement, "Le Savane Business Hotel", répondra aux besoins spécifiques des voyageurs d'affaires internationaux. Alliant confort moderne et touches artisanales locales, l'hôtel proposera une expérience unique dans la région.</p>

      <h3>Caractéristiques du projet :</h3>
      <ul>
        <li><strong>Hébergement :</strong> 120 chambres et suites luxueuses avec domotique intégrée.</li>
        <li><strong>Événementiel :</strong> Un centre de conférence modulable pouvant accueillir jusqu'à 500 personnes.</li>
        <li><strong>Bien-être :</strong> Une piscine à débordement en rooftop et un centre de bien-être (Spa) haut de gamme.</li>
        <li><strong>Gastronomie :</strong> Trois restaurants thématiques mettant en valeur les produits de nos filiales agricoles.</li>
      </ul>

      <p>L'expertise de Immobilier Pluriel dans la construction intégrée et métallique permettra de livrer ce projet clé en main dans un délai record de 24 mois. Ce futur hôtel deviendra un point de repère pour les voyageurs et contribuera significativement à l'attractivité touristique et économique de la région.</p>
    `,
    tags: ['Investissement', 'Luxe', 'Tourisme'],
    gallery: ['/images/photo-ceb2d617.jpg', '/images/photo-0aa5a48b.jpg']
  },
  {
    id: 'plateforme-agricole-valorisation',
    title: 'Une plateforme agricole pour mieux valoriser les récoltes',
    category: 'Agro-industrie',
    author: 'Responsable Agro',
    date: '10 Mars 2026',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Les équipes travaillent sur une ferme moderne avec stockage, transformation et transport intégré.',
    content: `
      <p>Dans le cadre de notre stratégie de diversification, Immobilier Pluriel intensifie ses investissements dans l'agro-industrie avec la création d'une plateforme logistique intégrée.</p>

      <h3>Soutenir la production locale</h3>
      <p>Cette nouvelle infrastructure vise à réduire les pertes post-récolte qui affectent de nombreux producteurs locaux. En intégrant le stockage, le froid et la transformation primaire sur un même site, nous créons de la valeur ajoutée au plus près des exploitations.</p>

      <h3>Les piliers de la plateforme :</h3>
      <ul>
        <li><strong>Chaîne du froid :</strong> Entrepôts frigorifiques alimentés à l'énergie solaire.</li>
        <li><strong>Transformation :</strong> Unité de conditionnement et de pré-transformation pour les fruits et légumes.</li>
        <li><strong>Logistique :</strong> Une flotte de camions équipés pour le transport sous température contrôlée.</li>
      </ul>

      <p>Ce projet s'inscrit dans notre vision d'un territoire autosuffisant et prospère. En facilitant l'accès aux marchés urbains et internationaux, Immobilier Pluriel participe activement au renforcement de la sécurité alimentaire et au développement économique rural.</p>
    `,
    tags: ['Agriculture', 'Logistique', 'Développement'],
    gallery: ['/images/photo-a8296063.jpg', '/images/photo-c5bc98d7.jpg']
  },
  {
    id: 'nouveau-siege',
    title: 'Inauguration du nouveau siège social',
    category: 'Groupe',
    author: 'Direction',
    date: '05 Février 2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Immobilier Pluriel emménage dans des locaux ultra-modernes à Yamoussoukro.',
    content: '<p>Un nouvel espace de travail pour accompagner notre croissance.</p>',
    tags: ['Immobilier', 'Entreprise'],
    gallery: []
  },
  {
    id: 'formation-btp-2026',
    title: 'Lancement de la session de formation BTP',
    category: 'Formation',
    author: 'Pôle RH',
    date: '20 Janvier 2026',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    excerpt: '50 jeunes formés aux métiers de la topographie et du génie civil.',
    content: '<p>Nous investissons dans la main-d\'œuvre de demain.</p>',
    tags: ['Formation', 'Jeunesse'],
    gallery: []
  },
  {
    id: 'partenariat-solaire',
    title: 'Partenariat pour l énergie solaire',
    category: 'Innovation',
    author: 'Innovation',
    date: '10 Janvier 2026',
    image: 'https://images.unsplash.com/photo-1509391366360-fe5bb584850a?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Tous nos nouveaux lotissements seront équipés d un éclairage public 100% solaire.',
    content: '<p>Une transition énergétique nécessaire pour nos projets urbains.</p>',
    tags: ['Solaire', 'Énergie'],
    gallery: []
  }
];

export const socialLinks = {
  facebook: 'https://facebook.com',
  linkedin: 'https://linkedin.com',
  instagram: 'https://instagram.com',
  tiktok: 'https://tiktok.com',
  whatsapp: 'https://whatsapp.com',
  creator: {
    name: 'Valdes DiMarco',
    whatsapp: 'https://wa.me/2250554356019'
  }
};

export const contactInfo = [
  { label: 'Adresse', value: "Yamoussoukro, 220 Logements, Côte d'Ivoire" },
  { label: 'Téléphone', value: '+225 07 00 00 00 00' },
  { label: 'Email', value: 'contact@immobilierpluriel.com' },
  { label: 'Horaires', value: 'Lun - Ven, 08h00 - 18h00' },
];

export const principles = [
  'Vision territoriale et urbaine',
  'Maîtrise des chantiers et des délais',
  'Solutions adaptées aux particuliers et aux investisseurs',
  'Suivi de bout en bout du projet',
];