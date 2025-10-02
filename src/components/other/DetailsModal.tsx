import { Box, Button, Modal, Typography, Stack, Divider } from "@mui/material";
import { ReactNode } from "react";

type DetailsModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  closeLabel?: string;
  children?: ReactNode; // 👈 accept children
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "900",
  maxHeight: "auto",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 30,
  p: 4,
};

export default function DetailsModal({
  open,
  onClose,
  title = "Item Details",
  closeLabel = "Close",
  children,
}: DetailsModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        sx: { backgroundColor: "rgba(0,0,0,0.6)" },
      }}
    >
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ mb: 0 }} />

        {children}

        {/* <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
          <Button variant="contained" onClick={onClose}>
            {closeLabel}
          </Button>
        </Stack> */}
      </Box>
    </Modal>
  );
}
