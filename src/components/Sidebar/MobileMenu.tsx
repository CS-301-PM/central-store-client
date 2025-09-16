// import React from 'react'
import { RiMenuFoldFill } from "react-icons/ri";
import NavList from "./NavList";

function MobileMenu() {
  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex={-1}
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          CENTRAL-STORES
        </h5>
        <RiMenuFoldFill className="closeMenu" data-bs-dismiss="offcanvas" />
      </div>
      <div className="offcanvas-body" data-bs-dismiss="offcanvas">
        <NavList />
      </div>
    </div>
  );
}

export default MobileMenu;
