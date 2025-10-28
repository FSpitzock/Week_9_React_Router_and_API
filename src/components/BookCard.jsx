import { useNavigate } from 'react-router-dom';

function BookCard({ book }) {
  const navigate = useNavigate();

  return (
    <div className="book-card">
      <img
        src={book.imageLinks?.thumbnail || book.thumbnail || 'https://via.placeholder.com/128x192/cccccc/ffffff?text=No+Image'}
        alt={book.title || 'Untitled Book'}
        className="book-cover"
      />
      <h3>{book.title}</h3>
      <button
        onClick={() => navigate(`/book/${book.id}`)}
        className="btn-secondary"
      >
        View Details
      </button>
    </div>
  );
}

export default BookCard;
