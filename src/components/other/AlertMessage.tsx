// components/other/AlertMessage.tsx
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

type AlertMessageProps = {
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  autoHideDuration?: number;
  onClose?: () => void;
  sticky?: boolean; // 👈 new prop
};

export default function AlertMessage({
  message,
  severity = "info",
  autoHideDuration = 3000,
  onClose,
  sticky = false,
}: AlertMessageProps) {
  const [open, setOpen] = useState(true);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={sticky ? null : autoHideDuration} // no auto-close if sticky
      onClose={handleClose}
      anchorOrigin={
        sticky
          ? { vertical: "top", horizontal: "center" } // sticky → top center
          : { vertical: "bottom", horizontal: "left" } // default → toast bottom left
      }
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
        variant="filled"
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
