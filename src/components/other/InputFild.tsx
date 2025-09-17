import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

type InputFieldProps = {
  label: string;
  type?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean;
  error?: null | string;
  disabled?: boolean;
};

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  showToggle = false,
  error = null,
  disabled = false,
}: InputFieldProps) {
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow((prev) => !prev);
  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <FormControl sx={{ m: 2, width: "100%" }} variant="outlined">
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          type={showToggle ? (show ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          disabled={disabled} // <-- added disabled support
          endAdornment={
            showToggle && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleToggle}
                  onMouseDown={handleMouseDown}
                  edge="end"
                  disabled={disabled} // <-- disable toggle if input is disabled
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }
          label={label}
        />
        <div className="text-danger">{error && error ? error : ""}</div>
      </FormControl>
    </Box>
  );
}
