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

// const users: FetchedUser[] = [
//   {
//     id: "1",
//     employeeId: "UC0000001",
//     firstName: "John",
//     lastName: "Doe",
//     email: "john.doe@company.com",
//     role: "ADMIN",
//     department: "finance",
//     blockchainId: "bc-101",
//     status: "active",
//   },
//   {
//     id: "2",
//     employeeId: "UC0000002",
//     firstName: "Alice",
//     lastName: "Smith",
//     email: "alice.smith@company.com",
//     role: "STORES_MANAGER",
//     department: "human-resources",
//     blockchainId: "bc-102",
//     status: "active",
//   },
//   {
//     id: "3",
//     employeeId: "UC0000003",
//     firstName: "Michael",
//     lastName: "Brown",
//     email: "michael.brown@company.com",
//     role: "PROCUREMENT_OFFICER",
//     department: "ict",
//     blockchainId: "bc-103",
//     status: "active",
//   },
//   {
//     id: "4",
//     employeeId: "UC0000004",
//     firstName: "Sophia",
//     lastName: "Johnson",
//     email: "sophia.johnson@company.com",
//     role: "PROCUREMENT_OFFICER",
//     department: "library",
//     blockchainId: "bc-104",
//     status: "inactive",
//   },
//   {
//     id: "5",
//     employeeId: "UC0000005",
//     firstName: "David",
//     lastName: "Lee",
//     email: "david.lee@company.com",
//     role: "DEPARTMENT_DEAN",
//     department: "human-resources",
//     blockchainId: "bc-105",
//     status: "active",
//   },
// ];

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialAuthUserState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const checkUserAccessStatus = async () => {
      setIsLoading(true);
      try {
        const URL = `${import.meta.env.VITE_SERVER}/api/auth/signedin/`;
        const res = await fetch(URL, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const user = await res.json();

        dispatch({
          type: "SIGNIN",
          payload: user,
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

  const signIn = async (userSignIn: { username: string; password: string }) => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}/api/auth/login/`;
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
    console.log(user);
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
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}/api/user/update`;
    const res = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    // const user = await res.json();
    dispatch({ type: "UPDATE_USER", payload: user });
    setIsLoading(false);
  };

  const getAllUsers = async (): Promise<FetchedUser[]> => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}/api/user/all`;
    const res = await fetch(URL, {
      method: "GET", // or "POST" depending on your backend
      credentials: "include", // if you’re using cookies/sessions
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const users = await res.json();
    setError(null);
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
    const URL = `${import.meta.env.VITE_SERVER}/api/auth/register/`;
    const response = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      setError(await response.json());
      setIsLoading(false);
      return;
    }
    const users = await response.json();
    dispatch({ type: "ADD_USER", payload: users });
  };

  const deleteUser = async (userId: string) => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}/api/user/delete`;
    const response = await fetch(URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      setError(await response.json());
      setIsLoading(false);
      return;
    }
    dispatch({ type: "DELETE_USER", payload: userId });
    setIsLoading(false);
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
        // departments: state.departments,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
