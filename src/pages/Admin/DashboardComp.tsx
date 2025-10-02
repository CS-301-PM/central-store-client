// components/DashboardComp.jsx
import React, { useState } from "react";
import {
  Activity,
  Package,
  Clock,
  Calendar,
  TrendingUp,
  Shield,
  LogIn,
  Edit,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

function DashboardComp({ logs = {} }) {
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getActionStyle = (actionType) => {
    const styles = {
      LOGIN: {
        icon: LogIn,
        color: "blue",
        bg: "bg-blue-100",
        text: "text-blue-800",
        border: "border-blue-200",
      },
      STOCK_UPDATED: {
        icon: Edit,
        color: "purple",
        bg: "bg-purple-100",
        text: "text-purple-800",
        border: "border-purple-200",
      },
      REQUEST_CREATED: {
        icon: Package,
        color: "green",
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
      },
      OTHER: {
        icon: Activity,
        color: "red",
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
      },
    };
    return styles[actionType] || styles.OTHER;
  };

  const getRoleBadge = (role) => {
    const badges = {
      ADMIN: "bg-red-100 text-red-800 border-red-200",
      STORES_MANAGER: "bg-blue-100 text-blue-800 border-blue-200",
      DEPARTMENT_MANAGER: "bg-green-100 text-green-800 border-green-200",
      USER: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return badges[role] || badges.USER;
  };

  const actionTypeData = (logs.logsByActionType || []).map((item) => ({
    name: item.action_type.replace("_", " "),
    value: item.count,
    color: getActionStyle(item.action_type).color,
  }));

  const entityTypeData = (logs.logsByEntityType || []).map((item) => ({
    name: item.entity_type,
    value: item.count,
  }));

  const activityTimeline = (logs.recentLogs || []).reduce((acc, log) => {
    const hour = new Date(log.created_at).getHours();
    const timeLabel = `${hour}:00`;
    if (!acc[timeLabel]) acc[timeLabel] = { time: timeLabel, count: 0 };
    acc[timeLabel].count++;
    return acc;
  }, {});

  const timelineData = Object.values(activityTimeline).sort(
    (a, b) => parseInt(a.time) - parseInt(b.time)
  );

  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

  const filteredLogs = (logs.recentLogs || []).filter((log) => {
    const matchesFilter =
      filterType === "all" || log.action_type === filterType;
    const matchesSearch =
      searchTerm === "" ||
      (log.description &&
        log.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      log.user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user?.last_name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full h-full">
        {/* Header */}
        {/* <div className="mb-8">
          <div className="flex items-center mb-2">
            <Activity className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-slate-800">Activity Logs</h1>
          </div>
          <p className="text-slate-600">
            Monitor and track all system activities in real-time
          </p>
        </div> */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">
                  Total Activities
                </p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {logs.totalLogs || 0}
                </h3>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <Activity className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">
                  Last 24 Hours
                </p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {logs.last24h || 0}
                </h3>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">
                  Last 7 Days
                </p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {logs.last7Days || 0}
                </h3>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-600" /> Activities by
              Type
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={actionTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {actionTypeData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-purple-600" /> Activities by
              Entity
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={entityTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" /> Activity
            Timeline
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default DashboardComp;
