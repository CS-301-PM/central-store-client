import { Link } from "react-router-dom";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import AppButton from "../../components/other/AppButton";
import "./Dashboard.css";
import PieActiveArc from "../../components/other/ReusablePie";

function Dashboard() {
  // Example: Request status summary
  const requestStatusData = [
    { id: "approved", value: 48, label: "Approved Requests" },
    { id: "pending", value: 32, label: "Pending Requests" },
    { id: "rejected", value: 12, label: "Rejected Requests" },
    { id: "in_progress", value: 22, label: "Requests In Progress" },
    { id: "waiting_for_supply", value: 18, label: "Waiting for Supply" },
    { id: "fulfilled", value: 25, label: "Fulfilled Requests" },
  ];

  // Example: Requests by department
  const departmentRequestsData = [
    { id: "finance", value: 40, label: "Finance" },
    { id: "hr", value: 28, label: "Human Resources" },
    { id: "ict", value: 35, label: "ICT" },
    { id: "library", value: 15, label: "Library" },
    { id: "engineering", value: 18, label: "Engineering" },
  ];

  // Example: Fulfilled vs pending requests
  const fulfillmentData = [
    { id: "fulfilled", value: 25, label: "Fulfilled" },
    { id: "pending", value: 32, label: "Pending" },
    { id: "waiting_for_supply", value: 18, label: "Waiting for Supply" },
  ];

  // Example: Rejected requests reasons
  const rejectedReasonsData = [
    { id: "budget", value: 8, label: "Budget Constraints" },
    { id: "invalid", value: 4, label: "Invalid Request" },
    { id: "duplicate", value: 5, label: "Duplicate Request" },
  ];

  return (
    <div>
      <RequestTableHeader
        title="Dashboard"
        subtitle="Overview of the management."
      />

      <div className="chartsDiv">
        <div className="card chartA chart">
          <PieActiveArc
            data={requestStatusData}
            title="Requests by Status"
            width={400}
            height={400}
          />
        </div>

        <div className="card chartB chart">
          <PieActiveArc
            data={departmentRequestsData}
            title="Requests by Department"
            width={400}
            height={400}
          />
        </div>

        <div className="card chartC chart">
          <PieActiveArc
            data={fulfillmentData}
            title="Fulfillment Overview"
            width={400}
            height={400}
          />
        </div>

        <div className="card chartD chart">
          <PieActiveArc
            data={rejectedReasonsData}
            title="Rejected Requests Reasons"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
