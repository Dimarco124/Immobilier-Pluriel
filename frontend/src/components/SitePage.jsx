export default function SitePage({ label, title, lead, children }) {
  return (
    <div className="landing-page ix-page">
      <header className="ix-hero reveal is-visible">
        <div className="ix-wrap">
          {label && <span className="nl-section-label">{label}</span>}
          <h1>{title}</h1>
          {lead && <p className="ix-lead">{lead}</p>}
        </div>
      </header>
      <div className="ix-body">{children}</div>
    </div>
  );
}
