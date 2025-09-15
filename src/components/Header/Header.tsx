import "./Header.css";
import { RiMenuFold2Fill } from "react-icons/ri";
// import { IoNotificationsCircleSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { BsPersonFillGear } from "react-icons/bs";
import { BsPersonFillCheck } from "react-icons/bs";
import { FaClipboardUser } from "react-icons/fa6";

import { NavLink } from "react-router-dom";
import { useUserContext } from "../../hooks/UserContextHook";

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
          <h1>CENTRAL-STORES</h1>
        </div>
        <div className="headerRight">
          {/* <IoNotificationsCircleSharp className="headerIcon" /> */}
          {role === "ADMIN" && <MdAdminPanelSettings className="headerIcon" />}
          {role === "STORES_MANAGER" && <FaUserTie className="headerIcon" />}
          {role === "DEPARTMENT_DEAN" && (
            <BsPersonFillGear className="headerIcon" />
          )}
          {role === "PROCUREMENT_OFFICER" && (
            <BsPersonFillCheck className="headerIcon" />
          )}
          {role === "CFO" && <FaClipboardUser className="headerIcon" />}
        </div>
      </div>
    </div>
  );
}

export default Header;
