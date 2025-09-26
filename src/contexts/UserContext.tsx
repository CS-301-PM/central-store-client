import { useReducer, ReactNode, useEffect, useState } from "react";
import {
  ErrorResponse,
  UserSignIn,
  UserSignUp,
  AuthUserState,
  FetchedUser,
} from "../types/auth";

import { userReducer } from "../reducers/UserReducer";
import { UserContext } from "../hooks/UserContextHook";
import { UserRegistration } from "../types/User";
import { DepartmentType } from "../types/Departments";

const initialAuthUserState: AuthUserState = {
  user: null,
  users: null,
  departments: null,
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialAuthUserState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const checkUserAccessStatus = async () => {
      setIsLoading(true);
      try {
        const session = JSON.parse(localStorage.getItem("user") || "{}");
        const accessToken = session.token;

        // const user = session.user;
        const URL = `${import.meta.env.VITE_SERVER}api/user/signed`;

        const response = await fetch(URL, {
          method: "GET",
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
        dispatch({
          type: "SIGNIN",
          payload: user,
        });
        setIsLoading(false);
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
    const URL = `${import.meta.env.VITE_SERVER}api/user/signup`;
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
    const user: FetchedUser = await response.json();
    dispatch({ type: "SIGNUP", payload: user });
    setIsLoading(false);
  };

  const signIn = async (userSignIn: UserSignIn) => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}api/user/signin`;
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

    if (user.role == "") {
      user.role = "ADMIN";
    }
    user.role = user.role.toUpperCase();
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
    // const URL = `${import.meta.env.VITE_SERVER}/`;
    // dispatch({ type: "DELETE", payload: userDeleteAccount });
  };

  const updateUser = async (user: FetchedUser) => {
    setIsLoading(true);

    const URL = `${import.meta.env.VITE_SERVER}api/user/modify/${user.id}`;
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;

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

      const res = await response.json();
      dispatch({ type: "UPDATE_USER", payload: res.user });
      return res.user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getAllUsers = async (): Promise<FetchedUser[]> => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}api/user/all`;
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;
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
    const rawUsers = await response.json();
    const users: FetchedUser[] = rawUsers.users;
    dispatch({ type: "GET_ALL_USERS", payload: users });
    setIsLoading(false);
    return users;
  };

  const listDepartments = async (): Promise<DepartmentType[]> => {
    setIsLoading(true);
    const URL = `${import.meta.env.VITE_SERVER}api/departments/all`;
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;
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
    const departments: DepartmentType = await response.json();
    dispatch({ type: "LIST_DEPARTMENTS", payload: departments });
    setIsLoading(false);
    return departments;
  };

  const addUser = async (userToAdd: UserRegistration) => {
    const URL = `${import.meta.env.VITE_SERVER}api/user/signup`;
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;

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

      const res = await response.json();
      dispatch({ type: "ADD_USER", payload: res.user });
      // return data;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  };

  const deleteUser = async (userId: string) => {
    const URL = `${import.meta.env.VITE_SERVER}api/user/delete/${userId}`;
    const session = JSON.parse(localStorage.getItem("user") || "{}");
    const accessToken = session.token;

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
  const newDepartment = async (department: DepartmentType) => {
    // const URL = `${import.meta.env.VITE_SERVER}/api/department/add`;
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
        departments: state?.departments,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
