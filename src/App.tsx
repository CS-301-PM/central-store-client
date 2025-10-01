import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useUserContext } from "./hooks/UserContextHook";

import Layout from "./components/layout/Layout";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import NotFoundPage from "./components/other/NotFoundPage";
import Admin from "./pages/Admin/Admin";
import LoginForm from "./pages/Auth/LoginForm";
import { getRedirectPath } from "./utils/Helper";

import "./App.css";
import Logs from "./pages/Common/Logs";
import Requests from "./pages/Common/Requests";
import StockTablePage from "./pages/Common/Stocks";
import Dashboard from "./pages/Manager/Dashboard";
import { useEffect } from "react";

function App() {
  const { user } = useUserContext();
  const role = user?.user?.role;

  // Redirect when user logs in or role changes
  useEffect(() => {
    if (role) {
      // Navigate(getRedirectPath(role), { replace: true });
    }
  }, [role, Navigate]);

  // If no user session, show login
  if (!user || !user.user) {
    return <LoginForm />;
  }

  // Build routes only when role exists
  if (role) {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          {/* Default redirect for each role */}

          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={getRedirectPath(role)} />} />
            {/* ADMIN */}
            <Route
              path="admin"
              element={
                <ProtectedRoutes role={role} allowedRoles={["ADMIN"]}>
                  <Outlet />
                </ProtectedRoutes>
              }
            >
              <Route path="users" element={<Admin />} />
              <Route path="logs" element={<Logs role={role} />} />
            </Route>

            {/* DEPARTMENT_HOD */}
            <Route
              path="department"
              element={
                <ProtectedRoutes role={role} allowedRoles={["DEPARTMENT_HOD"]}>
                  <Outlet />
                </ProtectedRoutes>
              }
            >
              <Route path="requests" element={<Requests role={role} />} />
              <Route path="logs" element={<Logs role={role} />} />
            </Route>

            {/* CFO */}
            <Route
              path="cfo"
              element={
                <ProtectedRoutes role={role} allowedRoles={["CFO"]}>
                  <Outlet />
                </ProtectedRoutes>
              }
            >
              <Route path="requests" element={<Requests role={role} />} />
              <Route path="logs" element={<Logs role={role} />} />
            </Route>

            {/* STORES_MANAGER */}
            <Route
              path="manager"
              element={
                <ProtectedRoutes role={role} allowedRoles={["STORES_MANAGER"]}>
                  <Outlet />
                </ProtectedRoutes>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="stocks" element={<StockTablePage role={role} />} />
              <Route path="requests" element={<Requests role={role} />} />
              <Route path="logs" element={<Logs role={role} />} />
            </Route>

            {/* PROCUREMENT_OFFICER */}
            <Route
              path="procurement"
              element={
                <ProtectedRoutes
                  role={role}
                  allowedRoles={["PROCUREMENT_OFFICER"]}
                >
                  <Outlet />
                </ProtectedRoutes>
              }
            >
              <Route path="requests" element={<Requests role={role} />} />
              <Route path="stocks" element={<StockTablePage role={role} />} />
              <Route path="logs" element={<Logs role={role} />} />
            </Route>

            {/* STOREKEEPER */}
            <Route
              path="storekeeper"
              element={
                <ProtectedRoutes role={role} allowedRoles={["STOREKEEPER"]}>
                  <Outlet />
                </ProtectedRoutes>
              }
            >
              <Route path="requests" element={<Requests role={role} />} />
              <Route path="stocks" element={<StockTablePage role={role} />} />
              <Route path="logs" element={<Logs role={role} />} />
            </Route>
          </Route>

          {/* catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </>
      )
    );

    return <RouterProvider router={router} />;
  }

  return null; // safe fallback
}

export default App;
