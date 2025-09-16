export type Department =
  | "registry"
  | "finance"
  | "human-resources"
  | "procurement"
  | "library"
  | "ict";

import { Role } from "./User";

export interface FetchedUser {
  id?: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  email?: string;
  employeeId?: string;
  department?: Department | "";
  status?: "active" | "inactive";
  blockchainId?: string;
}

export type AuthUserState = {
  user: FetchedUser | null;
  users?: FetchedUser[] | null;
  departments?:
    | {
        departmentId?: string;
        departmentName?: string;
      }[]
    | null;
};

export type UserSignIn = {
  employeeId: string;
  email: string;
};

export type UserSignUp = {} & UserSignIn & {
    firstName: string;
    lastName: string;
    role: Role;
  };

type ErrorBody = {
  message: string;
  type: string;
  value: string;
};

export type ErrorResponse = {
  errors: {
    [
      key: string | "employeeId" | "firstName" | "lastName" | "email" | "role"
    ]: ErrorBody;
  };
};

//
