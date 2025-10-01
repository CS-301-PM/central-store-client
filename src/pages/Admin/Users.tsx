import { useEffect, useState } from "react";
import { Column, ReusableTable } from "../../components/other/ReusableTable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BasicSelect from "../../components/other/BasicSelector";
import { useUserContext } from "../../hooks/UserContextHook";
import { FetchedUser } from "../../types/auth";
import { roleOptions } from "../../types/User";
import ReusableModal from "../../components/other/Modal";
import { MdDelete } from "react-icons/md";
import NewUserForm from "../Auth/NewUserForm";
import ConfirmModal from "../../components/other/ConfirmModal";
import moment from "moment";

export default function UsersTablePage() {
  const { users, getAllUsers, deleteUser } = useUserContext();

  const [allUsers, setUsers] = useState<FetchedUser[]>([]);
  const [filterRole, setFilterRole] = useState<string>("All");
  const [open, setOpen] = useState(false);

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
    // {
    //   key: "created_at",
    //   label: "Since",
    //   render: (_, row) => moment(row.created_at).fromNow(),
    // },

    // {
    //   key: "action",
    //   label: "Actions",
    //   align: "center",
    //   render: (_, row) => (
    //     <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
    //       {/* <ReusableModal buttonLabel="EDIT" title="Edit user">
    //         <NewUserForm isNew={false} userToUpdate={row} />
    //       </ReusableModal>
    //       <Button
    //         variant="outlined"
    //         color="error"
    //         size="small"
    //         onClick={() => {
    //           setOpen(true);
    //         }}
    //       >
    //         <MdDelete />
    //       </Button> */}
    //       {/* <ConfirmModal
    //         open={open}
    //         onClose={() => setOpen(false)}
    //         onConfirm={() => {
    //           handleDelete(row.id ?? "");
    //           setOpen(false);
    //         }}
    //         title="Delete User"
    //         description="This action is irreversible. Do you really want to delete this user?"
    //         color="warning"
    //         confirmLabel="Yes, Delete"
    //         cancelLabel="Cancel"
    //       /> */}
    //     </Box>
    //   ),
    // },
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
