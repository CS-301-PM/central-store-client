import React from "react";
import ReusableModal from "../../components/other/Modal";
import RequestTableHeader from "../../components/other/RequestTableHeader";
import { useUserContext } from "../../hooks/UserContextHook";
import NewRequest from "../Department/NewRequest";
import { NavLink, Outlet } from "react-router-dom";

function Requests() {
  const { user } = useUserContext();
  const userRole = user?.user?.role;

  const tabs = [
    { to: "", label: "All" },
    { to: "pending", label: "Pending" },
    { to: "approved", label: "Approved" },
    { to: "rejected", label: "Rejected" },
  ];

  return (
    <div className="">
      {/* Header */}
      <RequestTableHeader
        title="Department requests"
        subtitle="All pending and approved requests"
      >
        {(userRole === "DEPARTMENT_HOD" || userRole === "STOREKEEPER") && (
          <ReusableModal
            color="primary"
            variant="contained"
            buttonLabel="New Request"
            title="Create new request"
          >
            <NewRequest />
          </ReusableModal>
        )}
      </RequestTableHeader>
      <div className="m-3">
        <nav className="flex">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end
              className={({ isActive }) =>
                `px-2 py-1 text-sm font-medium rounded-md transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Requests;
