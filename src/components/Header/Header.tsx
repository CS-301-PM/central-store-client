import "./Header.css";
import { RiMenuFold2Fill } from "react-icons/ri";

import { useUserContext } from "../../hooks/UserContextHook";
import AccountMenu from "../other/AccountMenu";
// import { roleOptionsForUserRegistration } from "../../types/User";

function Header() {
  const { user } = useUserContext();
  const USER = user?.user;

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
          <h2 className="h3">CENTRAL STORES</h2>
        </div>
        <div className="headerRight">
          <div className="profileId border-0 ps-3 pe-0 rounded">
            <div className="nameAndId">
              <div className="h6">{USER?.employeeId}</div>
              {/* <div>{USER?.role}</div> */}
            </div>
            <AccountMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
