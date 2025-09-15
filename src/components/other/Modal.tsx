import * as React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

type ReusableModalProps = {
  buttonLabel: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ReusableModal({
  buttonLabel,
  title,
  description,
  children,
}: ReusableModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="contained">
        {buttonLabel}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-title" variant="h6">
            {title}
          </Typography>
          {description && (
            <Typography id="modal-description" sx={{ mt: 2 }}>
              {description}
            </Typography>
          )}
          {children && <Box sx={{ mt: 2 }}>{children}</Box>}
        </Box>
      </Modal>
    </>
  );
}
