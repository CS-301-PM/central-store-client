import * as React from "react";
import Button from "@mui/material/Button";

type AppButtonProps = {
  children: React.ReactNode;
  variant?: "text" | "contained" | "outlined";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  disabled?: boolean;
};

export default function AppButton({
  children,
  variant = "contained",
  color = "primary",
  onClick,
  type = "button",
  fullWidth = false,
  disabled = false,
}: AppButtonProps) {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      type={type}
      fullWidth={fullWidth}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
