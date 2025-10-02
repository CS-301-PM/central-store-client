import { useEffect } from "react";
import { useOverviewContext } from "../../hooks/useOverviewContext";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import DashboardComp from "./DashboardComp";
import { Activity } from "lucide-react";

function AdminDashboard() {
  const { logs, getAnalyticsLogs, isLoading, error } = useOverviewContext();

  useEffect(() => {
    getAnalyticsLogs();
  }, [getAnalyticsLogs]);

  if (isLoading) return <div className="m-5">Loading analytics...</div>;
  if (error) return <div className="m-5">Error: {error}</div>;

  return (
    <div className="m-3">
      <RequestTableHeader
        children={<Activity className="w-10 h-10 text-blue-600 mr-3" />}
        title="Activity Logs"
        subtitle="Monitor and track all system activities in real-time"
      />

      <DashboardComp logs={logs} />
    </div>
  );
}

export default AdminDashboard;
