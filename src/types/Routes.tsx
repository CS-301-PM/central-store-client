// dashboardRoutes.ts
import {
  MdDashboard,
  MdPeople,
  MdInventory,
  MdListAlt,
  MdEditNotifications,
} from "react-icons/md";
import { Route } from "react-router-dom";
import {
  FaMoneyCheckAlt,
  FaPlusSquare,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import { TbLogs } from "react-icons/tb";

import { Role } from "./User";

export type Route = {
  to: string;
  value: string;
  label: string;
  icon: React.ReactNode;
};

export type DashboardRoutes = {
  [key in Role]: Route[];
};

// 🔹 Dashboard menus

export const dashboardRoutes: DashboardRoutes = {
  ADMIN: [
    { to: "/admin/users", value: "users", label: "Users", icon: <MdPeople /> },
    {
      to: "/admin/new_user",
      value: "new_user",
      label: "New user",
      icon: <FaUserPlus />,
    },
    {
      to: "/admin/logs",
      value: "logs",
      label: "All logs",
      icon: <TbLogs />,
    },
  ],

  STORES_MANAGER: [
    {
      to: "/manager/dashboard",
      value: "home",
      label: "Dashboard",
      icon: <MdDashboard />,
    },
    {
      to: "/manager/users",
      value: "users",
      label: "Users",
      icon: <FaUsers />,
    },
    {
      to: "/manager/new_user",
      value: "new_user",
      label: "New user",
      icon: <FaUserPlus />,
    },
    {
      to: "/manager/stocks",
      value: "stocks",
      label: "Stocks",
      icon: <MdInventory />,
    },
    {
      to: "/manager/requests",
      value: "requests",
      label: "Requests",
      icon: <MdEditNotifications />,
    },
    {
      to: "/manager/logs",
      value: "logs",
      label: "All logs",
      icon: <TbLogs />,
    },
  ],

  DEPARTMENT_DEAN: [
    {
      to: "/department/requests",
      value: "home",
      label: "Requests",
      icon: <MdListAlt />,
    },
    {
      to: "/department/new_request",
      value: "new_request",
      label: "New Request",
      icon: <FaPlusSquare />,
    },
    {
      to: "/department/logs",
      value: "logs",
      label: "All logs",
      icon: <TbLogs />,
    },
  ],

  PROCUREMENT_OFFICER: [
    {
      to: "/procurement/requests",
      value: "requests",
      label: "Requests",
      icon: <MdEditNotifications />,
    },
    {
      to: "/procurement/stocks",
      value: "stocks",
      label: "Stocks",
      icon: <MdInventory />,
    },
    {
      to: "/procurement/logs",
      value: "logs",
      label: "All logs",
      icon: <TbLogs />,
    },
  ],

  CFO: [
    {
      to: "/cfo/funds",
      value: "funds",
      label: "Funds",
      icon: <FaMoneyCheckAlt />,
    },
    {
      to: "/cfo/logs",
      value: "logs",
      label: "All logs",
      icon: <TbLogs />,
    },
  ],
};
