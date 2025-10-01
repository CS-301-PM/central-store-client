import { useEffect } from "react";
import { useUserContext } from "../../hooks/UserContextHook";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import { useRequestManagementContext } from "../../hooks/useRequestHook";
import { useStockManagementContext } from "../../hooks/useStockManagementContext";

import "./Dashboard.css";
function Dashboard() {
  const { user, users, getAllUsers } = useUserContext();
  const role = user?.user?.role;
  const { getAllRequests, state, dashboardRequest } =
    useRequestManagementContext();
  const { requests, requestDashboard } = state;
  const { dashBoardStock, state: stockState } = useStockManagementContext();
  const { stockDashboard } = stockState;

  useEffect(() => {
    getAllRequests();
    getAllUsers();
    dashBoardStock();
    dashboardRequest();
  }, []);

  useEffect(() => {
    console.log(stockDashboard);
    console.log(requestDashboard);
  }, []);

  return (
    <>
      <div>
        <RequestTableHeader
          title="Dashboard"
          subtitle="Overview of the management."
        />
      </div>
      <div className="">Analytics</div>
    </>
  );
}

export default Dashboard;
