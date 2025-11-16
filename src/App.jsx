import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation'
import './App.css'
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CollectionPage from './pages/CollectionPage';
import BookDetailsPage from './pages/BookDetailsPage';

function App() {
return(
      <BrowserRouter >
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/book/:id" element={<BookDetailsPage />} />
          </Routes>
        </main>
      </BrowserRouter>
);
  
}

export default App