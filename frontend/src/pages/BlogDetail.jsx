import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser, FiTag, FiChevronRight, FiClock, FiBookOpen, FiShare2 } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { news } from '../data/companyData';
import { getNewsItem } from '../services/api';
import '../styles/pages/DetailPages.css';

export default function BlogDetail() {
  const { id } = useParams();
  const fallbackArticle = news.find((item) => item.id === id);
  const [article, setArticle] = useState(fallbackArticle);
  const [otherArticles, setOtherArticles] = useState(news.filter((item) => item.id !== id).slice(0, 3));

  useEffect(() => {
    getNewsItem(id)
      .then((response) => {
        setArticle(response.data.article || response.data);
        setOtherArticles(response.data.related || []);
      })
      .catch(() => {
        setArticle(fallbackArticle);
        setOtherArticles(news.filter((item) => item.id !== id).slice(0, 3));
      });
  }, [id]);

  if (!article) {
    return (
      <SitePage label="404" title="Article introuvable">
        <div className="ix-wrap">
          <div className="ix-empty-state">
            <p>Cet article n'existe pas.</p>
            <Link to="/news" className="nl-btn nl-btn-mint">Voir toutes les actualités</Link>
          </div>
        </div>
      </SitePage>
    );
  }

  return (
    <SitePage label={article.category} title={article.title} lead={article.excerpt}>
      <div className="ix-wrap">
        <Link to="/news" className="ix-back-link">
          <FiArrowLeft /> Actualités
        </Link>

        {/* Image principale */}
        <div className="ix-panorama reveal" style={{ marginBottom: '40px', aspectRatio: '16/9', borderRadius: 0 }}>
          <img src={article.image_url || article.image} alt={article.title} />
        </div>

        {/* Badges */}
        <div className="ix-badges reveal" style={{ marginBottom: '32px' }}>
          <span className="ix-badge ix-badge-primary"><FiTag /> {article.category}</span>
          <span className="ix-badge"><FiCalendar /> {article.date}</span>
          {article.author && <span className="ix-badge"><FiUser /> {article.author}</span>}
          <span className="ix-badge"><FiClock /> 5 min</span>
        </div>

        {/* Layout principal */}
        <div className="ix-duo reveal">
          {/* Colonne gauche - Contenu */}
          <div className="ix-detail-content">
            {/* Contenu de l'article */}
            <article className="ix-article">
              <div className="ix-article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
              
              {/* Tags */}
              {article.tags && (
                <div className="ix-tags">
                  {article.tags.map((tag) => (
                    <span key={tag} className="ix-tag"><FiTag /> {tag}</span>
                  ))}
                </div>
              )}

              {/* Partage */}
              <div className="ix-share">
                <span>Partager :</span>
                <button className="nl-btn nl-btn-outline">
                  <FiShare2 /> Partager
                </button>
              </div>
            </article>
          </div>

          {/* Colonne droite - Sidebar */}
          <aside className="ix-detail-side">
            <div className="ix-side-card">
              <h3><FiBookOpen /> Articles récents</h3>
              <div className="ix-side-articles">
                {otherArticles.map((post) => (
                  <Link
                    key={post.slug || post.id}
                    to={`/news/${post.slug || post.id}`}
                    className="ix-side-article"
                  >
                    <div className="ix-side-article-img">
                      <img src={post.image_url || post.image} alt={post.title} />
                    </div>
                    <div className="ix-side-article-content">
                      <span className="ix-side-article-cat">{post.category}</span>
                      <h4>{post.title}</h4>
                      <span className="ix-side-article-date"><FiCalendar /> {post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/news" className="nl-btn nl-btn-mint" style={{ width: '100%', marginTop: '20px' }}>
              Toutes les actualités
            </Link>
          </aside>
        </div>

        {/* Navigation */}
        <div className="ix-nav-footer reveal" style={{ marginTop: '60px', marginBottom: '50px' }}>
          <Link to="/news" className="ix-nav-link">
            <FiChevronRight /> Voir toutes les actualités
          </Link>
        </div>
      </div>
    </SitePage>
  );
}
