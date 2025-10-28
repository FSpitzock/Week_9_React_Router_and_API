import { useState } from 'react'
import { useBookCollection } from '../context/BookCollectionContext'
import BookCard from '../components/BookCard'




function BookSearch({ onBookSelect }) {
  const [searchTerm, setSearchTerm] = useState('')
  const { searchResults, searchBooks, addBook } = useBookCollection()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      await searchBooks(searchTerm)
    }
  }

  const handleAddBook = (book) => {
    addBook(book)
    alert('Book added to your collection!')
  }

  return (
    <div className="book-search">
      <h2>Search for Books</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, author, or ISBN..."
          className="search-input"
        />
        <button type="submit" className="btn-primary">
          Search
        </button>
      </form>

      <div className="search-results">
        {searchResults.length > 0 && (
          <>
            <h3>Search Results</h3>
            <div className="books-grid">
  {searchResults.map((book) => (
    <BookCard 
      key={book.id} 
      book={book} 
      onSelect={() => onBookSelect(book)}
      onAdd={() => handleAddBook(book)}
    />
  ))}
</div>


          </>
        )}
      </div>
    </div>
  )
}

export default BookSearch