import { createContext, useContext, useReducer } from "react";
import { searchBooks as searchGoogleBooks } from "../services/googleBooksApi.js";

// Initial State
const initialState = {
  books: [],
  searchResults: [],
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };
    case "ADD_BOOK":
      // Avoid duplicates
      if (state.books.find(b => b.id === action.payload.id)) return state;
      return { ...state, books: [...state.books, action.payload] };
    case "REMOVE_BOOK":
      return { ...state, books: state.books.filter(b => b.id !== action.payload) };
    case "UPDATE_BOOK_STATUS":
      return {
        ...state,
        books: state.books.map(b =>
          b.id === action.payload.id ? { ...b, status: action.payload.status } : b
        ),
      };
    default:
      return state;
  }
}

// Context
const BookCollectionContext = createContext(null);

export function BookCollectionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Search books via API
  async function searchBooks(query) {
    try {
      const results = await searchGoogleBooks(query);
      dispatch({ type: "SET_SEARCH_RESULTS", payload: results.items || [] });
    } catch (err) {
      console.error("Search error:", err);
    }
  }

  function addBook(book) {
    const bookWithStatus = { ...book, status: book.status || "want-to-read" };
    dispatch({ type: "ADD_BOOK", payload: bookWithStatus });
  }

  function removeBook(bookId) {
    dispatch({ type: "REMOVE_BOOK", payload: bookId });
  }

  function updateBookStatus(bookId, newStatus) {
    dispatch({ type: "UPDATE_BOOK_STATUS", payload: { id: bookId, status: newStatus } });
  }

  function getBooksByStatus(status) {
    return state.books.filter(b => b.status === status);
  }

  function getBookById(bookId) {
    return state.books.find(b => b.id === bookId) || null;
  }

  return (
    <BookCollectionContext.Provider
      value={{
        books: state.books,
        searchResults: state.searchResults,
        searchBooks,
        addBook,
        removeBook,
        updateBookStatus,
        getBooksByStatus,
        getBookById, // ✅ must be here
      }}
    >
      {children}
    </BookCollectionContext.Provider>
  );
}

// Hook
export function useBookCollection() {
  const ctx = useContext(BookCollectionContext);
  if (!ctx) throw new Error("useBookCollection must be used inside BookCollectionProvider");
  return ctx;
}
