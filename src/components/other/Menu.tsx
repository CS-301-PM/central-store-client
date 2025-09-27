import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { StatusType } from "../../types/Request";
import ReusableModal from "./Modal";
import InputField from "./InputFild";
import AppButton from "./AppButton";
import { useUserContext } from "../../hooks/UserContextHook";
// import { Role } from "../../types/User";

type StatusMenuProps = {
  status: StatusType;
  onChange: (newStatus: StatusType) => void;
};

const getStatusColor = (
  status: StatusType
): "primary" | "success" | "error" | "warning" | "info" | "inherit" => {
  switch (status) {
    case "PENDING":
      return "primary";
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "error";
    case "IN PROGRESS":
    case "IN_PROGRESS":
      return "warning";
    case "FULFILLED":
      return "info";
    default:
      return "inherit";
  }
};

export default function StatusMenu({ status, onChange }: StatusMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newState, setNewState] = React.useState<StatusType>(status);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (newStatus: StatusType) => {
    onChange(newStatus);
    setNewState(newStatus);
    if (newStatus === "REJECTED") {
      setIsModalOpen(true);
    } else {
      handleClose();
    }
  };

  const [reason, setReason] = React.useState("");
  const { user } = useUserContext();
  const role = user?.user?.role;

  const statusOptionsForManager: StatusType[] = ["APPROVED", "REJECTED"];
  const statusOptionsForStorekeeper: StatusType[] = [
    "IN PROGRESS",
    "FULFILLED",
  ];

  let statusOptions: string[] = [];

  if (role === "STORES_MANAGER") {
    statusOptions = [...statusOptionsForManager];
  } else if (role === "PROCUREMENT_OFFICER") {
    statusOptions = [...statusOptionsForStorekeeper];
  }

  statusOptions = statusOptions.filter(
    (opt) => opt.replace("_", " ") !== status.replace("_", " ")
  );

  return (
    <div>
      {role === "DEPARTMENT_DEAN" ? (
        <AppButton
          color={getStatusColor(status)}
          type="button"
          variant="contained"
        >
          {status}
        </AppButton>
      ) : (
        <ReusableModal
          title="Reason for rejecting."
          buttonLabel={status}
          isModalOpen={status === "REJECTED" && isModalOpen}
          onClose={() => setIsModalOpen(false)}
          color={getStatusColor(status)}
          variant="contained"
          handleMenu={
            (role === "PROCUREMENT_OFFICER" && status === "APPROVED") ||
            status === "IN_PROGRESS" ||
            status === "IN PROGRESS" ||
            (role === "STORES_MANAGER" && status === "PENDING")
              ? handleClick
              : undefined
          }
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // alert(reason);
              // API HERE
            }}
          >
            <InputField
              label="Reason"
              value={reason}
              type="text"
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="ms-3 mt-3">
              <AppButton type="submit" color="primary">
                {"Reject"}
              </AppButton>
            </div>
          </form>
        </ReusableModal>
      )}

      <Menu
        id="status-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "status-button",
          },
        }}
      >
        {statusOptions.map((s) => (
          <MenuItem key={s} onClick={() => handleSelect(s)}>
            {s}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
