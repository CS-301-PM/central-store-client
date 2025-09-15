import { useEffect, useState } from "react";
import { Column, ReusableTable } from "../../components/other/StocksTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BasicSelect from "../../components/other/BasicSelector";
import { useUserContext } from "../../hooks/UserContextHook";
import { FetchedUser } from "../../types/auth";
import { Role, roleOptions } from "../../types/User";
import ReusableModal from "../../components/other/Modal";
import EditUser from "./EditUser";
import { MdDelete } from "react-icons/md";

export default function UsersTablePage({ role }: { role: Role }) {
  const { users, getAllUsers, deleteUser } = useUserContext();

  const [allUsers, setUsers] = useState<FetchedUser[]>([]);
  const [filterRole, setFilterRole] = useState<string>("All");

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (users) {
      setUsers(users);
    }
  }, [users]);

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const filteredUsers =
    filterRole === "All"
      ? allUsers
      : allUsers.filter((user) => user.role === filterRole);

  const userColumns: Column<FetchedUser>[] = [
    { key: "employeeId", label: "Employee ID" },
    {
      key: "firstName",
      label: "Name",
      render: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "department", label: "Department" },
    { key: "status", label: "Status" },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (_, row) => (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <ReusableModal buttonLabel="EDIT" title="Edit user">
            <EditUser userToUpdate={row} />
          </ReusableModal>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(row.id)}
          >
            <MdDelete />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      {/* Filter Controls */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-start" }}>
        <BasicSelect
          label="Filter by Role"
          value={filterRole}
          options={roleOptions}
          onChange={(value) => setFilterRole(String(value))}
        />
      </Box>

      {/* Table */}
      <ReusableTable<FetchedUser>
        columns={userColumns}
        data={filteredUsers}
        getRowStyle={(_, index) => ({
          backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
        })}
      />
    </Box>
  );
}
