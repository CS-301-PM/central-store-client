import * as React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

type ReusableModalProps = {
  buttonLabel: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  isModalOpen?: boolean;
  onClose?: () => void;
  color?: string;
  variant?: "contained" | "outlined" | "text";
  disabled?: boolean;
  handleMenu?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 30,
  p: 4,
};

export default function ReusableModal({
  buttonLabel,
  title,
  description,
  children,
  isModalOpen,
  onClose,
  color,
  disabled,
  variant,
  handleMenu,
}: ReusableModalProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  const open = isModalOpen !== undefined ? isModalOpen : internalOpen;
  const handleOpen = () => setInternalOpen(true);
  const handleClose = () => {
    setInternalOpen(false);
    onClose?.();
  };

  return (
    <>
      <Button
        id="status-button"
        aria-controls={open ? "status-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        color={color}
        onClick={(event) => {
          if (isModalOpen === undefined) {
            handleOpen();
          }
          handleMenu?.(event);
        }}
        variant={variant}
        disabled={disabled}
      >
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
          {children && <Box sx={{ mt: 0 }}>{children}</Box>}
        </Box>
      </Modal>
    </>
  );
}
