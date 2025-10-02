import { useEffect, useState } from "react";
import { Column, ReusableTable } from "../../components/other/ReusableTable";
import Box from "@mui/material/Box";
import BasicSelect from "../../components/other/BasicSelector";
import { useUserContext } from "../../hooks/UserContextHook";
import { FetchedUser } from "../../types/auth";
import { roleOptions } from "../../types/User";

export default function UsersTablePage() {
  const { users, getAllUsers } = useUserContext();

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

  const filteredUsers =
    filterRole === "All"
      ? allUsers
      : allUsers.filter((user) => user.role === filterRole);

  const userColumns: Column<FetchedUser>[] = [
    { key: "id", label: "ID" },
    // { key: "blockchain_address", label: "Type" },
    {
      key: "first_name",
      label: "Firstname",
      render: (_, row) => `${row.first_name}`,
    },
    {
      key: "last_name",
      label: "Lastname",
      render: (_, row) => `${row.last_name}`,
    },

    {
      key: "username",
      label: "Username",
      render: (_, row) => `${row.username}`,
    },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "department", label: "Department" },
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
      <ReusableTable<{ id: "" }>
        columns={userColumns}
        data={filteredUsers}
        getRowStyle={(_, index) => ({
          backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
        })}
      />
    </Box>
  );
}
