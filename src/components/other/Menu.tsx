import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { StatusType } from "../../types/Request";
import ReusableModal from "./Modal";
import InputField from "./InputFild";
import AppButton from "./AppButton";

type StatusMenuProps = {
  status: StatusType;
  onChange: (newStatus: StatusType) => void;
};

const statusOptions: StatusType[] = [
  "approved",
  "rejected",
  "in progress",
  "fulfilled",
  "waiting for supply",
];

const getStatusColor = (
  status: StatusType
): "primary" | "success" | "error" | "warning" | "info" | "inherit" => {
  switch (status) {
    case "pending":
      return "primary";
    case "approved":
      return "success";
    case "rejected":
      return "error";
    case "in progress":
      return "warning";
    case "fulfilled":
      return "info";
    default:
      return "inherit";
  }
};

export default function StatusMenu({ status, onChange }: StatusMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (newStatus: StatusType) => {
    onChange(newStatus);
    if (newStatus === "rejected") {
      setIsModalOpen(true);
    } else {
      handleClose();
    }
  };

  const [reason, setReason] = React.useState("");

  return (
    <div>
      <ReusableModal
        title="Reason for rejecting."
        buttonLabel={status}
        isModalOpen={status === "rejected" && isModalOpen}
        onClose={() => setIsModalOpen(false)}
        color={getStatusColor(status)}
        variant="contained"
        handleMenu={
          status === "fulfilled" || status === "rejected"
            ? undefined
            : handleClick
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(reason);
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
