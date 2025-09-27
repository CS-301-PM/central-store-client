import * as React from "react";
import { useUserContext } from "../../hooks/UserContextHook";
import { Role } from "../../types/User";

type RequestTableHeaderProps = {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

const RequestTableHeader: React.FC<RequestTableHeaderProps> = ({
  title = "Requests",
  subtitle,
  children,
}) => {
  const { user } = useUserContext();
  const role = user?.user?.role;

  const userRole = (role: Role) => {
    switch (role) {
      case "ADMIN":
        return "Admin";
      case "DEPARTMENT_DEAN":
        return "Department";
      case "PROCUREMENT_OFFICER":
        return "Storekeeper";
      case "STORES_MANAGER":
        return "Manager";
      case "CFO":
        return "CFO";
    }
  };
  return (
    <div className="requestTableHeader p-4 bg-light rounded d-flex justify-content-between align-items-center">
      <div>
        <h2 className="mb-0">{`${userRole(role)} (${
          user?.user?.department
        })`}</h2>
        <h3 className="mb-0 text-muted">{title}</h3>
        {subtitle && <small className="text-muted">{subtitle}</small>}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default RequestTableHeader;
