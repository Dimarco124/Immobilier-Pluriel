import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { projects } from '../data/companyData';

const ITEMS_PER_PAGE = 6;

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const currentList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return projects.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SitePage
      label="Réalisations"
      title="Des projets concrets qui transforment le territoire"
      lead="Résidentiel, routier, hôtelier et agro-industriel : la même exigence de qualité."
    >
      <div className="ix-wrap">
        <div className="ix-wall reveal">
          {currentList.map((project) => (
            <Link key={project.id} to={`/portfolio/${project.id}`} className="ix-wall-item">
              <img src={project.image} alt={project.title} loading="lazy" />
              <div className="ix-wall-cap">
                <span>
                  {project.category} · {project.year}
                </span>
                <h3>{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>

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
