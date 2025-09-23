export type Role =
  | "STORES_MANAGER"
  | "PROCUREMENT_OFFICER"
  | "DEPARTMENT_DEAN"
  | "CFO"
  | "ADMIN";
export const roleOptionsForUserRegistration: {
  value: Role;
  label: string;
}[] = [
  { value: "ADMIN", label: "Admin" },
  { value: "STORES_MANAGER", label: "Stores Manager" },
  { value: "PROCUREMENT_OFFICER", label: "Procurement Officer" },
  { value: "DEPARTMENT_DEAN", label: "Department Dean" },
  { value: "CFO", label: "Chief Financial Officer" },
];

export const roleOptions: { value: Role | "All"; label: string }[] = [
  { value: "All", label: "All Roles" },
  ...roleOptionsForUserRegistration,
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
  username?: string;
  password?: string;
};
export type UserSignUp = {} & UserSignIn & {
    fullname: string;
    phone: string;
    role: Role;
    confirm: string;
  };

export type UserRegistration = {
  first_name?: string;
  last_name?: string;
  role: Role;
  username?: string;
  password: string;
  phone_number?: string;
  department?: string;
  is_staff?: boolean;
  email?: string;
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
