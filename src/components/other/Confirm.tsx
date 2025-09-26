import { Box, Button, Stack, Typography } from "@mui/material";

type ConfirmProps = {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
};

export default function Confirm({
  title = "Confirm Action",
  description = "Are you sure you want to proceed?",
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  color = "error",
}: ConfirmProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {description}
      </Typography>

      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button variant="outlined" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="contained" color={color} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Stack>
    </Box>
  );
}
