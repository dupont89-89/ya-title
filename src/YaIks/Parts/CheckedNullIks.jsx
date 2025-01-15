import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Box, MenuItem, Select, Typography } from "@mui/material";

export default function CheckedNullIks(props) {
  const { handleChangeChek, handleChangeNumber, stateChek, stateNumberIks } =
    props;
  return (
    <Box
      p={2}
      sx={{
        background: "#42aaeb",
        borderRadius: "10px",
        border: "2px solid #198cd3",
      }}
    >
      <FormControl>
        <FormLabel component="legend">
          <Typography sx={{ fontWeight: 500, color: "#fff" }}>
            Исключить сайты по значению ИКС
          </Typography>
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            sx={{ minWidth: "150px" }}
            control={
              <Switch
                color={!stateChek ? "default" : "primary"}
                checked={stateChek}
                onChange={handleChangeChek}
              />
            }
            label={stateChek ? "Выключить" : "Включить"}
          />
        </FormGroup>
      </FormControl>
      <FormControl default disabled={!stateChek} sx={{ m: 1, minWidth: 100 }}>
        <Select
          labelId="number-iks-label"
          id="number-iks-label"
          value={stateNumberIks}
          onChange={handleChangeNumber}
          autoWidth
          displayEmpty
          sx={{ background: stateChek && "#fff" }}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={20}>{"≤ 20"}</MenuItem>
          <MenuItem value={30}>{"≤ 30"}</MenuItem>
          <MenuItem value={60}>{"≤ 60"}</MenuItem>
          <MenuItem value={100}>{"≤ 100"}</MenuItem>
          <MenuItem value={200}>{"≤ 200"}</MenuItem>
          <MenuItem value={300}>{"≤ 300"}</MenuItem>
          <MenuItem value={500}>{"≤ 500"}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
