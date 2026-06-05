import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import Loader from '../components/Loader';
import { news as fallbackNews } from '../data/companyData';
import { getNews, getImageUrl } from '../services/api';

const ITEMS_PER_PAGE = 5;

export default function News() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    setLoading(true);
    getNews({ per_page: 100 })
      .then((response) => {
        setNews(response.data.data?.length ? response.data.data : fallbackNews);
        setLoading(false);
      })
      .catch(() => {
        setNews(fallbackNews);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage < 1) {
      setSearchParams({ page: '1' });
    } else if (totalPages > 0 && currentPage > totalPages) {
      setSearchParams({ page: String(totalPages) });
    }
  }, [currentPage, totalPages, setSearchParams]);

  const currentList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return news.slice(start, start + ITEMS_PER_PAGE);
  }, [news, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page: String(page) });
  };

  const featured = currentList[0];
  const rest = currentList.slice(1);

  return (
    <SitePage
      label="Actualites"
      title="Ce qui avance dans le groupe"
      lead="Lotissements, hotellerie, agro-industrie : suivez nos derniers projets."
    >
      {loading ? (
        <Loader message="Chargement des actualités..." />
      ) : (
        <div className="ix-wrap" key={currentPage}>
          {currentPage === 1 && featured && (
            <Link to={`/news/${featured.slug || featured.id}`} className="ix-feed-hero">
              <div className="ix-feed-hero-img" style={{ aspectRatio: '16/9', background: '#eee' }}>
                <img src={getImageUrl(featured.image_url || featured.image)} alt={featured.title} loading="eager" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="ix-feed-hero-body">
                <span className="nl-section-label">{featured.category}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
              </div>
            </Link>
          )}

          <ul className="ix-feed-list" style={{ minHeight: '400px' }}>
            {(currentPage === 1 ? rest : currentList).map((article, index) => (
              <li key={article.slug || article.id} style={{ transitionDelay: `${index * 0.05}s` }}>
                <Link to={`/news/${article.slug || article.id}`} className="ix-feed-item">
                  <span className="ix-feed-date">{article.date}</span>
                  <div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                  </div>
                  <FiArrowUpRight className="ix-feed-arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

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
