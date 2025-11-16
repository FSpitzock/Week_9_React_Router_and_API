import { useParams, useNavigate } from 'react-router-dom';
import { useBookCollection } from '../context/BookCollectionContext';
import BookDetails from '../components/BookDetails';
import { useState, useEffect } from 'react';
import { getBookById as fetchBookByIdFromApi } from '../services/googleBooksApi.js';

export default function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById, addBook } = useBookCollection();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchBook() {
      try {
        // First check local collection
        let b = getBookById(id);

        // Fetch from API if not found
        if (!b) {
          const apiBook = await fetchBookByIdFromApi(id);
          b = apiBook; // API already returns transformed book
          addBook(b);
        }

        if (isMounted) setBook(b);
      } catch (err) {
        console.error(err);
        if (isMounted) setError('Failed to fetch book details');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchBook();

    return () => { isMounted = false; };
  }, [id, getBookById, addBook]); // ✅ only these stable dependencies

  if (loading) return <div>Loading book...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="book-details-page">
      <BookDetails book={book} onBack={() => navigate('/collection')} />
    </div>
  );
}
