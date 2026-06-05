import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiMapPin, FiMaximize, FiChevronLeft, FiChevronRight, FiSearch, FiDollarSign, FiLayers } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import Loader from '../components/Loader';
import { terrains as fallbackTerrains } from '../data/terrainsData';
import { getTerrains, getImageUrl } from '../services/api';

const ITEMS_PER_PAGE = 10;

export default function Terrains() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [terrains, setTerrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTerrains({ per_page: 100 })
      .then((response) => {
        setTerrains(response.data.data?.length ? response.data.data : fallbackTerrains);
        setLoading(false);
      })
      .catch(() => {
        setTerrains(fallbackTerrains);
        setLoading(false);
      });
  }, []);

  const searchQuery = {
    name: searchParams.get('name') || '',
    location: searchParams.get('location') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minArea: searchParams.get('minArea') || ''
  };

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const filteredList = useMemo(() => {
    return terrains.filter((t) => {
      const matchesName = (t.title || '').toLowerCase().includes(searchQuery.name.toLowerCase());
      const matchesLocation = (t.location || '').toLowerCase().includes(searchQuery.location.toLowerCase());
      const priceValue = parseInt((t.price || '').replace(/[^0-9]/g, ''), 10) || 0;
      const matchesPrice = !searchQuery.maxPrice || priceValue <= parseInt(searchQuery.maxPrice, 10);
      const areaValue = parseInt((t.area || '').replace(/[^0-9]/g, ''), 10) || 0;
      const matchesArea = !searchQuery.minArea || areaValue >= parseInt(searchQuery.minArea, 10);

      return matchesName && matchesLocation && matchesPrice && matchesArea;
    });
  }, [terrains, searchQuery.name, searchQuery.location, searchQuery.maxPrice, searchQuery.minArea]);

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage < 1) {
      setSearchParams({ ...searchQuery, page: '1' });
    } else if (totalPages > 0 && currentPage > totalPages) {
      setSearchParams({ ...searchQuery, page: String(totalPages) });
    }
  }, [currentPage, totalPages]);

  const currentList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredList, currentPage]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    const newParams = { ...searchQuery, [name]: value, page: '1' };
    Object.keys(newParams).forEach(key => {
      if (!newParams[key]) delete newParams[key];
    });
    setSearchParams(newParams);
  };

  const handlePageChange = (page) => {
    setSearchParams({ ...searchQuery, page: String(page) });
  };

  return (
    <SitePage
      label="Terrains"
      title="Terrains & lotissements"
      lead="Terrains viabilises et securises pour particuliers, promoteurs et investisseurs."
    >
      {loading ? (
        <Loader message="Chargement des terrains..." />
      ) : (
        <div className="ix-wrap">
          <div className="ix-search-engine">
            <div className="ix-search-grid">
              <div className="ix-search-field">
                <label><FiSearch /> Nom du terrain</label>
                <input type="text" name="name" placeholder="Ex: Les Jardins..." value={searchQuery.name} onChange={handleSearchChange} />
              </div>
              <div className="ix-search-field">
                <label><FiMapPin /> Localite</label>
                <input type="text" name="location" placeholder="Ex: Bingerville" value={searchQuery.location} onChange={handleSearchChange} />
              </div>
              <div className="ix-search-field">
                <label><FiDollarSign /> Prix max (FCFA)</label>
                <input type="number" name="maxPrice" placeholder="Ex: 20000000" value={searchQuery.maxPrice} onChange={handleSearchChange} />
              </div>
              <div className="ix-search-field">
                <label><FiLayers /> Superficie min (m2)</label>
                <input type="number" name="minArea" placeholder="Ex: 500" value={searchQuery.minArea} onChange={handleSearchChange} />
              </div>
            </div>
          </div>

          <div className="ix-filter-bar" style={{ justifyContent: 'flex-end' }}>
            <span className="ix-results-count">{filteredList.length} terrain{filteredList.length > 1 ? 's' : ''} trouve{filteredList.length > 1 ? 's' : ''}</span>
          </div>

          {currentList.length > 0 ? (
            <div key={currentPage} className="ix-parcel-wall" style={{ minHeight: '400px' }}>
              {currentList.map((terrain, index) => (
                <Link key={terrain.id} to={`/terrains/${terrain.id}`} className="ix-parcel" style={{ transitionDelay: `${index * 0.05}s` }}>
                  <div style={{ aspectRatio: '16/10', background: '#eee', overflow: 'hidden' }}>
                    <img src={getImageUrl(terrain.image_url || terrain.image)} alt={terrain.title} loading={index < 4 ? 'eager' : 'lazy'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span className="ix-parcel-badge">{terrain.status}</span>
                  <div className="ix-parcel-cap">
                    <h3>{terrain.title}</h3>
                    <p className="ix-parcel-meta">
                      <span><FiMapPin aria-hidden="true" /> {terrain.location}</span>
                      <span><FiMaximize aria-hidden="true" /> {terrain.area}</span>
                    </p>
                    <span className="ix-parcel-price">{terrain.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="ix-empty-results">
              <p>Aucun terrain ne correspond a vos criteres de recherche.</p>
              <button className="nl-btn nl-btn-mint" onClick={() => setSearchParams({ page: '1' })}>Reinitialiser les filtres</button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination-container" style={{ marginTop: '40px' }}>
              <button className="pagination-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Page precedente"><FiChevronLeft /></button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i + 1} className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => handlePageChange(i + 1)} aria-label={`Page ${i + 1}`}>{i + 1}</button>
              ))}
              <button className="pagination-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Page suivante"><FiChevronRight /></button>
            </div>
          )}
        </div>
      )}
    </SitePage>
  );
}
