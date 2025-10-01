export type Role =
  | "STORES_MANAGER"
  | "PROCUREMENT_OFFICER"
  | "DEPARTMENT_HOD"
  | "CFO"
  | "STOREKEEPER"
  | "ADMIN";

export const roleOptionsForUserRegistration: {
  value: Role;
  label: string;
}[] = [
  // { value: "ADMIN", label: "Admin" },
  // { value: "STORES_MANAGER", label: "Stores Manager" },
  // { value: "PROCUREMENT_OFFICER", label: "Procurement Officer" },
  // { value: "CFO", label: "Chief Financial Officer" },
  { value: "STOREKEEPER", label: "Storekeeper" },
  { value: "DEPARTMENT_HOD", label: "Department" },
];

export const roleOptions: { value: Role | "All"; label: string }[] = [
  { value: "All", label: "All Roles" },
  { value: "ADMIN", label: "Admin" },
  { value: "STORES_MANAGER", label: "Stores Manager" },
  { value: "PROCUREMENT_OFFICER", label: "Procurement Officer" },
  { value: "CFO", label: "Chief Financial Officer" },
  ...roleOptionsForUserRegistration,
];

export type UserSignIn = {
  username?: string;
  password?: string;
};

// export type UserSignUp = {} & UserSignIn & {};

export type UserRegistration = {
  first_name?: string;
  last_name?: string;
  role: Role;
  username?: string;
  password: string;
  department?: string;
  email?: string;
};

//export type User = {
//   id?: string;
//   fullname?: string;
//   employeeNumber?: string;
//   role: Role;
// };

// export type UserState = {
//   user: User | null;
// };
