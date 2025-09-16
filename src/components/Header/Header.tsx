import "./Header.css";
import { RiMenuFold2Fill } from "react-icons/ri";

import { useUserContext } from "../../hooks/UserContextHook";
import AccountMenu from "../other/AccountMenu";

function Header() {
  const { user } = useUserContext();
  const role = user?.user?.role;

  return (
    <div id="header" className="layouts border-bottom">
      <div id="headerContainer">
        <div className="headerLeft">
          <RiMenuFold2Fill
            className="headerIcon menuIcon"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          />
          <h2 className="h2">CENTRAL STORES</h2>
        </div>
        <div className="headerRight">
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}

export default Header;
