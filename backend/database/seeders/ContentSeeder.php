<?php

namespace Database\Seeders;

use App\Models\CompanyInfo;
use App\Models\ContactInfo;
use App\Models\CtaSection;
use App\Models\FeaturedProject;
use App\Models\FooterColumn;
use App\Models\HeroSlide;
use App\Models\NavigationLink;
use App\Models\News;
use App\Models\PageHeader;
use App\Models\Principle;
use App\Models\Project;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\SocialLink;
use App\Models\Stat;
use App\Models\TeamMember;
use App\Models\Terrain;
use App\Models\VisionSection;
use App\Models\VisionStat;
use Illuminate\Database\Seeder;

class ContentSeeder extends Seeder
{
    public function run(): void
    {
        // Company Info
        CompanyInfo::updateOrCreate(['id' => 1], [
            'name' => 'Immobilier Pluriel',
            'short_name' => 'Savane',
            'tagline' => "Une grande entreprise qui aménage, construit et valorise le territoire.",
            'description' => "Immobilier Pluriel transforme des visions en projets concrets grâce à une expertise intégrée couvrant le foncier, l'aménagement, la construction et le développement d'infrastructures durables.",
            'mission' => 'Concevoir, viabiliser et livrer des projets fonciers et immobiliers fiables.',
            'vision' => 'Bâtir des territoires durables et accessibles.',
            'logo_url' => '/images/logo_immobilier.png',
            'footer_text' => 'Immobilier Pluriel transforme des visions foncières en projets concrets, durables et sécurisés.',
        ]);

        // Site Settings
        SiteSetting::updateOrCreate(['id' => 1], [
            'site_name' => 'Immobilier Pluriel',
            'site_tagline' => 'Terrains, projets et aménagement foncier',
            'site_description' => 'Catalogue immobilier et services intégrés.',
            'logo_url' => '/images/logo_immobilier.png',
            'favicon_url' => '/favicon.ico',
            'primary_color' => '#1a5f4a',
            'secondary_color' => '#2d8a6a',
            'whatsapp_number' => '2250700000000',
            'whatsapp_message_template' => 'Bonjour, je souhaite avoir des informations.',
            'creator_name' => 'Valdes DiMarco',
            'creator_whatsapp' => 'https://wa.me/2250554356019',
            'maintenance_mode' => false,
        ]);

        // Hero Slides
        $heroSlides = [
            ['Des terrains viabilisés, une nature préservée', 'Des lots sécurisés pour construire sereinement.', '/images/bannieres/viabiliser.png'],
            ["Bâtir aujourd'hui, penser demain", 'Des projets immobiliers conçus pour durer.', '/images/bannieres/Hotel.png'],
            ['Votre projet, notre expertise', 'Un accompagnement complet du foncier à la livraison.', '/images/bannieres/image.png'],
        ];

        foreach ($heroSlides as $index => [$title, $description, $image]) {
            HeroSlide::updateOrCreate(['order' => $index + 1], [
                'eyebrow' => 'Immobilier Pluriel',
                'title' => $title,
                'description' => $description,
                'image_url' => $image,
                'is_active' => true,
            ]);
        }

        // Stats
        $stats = [
            ['8', 'Services intégrés'],
            ['120+', 'projets accompagnés'],
            ['24', 'mois de suivi chantier'],
            ['4', 'pôles régionaux actifs'],
        ];

        foreach ($stats as $index => [$value, $label]) {
            Stat::updateOrCreate(['order' => $index + 1], [
                'value' => $value,
                'label' => $label,
                'is_active' => true,
            ]);
        }

        // Vision Section
        VisionSection::updateOrCreate(['id' => 1], [
            'eyebrow' => 'Notre Vision',
            'title' => 'Bâtir des territoires organisés, viables et durables.',
            'description' => 'Nous concevons des espaces de vie avec une attention particulière aux réseaux, aux délais, à la sécurité foncière et à la valeur long terme.',
            'image_url' => '/images/pillars-bg.png',
            'quote_text' => "Notre rôle n'est pas seulement de vendre du foncier : nous concevons des territoires viables, avec des réseaux, des délais tenus et une valeur durable pour les habitants comme pour les investisseurs.",
            'quote_author' => 'Awa Traoré',
            'quote_role' => 'Directrice générale, Immobilier Pluriel',
            'quote_image_url' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        ]);

        // Vision Stats
        $visionStats = [
            ['17', '+', "Années d'expérience", 'Depuis 2009'],
            ['120', '+', 'Projets accompagnés', 'Foncier à agro-industrie'],
            ['850', '+', 'Hectares structurés', 'Lotissements & VRD'],
            ['8', '', "Pôles d'expertise", 'Expertises intégrées'],
        ];

        foreach ($visionStats as $index => [$value, $suffix, $label, $hint]) {
            VisionStat::updateOrCreate(['order' => $index + 1], [
                'value' => $value,
                'suffix' => $suffix,
                'label' => $label,
                'hint' => $hint,
            ]);
        }

        // Services
        $services = [
            ['Lotissement & Urbanisme', "Transformer des terres brutes en quartiers résidentiels structurés et viabilisés.", "Sur une zone de 20 hectares, nous concevons le plan de masse, réalisons le terrassement et installons les réseaux avant la mise en vente.", 'Des espaces de vie organisés, sécurisés et prêts pour la construction.', 'lotissement', '/images/services/lotissement.jpg'],
            ["Aménagement Foncier", 'Valorisation de grandes réserves foncières pour des projets d\'envergure.', "Nous préparons des plateformes industrielles ou commerciales avec un ensoleillement et une orientation optimisés.", 'Des terrains à fort potentiel de valorisation pour investisseurs.', 'terrain', '/images/services/terrain.jpg'],
            ['Génie Civil & Structure', 'Mise en œuvre de structures robustes pour tout type de bâtiment.', "Nos équipes assurent le ferraillage et le coulage de dalles haute résistance pour des complexes industriels.", 'Une solidité structurelle garantie pour des ouvrages durables.', 'metal', '/images/services/metal.jpg'],
            ['Hôtellerie de Standing', 'Conception architecturale et réalisation de complexes touristiques haut de gamme.', "Réalisation de resorts avec espaces de détente, piscines olympiques et finitions de luxe.", 'Des établissements prestigieux livrés avec un souci du détail architectural.', 'hotel', '/images/services/hotel.jpg'],
            ['Logistique & Entreposage', 'Gestion intelligente des espaces de stockage et des flux de marchandises.', "Mise en place de plateformes de distribution modernes avec rayonnages optimisés et gestion informatisée.", 'Une chaîne logistique fluide et un stockage sécurisé à grande échelle.', 'truck', '/images/services/truck.jpg'],
            ['Développement Agro-industriel', 'Création d\'exploitations agricoles modernes et durables.', "Mise en place de pépinières et de systèmes de culture irrigués pour une production constante.", 'Des projets agricoles rentables utilisant les meilleures techniques de culture.', 'farm', '/images/services/farm.jpg'],
            ['Études & Ingénierie', 'Bureau d\'études techniques pour la conception et le suivi de vos projets.', "Élaboration de plans de structure, calculs de charge et suivi de conformité sur chantier.", 'Une expertise technique pointue pour sécuriser chaque étape de vos travaux.', 'formation', '/images/services/formation.jpg'],
            ['Voirie & Réseaux (VRD)', 'Réalisation des infrastructures routières et des réseaux d\'assainissement.', "Ouverture de voies bitumées, installation de caniveaux de drainage et réseaux d'eau potable.", 'Des zones parfaitement desservies et protégées contre les intempéries.', 'voirie', '/images/services/image.jfif'],
        ];

        foreach ($services as $index => [$title, $summary, $example, $result, $icon, $image]) {
            Service::updateOrCreate(['order' => $index + 1], [
                'title' => $title,
                'summary' => $summary,
                'example' => $example,
                'result' => $result,
                'icon' => $icon,
                'image_url' => $image,
                'is_active' => true,
            ]);
        }

        // Team Members
        $team = [
            ['Awa Traoré', 'Directrice Générale', 'Pilote la stratégie, les grands comptes et les partenariats institutionnels.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'],
            ['Moussa Koné', 'Directeur Technique', 'Supervise les études, les chantiers, les lots VRD et les ouvrages complexes.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'],
            ['Fatou Diallo', 'Responsable Aménagement', 'Coordonne les lotissements, les plans d\'ensemble et la relation avec les collectivités.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'],
            ['Issa Bamba', 'Responsable Développement', 'Développe les projets terrains, hôtellerie et solutions agro-industrielles.', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'],
        ];

        foreach ($team as $index => [$name, $role, $bio, $image]) {
            TeamMember::updateOrCreate(['order' => $index + 1], [
                'name' => $name,
                'role' => $role,
                'bio' => $bio,
                'image_url' => $image,
                'is_active' => true,
            ]);
        }

        // Principles
        $principles = [
            'Vision territoriale et urbaine',
            'Maîtrise des chantiers et des délais',
            'Solutions adaptées aux particuliers et aux investisseurs',
            'Suivi de bout en bout du projet',
        ];

        foreach ($principles as $index => $text) {
            Principle::updateOrCreate(['order' => $index + 1], [
                'text' => $text,
                'is_active' => true,
            ]);
        }

        // Projects
        $projects = [
            ['savane-horizon', 'Quartier Savane Horizon', 'Ouagadougou', 'Lotissement', '2025', '120 lots viabilisés', 'Un ancien terrain nu transformé en quartier résidentiel avec voirie, eau potable et électrification.', "Le projet Savane Horizon est une référence en matière d'aménagement urbain. Sur une surface totale de 15 hectares, nous avons structuré un quartier moderne répondant aux normes internationales. L'accent a été mis sur la durabilité des infrastructures et l'intégration d'espaces verts pour le bien-être des futurs résidents.", ['Voirie bitumée avec drainage intégré', 'Réseau électrique moyenne tension', 'Adduction d\'eau potable sur chaque lot', 'Éclairage public solaire intelligent'], ['Sécurité foncière garantie']],
            ['route-koudougou', 'Route d\'accès de Koudougou', 'Centre-Ouest', 'Ouverture de voies', '2024', '10 km de route', 'Une voie principale et des accès secondaires pour reconnecter une zone rurale au réseau économique.', "Ce projet de désenclavement a consisté en l'ouverture et le reprofilage lourd de 10 km de voies. Un défi technique majeur relevé par nos équipes pour permettre la circulation en toute saison, facilitant ainsi l'évacuation des produits agricoles vers les centres urbains.", ['Terrassement et compactage haute densité', 'Construction de 3 ponts de franchissement', 'Signalisation horizontale et verticale', 'Fossés de drainage bétonnés'], ['Réduction du temps de trajet de 50%', 'Accès facilité pour 5 000 villageois', 'Augmentation des échanges commerciaux locaux']],
            ['savane-prestige', 'Hôtel Savane Prestige', 'Abidjan', 'Hôtellerie', '2025', '120 chambres', 'Un hôtel haut de gamme livré avec espaces de réception, restauration et services premium.', "Savane Prestige redéfinit le luxe hôtelier à Abidjan. Immobilier Pluriel a assuré la maîtrise d'œuvre complète, de la conception architecturale à la décoration intérieure. Un projet complexe alliant esthétique moderne et exigences techniques d'un établissement 4 étoiles.", ['Structure béton armé haute résistance', 'Système de climatisation centralisé VRV', 'Domotique intégrée dans les chambres', 'Cuisine professionnelle aux normes HACCP'], ['Certification internationale obtenue', 'Création de 80 emplois directs', 'Taux d\'occupation moyen de 75% dès l\'ouverture']],
            ['plateforme-agro', 'Plateforme agro-logistique', 'Bobo-Dioulasso', 'Agroalimentaire', '2024', 'Chaîne du froid intégrée', 'Un ensemble de stockage, transformation et transport pour relier les exploitations aux marchés.', "Cette plateforme est le maillon essentiel de la chaîne de valeur agricole régionale. Nous avons conçu des entrepôts frigorifiques de grande capacité et des unités de pré-transformation pour minimiser les pertes post-récolte et maximiser les revenus des producteurs.", ['Chambres froides à température contrôlée', 'Zone de tri et de conditionnement automatisée', 'Quais de chargement pour camions frigorifiques', 'Système de traçabilité informatisé'], ['Réduction des pertes post-récolte de 30%', 'Capacité de stockage de 5 000 tonnes', 'Lien direct créé avec les marchés export']],
            ['hangar-industriel', 'Hangar Industriel Zone Nord', 'Ouagadougou', 'Construction Métallique', '2025', '5000 m2 couverts', 'Réalisation d\'une structure métallique de grande portée pour le stockage de produits manufacturés.', "Un projet de construction métallique d'envergure réalisé en un temps record. La structure de 5000 m² sans poteaux intermédiaires offre une flexibilité maximale pour le stockage et la logistique industrielle.", ['Charpente métallique en acier haute limite élastique', 'Bardage double peau avec isolation thermique', 'Dalle béton quartzée anti-poussière', 'Portes sectionnelles motorisées'], ['Livraison en seulement 6 mois', 'Espace de stockage optimisé à 100%', 'Conformité totale aux normes de sécurité incendie']],
            ['residence-savane', 'Résidence Savane Parc', 'Abidjan', 'Immobilier', '2025', '24 appartements F4', 'Un complexe résidentiel moderne alliant confort et sécurité.', "La résidence Savane Parc propose des appartements haut de gamme dans un cadre verdoyant et sécurisé.", ['Ascenseurs haut débit', 'Piscine commune', 'Parking sous-sol', 'Sécurité 24h/24'], ['100% vendu avant livraison']],
            ['centre-commercial', 'Grand Centre Savane Mall', 'Bouaké', 'Commerce', '2026', '50 boutiques', 'Le plus grand centre commercial de la région.', "Un espace shopping et loisirs moderne pour dynamiser l'économie locale.", ['Food court', 'Supermarché', 'Cinéma', 'Zone de jeux'], ['Création de 200 emplois']],
            ['ferme-moderne', 'Ferme Avicole Intégrée', 'Yamoussoukro', 'Agriculture', '2025', '50 000 têtes', 'Une unité de production avicole automatisée.', "Une ferme utilisant les dernières technologies pour une production de qualité.", ['Alimentation automatisée', 'Contrôle climatique', 'Abattoir aux normes'], ['Leader régional en production d\'œufs']],
        ];

        foreach ($projects as $index => [$slug, $title, $location, $category, $year, $highlight, $description, $longDescription, $keyFeatures, $results]) {
            Project::updateOrCreate(['slug' => $slug], [
                'order' => $index + 1,
                'title' => $title,
                'location' => $location,
                'category' => $category,
                'year' => $year,
                'highlight' => $highlight,
                'description' => $description,
                'long_description' => $longDescription,
                'key_features' => $keyFeatures,
                'results' => $results,
                'image_url' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
                'video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'gallery' => ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'],
                'is_featured' => $index < 4,
                'is_active' => true,
            ]);
        }

        // Terrains
        $terrains = [
            ['Lotissement Les Jardins de l\'Avenir', 'Bingerville - Zone Nouvelle', '15 000 000 FCFA', '12 500 000 FCFA', '500m²', 'ACD Approuvé', true, true, 'Un lotissement d\'exception situé dans une zone en plein essor. Idéal pour votre future résidence principale ou un investissement locatif sécurisé.', 'Situé au cœur de la nouvelle zone d\'extension de Bingerville, le lotissement \'Les Jardins de l\'Avenir\' offre un cadre de vie paisible et moderne. Ce projet a été conçu pour répondre aux attentes des familles recherchant sécurité et confort. Chaque parcelle bénéficie d\'un accès direct aux infrastructures modernes, garantissant une valorisation rapide de votre patrimoine immobilier.', ['Électricité disponible', 'Voirie bitumée', 'Proximité écoles', 'Zone non inondable']],
            ['Domaine de la Lagune', 'Grand-Bassam - Route Azuretti', '25 000 000 FCFA', '21 000 000 FCFA', '800m²', 'Titre Foncier', true, true, 'Vivez au bord de l\'eau dans un cadre idyllique. Des lots spacieux avec une vue imprenable, parfaits pour des résidences de vacances ou de standing.', 'Le Domaine de la Lagune est une invitation à la sérénité. Entre brise marine et calme lagunaire, ce site unique à Grand-Bassam propose des parcelles de grande dimension pour des projets architecturaux d\'exception. C\'est l\'emplacement rêvé pour une résidence secondaire ou un complexe hôtelier de charme, à seulement 30 minutes d\'Abidjan.', ['Vue sur lagune', 'Accès sécurisé', 'Éclairage public', 'Espaces verts']],
            ['Cité de l\'Espoir', 'Anyama - Nord Abidjan', '8 000 000 FCFA', '6 500 000 FCFA', '400m²', 'Approbation en cours', true, true, 'Une opportunité unique de devenir propriétaire à un prix abordable dans une zone calme et accessible.', 'La Cité de l\'Espoir à Anyama est le projet idéal pour les premiers acheteurs et les investisseurs avisés. Située dans une zone en pleine mutation avec l\'arrivée de nouvelles infrastructures de transport, cette cité offre un équilibre parfait entre vie citadine et tranquillité rurale. Un investissement accessible avec un fort potentiel de plus-value.', ['Terrain plat', 'Proximité autoroute', 'Zone résidentielle', 'Réseau eau potable']],
            ['Plateau Résidentiel', 'Yamoussoukro - Quartier Millionnaire', '35 000 000 FCFA', NULL, '1000m²', 'ACD Définitif', false, false, 'L\'excellence immobilière au cœur de la capitale politique. Des lots de prestige pour des projets d\'envergure.', 'Situé dans le quartier le plus prisé de Yamoussoukro, le Plateau Résidentiel offre des parcelles d\'une superficie généreuse de 1000m². C\'est l\'adresse de référence pour ceux qui exigent l\'excellence. Proche des institutions et des grandes écoles, ce site garantit un environnement de standing, calme et hautement sécurisé.', ['Quartier chic', 'Toutes commodités', 'Sécurité 24h/24', 'Investissement sûr']],
            ['Zone Industrielle Sud', 'San Pedro - Proximité Port', 'Sur devis', NULL, '5000m²', 'Usage Industriel', false, false, 'Emplacement stratégique pour vos activités logistiques ou industrielles à proximité du deuxième port du pays.', 'Optimisez votre logistique avec cet emplacement de premier choix à San Pedro. Conçu spécifiquement pour les besoins industriels, ce terrain de 5000m² offre toutes les caractéristiques nécessaires pour l\'implantation d\'entrepôts, d\'usines ou de plateformes de distribution. Sa proximité avec le port autonome en fait un atout stratégique majeur pour votre entreprise.', ['Accès poids lourds', 'Proximité port', 'Forte puissance élec', 'Drainage optimisé']],
            ['Résidence des Palmiers', 'Assinie - Km 11', '45 000 000 FCFA', NULL, '600m²', 'ACD Approuvé', false, false, 'Le luxe à l\'état pur entre mer et lagune. Un emplacement rare pour une villa d\'exception.', 'Découvrez l\'exclusivité d\'Assinie avec la Résidence des Palmiers. Ce projet intimiste propose des parcelles soigneusement sélectionnées pour leur emplacement privilégié. Profitez d\'un cadre de vie entre détente et prestige, idéal pour une résidence secondaire de luxe ou un investissement locatif saisonnier à haut rendement.', ['Accès plage', 'Zone touristique', 'Environnement calme', 'Prestige']],
            ['Éco-Cité de Songon', 'Songon - Route de Dabou', '12 000 000 FCFA', NULL, '500m²', 'Disponible', false, false, 'Un projet tourné vers l\'avenir, alliant nature et urbanisme moderne.', 'Éco-Cité de Songon allie modernité et respect de l\'environnement. Des parcelles dans un cadre verdoyant et durable.', ['Espaces verts', 'Énergie solaire', 'Accès bitumé', 'Sécurité']],
            ['Parc d\'Activités Nord', 'Abobo - Zone Industrielle', '18 000 000 FCFA', NULL, '600m²', 'Disponible', false, false, 'Emplacement idéal pour vos projets de stockage ou de petite industrie.', 'Une plateforme industrielle moderne avec toutes les connexions nécessaires au cœur d\'Abobo.', ['Zone sécurisée', 'Eau & Élec', 'Proche autoroute']],
            ['Les Terrasses de l\'Agnéby', 'Agboville - Entrée Ville', '5 000 000 FCFA', NULL, '400m²', 'Disponible', false, false, 'Des parcelles accessibles dans une ville en plein renouveau.', 'Investissez dans une ville dynamique avec des terrains à prix compétitifs.', ['Terrain plat', 'Titre Foncier', 'Zone calme']],
            ['Domaine des Oliviers', 'Bouaké - Quartier Air France', '10 000 000 FCFA', NULL, '600m²', 'Réservé', false, false, 'Le prestige au centre de la Côte d\'Ivoire. Un quartier résidentiel calme.', 'Un quartier résidentiel réputé au cœur de Bouaké.', ['Quartier résidentiel', 'Eau potable', 'Électricité']],
            ['Le Balcon du Cavally', 'Guiglo - Zone Forestière', '3 500 000 FCFA', NULL, '500m²', 'Disponible', false, false, 'Une opportunité unique d\'investissement agricole ou résidentiel.', 'Idéal pour des projets agro-industriels ou résidentiels. Zone en développement.', ['Terre fertile', 'Accès piste', 'Zone en développement']],
            ['Résidence de l\'Aéroport', 'Port-Bouët - Cité Aéroport', '40 000 000 FCFA', NULL, '400m²', 'Disponible', false, false, 'Emplacement stratégique pour voyageurs fréquents ou bureaux.', 'Très proche de l\'aéroport félix Houphouët-Boigny. Idéal pour bureaux ou résidence.', ['Proche aéroport', 'Zone sécurisée', 'Haut standing']],
            ['Cité des Cadres', 'Khorogo - Quartier Résidentiel', '15 000 000 FCFA', NULL, '800m²', 'Disponible', false, false, 'Le calme et la fraîcheur du nord dans un cadre sécurisé.', 'Profitez du climat frais du nord dans un quartier résidentiel fermé et sécurisé.', ['Clôture périmétrale', 'Gardiennage', 'Voirie interne']],
            ['Parcelles de la Paix', 'Man - Pied de la Dent', '4 000 000 FCFA', NULL, '500m²', 'Disponible', false, false, 'Vue panoramique sur les montagnes. Cadre naturel exceptionnel.', 'Des parcelles avec vue extraordinaire sur la Dent de Man. Cadre naturel unique.', ['Vue montagne', 'Air pur', 'Zone touristique']],
            ['Lotissement du Port', 'San Pedro - Zone Extension', '20 000 000 FCFA', NULL, '600m²', 'Réservé', false, false, 'Proche des activités économiques portuaires.', 'Une zone dynamique avec fortes activités commerciales et portuaires.', ['Zone dynamique', 'Accès rapide', 'Électricité']],
            ['Domaine de la Savane', 'Ferké - Route du Nord', '2 500 000 FCFA', NULL, '1000m²', 'Disponible', false, false, 'Grands espaces pour projets agro-industriels.', 'Des grands espaces parfaits pour l\'agriculture et l\'industrie en zone Nord.', ['Grande surface', 'Terre plane', 'Accès route']],
            ['Les Jardins de Cocody', 'Angré - 9ème Tranche', '60 000 000 FCFA', NULL, '500m²', 'Disponible', false, false, 'Le luxe et la commodité au cœur d\'Abidjan.', 'Le luxe immobilier à Cocody. Des parcelles dans un quartier prestigieux et sécurisé.', ['Zone chic', 'Bitumé', 'Sécurisé']],
            ['Plateau d\'Ebimpé', 'Anyama - Proche Stade', '9 000 000 FCFA', NULL, '400m²', 'Disponible', false, false, 'Zone en plein essor grâce aux infrastructures sportives.', 'Une zone stratégique dynamise par les infrastructures olympiques qui arrivent.', ['Proche stade', 'Métro à venir', 'Valorisation rapide']],
            ['Bord de Mer', 'Jacqueville - Zone Balnéaire', '30 000 000 FCFA', NULL, '600m²', 'Disponible', false, false, 'Parfait pour votre résidence de week-end.', 'Une zone balnéaire prestigieuse idéale pour résidence secondaire de luxe.', ['Accès mer', 'Zone touristique', 'Éclairage solaire']],
            ['Cité de la Renaissance', 'Daloa - Sortie Ouest', '6 000 000 FCFA', NULL, '500m²', 'Disponible', false, false, 'Un investissement sûr dans la cité des antilopes.', 'Une zone en développement durable avec bonnes infrastructures de base.', ['Eau potable', 'Électricité', 'Terrain décapé']],
            ['Résidence des Arts', 'Grand-Bassam - Quartier France', '35 000 000 FCFA', NULL, '450m²', 'Disponible', false, false, 'Vivez l\'histoire dans un cadre classé au patrimoine mondial.', 'Un quartier historique prestigieux au patrimoine mondial UNESCO. Charme et authenticité.', ['Patrimoine UNESCO', 'Charme historique', 'Proche mer']],
            ['Parc des Princes', 'Yamoussoukro - Zone Administrative', '25 000 000 FCFA', NULL, '800m²', 'Disponible', false, false, 'Au cœur des institutions de la République.', 'Une zone administrative centrale à Yamoussoukro. Prestige et accessibilité.', ['Zone administrative', 'Bitumé', 'Éclairage public']],
            ['Le Verger d\'Azaguié', 'Azaguié - Route Sud', '4 500 000 FCFA', NULL, '500m²', 'Disponible', false, false, 'La campagne à 30 minutes d\'Abidjan.', 'Profitez de la tranquillité rurale à proximité d\'Abidjan. Excellente terre.', ['Proche Abidjan', 'Air pur', 'Terre riche']],
            ['Cité des Pêcheurs', 'Sassandra - Corniche', '12 000 000 FCFA', NULL, '600m²', 'Disponible', false, false, 'Vue imprenable sur l\'océan Atlantique.', 'Une corniche maritime prestigieuse avec vue océan. Climat frais et attirant.', ['Vue mer', 'Corniche', 'Climat frais']],
            ['Espace Commercial Sud', 'Marcory - Zone 4', '150 000 000 FCFA', NULL, '800m²', 'Disponible', false, false, 'L\'emplacement premium pour votre siège social.', 'La zone commerciale la plus prestigieuse d\'Abidjan. Visibilité maximale.', ['Zone commerciale', 'Forte visibilité', 'Prestige']],
        ];

        foreach ($terrains as $index => [$title, $location, $price, $promoPrice, $area, $status, $isFeatured, $isPromotion, $description, $longDescription, $features]) {
            Terrain::updateOrCreate(['title' => $title], [
                'order' => $index + 1,
                'location' => $location,
                'price' => $price,
                'promo_price' => $promoPrice,
                'area' => $area,
                'status' => $status,
                'description' => $description,
                'long_description' => $longDescription,
                'features' => $features,
                'image_url' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
                'gallery' => ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'],
                'is_featured' => $isFeatured,
                'is_promotion' => $isPromotion,
                'is_active' => true,
            ]);
        }

        // News Articles
        $news = [
            ['lotissement-45-hectares', 'Lancement d\'un nouveau lotissement de 45 hectares', 'Aménagement', 'Direction Technique', '2026-05-15', 'Immobilier Pluriel démarre un projet de quartier moderne avec voirie, assainissement et éclairage public.'],
            ['accord-hotel-affaires', 'Signature d\'un accord pour un hôtel d\'affaires', 'Hôtellerie', 'Pôle Développement', '2026-04-28', 'Le groupe accompagne un investisseur privé dans la conception et la réalisation d\'un hôtel 4 étoiles.'],
            ['plateforme-agricole-valorisation', 'Une plateforme agricole pour mieux valoriser les récoltes', 'Agro-industrie', 'Responsable Agro', '2026-03-10', 'Les équipes travaillent sur une ferme moderne avec stockage, transformation et transport intégré.'],
            ['nouveau-siege', 'Inauguration du nouveau siège social', 'Groupe', 'Direction', '2026-02-05', 'Immobilier Pluriel emménage dans des locaux ultra-modernes à Yamoussoukro.'],
            ['formation-btp-2026', 'Lancement de la session de formation BTP', 'Formation', 'Pôle RH', '2026-01-20', '50 jeunes formés aux métiers de la topographie et du génie civil.'],
            ['partenariat-solaire', 'Partenariat pour l\'énergie solaire', 'Innovation', 'Innovation', '2026-01-10', 'Tous nos nouveaux lotissements seront équipés d\'un éclairage public 100% solaire.'],
        ];

        foreach ($news as $index => [$slug, $title, $category, $author, $date, $excerpt]) {
            News::updateOrCreate(['slug' => $slug], [
                'order' => $index + 1,
                'title' => $title,
                'category' => $category,
                'author' => $author,
                'date' => $date,
                'image_url' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
                'excerpt' => $excerpt,
                'content' => '<p>' . $excerpt . '</p>',
                'tags' => [$category],
                'gallery' => [],
                'is_featured' => $index < 3,
                'is_active' => true,
            ]);
        }

        // Page Headers
        $pages = [
            ['team', 'Notre Groupe', 'Expertise & Vision'],
            ['services', 'Nos Services', 'Des expertises intégrées'],
            ['terrains', 'Nos Terrains', 'Des opportunités foncières sécurisées'],
            ['portfolio', 'Portfolio', 'Nos réalisations'],
            ['news', 'Actualités', 'La vie du groupe'],
            ['contact', 'Contact', 'Parlons de votre projet'],
        ];

        foreach ($pages as [$page, $label, $title]) {
            PageHeader::updateOrCreate(['page_name' => $page], [
                'label' => $label,
                'title' => $title,
                'lead' => 'Contenu administrable depuis l\'admin.',
            ]);
            CtaSection::updateOrCreate(['page_name' => $page], [
                'title' => 'Prêt à lancer votre projet ?',
                'description' => 'Notre équipe vous accompagne dans les prochaines étapes.',
                'button_text' => 'Nous contacter',
                'button_link' => '/contact',
            ]);
        }

        // Contact Info
        $contactInfo = [
            ['Adresse', "Yamoussoukro, 220 Logements, Côte d'Ivoire", 'map-pin'],
            ['Téléphone', '+225 07 00 00 00 00', 'phone'],
            ['Email', 'contact@immobilierpluriel.com', 'mail'],
            ['Horaires', 'Lun - Ven, 08h00 - 18h00', 'clock'],
        ];

        foreach ($contactInfo as $index => [$label, $value, $icon]) {
            ContactInfo::updateOrCreate(['order' => $index + 1], [
                'label' => $label,
                'value' => $value,
                'icon' => $icon,
                'is_active' => true,
            ]);
        }

        // Navigation Links
        $navigation = [
            ['Accueil', '/'],
            ['Terrains', '/terrains'],
            ['Services', '/services'],
            ['Réalisations', '/portfolio'],
            ['Équipe', '/team'],
            ['Actualités', '/news'],
        ];

        foreach ($navigation as $index => [$label, $url]) {
            NavigationLink::updateOrCreate(['order' => $index + 1], [
                'label' => $label,
                'url' => $url,
                'is_active' => true,
            ]);
        }

        // Social Links
        $socialLinks = [
            ['facebook', 'https://facebook.com', 'facebook'],
            ['linkedin', 'https://linkedin.com', 'linkedin'],
            ['instagram', 'https://instagram.com', 'instagram'],
            ['tiktok', 'https://tiktok.com', 'tiktok'],
            ['whatsapp', 'https://wa.me/2250700000000', 'whatsapp'],
        ];

        foreach ($socialLinks as $index => [$platform, $url, $icon]) {
            SocialLink::updateOrCreate(['platform' => $platform], [
                'order' => $index + 1,
                'url' => $url,
                'icon' => $icon,
                'is_active' => true,
            ]);
        }
    }
}
