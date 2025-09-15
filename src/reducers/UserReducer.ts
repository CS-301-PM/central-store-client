import { FetchedUser, AuthUserState } from "../types/auth";
import { UserRegistration } from "../types/User";

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const SIGNOUT = "SIGNOUT";
export const DELETE = "DELETE";
export const HAS_ADMIN = "HAS_ADMIN";
export const UPDATE_USER = "UPDATE_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const LIST_DEPARTMENTS = "LIST_DEPARTMENTS";
export const NEW_DEPARTMENT = "NEW_DEPARTMENT";
export const DELETE_USER = "DELETE_USER";
export const ADD_USER = "ADD_USER";

type AuthActionTypes =
  | { type: typeof SIGNUP; payload: FetchedUser }
  | { type: typeof SIGNIN; payload: FetchedUser }
  | { type: typeof SIGNOUT }
  | { type: typeof DELETE; payload: AuthUserState }
  | { type: typeof HAS_ADMIN; payload: boolean }
  | { type: typeof UPDATE_USER; payload: FetchedUser }
  | { type: typeof GET_ALL_USERS; payload: FetchedUser[] }
  | { type: typeof LIST_DEPARTMENTS; payload: string[] }
  | { type: typeof NEW_DEPARTMENT; payload: string }
  | { type: typeof DELETE_USER; payload: string }
  | { type: typeof ADD_USER; payload: FetchedUser };

export const userReducer = (
  state: AuthUserState,
  action: AuthActionTypes
): AuthUserState => {
  switch (action.type) {
    case SIGNUP:
      // For now we store user in localStorage for persistence
      return {
        ...state,
        user: action.payload,
      };
    case SIGNIN:
      // For now we store user in localStorage for persistence
      return {
        ...state,
        user: action.payload,
      };
    case SIGNOUT:
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };
    case DELETE:
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };
    case HAS_ADMIN:
      return {
        ...state,
      };
    case UPDATE_USER:
      return {
        ...state,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case LIST_DEPARTMENTS:
      return {
        ...state,
        // departments: action.payload,
      };
    case NEW_DEPARTMENT:
      return {
        ...state,
        departments: state.departments,
      };
    case DELETE_USER:
      return {
        ...state,
        users: (state.users ?? []).filter((user) => user.id !== action.payload),
      };
    case ADD_USER:
      return {
        ...state,
        users: [...(state.users ?? []), action.payload],
      };
    default:
      return state;
  }
};
