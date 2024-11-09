import { companies } from "@/assets/companies";
import { patents } from "@/assets/patents";

import { DropdownSelect } from "./inputs/DropdownSelect";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

const SearchBox = () => {
  const { t } = useTranslation(["common"]);

  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: "calc(100vh - 90px)" }}
    >
      <div className="flex flex-col gap-5">
        <div className="text-3xl font-bold text-center">{t("slogan")}</div>
        <div className="flex flex-col md:flex-row gap-2 justify-center items-center">
          <DropdownSelect name={"patent"} data={patents} />
          <DropdownSelect name={"company"} data={companies} />
          <Button className="w-[300px]" size={"lg"}>{t("search")}</Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
