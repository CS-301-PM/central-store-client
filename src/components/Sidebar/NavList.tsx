import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Route, dashboardRoutes } from "../../types/Routes";
import "./NavList.css";
import { useUserContext } from "../../hooks/UserContextHook";

function NavList() {
  const [routes, setRoutes] = useState<Route[]>();
  const { user } = useUserContext();

  useEffect(() => {
    if (user && user.user && user.user.role) {
      const arrayOfRoutes = dashboardRoutes[user?.user?.role];
      setRoutes(arrayOfRoutes);
    }
  }, [user]);

  return (
    <div className="navList rounded">
      {routes &&
        routes.map((route, index) => {
          const { to, label: name, icon } = route;
          return (
            <NavLink
              key={index}
              to={to}
              className={({ isActive }) =>
                `NavLink m-2 ${isActive ? "bg-primary" : "bg-transparent"}`
              }
            >
              <div className="NavLinkIcon">{icon}</div>
              <div className="NavLinkText">
                <span>{name}</span>
              </div>
            </NavLink>
          );
        })}
    </div>
  );
}

export default NavList;
