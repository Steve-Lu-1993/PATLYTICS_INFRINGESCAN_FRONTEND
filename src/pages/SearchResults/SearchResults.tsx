import NavBar from '../../components/NavBar';
import SearchBox from '../../components/SearchBox';
import ResultsList from './components/ResultsList';

const SearchResults = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-4">
        <SearchBox />
        <ResultsList />
      </div>
    </>
  );
};

export default SearchResults;
