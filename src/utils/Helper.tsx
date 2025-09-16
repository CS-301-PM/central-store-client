import { Role } from "../types/User";

export const getRedirectPath = (role: Role): string => {
switch (role) {
  case "ADMIN":
    return "/admin";
  case "STORES_MANAGER":
    return "/central_store";
  case "DEPARTMENT_DEAN":
    return "/department";
  case "CFO":
    return "/cfo/funds";
  case "PROCUREMENT_OFFICER":
    return "/procurements";
  default:
    return "/"; 
}
};
