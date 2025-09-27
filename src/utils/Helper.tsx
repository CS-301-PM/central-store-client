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

// type Request = {
//   id: number;
//   user_id: number;
//   stock_id: number;
//   item_name: string;
//   quantity: number;
//   priority: string;
//   reason: string;
//   status: string;
//   department: string;
//   blockchain_address: string;
//   created_at: string;
//   updated_at: string;
// };

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
