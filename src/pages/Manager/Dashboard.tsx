import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/UserContextHook";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import PieActiveArc from "../../components/other/ReusablePie";
import "./Dashboard.css";

import { FetchedUser } from "../../types/auth";
import { Role } from "../../types/User";
import { useRequestManagementContext } from "../../hooks/useRequestHook";
import { FetchedRequestObj } from "../../types/Request";

type PieType = { id: string; value: number; label: string };

function groupRequests(
  data: FetchedRequestObj[],
  role: Role | undefined
): Record<string, PieType[]> {
  const grouped = {
    department: {} as Record<string, number>,
    status: {} as Record<string, number>,
    priority: {} as Record<string, number>,
    item: {} as Record<string, number>,
  };

  data.forEach((req) => {
    const dept = req.department || "Unknown";
    grouped.department[dept] = (grouped.department[dept] || 0) + 1;

    const status = req.status || "Unknown";
    grouped.status[status] = (grouped.status[status] || 0) + 1;

    const priority = req.priority || "Unknown";
    grouped.priority[priority] = (grouped.priority[priority] || 0) + 1;

    const item = req.item || req.item || "Unknown";
    grouped.item[item] = (grouped.item[item] || 0) + 1;
  });

  const format = (obj: Record<string, number>) =>
    Object.entries(obj).map(([key, count]) => ({
      id: key.toUpperCase().replace(/\s+/g, "_"),
      value: count,
      label: key,
    }));

  return {
    ...(role === "ADMIN" && { department: format(grouped.department) }),
    status: format(grouped.status),
    priority: format(grouped.priority),
    item: format(grouped.item),
  };
}

function Dashboard() {
  const { user, users, getAllUsers } = useUserContext();
  const role = user?.user?.role;
  const { getAllRequests, state } = useRequestManagementContext();
  const { requests } = state;

  const [allUsers, setUsers] = useState<PieType[]>([]);
  const [rows, setRows] = useState<FetchedRequestObj[]>([]);
  const [groupedRequest, setGroupedRequest] = useState<
    Record<string, PieType[]>
  >({});

  const groupUsers = (users: FetchedUser[]): PieType[] => {
    const roleMap: Record<string, PieType> = {};
    users.forEach((user) => {
      const r = user.role;
      if (!roleMap[r]) {
        const label = r
          .toLowerCase()
          .split("_")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ");
        roleMap[r] = { id: r, value: 0, label };
      }
      roleMap[r].value += 1;
    });
    return Object.values(roleMap);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      setUsers(groupUsers(users));
    }
  }, [users]);

  useEffect(() => {
    getAllRequests();
  }, []);

  useEffect(() => {
    setRows(requests);
    setGroupedRequest(groupRequests(requests, role));
  }, [requests, role]);

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

        {role === "ADMIN" && allUsers.length > 0 && (
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
