import React, { ReactNode } from "react";
import { Role } from "../types/User";
// import { Role } from "../types/User";

type ProtectedRouteProps = {
  role: Role;
  allowedRoles: Role[];
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  role,
  allowedRoles,
  children,
}) => {
  if (!allowedRoles.includes(role)) {
    return (
      <div className="accessDeniedPage">
        <div className="accessDeniedPageInner">
          <h2>ACCESS DENIED</h2>
          <p className="">
            You do not have access to the page you are trying to access.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
