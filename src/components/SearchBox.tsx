import { DropdownSelect } from "./inputs/DropdownSelect";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useGenericQuery } from "@/hooks/useGenericQuery";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import QueryError from "./errors/QueryError";
import { useGenericMutation } from "@/hooks/useGenericMutation";
import { useToast } from "@/hooks/use-toast";
import useGeneralStore from "@/stores/useGeneralStore";
import { useNavigate } from "react-router-dom";
import { Patent } from "@/types/entities/patent";
import { PatentCompanyComparison } from "@/types/entities/patentCompanyComparison";
import { Company } from "@/types/entities/company";
import { useQueryClient } from "@tanstack/react-query";

type SearchBoxType = {
  type?: string;
  company_uuid?: string;
  patent_publication_number?: string;
};

const SearchBox = ({
  type,
  company_uuid,
  patent_publication_number,
}: SearchBoxType) => {
  const { t } = useTranslation(["common"]);
  const [patentKeyword, setPatentKeyword] = useState("");
  const [companyUuid, setCompanyUuid] = useState("");
  const [patentPublicationNumber, setPatentPublicationNumber] = useState("");
  const { setGlobalIsLoading } = useGeneralStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const token = window.localStorage.getItem("t");
  const queryClient = useQueryClient();

  const companiesQuery = useGenericQuery({
    endpoint: "/company/list",
  });

  const patentsQuery = useGenericQuery({
    endpoint: "/patent/list",
    filters: {
      keyword: patentKeyword,
    },
    dependencies: [patentKeyword],
  });

  const queryMutations = useGenericMutation<{ data: { company:Company,patent:Patent,comparison:PatentCompanyComparison } }>({
    endpoint: `/comparison/getOrCreateComparison`,
    method: "POST",
  });

  const queryMutationByUser = useGenericMutation<{ data: { company:Company,patent:Patent,comparison:PatentCompanyComparison } }>({
    endpoint: `/comparison/getOrCreateComparisonByUser`,
    method: "POST",
    token:token||"",
  });

  const handleSearch = () => {
    if (!companyUuid || !patentPublicationNumber) {
      toast({
        title: "Selection not completed",
        description: "Please select a company and a patent to proceed",
        variant: "destructive",
      });
      return;
    }
    setGlobalIsLoading(true);

    if(!token){
      queryMutations.mutate(
        {
          data: {
            company_uuid: companyUuid,
            publication_number: patentPublicationNumber,
          },
        },
        {
          onSuccess: (data) => {
            navigate(`/search?u=${data.data.comparison.uuid}`);
            setGlobalIsLoading(false);
          },
          onError: (err) => {
            console.log(err);
            setGlobalIsLoading(false);
          },
        }
      );
    }else{
      queryMutationByUser.mutate(
        {
          data: {
            company_uuid: companyUuid,
            publication_number: patentPublicationNumber,
          },
        },
        {
          onSuccess: (data) => {
            navigate(`/search?u=${data.data.comparison.uuid}`);
            queryClient.invalidateQueries({queryKey:["userComparison"]});
            setGlobalIsLoading(false);
          },
          onError: (err) => {
            console.log(err);
            setGlobalIsLoading(false);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (company_uuid) {
      setCompanyUuid(company_uuid);
    }
    if (patent_publication_number) {
      setPatentPublicationNumber(patent_publication_number);
      setPatentKeyword(patent_publication_number);
      patentsQuery.refetch();
    }
  }, [company_uuid, patent_publication_number]);

  if (companiesQuery.isError || patentsQuery.isError) {
    return <QueryError />;
  }

  const patentsOption = patentsQuery?.data?.data?.map(
    (patent: { id: number; publication_number: string; title: string }) => ({
      value: patent.publication_number,
      label: patent.publication_number,
    })
  );

  const companiesOption = companiesQuery?.data?.data?.map(
    (company: { uuid: string; name: string }) => ({
      value: company.uuid,
      label: company.name,
    })
  );

  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: `${type === "in_page" ? "" : "calc(100vh - 90px)"}` }}
    >
      <div className="flex flex-col gap-5">
        {type === "in_page" ? (
          <></>
        ) : (
          <div className="text-3xl font-bold text-center">{t("slogan")}</div>
        )}
        <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
          {companiesQuery.isLoading ? (
            <Skeleton className="h-12 w-[300px] rounded-full" />
          ) : (
            <DropdownSelect
              name={"patent"}
              options={patentsOption || []}
              setKeyword={setPatentKeyword}
              value={patentPublicationNumber}
              setValue={setPatentPublicationNumber}
            />
          )}
          {patentsQuery.isLoading ? (
            <Skeleton className="h-12 w-[300px] rounded-full" />
          ) : (
            <DropdownSelect
              name={"company"}
              options={companiesOption || []}
              value={companyUuid}
              setValue={setCompanyUuid}
            />
          )}
          <Button className="w-[300px]" size={"lg"} onClick={handleSearch}>
            {t("search")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
