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
// import Loading from "./components/other/Loading";
import Admin from "./pages/Admin/Admin";
// import UserRegistration from "./pages/Auth/UserRegistration";
import LoginForm from "./pages/Auth/LoginForm";
import { getRedirectPath } from "./utils/Helper";

import "./App.css";
import Logs from "./pages/Common/Logs";
import Requests from "./pages/Common/Requests";
// import NewRequest from "./pages/Department/NewRequest";
import StockTablePage from "./pages/Common/Stocks";
import Dashboard from "./pages/Manager/Dashboard";
import Funds from "./pages/CFO/Funds";
// Mock authenticated user
function App() {
  const { user } = useUserContext();
  const role = user?.user?.role;
  if (user && !user.user) {
    return <LoginForm />;
  }

  // if (isLoading) {
  //   return (
  //     <div className="loadingParentDiv">
  //       <Loading />
  //     </div>
  //   );
  // }

  if (role) {
    <Navigate to={getRedirectPath(role)} replace />;
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          {user && user.user && role && (
            <Route path="/" element={<Layout />}>
              {/* ADMIN */}
              <Route
                path="admin"
                element={
                  <ProtectedRoutes role={role} allowedRoles={["ADMIN"]}>
                    <Outlet />
                  </ProtectedRoutes>
                }
              >
                <Route path="users" element={<Admin role={role} />} />
                {/* <Route
                  path="new_user"
                  element={<UserRegistration role={role} />}
                /> */}
                <Route path="logs" element={<Logs role={role} />} />
              </Route>

              {/* DEPARTMENT_DEAN */}
              <Route
                path="department"
                element={
                  <ProtectedRoutes
                    role={role}
                    allowedRoles={["DEPARTMENT_DEAN"]}
                  >
                    <Outlet />
                  </ProtectedRoutes>
                }
              >
                <Route path="requests" element={<Requests role={role} />} />
                {/* <Route path="new_request" element={<NewRequest />} /> */}
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
                {/* <Route index element={<Navigate to="funds" replace />} /> */}
                <Route path="funds" element={<Funds />} />
                <Route path="logs" element={<Logs role={role} />} />
              </Route>

              {/* STORES_MANAGER (Central Store) */}
              <Route
                path="manager"
                element={
                  <ProtectedRoutes
                    role={role}
                    allowedRoles={["STORES_MANAGER"]}
                  >
                    <Outlet />
                  </ProtectedRoutes>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="stocks" element={<StockTablePage role={role} />} />
                <Route path="requests" element={<Requests role={role} />} />
                {/* <Route path="users" element={<Admin role={role} />} />
                <Route
                  path="new_user"
                  element={<UserRegistration role={role} />}
                /> */}
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
                {/* <Route index element={<div>Dashboard</div>} /> */}
                <Route path="requests" element={<Requests role={role} />} />
                <Route path="stocks" element={<StockTablePage role={role} />} />
                <Route path="logs" element={<Logs role={role} />} />
              </Route>

              {/* Default redirect based on role */}
              <Route index element={<Navigate to={getRedirectPath(role)} />} />
            </Route>
          )}
          <Route path="*" element={<NotFoundPage />} />
        </>
      )
    );

    return <RouterProvider router={router} />;
  }
}

export default App;
