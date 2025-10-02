import { useEffect } from "react";
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

import Logs from "./pages/Common/Logs";
import Requests from "./pages/Common/Requests";
import StockTablePage from "./pages/Common/Stocks";
import Dashboard from "./pages/Manager/Dashboard";
import Pendings from "./pages/Requests/Pendings";
import All from "./pages/Requests/All";
import Approved from "./pages/Requests/Approved";
import Rejected from "./pages/Requests/Rejected";
import AdminDashboard from "./pages/Admin/Dashboard";

const requestRoutes = (
  <Route path="requests" element={<Requests />}>
    <Route index element={<All />} />
    <Route path="pending" element={<Pendings />} />
    <Route path="approved" element={<Approved />} />
    <Route path="rejected" element={<Rejected />} />
  </Route>
);

const roleRoutes = (
  role: string,
  allowedRoles: string[],
  children: React.ReactNode
) => (
  <Route
    path={role.toLowerCase()}
    element={
      <ProtectedRoutes role={role} allowedRoles={allowedRoles}>
        <Outlet />
      </ProtectedRoutes>
    }
  >
    {children}
  </Route>
);

function App() {
  const { user } = useUserContext();
  const role = user?.user?.role;

  // Redirect when user logs in or role changes
  useEffect(() => {
    if (role) {
      // Navigate(getRedirectPath(role), { replace: true });
    }
  }, [role]);

  // If no user session, show login
  if (!user || !user.user) {
    return <LoginForm />;
  }

  // Build routes only when role exists
  if (role) {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to={getRedirectPath(role)} />} />

            {/* ADMIN */}
            {roleRoutes(
              "admin",
              ["ADMIN"],
              <>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<Admin />} />
                <Route path="logs" element={<Logs role={role} />} />
              </>
            )}

            {/* DEPARTMENT_HOD */}
            {roleRoutes(
              "department",
              ["DEPARTMENT_HOD"],
              <>
                {requestRoutes}
                <Route path="logs" element={<Logs role={role} />} />
              </>
            )}

            {/* CFO */}
            {roleRoutes(
              "cfo",
              ["CFO"],
              <>
                {requestRoutes}
                <Route path="logs" element={<Logs role={role} />} />
              </>
            )}

            {/* STORES_MANAGER */}
            {roleRoutes(
              "manager",
              ["STORES_MANAGER"],
              <>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="stocks" element={<StockTablePage role={role} />} />
                {requestRoutes}
                <Route path="logs" element={<Logs role={role} />} />
              </>
            )}

            {/* PROCUREMENT_OFFICER */}
            {roleRoutes(
              "procurement",
              ["PROCUREMENT_OFFICER"],
              <>
                {requestRoutes}
                <Route path="stocks" element={<StockTablePage role={role} />} />
                <Route path="logs" element={<Logs role={role} />} />
              </>
            )}

            {/* STOREKEEPER */}
            {roleRoutes(
              "storekeeper",
              ["STOREKEEPER"],
              <>
                {requestRoutes}
                <Route path="stocks" element={<StockTablePage role={role} />} />
                <Route path="logs" element={<Logs role={role} />} />
              </>
            )}
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
