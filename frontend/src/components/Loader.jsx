import './Loader.css';

export default function Loader({ message = "Chargement en cours..." }) {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p className="loader-message">{message}</p>
    </div>
  );
}
