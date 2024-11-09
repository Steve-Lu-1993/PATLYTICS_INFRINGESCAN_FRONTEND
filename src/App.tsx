import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults/SearchResults';
import Authorize from './pages/Authorize/Authorize';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/authorize" element={<Authorize />} />
    </Routes>
  );
}

export default App;
