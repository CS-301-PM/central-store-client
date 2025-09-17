import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { StatusType } from "../../types/Request";
import { useUserContext } from "../../hooks/UserContextHook";

type StatusMenuProps = {
  status: StatusType;
  onChange: (newStatus: StatusType) => void;
};

const statusOptions: StatusType[] = [
  //   "pending",
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
  const { user } = useUserContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (newStatus: StatusType) => {
    onChange(newStatus);
    handleClose();
  };

  return (
    <div>
      <Button
        id="status-button"
        aria-controls={open ? "status-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color={getStatusColor(status)}
        variant="contained"
      >
        {status}
      </Button>
      <Menu
        id="status-menu"
        anchorEl={anchorEl}
        open={open}
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
