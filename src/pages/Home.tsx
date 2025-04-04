import LoadingMask from "@/components/masks/LoadingMask";
import NavBar from "../components/NavBar";
import SearchBox from "../components/SearchBox";
import useGeneralStore from "@/stores/useGeneralStore";
import AnimateBackground from "@/components/ui/animate-background";
const Home = () => {
  const { globalIsLoading } = useGeneralStore();
  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-4 px-2">
        <AnimateBackground />
        <LoadingMask
          isLoading={globalIsLoading}
          text="Analyzing patents, please wait..."
        />
        <SearchBox />
      </div>
    </>
  );
};

export default Home;
