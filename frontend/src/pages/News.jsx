import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { news } from '../data/companyData';

const ITEMS_PER_PAGE = 5;

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);

  const currentList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return news.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [featured, ...rest] = currentList;

  return (
    <SitePage
      label="Actualités"
      title="Ce qui avance dans le groupe"
      lead="Lotissements, hôtellerie, agro-industrie : suivez nos derniers projets."
    >
      <div className="ix-wrap">
        {currentPage === 1 && featured && (
          <Link to={`/news/${featured.id}`} className="ix-feed-hero reveal">
            <div className="ix-feed-hero-img">
              <img src={featured.image} alt={featured.title} loading="lazy" />
            </div>
            <div className="ix-feed-hero-body">
              <span className="nl-section-label">{featured.category}</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
            </div>
          </Link>
        )}

        <ul className="ix-feed-list reveal reveal-delay-1">
          {(currentPage === 1 ? rest : currentList).map((article) => (
            <li key={article.id}>
              <Link to={`/news/${article.id}`} className="ix-feed-item">
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
