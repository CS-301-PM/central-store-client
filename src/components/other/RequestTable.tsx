import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import BasicSelect from "./BasicSelector";
import StatusMenu from "./Menu";
import NoDataComp from "./NoDataComp";
import { useRequestManagementContext } from "../../hooks/useRequestHook";
import {
  FetchedRequestObj,
  priorityOptions,
  PriorityType,
  statusOptions,
  StatusType,
} from "../../types/Request";
import { Role } from "../../types/User";
import moment from "moment";
import { useUserContext } from "../../hooks/UserContextHook";
import { groupRequestsByDepartment } from "../../utils/Helper";

interface EnhancedTableProps {
  role: Role;
}

export default function EnhancedTable({ role }: EnhancedTableProps) {
  const { getAllRequests, state, updateRequestStatus } =
    useRequestManagementContext();
  const { requests, loading } = state;
  const { user } = useUserContext();
  const department = user?.user?.department;
  const [rows, setRows] = useState<FetchedRequestObj[]>([]);
  const [filterStatus, setFilterStatus] = useState<StatusType | "All">("All");
  const [filterPriority, setFilterPriority] = useState<PriorityType | "All">(
    "All"
  );

  useEffect(() => {
    getAllRequests();
  }, []);

  // Assuming `requests` is your full list from the API
  // const departmentRequests = React.useMemo(() => {
  //   if (role !== "DEPARTMENT_DEAN") return [];

  //   // Filter only the requests for the user's department
  //   const deptRequests = requests.filter(
  //     (req) => req.department === user?.user?.department
  //   );

  //   // Group by user_id
  //   const groupedByUser = deptRequests.reduce((acc, req) => {
  //     const userId = req.user_id;
  //     if (!acc[userId]) acc[userId] = [];
  //     acc[userId].push(req);
  //     return acc;
  //   }, {} as Record<number, typeof requests>);

  //   return groupedByUser;
  // }, [requests, role, user]);

  useEffect(() => {
    const grouped = groupRequestsByDepartment(requests);
    if (role === "DEPARTMENT_DEAN") {
      setRows(grouped.byDepartment[department]);
    } else if (role === "STORES_MANAGER") {
      setRows(requests);
    } else {
      setRows(requests);
    }
  }, [requests, role, department]);

  const filteredRows = rows.filter(
    (row) =>
      (filterStatus === "All" ? true : row.status === filterStatus) &&
      (filterPriority === "All" ? true : row.priority === filterPriority)
  );

  const handleStatusChange = async (
    requestId: string,
    newStatus: StatusType
  ) => {
    if (role === "STORES_MANAGER" || role === "PROCUREMENT_OFFICER") {
      const statusToUpdate =
        newStatus === "IN PROGRESS" ? "IN_PROGRESS" : newStatus;
      await updateRequestStatus(requestId, statusToUpdate);
    }
  };

  if (loading) {
    return <div className="loadingParentDiv">Loading...</div>;
  }

  return (
    <>
      {requests.length > 0 ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mb: 2,
              gap: 2,
            }}
          >
            <BasicSelect
              label="Filter by Status"
              value={filterStatus}
              options={[
                { value: "All", label: "All Statuses" },
                ...statusOptions,
              ]}
              onChange={(value) => setFilterStatus(value as StatusType | "All")}
            />
            <BasicSelect
              label="Filter by Priority"
              value={filterPriority}
              options={[
                { value: "All", label: "All Priorities" },
                ...priorityOptions,
              ]}
              onChange={(value) =>
                setFilterPriority(value as PriorityType | "All")
              }
            />
          </Box>

          <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="enhanced table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Item</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="right">Department</TableCell>
                  <TableCell align="left">Priority</TableCell>
                  {/* <TableCell align="left">Reason</TableCell> */}
                  <TableCell align="left">Time</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRows.map((request, index) => (
                  <TableRow
                    key={request.id}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
                      "&:hover": { backgroundColor: "#e3f2fd" },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {request.id}
                    </TableCell>
                    <TableCell align="left">{request.item_name}</TableCell>
                    <TableCell align="left">{request.quantity}</TableCell>
                    <TableCell align="right">{request.department}</TableCell>
                    <TableCell align="left">{request.priority}</TableCell>
                    {/* <TableCell align="left">{request.reason}</TableCell> */}
                    <TableCell align="left">
                      {moment(request.created_at).fromNow()}
                    </TableCell>
                    <TableCell align="left">
                      <StatusMenu
                        status={request.status}
                        onChange={(newStatus) => {
                          request.status = newStatus;
                          handleStatusChange(request.id, newStatus);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <NoDataComp />
      )}
    </>
  );
}
