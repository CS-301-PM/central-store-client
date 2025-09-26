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
  last_name?: string;
  first_name?: string;
  email?: string;
  username?: string;
  department?: Department | "";
  blockchain_address?: string;
  created_at?: string;
  updated_at?: string;
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
  username?: string;
  email?: string;
  password?: string;
};

export type UserSignUp = {
  // id?: string;
  role: Role;
  last_name?: string;
  first_name?: string;
  email?: string;
  username?: string;
  department?: Department | "";
  // blockchain_address?: string;
  // created_at?: string;
  // updated_at?: string;
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
      key: string | "employeeId" | "firstName" | "lastName" | "email" | "role"
    ]: ErrorBody;
  };
};

//
