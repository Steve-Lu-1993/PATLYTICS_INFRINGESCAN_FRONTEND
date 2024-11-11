import styles from "./NavBar.module.css";
import patlyticsLogo from "../assets/logo_title.svg";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useGenericQuery } from "@/hooks/useGenericQuery";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();
  const token = window.localStorage.getItem("t");
  const [userNameFirstLetter,setUserNameFirstLetter] = useState("");

  const userQuery = useGenericQuery({
    endpoint: "/user",
    token: token || "",
    enabled: !!token,
    dependencies:[token]
  });

  const handleLogout = () => {
    window.localStorage.removeItem("t");
    window.localStorage.removeItem("rt");
    window.location.reload();
  }

  useEffect(() => {
    if (userQuery.isSuccess) {
      setUserNameFirstLetter(userQuery?.data?.data?.first_name[0].toUpperCase());
    }
  })

  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (userQuery.isError) {
    return <div>Error...</div>;
  }

  return (
    <nav className={styles.navbar}>
      <div className="col-span-4">
        <a href="/">
          <img src={patlyticsLogo} alt="logo" className={styles.logo} />
        </a>
      </div>
      <div className="col-span-4 flex gap-2">
        {userQuery.data?.data ? (
          <>
            <Popover>
              <PopoverTrigger>
                <Button variant="outline" size="icon">
                  {userNameFirstLetter}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full"
                  rounded={"normal"}
                >
                  {t("logout")}
                </Button>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <div className="flex flex-row gap-2">
            <Button onClick={() => navigate("/authorize?a=login")}>
              {t("login")}
            </Button>
            <Button
              onClick={() => navigate("/authorize?a=sign_up")}
              variant="outline"
            >
              {t("sign_up")}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
