import { Role } from "../types/User";

export const getRedirectPath = (role: Role): string => {
  switch (role) {
    case "ADMIN":
      return "/admin/users";
    case "STORES_MANAGER":
      return "/manager/dashboard";
    case "DEPARTMENT_DEAN":
      return "/department/requests";
    case "CFO":
      return "/cfo/funds";
    case "PROCUREMENT_OFFICER":
      return "/procurement/requests";
    default:
      return "/";
  }
};
