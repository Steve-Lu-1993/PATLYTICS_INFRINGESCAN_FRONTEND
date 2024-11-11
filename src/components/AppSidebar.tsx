import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { UserComparison } from "@/types/entities/userComparison";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type AppSidebarType = {
  userComparisonData: any;
};

export function AppSidebar({ userComparisonData }: AppSidebarType) {
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate()

  const comparisonHistory = userComparisonData?.sort((a: { id: number; },b: { id: number; })=>b.id - a.id).map((uc: UserComparison) => {
    return {
      comparison_uuid: uc.patentCompanyComparison.uuid,
      company_name: uc.patentCompanyComparison.company.name,
      patent_publication_number:
        uc.patentCompanyComparison.patent.publication_number,
      patent_title: uc.patentCompanyComparison.patent.title,
    };
  });

  const handleClickHistory = (comparison_uuid: string) => {
    navigate(`/search?u=${comparison_uuid}`);
  }

  return (
    <Sidebar>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh)]">
          <div className="space-y-4 p-4">
            <div className="text-md font-semibold">{t("search_history")}</div>
            {comparisonHistory?.map(
              (item: {
                comparison_uuid: string;
                company_name: string;
                patent_publication_number: string;
                patent_title: string;
              }) => (
                <Button
                  key={item.comparison_uuid}
                  className="border rounded-lg flex flex-col h-min justify-start items-start w-full text-wrap text-start gap-1"
                  variant="outline"
                  onClick={() => handleClickHistory(item.comparison_uuid)}
                >
                  <div className="text-sm"> {item.patent_publication_number} </div>
                  <div className="text-xs font-normal text-neutral-400"> {item.patent_title} </div>
                  <div className="text-sm">{item.company_name}</div>
                </Button>
              )
            )}
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
