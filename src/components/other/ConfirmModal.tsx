import { Box, Button, Modal, Typography, Stack } from "@mui/material";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  height: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 30,
  p: 4,
};

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  color = "error",
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: { backgroundColor: "rgba(0,0,0,0.1)" },
      }}
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography id="modal-description" sx={{ mb: 3 }}>
          {description}
        </Typography>

        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="outlined" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant="contained" color={color} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
