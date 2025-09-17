import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppButton from "./AppButton";
import Box from "@mui/material/Box";
// import { useUserContext } from "../../hooks/UserContextHook";
import {
  FetchedRequestObj,
  priorityOptions,
  PriorityType,
  statusOptions,
  StatusType,
} from "../../types/Request";
import BasicSelect from "./BasicSelector";
import { useRequestManagementContext } from "../../hooks/useRequestHook";
import Loading from "./Loading";
import { Role } from "../../types/User";
// import BasicMenu from "./Menu";
import StatusMenu from "./Menu";

export default function EnhancedTable({ role }: { role: Role }) {
  const { getAllRequests, state, updateRequestStatus } =
    useRequestManagementContext();
  const { requests, loading } = state;

  const [rows, setRows] = React.useState<FetchedRequestObj[]>([]);
  const [filterStatus, setFilterStatus] = React.useState<StatusType | "All">(
    "All"
  );
  const [filterPriority, setFilterPriority] = React.useState<
    PriorityType | "All"
  >("All");
  const [sortAsc, setSortAsc] = React.useState<boolean>(true);

  useEffect(() => {
    getAllRequests();
  }, []);

  useEffect(() => {
    setRows(requests);
  }, [requests]);

  if (loading) {
    return (
      <div className="loadingParentDiv">
        <Loading />
      </div>
    );
  }

  const filteredRows = rows.filter(
    (row) =>
      (filterStatus === "All" ? true : row.status === filterStatus) &&
      (filterPriority === "All" ? true : row.priority === filterPriority)
  );

  const sortedRows = [...filteredRows].sort((a, b) =>
    sortAsc ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  const handleStatusChange = async (
    requestId: string,
    newStatus: StatusType
  ) => {
    if (role === "STORES_MANAGER" || role === "PROCUREMENT_OFFICER") {
      await updateRequestStatus(requestId, newStatus);
    } else {
      // alert("STORE'S MANAGER CAN APPROVE");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <BasicSelect
          label="Filter by Status"
          value={filterStatus}
          options={[{ value: "All", label: "All Statuses" }, ...statusOptions]}
          onChange={(value) => setFilterStatus(value as StatusType | "All")}
        />

        <BasicSelect
          label="Filter by Priority"
          value={filterPriority}
          options={[
            { value: "All", label: "All Priorities" },
            ...priorityOptions,
          ]}
          onChange={(value) => setFilterPriority(value as PriorityType | "All")}
        />

        <AppButton
          variant="outlined"
          color="info"
          onClick={() => setSortAsc((prev) => !prev)}
        >
          Sort by Request ID {sortAsc ? "↑" : "↓"}
        </AppButton>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="enhanced table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>ID</TableCell>
              <TableCell align="left">Item</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="right">Department</TableCell>
              <TableCell align="left">Priority</TableCell>
              <TableCell align="left">Reason</TableCell>
              <TableCell align="left">Status</TableCell>

              {/* <TableCell align="center">Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((request, index) => (
              <TableRow
                key={request.requestId}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
              >
                <TableCell component="th" scope="row">
                  {request.requestId}
                </TableCell>
                <TableCell align="left">{request.item}</TableCell>
                <TableCell align="left">{request.quantity}</TableCell>
                <TableCell align="right">
                  {request.from.departmentName}
                </TableCell>
                <TableCell align="left">{request.priority}</TableCell>
                <TableCell align="left">{request.reason}</TableCell>

                <TableCell align="left">
                  <StatusMenu
                    status={request.status}
                    onChange={(newStatus) =>
                      handleStatusChange(request.requestId, newStatus)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
