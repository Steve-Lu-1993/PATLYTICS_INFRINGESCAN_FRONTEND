import NavBar from '../components/NavBar';
import SearchBox from '../components/SearchBox';

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-4">
        <SearchBox />
      </div>
    </>
  );
};

export default Home;