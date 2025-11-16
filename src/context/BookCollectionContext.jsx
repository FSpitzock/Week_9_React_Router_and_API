import { createContext, useContext, useReducer, useEffect } from "react";
import { searchBooks as searchGoogleBooks } from "../services/googleBooksApi.js";

// Transform API result
function transformGoogleBookToBook(googleBook) {
  const info = googleBook.volumeInfo || {};

  return {
    id: googleBook.id || String(Date.now() + Math.random()),
    title: info.title || "No title",
    authors: info.authors || ["Unknown"],
    description: info.description || "",
    thumbnail: info.imageLinks?.thumbnail || "",
    categories: info.categories || [],
    publisher: info.publisher || "",
    averageRating: info.averageRating || null,
    previewLink: info.previewLink || ""
  };
}

// Initial State
const initialState = {
  books: [],
  searchResults: [],
  loading: false,
  error: null,
};


// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };

    case "ADD_BOOK":
      return { ...state, books: [...state.books, action.payload] };

    default:
      return state;
  }
}


// Context setup
const BookCollectionContext = createContext(null);

export function BookCollectionProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Search function
  async function searchBooks(query) {
    try {
      const results = await searchGoogleBooks(query);
      dispatch({
        type: "SET_SEARCH_RESULTS",
        payload: results.items || [], 
      });
    } catch (err) {
      console.error("Search error:", err);
    }
  }

  // Add a book
  function addBook(book) {
    dispatch({ type: "ADD_BOOK", payload: book });
  }

  const value = {
    books: state.books,
    searchResults: state.searchResults,
    searchBooks,
    addBook,
  };

  return (
    <BookCollectionContext.Provider value={value}>
      {children}
    </BookCollectionContext.Provider>
  );
}

// -------------------------
// Custom hook (THIS MUST BE STABLE)
// -------------------------
export function useBookCollection() {
  const ctx = useContext(BookCollectionContext);
  if (!ctx) throw new Error("useBookCollection must be used inside provider");
  return ctx;
}
