import { useReducer, ReactNode, useEffect, useState } from "react";
import {
  ErrorResponse,
  UserSignIn,
  UserSignUp,
  AuthUserState,
  FetchedUser,
} from "../types/auth";
import axios from "axios";

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
    role: "ADMIN",
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
    role: "STORES_MANAGER",
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
    role: "PROCUREMENT_OFFICER",
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
    role: "PROCUREMENT_OFFICER",
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
    role: "DEPARTMENT_DEAN",
    department: "human-resources",
    blockchainId: "bc-105",
    status: "active",
  },
];

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialAuthUserState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const preUrl = "/api/auth";
  useEffect(() => {
    const checkUserAccessStatus = async () => {
      setIsLoading(true);
      try {
        const session = JSON.parse(localStorage.getItem("user") || "{}");
        const accessToken = session.access;
        // const user = session.user;
        const URL = `${import.meta.env.VITE_SERVER}${preUrl}/check-auth/`;

        const response = await fetch(URL, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          return;
        }

        const res = await response.json();
        const user = res.user;

        if (user.role == "") {
          user.role = "ADMIN";
        }

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

  const signIn = async (userSignIn: UserSignIn) => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}${preUrl}/login/`;
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

    const res = await response.json();
    // const accessToken = res.access;
    const user = res.user;

    // localStorage.setItem("accessToken", accessToken);
    // localStorage.setItem("user", res.JSON.stringify());
    localStorage.setItem("user", JSON.stringify(res));

    dispatch({ type: "SIGNIN", payload: user });
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    dispatch({ type: "SIGNOUT" });
    setIsLoading(false);
  };

  const deleteAccount = async (userDeleteAccount: AuthUserState) => {
    const URL = `${import.meta.env.VITE_SERVER}/`;
    dispatch({ type: "DELETE", payload: userDeleteAccount });
  };

  const updateUser = async (user: FetchedUser) => {
    setIsLoading(true);

    const URL = `${import.meta.env.VITE_SERVER}${preUrl}/users/${user.id}/`;
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.access;

    try {
      const response = await fetch(URL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.status}`);
      }

      const data = await response.json();

      dispatch({ type: "UPDATE_USER", payload: data });
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getAllUsers = async (): Promise<FetchedUser[]> => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}${preUrl}/users/`;
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.access;
    const response = await fetch(URL, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setError(await response.json());
      setIsLoading(false);
      return [];
    }

    setError(null);
    const users: FetchedUser[] = await response.json();
    dispatch({ type: "GET_ALL_USERS", payload: users });
    setIsLoading(false);
    return users;
  };

  const listDepartments = async (): Promise<string[]> => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}/api/department/all`;
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.access;
    // const user = session.user;
    const response = await fetch(URL, {
      method: "GET",
      // credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // "Content-Type": "application/json",
      },
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
  const addUser = async (userToAdd: UserRegistration) => {
    const URL = `${import.meta.env.VITE_SERVER}${preUrl}/register/`;
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.access;

    try {
      const response = await fetch(URL, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToAdd),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      dispatch({ type: "ADD_USER", payload: data });
      return data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  const deleteUser = async (userId: string) => {
    const URL = `${import.meta.env.VITE_SERVER}${preUrl}/users/${userId}/`;
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.access;

    try {
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status}`);
      }

      let data = null;
      if (response.status !== 204) {
        data = await response.json(); // success message maybe
      }

      dispatch({ type: "DELETE_USER", payload: userId });
      return data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };
  const newDepartment = async (department: string) => {
    const URL = `${import.meta.env.VITE_SERVER}/api/department/new`;
    dispatch({ type: "NEW_DEPARTMENT", payload: department });
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
