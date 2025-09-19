import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/UserContextHook";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import PieActiveArc from "../../components/other/ReusablePie";
import "./Dashboard.css";

import { FetchedUser } from "../../types/auth";
import { Role } from "../../types/User";
import { useRequestManagementContext } from "../../hooks/useRequestHook";
import { FetchedRequestObj } from "../../types/Request";

function groupRequests(data) {
  const grouped = {
    department: {},
    status: {},
    priority: {},
    item: {},
  };

  data.forEach((req) => {
    // Department
    const dept = req.from?.departmentName || "Unknown";
    grouped.department[dept] = (grouped.department[dept] || 0) + 1;

    // Status
    const status = req.status || "Unknown";
    grouped.status[status] = (grouped.status[status] || 0) + 1;

    // Priority
    const priority = req.priority || "Unknown";
    grouped.priority[priority] = (grouped.priority[priority] || 0) + 1;

    // Item / ItemName
    const item = req.item || req.itemName || "Unknown";
    grouped.item[item] = (grouped.item[item] || 0) + 1;
  });

  // Convert to [{id, value, label}]
  const format = (obj) =>
    Object.entries(obj).map(([key, count]) => ({
      id: key.toUpperCase().replace(/\s+/g, "_"),
      value: count,
      label: key,
    }));

  return {
    department: format(grouped.department),
    status: format(grouped.status),
    priority: format(grouped.priority),
    item: format(grouped.item),
  };
}

// Example usage

type PieType = { id: Role; value: number; label: string };

function Dashboard() {
  const { users, getAllUsers } = useUserContext();
  const { getAllRequests, state } = useRequestManagementContext();
  const { requests, loading } = state;
  const [allUsers, setUsers] = useState<PieType[]>([]);
  const [rows, setRows] = useState<FetchedRequestObj[]>([]);
  const [groupedRequest, setGroupedRequest] = useState({});

  const groupUsers = (users: FetchedUser[]): PieType[] => {
    const roleMap: Record<string, PieType> = {};

    users.forEach((user) => {
      const role = user.role;
      if (!roleMap[role]) {
        const label = role
          .toLowerCase()
          .split("_")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ");

        roleMap[role] = { id: role as Role, value: 0, label };
      }
      roleMap[role].value += 1;
    });

    return Object.values(roleMap);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      const grouped = groupUsers(users);
      setUsers(grouped);
    }
  }, [users]);

  useEffect(() => {
    getAllRequests();
  }, []);

  useEffect(() => {
    setRows(requests);
    const result = groupRequests(requests);
    setGroupedRequest(result);
  }, [requests]);

  const requestStatusData = [
    { id: "approved", value: 48, label: "Approved Requests" },
    { id: "pending", value: 32, label: "Pending Requests" },
    { id: "rejected", value: 12, label: "Rejected Requests" },
    { id: "in_progress", value: 22, label: "Requests In Progress" },
    { id: "waiting_for_supply", value: 18, label: "Waiting for Supply" },
    { id: "fulfilled", value: 25, label: "Fulfilled Requests" },
  ];

  return (
    <div>
      <RequestTableHeader
        title="Dashboard"
        subtitle="Overview of the management."
      />

      <div className="chartsDiv">
        {Object.keys(groupedRequest).map((groupKey) => (
          <div key={groupKey} className="card chartA chart">
            <PieActiveArc
              data={groupedRequest[groupKey]}
              title={groupKey}
              width={400}
              height={400}
            />
          </div>
        ))}

        {/* NEW: Users by Role chart */}
        {allUsers.length > 0 && (
          <div className="card chartE chart">
            <PieActiveArc
              data={allUsers}
              title="Users by Role"
              width={400}
              height={400}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
