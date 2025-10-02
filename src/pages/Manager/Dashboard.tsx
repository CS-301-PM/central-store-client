import { useEffect } from "react";
import { useOverviewContext } from "../../hooks/useOverviewContext";
import DashBoardComp from "./DashBoardComp";
import RequestTableHeader from "../../components/other/RequestTableHeader";

function Dashboard() {
  const {
    // logs,
    stocks,
    requests,
    approvals,
    // getAnalyticsLogs,
    getAnalyticsStocks,
    getAnalyticsRequests,
    getAnalyticsApprovals,
    isLoading,
    error,
  } = useOverviewContext();

  // Fetch all analytics on mount
  useEffect(() => {
    // getAnalyticsLogs();
    getAnalyticsStocks();
    getAnalyticsRequests();
    getAnalyticsApprovals();
  }, [
    // getAnalyticsLogs,
    getAnalyticsStocks,
    getAnalyticsRequests,
    getAnalyticsApprovals,
  ]);

  // console.log(stocks, requests, approvals);

  if (isLoading) return <div>Loading analytics...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="m-3">
      <RequestTableHeader
        title="  Inventory Dashboard"
        subtitle="Real-time overview of your inventory management system"
      ></RequestTableHeader>
      <DashBoardComp
        stocks={stocks}
        requests={requests}
        approvals={approvals}
      />
    </div>
  );
}

export default Dashboard;
