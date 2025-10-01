import { Role } from "../types/User";

export const getRedirectPath = (role: Role): string => {
  switch (role) {
    case "ADMIN":
      return "/admin/users";
    case "STORES_MANAGER":
      return "/manager/dashboard";
    case "DEPARTMENT_HOD":
      return "/department/requests";
    case "CFO":
      return "/cfo/funds";
    case "PROCUREMENT_OFFICER":
      return "/procurement/requests";
    case "STOREKEEPER":
      return "/storekeeper/requests";
    default:
      return "/";
  }
};

export function groupRequestsByDepartment(requests) {
  const grouped: Record<string, Request[]> = {};

  requests.forEach((req) => {
    if (!grouped[req.department]) {
      grouped[req.department] = [];
    }
    grouped[req.department].push(req);
  });

  return {
    all: requests,
    byDepartment: grouped,
  };
}
