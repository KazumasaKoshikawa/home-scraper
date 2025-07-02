import React from "react";
import {
  Box,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  FormControl,
  Chip,
  IconButton,
  Tooltip,
  SelectChangeEvent,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface MultiSelectBoxProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  minWidth?: number;
  maxWidth?: number;
}

export function MultiSelectBox({
  label,
  options,
  value,
  onChange,
  minWidth = 120,
  maxWidth = 180,
}: MultiSelectBoxProps) {
  // MUI SelectのSelectChangeEvent型を利用
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const v = event.target.value;
    onChange(typeof v === "string" ? v.split(",") : (v as string[]));
  };
  const handleClear = () => {
    onChange([]);
  };
  return (
    <FormControl sx={{ flexGrow: 1, minWidth, maxWidth }} size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              gap: 0.5,
              alignItems: "center",
              overflowX: "auto",
            }}
          >
            {(selected as string[]).map((v) => (
              <Chip key={v} label={v} sx={{ whiteSpace: "nowrap" }} />
            ))}
          </Box>
        )}
        endAdornment={
          value.length > 0 && (
            <Tooltip title="リセット">
              <IconButton
                size="small"
                onClick={handleClear}
                tabIndex={-1}
                sx={{ mr: 2 }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )
        }
      >
        {options
          .filter((o) => o)
          .map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
