import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiMaximize, FiChevronLeft, FiChevronRight, FiSearch, FiDollarSign, FiLayers } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { terrains } from '../data/terrainsData';

const ITEMS_PER_PAGE = 10;

export default function Terrains() {
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    location: '',
    maxPrice: '',
    minArea: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredList = useMemo(() => {
    return terrains.filter((t) => {
      // Filtre par nom
      const matchesName = t.title.toLowerCase().includes(searchQuery.name.toLowerCase());
      
      // Filtre par localité
      const matchesLocation = t.location.toLowerCase().includes(searchQuery.location.toLowerCase());
      
      // Filtre par prix
      const priceValue = parseInt(t.price.replace(/[^0-9]/g, ''), 10) || 0;
      const matchesPrice = !searchQuery.maxPrice || priceValue <= parseInt(searchQuery.maxPrice, 10);
      
      // Filtre par superficie
      const areaValue = parseInt(t.area.replace(/[^0-9]/g, ''), 10) || 0;
      const matchesArea = !searchQuery.minArea || areaValue >= parseInt(searchQuery.minArea, 10);

      return matchesName && matchesLocation && matchesPrice && matchesArea;
    });
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

  const currentList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredList, currentPage]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SitePage
      label="Terrains"
      title="Terrains & lotissements"
      lead="Terrains viabilisés et sécurisés pour particuliers, promoteurs et investisseurs."
    >
      <div className="ix-wrap">
        {/* Barre de recherche multi-critères */}
        <div className="ix-search-engine reveal">
          <div className="ix-search-grid">
            <div className="ix-search-field">
              <label><FiSearch /> Nom du terrain</label>
              <input 
                type="text" 
                name="name"
                placeholder="Ex: Les Jardins..." 
                value={searchQuery.name}
                onChange={handleSearchChange}
              />
            </div>
            <div className="ix-search-field">
              <label><FiMapPin /> Localité</label>
              <input 
                type="text" 
                name="location"
                placeholder="Ex: Bingerville" 
                value={searchQuery.location}
                onChange={handleSearchChange}
              />
            </div>
            <div className="ix-search-field">
              <label><FiDollarSign /> Prix max (FCFA)</label>
              <input 
                type="number" 
                name="maxPrice"
                placeholder="Ex: 20000000" 
                value={searchQuery.maxPrice}
                onChange={handleSearchChange}
              />
            </div>
            <div className="ix-search-field">
              <label><FiLayers /> Superficie min (m²)</label>
              <input 
                type="number" 
                name="minArea"
                placeholder="Ex: 500" 
                value={searchQuery.minArea}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        <div className="ix-filter-bar reveal" style={{ justifyContent: 'flex-end' }}>
          <span className="ix-results-count">
            {filteredList.length} terrain{filteredList.length > 1 ? 's' : ''} trouvé{filteredList.length > 1 ? 's' : ''}
          </span>
        </div>

        {currentList.length > 0 ? (
          <div className="ix-parcel-wall reveal reveal-delay-1">
            {currentList.map((terrain) => (
              <Link key={terrain.id} to={`/terrains/${terrain.id}`} className="ix-parcel">
                <img src={terrain.image} alt={terrain.title} loading="lazy" />
                <span className="ix-parcel-badge">{terrain.status}</span>
                <div className="ix-parcel-cap">
                  <h3>{terrain.title}</h3>
                  <p className="ix-parcel-meta">
                    <span>
                      <FiMapPin aria-hidden="true" /> {terrain.location}
                    </span>
                    <span>
                      <FiMaximize aria-hidden="true" /> {terrain.area}
                    </span>
                  </p>
                  <span className="ix-parcel-price">{terrain.price}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="ix-empty-results reveal">
            <p>Aucun terrain ne correspond à vos critères de recherche.</p>
            <button 
              className="nl-btn nl-btn-mint"
              onClick={() => setSearchQuery({ name: '', location: '', maxPrice: '', minArea: '' })}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pagination-container reveal">
            <button 
              className="pagination-btn" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button 
              className="pagination-btn" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </SitePage>
  );
}
