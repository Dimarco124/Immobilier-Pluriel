import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiPlayCircle } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import Loader from '../components/Loader';
import { projects as fallbackProjects } from '../data/companyData';
import { getProjects, getImageUrl } from '../services/api';

const ITEMS_PER_PAGE = 6;

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    setLoading(true);
    getProjects({ per_page: 100 })
      .then((response) => {
        setProjects(response.data.data?.length ? response.data.data : fallbackProjects);
        setLoading(false);
      })
      .catch(() => {
        setProjects(fallbackProjects);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage < 1) {
      setSearchParams({ page: '1' });
    } else if (totalPages > 0 && currentPage > totalPages) {
      setSearchParams({ page: String(totalPages) });
    }
  }, [currentPage, totalPages, setSearchParams]);

  const currentList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return projects.slice(start, start + ITEMS_PER_PAGE);
  }, [projects, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ page: String(page) });
  };

  return (
    <SitePage
      label="Realisations"
      title="Des projets concrets qui transforment le territoire"
      lead="Residentiel, routier, hotelier et agro-industriel : la meme exigence de qualite."
    >
      {loading ? (
        <Loader message="Chargement des réalisations..." />
      ) : (
        <div className="ix-wrap">
          <div key={currentPage} className="ix-wall" style={{ minHeight: '600px' }}>
            {currentList.map((project, index) => (
              <Link key={project.slug || project.id} to={`/portfolio/${project.slug || project.id}`} className="ix-wall-item" style={{ transitionDelay: `${index * 0.05}s` }}>
                <div className="ix-wall-img-container" style={{ aspectRatio: '16/10', background: '#eee', overflow: 'hidden', position: 'relative' }}>
                  <img src={getImageUrl(project.image_url || project.image)} alt={project.title} loading={index < 4 ? 'eager' : 'lazy'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {(project.video_url || project.videoUrl) && (
                    <div className="ix-wall-video-badge"><FiPlayCircle /></div>
                  )}
                </div>
                <div className="ix-wall-cap">
                  <span>{project.category} - {project.year}</span>
                  <h3>{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>

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
