import { useSearchParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SearchBox from "../../components/SearchBox";
import { useGenericQuery } from "@/hooks/useGenericQuery";
import QueryError from "@/components/errors/QueryError";
import PatentCard from "./components/PatentCard";
import InfringeProduct from "./components/InfringeProduct";
import LoadingMask from "@/components/masks/LoadingMask";
import useGeneralStore from "@/stores/useGeneralStore";

const SearchResults = () => {
  let [searchParams] = useSearchParams();
  const comparison_uuid = searchParams.get("u");
  const { globalIsLoading } = useGeneralStore();

  const comparisonQuery = useGenericQuery({
    endpoint: `/comparison/getComparisonByUuid/${comparison_uuid}`,
    enabled: !!comparison_uuid,
    dependencies: [comparison_uuid],
  });

  if (comparisonQuery.isError) {
    return <QueryError />;
  }

  const comparisonData = comparisonQuery?.data?.data;

  return (
    <>
      <NavBar />
      {!comparisonQuery.isLoading && (
        <div className="container mx-auto mt-4 px-2 flex flex-col justify-center items-center gap-4">
          <LoadingMask isLoading={globalIsLoading} text="Analyzing patents, please wait..." />
          <SearchBox type="in_page" company_uuid={comparisonData?.company.uuid} patent_publication_number={ comparisonData?.patent.publication_number } />
          <PatentCard patent={comparisonData?.patent} />
          <InfringeProduct result={comparisonData?.comparison_results} />
        </div>
      )}
    </>
  );
};

export default SearchResults;
