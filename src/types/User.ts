export type Role =
  | "STORES_MANAGER"
  | "PROCUREMENT_OFFICER"
  | "DEPARTMENT_DEAN"
  | "CFO"
  | "ADMIN";

export const roleOptions = [
  { value: "All", label: "All Roles" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "storekeeper", label: "Storekeeper" },
  { value: "department_hod", label: "Department HOD" },
];

export type User = {
  id?: string;
  fullname?: string;
  employeeNumber?: string;
  role: Role;
};

export type UserState = {
  user: User | null;
};

export type UserSignIn = {
  employeeNumber: string;
  password: string;
};
export type UserSignUp = {} & UserSignIn & {
    fullname: string;
    phone: string;
    role: Role;
    confirm: string;
  };

export type UserRegistration = {
  firstname?: string;
  lastname?: string;
  employeeId?: string;
  department?: string;
  role: Role;
  password?: string;
};

type ErrorBody = {
  message: string;
  type: string;
  value: string;
};

export type ErrorResponse = {
  errors: {
    [
      key:
        | string
        | "employeeNumber"
        | "fullname"
        | "phone"
        | "role"
        | "password"
        | "confirm"
    ]: ErrorBody;
  };
};

export const departmentOptions = [
  { value: "finance", label: "Finance" },
  { value: "hr", label: "Human Resources" },
  { value: "it", label: "Information Technology" },
  { value: "central_store", label: "Central Store" },
  { value: "procurement", label: "Procurement" },
  { value: "library", label: "Library" },
  { value: "laboratory", label: "Laboratory" },
  { value: "maintenance", label: "Maintenance" },
  { value: "security", label: "Security" },
  { value: "transport", label: "Transport" },
  { value: "research", label: "Research & Development" },
  { value: "administration", label: "Administration" },
];
