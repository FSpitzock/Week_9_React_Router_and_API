  // TODO: Students will convert this to use React Router Link components
  // Replace button onClick handlers with Link to="/route" components (DONE)
  
import { Link, useLocation } from 'react-router-dom';


export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <Link
        to="/"
        className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
      >
        Home
      </Link>
      <Link
        to="/search"
        className={location.pathname === '/search' ? 'nav-link active' : 'nav-link'}
      >
        Search
      </Link>
      <Link
        to="/collection"
        className={location.pathname === '/collection' ? 'nav-link active' : 'nav-link'}
      >
        My Collection
      </Link>
    </nav>
  );
}

