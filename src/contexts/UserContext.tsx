import { useReducer, ReactNode, useEffect, useState } from "react";
import {
  ErrorResponse,
  UserSignIn,
  UserSignUp,
  AuthUserState,
  FetchedUser,
} from "../types/auth";
// import {} from "../../../";

import { userReducer } from "../reducers/UserReducer";
import { UserContext } from "../hooks/UserContextHook";
import { UserRegistration } from "../types/User";

const initialAuthUserState: AuthUserState = {
  user: null,
  users: null,
  departments: null,
};

const users: FetchedUser[] = [
  {
    id: "1",
    employeeId: "UC0000001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    role: "admin",
    department: "finance",
    blockchainId: "bc-101",
    status: "active",
  },
  {
    id: "2",
    employeeId: "UC0000002",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@company.com",
    role: "manager",
    department: "human-resources",
    blockchainId: "bc-102",
    status: "active",
  },
  {
    id: "3",
    employeeId: "UC0000003",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@company.com",
    role: "storekeeper",
    department: "ict",
    blockchainId: "bc-103",
    status: "active",
  },
  {
    id: "4",
    employeeId: "UC0000004",
    firstName: "Sophia",
    lastName: "Johnson",
    email: "sophia.johnson@company.com",
    role: "storekeeper",
    department: "library",
    blockchainId: "bc-104",
    status: "inactive",
  },
  {
    id: "5",
    employeeId: "UC0000005",
    firstName: "David",
    lastName: "Lee",
    email: "david.lee@company.com",
    role: "department_hod",
    department: "human-resources",
    blockchainId: "bc-105",
    status: "active",
  },
];

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialAuthUserState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const checkUserAccessStatus = async () => {
      setIsLoading(true);
      try {
        const URL = `${import.meta.env.VITE_SERVER}/api/auth/signedin`;
        dispatch({
          type: "SIGNIN",
          payload: {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            employeeId: "12345678",
            department: "registry",
            role: "ADMIN",
            blockchainId: "0x1234567890abcdef",
          },
        });
      } catch {
        dispatch({ type: "SIGNOUT" });
        setError({
          errors: {
            general: {
              message: "Failed to check user access status.",
              type: "server",
              value: "",
            },
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAccessStatus();
  }, []);

  const signUp = async (userSignUp: UserSignUp) => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}/api/auth/signup`;
    const response = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userSignUp),
    });

    if (!response.ok) {
      setError(await response.json());
      setIsLoading(false);
      return;
    }
    setError(null);
    const user = await response.json();
    dispatch({ type: "SIGNUP", payload: user });
    setIsLoading(false);
  };

  const signIn = async (userSignIn: UserSignIn) => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}/api/auth/signin`;
    const response = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userSignIn),
    });

    if (!response.ok) {
      setError(await response.json());
      setIsLoading(false);
      return;
    }
    setError(null);
    const user = await response.json();
    dispatch({ type: "SIGNIN", payload: user });
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    dispatch({ type: "SIGNOUT" });
    setIsLoading(false);
  };

  const deleteAccount = async (userDeleteAccount: AuthUserState) => {
    const URL = `${import.meta.env.VITE_SERVER}/api/user/delete`;
    dispatch({ type: "DELETE", payload: userDeleteAccount });
  };

  const updateUser = async (user: FetchedUser) => {
    const URL = `${import.meta.env.VITE_SERVER}/api/user/update`;
    dispatch({ type: "UPDATE_USER", payload: user });
  };

  const getAllUsers = async (): Promise<FetchedUser[]> => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}/api/user/all`;
    // const response = await fetch(URL, {
    //   method: "GET",
    //   credentials: "include",
    //   headers: { "Content-Type": "application/json" },
    // });

    // if (!response.ok) {
    //   setError(await response.json());
    //   setIsLoading(false);
    //   return [];
    // }

    setError(null);
    // const users: FetchedUser[] = await response.json();

    dispatch({ type: "GET_ALL_USERS", payload: users });
    setIsLoading(false);
    return users;
  };

  const listDepartments = async (): Promise<string[]> => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}/api/department/all`;
    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      setError(await response.json());
      setIsLoading(false);
      return [];
    }
    setError(null);
    const departments: string[] = await response.json();
    dispatch({ type: "LIST_DEPARTMENTS", payload: departments });
    setIsLoading(false);
    return departments;
  };

  const newDepartment = async (department: string) => {
    const URL = `${import.meta.env.VITE_SERVER}/api/department/new`;
    dispatch({ type: "NEW_DEPARTMENT", payload: department });
  };

  const addUser = async (user: UserRegistration) => {
    const URL = `${import.meta.env.VITE_SERVER}/api/user/new`;
    dispatch({ type: "ADD_USER", payload: user });
  };

  const deleteUser = async (userId: string) => {
    const URL = `${import.meta.env.VITE_SERVER}/api/user/delete`;
    dispatch({ type: "DELETE_USER", payload: userId });
  };

  return (
    <UserContext.Provider
      value={{
        user: state,
        signUp,
        signIn,
        signOut,
        deleteAccount,
        updateUser,
        getAllUsers,
        listDepartments,
        newDepartment,
        deleteUser,
        addUser,
        isLoading,
        error,
        users: state.users,
        departments: state.departments,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
