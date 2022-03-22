import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Selects({ version, versions, handleChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">VERSION</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={version}
          label="VERSION"
          name="version"
          onChange={handleChange}
        >
          {versions.map((v) => {
            return (
              <MenuItem key={v.id} value={v}>
                {v}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
