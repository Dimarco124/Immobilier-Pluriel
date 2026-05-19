export const terrains = [
  {
    id: 1,
    title: "Lotissement Les Jardins de l'Avenir",
    location: "Bingerville - Zone Nouvelle",
    price: "15 000 000 FCFA",
    promoPrice: "12 500 000 FCFA",
    isPromotion: true,
    area: "500m²",
    status: "ACD Approuvé",
    image: "/images/photo-048f5b05.jpg",
    description: "Un lotissement d'exception situé dans une zone en plein essor. Idéal pour votre future résidence principale ou un investissement locatif sécurisé.",
    longDescription: "Situé au cœur de la nouvelle zone d'extension de Bingerville, le lotissement 'Les Jardins de l'Avenir' offre un cadre de vie paisible et moderne. Ce projet a été conçu pour répondre aux attentes des familles recherchant sécurité et confort. Chaque parcelle bénéficie d'un accès direct aux infrastructures modernes, garantissant une valorisation rapide de votre patrimoine immobilier.",
    features: ["Électricité disponible", "Voirie bitumée", "Proximité écoles", "Zone non inondable"],
    highlights: [
      { title: "Prêt à bâtir", desc: "Tous les travaux de terrassement sont achevés." },
      { title: "Sécurité Juridique", desc: "ACD Approuvé, transaction sécurisée devant notaire." },
      { title: "Valorisation", desc: "Zone à forte croissance (+15% par an)." }
    ],
    proximity: [
      { place: "École Internationale", time: "5 min" },
      { place: "Centre Commercial", time: "10 min" },
      { place: "Hôpital Général", time: "8 min" }
    ],
    gallery: ["/images/photo-048f5b05.jpg", "/images/photo-3299f3b7.jpg", "/images/photo-115f5b05.jpg"]
  },
  {
    id: 2,
    title: "Domaine de la Lagune",
    location: "Grand-Bassam - Route Azuretti",
    price: "25 000 000 FCFA",
    promoPrice: "21 000 000 FCFA",
    isPromotion: true,
    area: "800m²",
    status: "Titre Foncier",
    image: "/images/photo-3299f3b7.jpg",
    description: "Vivez au bord de l'eau dans un cadre idyllique. Des lots spacieux avec une vue imprenable, parfaits pour des résidences de vacances ou de standing.",
    longDescription: "Le Domaine de la Lagune est une invitation à la sérénité. Entre brise marine et calme lagunaire, ce site unique à Grand-Bassam propose des parcelles de grande dimension pour des projets architecturaux d'exception. C'est l'emplacement rêvé pour une résidence secondaire ou un complexe hôtelier de charme, à seulement 30 minutes d'Abidjan.",
    features: ["Vue sur lagune", "Accès sécurisé", "Éclairage public", "Espaces verts"],
    highlights: [
      { title: "Cadre Unique", desc: "Accès direct à la lagune et proximité mer." },
      { title: "Haut Standing", desc: "Cahier des charges architectural pour garantir l'harmonie." },
      { title: "Investissement", desc: "Zone touristique très prisée." }
    ],
    proximity: [
      { place: "Plage d'Azuretti", time: "2 min" },
      { place: "Quartier France", time: "15 min" },
      { place: "Aéroport Félix Houphouët-Boigny", time: "25 min" }
    ],
    gallery: ["/images/photo-3299f3b7.jpg", "/images/photo-048f5b05.jpg", "/images/photo-115f5b05.jpg"]
  },
  {
    id: 3,
    title: "Cité de l'Espoir",
    location: "Anyama - Nord Abidjan",
    price: "8 000 000 FCFA",
    promoPrice: "6 500 000 FCFA",
    isPromotion: true,
    area: "400m²",
    status: "Approbation en cours",
    image: "/images/photo-115f5b05.jpg",
    description: "Une opportunité unique de devenir propriétaire à un prix abordable dans une zone calme et accessible.",
    longDescription: "La Cité de l'Espoir à Anyama est le projet idéal pour les premiers acheteurs et les investisseurs avisés. Située dans une zone en pleine mutation avec l'arrivée de nouvelles infrastructures de transport, cette cité offre un équilibre parfait entre vie citadine et tranquillité rurale. Un investissement accessible avec un fort potentiel de plus-value.",
    features: ["Terrain plat", "Proximité autoroute", "Zone résidentielle", "Réseau eau potable"],
    highlights: [
      { title: "Prix Compétitif", desc: "Le meilleur rapport qualité-prix de la zone." },
      { title: "Accessibilité", desc: "À proximité immédiate des grands axes routiers." },
      { title: "Développement", desc: "Futures infrastructures publiques prévues à proximité." }
    ],
    proximity: [
      { place: "Gare de train (Métro)", time: "10 min" },
      { place: "Marché d'Anyama", time: "5 min" },
      { place: "Stade Olympique Ebimpé", time: "15 min" }
    ],
    gallery: ["/images/photo-115f5b05.jpg", "/images/photo-048f5b05.jpg"]
  },
  {
    id: 4,
    title: "Plateau Résidentiel",
    location: "Yamoussoukro - Quartier Millionnaire",
    price: "35 000 000 FCFA",
    area: "1000m²",
    status: "ACD Définitif",
    image: "/images/photo-3299f3b7.jpg",
    description: "L'excellence immobilière au cœur de la capitale politique. Des lots de prestige pour des projets d'envergure.",
    longDescription: "Situé dans le quartier le plus prisé de Yamoussoukro, le Plateau Résidentiel offre des parcelles d'une superficie généreuse de 1000m². C'est l'adresse de référence pour ceux qui exigent l'excellence. Proche des institutions et des grandes écoles, ce site garantit un environnement de standing, calme et hautement sécurisé.",
    features: ["Quartier chic", "Toutes commodités", "Sécurité 24h/24", "Investissement sûr"],
    highlights: [
      { title: "Prestige", desc: "Voisinage haut de gamme et environnement maîtrisé." },
      { title: "Surface", desc: "1000m² pour exprimer toutes vos envies architecturales." },
      { title: "Documenté", desc: "ACD définitif déjà disponible pour chaque lot." }
    ],
    proximity: [
      { place: "Basilique Notre-Dame de la Paix", time: "5 min" },
      { place: "Hôtel de Ville", time: "3 min" },
      { place: "INP-HB", time: "10 min" }
    ],
    gallery: ["/images/photo-3299f3b7.jpg", "/images/photo-115f5b05.jpg"]
  },
  {
    id: 5,
    title: "Zone Industrielle Sud",
    location: "San Pedro - Proximité Port",
    price: "Sur devis",
    area: "5000m²",
    status: "Usage Industriel",
    image: "/images/photo-048f5b05.jpg",
    description: "Emplacement stratégique pour vos activités logistiques ou industrielles à proximité du deuxième port du pays.",
    longDescription: "Optimisez votre logistique avec cet emplacement de premier choix à San Pedro. Conçu spécifiquement pour les besoins industriels, ce terrain de 5000m² offre toutes les caractéristiques nécessaires pour l'implantation d'entrepôts, d'usines ou de plateformes de distribution. Sa proximité avec le port autonome en fait un atout stratégique majeur pour votre entreprise.",
    features: ["Accès poids lourds", "Proximité port", "Forte puissance élec", "Drainage optimisé"],
    highlights: [
      { title: "Logistique", desc: "À moins de 2km de l'entrée principale du port." },
      { title: "Infrastructures", desc: "Réseaux électriques et hydrauliques adaptés à l'industrie." },
      { title: "Flexibilité", desc: "Possibilité de fusionner plusieurs lots selon vos besoins." }
    ],
    proximity: [
      { place: "Port Autonome", time: "4 min" },
      { place: "Aéroport de San Pedro", time: "15 min" },
      { place: "Centre-ville", time: "10 min" }
    ],
    gallery: ["/images/photo-048f5b05.jpg", "/images/photo-3299f3b7.jpg"]
  },
  {
    id: 6,
    title: "Résidence des Palmiers",
    location: "Assinie - Km 11",
    price: "45 000 000 FCFA",
    area: "600m²",
    status: "ACD Approuvé",
    image: "/images/photo-115f5b05.jpg",
    description: "Le luxe à l'état pur entre mer et lagune. Un emplacement rare pour une villa d'exception.",
    longDescription: "Découvrez l'exclusivité d'Assinie avec la Résidence des Palmiers. Ce projet intimiste propose des parcelles soigneusement sélectionnées pour leur emplacement privilégié. Profitez d'un cadre de vie entre détente et prestige, idéal pour une résidence secondaire de luxe ou un investissement locatif saisonnier à haut rendement.",
    features: ["Accès plage", "Zone touristique", "Environnement calme", "Prestige"],
    highlights: [
      { title: "Exclusivité", desc: "Nombre de lots limité pour préserver l'intimité." },
      { title: "Loisirs", desc: "Proximité immédiate des meilleurs spots de surf et restaurants." },
      { title: "Potentiel Locatif", desc: "Forte demande pour les locations saisonnières de luxe." }
    ],
    proximity: [
      { place: "Plage", time: "1 min" },
      { place: "Débarcadère", time: "5 min" },
      { place: "Abidjan (via autoroute)", time: "60 min" }
    ],
    gallery: ["/images/photo-115f5b05.jpg", "/images/photo-3299f3b7.jpg", "/images/photo-048f5b05.jpg"]
  },
  {
    id: 7,
    title: "Éco-Cité de Songon",
    location: "Songon - Route de Dabou",
    price: "12 000 000 FCFA",
    area: "500m²",
    status: "Disponible",
    image: "/images/photo-048f5b05.jpg",
    description: "Un projet tourné vers l'avenir, alliant nature et urbanisme moderne.",
    features: ["Espaces verts", "Énergie solaire", "Accès bitumé", "Sécurité"],
    gallery: ["/images/photo-048f5b05.jpg"]
  },
  {
    id: 8,
    title: "Parc d'Activités Nord",
    location: "Abobo - Zone Industrielle",
    price: "18 000 000 FCFA",
    area: "600m²",
    status: "Disponible",
    image: "/images/photo-3299f3b7.jpg",
    description: "Emplacement idéal pour vos projets de stockage ou de petite industrie.",
    features: ["Zone sécurisée", "Eau & Élec", "Proche autoroute"],
    gallery: ["/images/photo-3299f3b7.jpg"]
  },
  {
    id: 9,
    title: "Les Terrasses de l'Agnéby",
    location: "Agboville - Entrée Ville",
    price: "5 000 000 FCFA",
    area: "400m²",
    status: "Disponible",
    image: "/images/photo-115f5b05.jpg",
    description: "Des parcelles accessibles dans une ville en plein renouveau.",
    features: ["Terrain plat", "Titre Foncier", "Zone calme"],
    gallery: ["/images/photo-115f5b05.jpg"]
  },
  {
    id: 10,
    title: "Domaine des Oliviers",
    location: "Bouaké - Quartier Air France",
    price: "10 000 000 FCFA",
    area: "600m²",
    status: "Réservé",
    image: "/images/photo-3299f3b7.jpg",
    description: "Le prestige au centre de la Côte d'Ivoire. Un quartier résidentiel calme.",
    features: ["Quartier résidentiel", "Eau potable", "Électricité"],
    gallery: ["/images/photo-3299f3b7.jpg"]
  },
  {
    id: 11,
    title: "Le Balcon du Cavally",
    location: "Guiglo - Zone Forestière",
    price: "3 500 000 FCFA",
    area: "500m²",
    status: "Disponible",
    image: "/images/photo-048f5b05.jpg",
    description: "Une opportunité unique d'investissement agricole ou résidentiel.",
    features: ["Terre fertile", "Accès piste", "Zone en développement"],
    gallery: ["/images/photo-048f5b05.jpg"]
  },
  {
    id: 12,
    title: "Résidence de l'Aéroport",
    location: "Port-Bouët - Cité Aéroport",
    price: "40 000 000 FCFA",
    area: "400m²",
    status: "Disponible",
    image: "/images/photo-115f5b05.jpg",
    description: "Emplacement stratégique pour voyageurs fréquents ou bureaux.",
    features: ["Proche aéroport", "Zone sécurisée", "Haut standing"],
    gallery: ["/images/photo-115f5b05.jpg"]
  },
  {
    id: 13,
    title: "Cité des Cadres",
    location: "Khorogo - Quartier Résidentiel",
    price: "15 000 000 FCFA",
    area: "800m²",
    status: "Disponible",
    image: "/images/photo-3299f3b7.jpg",
    description: "Le calme et la fraîcheur du nord dans un cadre sécurisé.",
    features: ["Clôture périmétrale", "Gardiennage", "Voirie interne"],
    gallery: ["/images/photo-3299f3b7.jpg"]
  },
  {
    id: 14,
    title: "Parcelles de la Paix",
    location: "Man - Pied de la Dent",
    price: "4 000 000 FCFA",
    area: "500m²",
    status: "Disponible",
    image: "/images/photo-048f5b05.jpg",
    description: "Vue panoramique sur les montagnes. Cadre naturel exceptionnel.",
    features: ["Vue montagne", "Air pur", "Zone touristique"],
    gallery: ["/images/photo-048f5b05.jpg"]
  },
  {
    id: 15,
    title: "Lotissement du Port",
    location: "San Pedro - Zone Extension",
    price: "20 000 000 FCFA",
    area: "600m²",
    status: "Réservé",
    image: "/images/photo-115f5b05.jpg",
    description: "Proche des activités économiques portuaires.",
    features: ["Zone dynamique", "Accès rapide", "Électricité"],
    gallery: ["/images/photo-115f5b05.jpg"]
  },
  {
    id: 16,
    title: "Domaine de la Savane",
    location: "Ferké - Route du Nord",
    price: "2 500 000 FCFA",
    area: "1000m²",
    status: "Disponible",
    image: "/images/photo-3299f3b7.jpg",
    description: "Grands espaces pour projets agro-industriels.",
    features: ["Grande surface", "Terre plane", "Accès route"],
    gallery: ["/images/photo-3299f3b7.jpg"]
  },
  {
    id: 17,
    title: "Les Jardins de Cocody",
    location: "Angré - 9ème Tranche",
    price: "60 000 000 FCFA",
    area: "500m²",
    status: "Disponible",
    image: "/images/photo-048f5b05.jpg",
    description: "Le luxe et la commodité au cœur d'Abidjan.",
    features: ["Zone chic", "Bitumé", "Sécurisé"],
    gallery: ["/images/photo-048f5b05.jpg"]
  },
  {
    id: 18,
    title: "Plateau d'Ebimpé",
    location: "Anyama - Proche Stade",
    price: "9 000 000 FCFA",
    area: "400m²",
    status: "Disponible",
    image: "/images/photo-115f5b05.jpg",
    description: "Zone en plein essor grâce aux infrastructures sportives.",
    features: ["Proche stade", "Métro à venir", "Valorisation rapide"],
    gallery: ["/images/photo-115f5b05.jpg"]
  },
  {
    id: 19,
    title: "Bord de Mer",
    location: "Jacqueville - Zone Balnéaire",
    price: "30 000 000 FCFA",
    area: "600m²",
    status: "Disponible",
    image: "/images/photo-3299f3b7.jpg",
    description: "Parfait pour votre résidence de week-end.",
    features: ["Accès mer", "Zone touristique", "Éclairage solaire"],
    gallery: ["/images/photo-3299f3b7.jpg"]
  },
  {
    id: 20,
    title: "Cité de la Renaissance",
    location: "Daloa - Sortie Ouest",
    price: "6 000 000 FCFA",
    area: "500m²",
    status: "Disponible",
    image: "/images/photo-048f5b05.jpg",
    description: "Un investissement sûr dans la cité des antilopes.",
    features: ["Eau potable", "Électricité", "Terrain décapé"],
    gallery: ["/images/photo-048f5b05.jpg"]
  },
  {
    id: 21,
    title: "Résidence des Arts",
    location: "Grand-Bassam - Quartier France",
    price: "35 000 000 FCFA",
    area: "450m²",
    status: "Disponible",
    image: "/images/photo-115f5b05.jpg",
    description: "Vivez l'histoire dans un cadre classé au patrimoine mondial.",
    features: ["Patrimoine UNESCO", "Charme historique", "Proche mer"],
    gallery: ["/images/photo-115f5b05.jpg"]
  },
  {
    id: 22,
    title: "Parc des Princes",
    location: "Yamoussoukro - Zone Administrative",
    price: "25 000 000 FCFA",
    area: "800m²",
    status: "Disponible",
    image: "/images/photo-3299f3b7.jpg",
    description: "Au cœur des institutions de la République.",
    features: ["Zone administrative", "Bitumé", "Éclairage public"],
    gallery: ["/images/photo-3299f3b7.jpg"]
  },
  {
    id: 23,
    title: "Le Verger d'Azaguié",
    location: "Azaguié - Route Sud",
    price: "4 500 000 FCFA",
    area: "500m²",
    status: "Disponible",
    image: "/images/photo-048f5b05.jpg",
    description: "La campagne à 30 minutes d'Abidjan.",
    features: ["Proche Abidjan", "Air pur", "Terre riche"],
    gallery: ["/images/photo-048f5b05.jpg"]
  },
  {
    id: 24,
    title: "Cité des Pêcheurs",
    location: "Sassandra - Corniche",
    price: "12 000 000 FCFA",
    area: "600m²",
    status: "Disponible",
    image: "/images/photo-115f5b05.jpg",
    description: "Vue imprenable sur l'océan Atlantique.",
    features: ["Vue mer", "Corniche", "Climat frais"],
    gallery: ["/images/photo-115f5b05.jpg"]
  },
  {
    id: 25,
    title: "Espace Commercial Sud",
    location: "Marcory - Zone 4",
    price: "150 000 000 FCFA",
    area: "800m²",
    status: "Disponible",
    image: "/images/photo-3299f3b7.jpg",
    description: "L'emplacement premium pour votre siège social.",
    features: ["Zone commerciale", "Forte visibilité", "Prestige"],
    gallery: ["/images/photo-3299f3b7.jpg"]
  }
];
