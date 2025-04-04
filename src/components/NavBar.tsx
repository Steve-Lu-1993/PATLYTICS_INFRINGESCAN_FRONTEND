import styles from "./NavBar.module.css";
import patlyticsLogo from "../assets/logo_title.svg";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import useGeneralStore from "@/stores/useGeneralStore";
import { SidebarTrigger } from "./ui/sidebar";

const NavBar = () => {
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();
  const {userNameFirstLetter,user} = useGeneralStore();

  const handleLogout = () => {
    window.localStorage.removeItem("t");
    window.localStorage.removeItem("rt");
    window.location.reload();
  }

  return (
    <nav className={styles.navbar}>
      <div className="col-span-4 flex flex-row items-center gap-2">
        {
          user && (
            <SidebarTrigger />
          )
        }
        <Link to="/">
          <img src={patlyticsLogo} alt="logo" className={styles.logo} />
        </Link>
      </div>
      <div className="col-span-4 flex gap-2">
        {user ? (
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
