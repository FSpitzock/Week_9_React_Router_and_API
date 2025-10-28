import { useParams, useNavigate } from 'react-router-dom';
import { useBookCollection } from '../context/BookCollectionContext';
import BookDetails from '../components/BookDetails';

export default function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById } = useBookCollection();

  const book = getBookById(id);

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="book-details-page">
      <BookDetails book={book} onBack={() => navigate('/collection')} />
    </div>
  );
}
