import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Layout.css";
import MobileMenu from "../Sidebar/MobileMenu";

function Layout() {
  return (
    <main id="mainLayout" className="mainLayout">
      <Header />
      <Sidebar />
      <div id="render" className="layouts">
        <Outlet />
      </div>
      <MobileMenu />
    </main>
  );
}

export default Layout;
