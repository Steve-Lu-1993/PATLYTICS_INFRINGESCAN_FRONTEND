import styles from "./NavBar.module.css";
import patlyticsLogo from "../assets/logo_title.svg";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className="col-span-4">
        <a href="/">
          <img src={patlyticsLogo} alt="logo" className={styles.logo} />
        </a>
      </div>
      <div className="col-span-4 flex gap-2">
        <Button onClick={()=>navigate("/authorize?a=login")}>{t("login")}</Button>
        <Button onClick={()=>navigate("/authorize?a=sign_up")} variant="outline">{t("sign_up")}</Button>
      </div>
    </nav>
  );
};

export default NavBar;
