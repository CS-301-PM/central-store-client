import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Option = {
  value: string | number;
  label: string;
};

type BasicSelectProps = {
  label: string;
  value: string | number;
  options: Option[];
  onChange: (value: string | number) => void;
  fullWidth?: boolean;
};

const BasicSelect: React.FC<BasicSelectProps> = ({
  label,
  value,
  options,
  onChange,
  fullWidth = true,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    const selectedOption = options.find(
      (option) => option.value.toString() === event.target.value
    );
    if (selectedOption) {
      onChange(selectedOption.value);
    } else {
      onChange(event.target.value);
    }
  };

  return (
    <Box sx={{ minWidth: 0 }}>
      <FormControl className="p-2" fullWidth={fullWidth}>
        <InputLabel>{label}</InputLabel>
        <Select value={value} label={label} onChange={handleChange}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
