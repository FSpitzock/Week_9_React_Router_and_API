import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home">
      <h1>Welcome to CodeCaddy 📚</h1>
      <p>Manage your personal book collection.</p>

      <div className="actions">
        <Link to="/search" className="btn-primary">Search Books</Link>
        <Link to="/collection" className="btn-secondary">View Collection</Link>
      </div>
    </div>
  );
}