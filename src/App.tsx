import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults/SearchResults";
import Authorize from "./pages/Authorize/Authorize";
import Layout from "./components/Layout";
import { useEffect } from "react";
import { useGenericQuery } from "./hooks/useGenericQuery";
import useGeneralStore from "./stores/useGeneralStore";

function App() {
  const token = window.localStorage.getItem("t");
  const { setUserNameFirstLetter,setUser } = useGeneralStore();

  const userQuery = useGenericQuery({
    endpoint: "/user",
    token: token || "",
    enabled: !!token,
    dependencies: [token],
  });

  useEffect(() => {
    if (userQuery.isSuccess) {
      setUserNameFirstLetter( userQuery?.data?.data?.first_name[0].toUpperCase() );
      setUser(userQuery?.data?.data);
    }
  }, [userQuery.isSuccess, setUserNameFirstLetter, userQuery?.data?.data?.first_name]);

  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (userQuery.isError) {
    return <div>Error...</div>;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/authorize" element={<Authorize />} />
      </Routes>
    </Layout>
  );
}

export default App;
