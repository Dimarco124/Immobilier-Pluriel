import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser, FiTag, FiShare2, FiChevronRight } from 'react-icons/fi';
import SitePage from '../components/SitePage';
import { news } from '../data/companyData';

export default function BlogDetail() {
  const { id } = useParams();
  const article = news.find((item) => item.id === id);
  const otherArticles = news.filter((item) => item.id !== id).slice(0, 3);

  if (!article) {
    return (
      <SitePage label="404" title="Article introuvable" lead="">
        <div className="ix-wrap ix-empty">
          <Link to="/news" className="nl-btn nl-btn-mint">
            Retour aux actualités
          </Link>
        </div>
      </SitePage>
    );
  }

  return (
    <SitePage label={article.category} title={article.title} lead={article.excerpt}>
      <div className="ix-wrap ix-blog-detail reveal">
        <Link to="/news" className="ix-dossier-back">
          <FiArrowLeft /> Actualités
        </Link>
        
        <div className="ix-blog-header">
          <div className="ix-blog-meta-top">
            <span className="ix-blog-category">{article.category}</span>
            <span className="ix-blog-date"><FiCalendar /> {article.date}</span>
            {article.author && <span className="ix-blog-author"><FiUser /> {article.author}</span>}
          </div>
        </div>

        <div className="ix-blog-cover">
          <img src={article.image} alt={article.title} />
        </div>

        <div className="ix-blog-layout">
          <article className="ix-blog-main-content">
            <div
              className="ix-blog-body-text"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {article.tags && (
              <div className="ix-blog-tags">
                {article.tags.map(tag => (
                  <span key={tag} className="ix-blog-tag"><FiTag /> {tag}</span>
                ))}
              </div>
            )}

            <div className="ix-blog-share">
              <span>Partager cet article :</span>
              <div className="ix-share-icons">
                <button className="ix-share-btn"><FiShare2 /> Partager</button>
              </div>
            </div>
          </article>

          <aside className="ix-blog-sidebar">
            <div className="ix-sidebar-widget">
              <h3>Articles récents</h3>
              <div className="ix-recent-posts">
                {otherArticles.map(post => (
                  <Link key={post.id} to={`/news/${post.id}`} className="ix-recent-post-card">
                    <img src={post.image} alt={post.title} />
                    <div>
                      <h4>{post.title}</h4>
                      <span>{post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="ix-sidebar-widget ix-newsletter-widget">
              <h3>Newsletter</h3>
              <p>Restez informé de nos derniers projets et opportunités.</p>
              <form className="ix-sidebar-form">
                <input type="email" placeholder="Votre email" />
                <button type="submit" className="nl-btn nl-btn-mint w-full">S'abonner</button>
              </form>
            </div>
          </aside>
        </div>

        {article.gallery && article.gallery.length > 1 && (
          <div className="ix-blog-gallery-section">
            <h3>En images</h3>
            <div className="ix-blog-gallery-grid">
              {article.gallery.map((img, i) => (
                <div key={i} className="ix-blog-gallery-item">
                  <img src={img} alt={`${article.title} gallery ${i}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="ix-blog-footer-nav">
          <Link to="/news" className="ix-blog-all-link">
            Voir toutes les actualités <FiChevronRight />
          </Link>
        </div>
      </div>
    </SitePage>
  );
}
