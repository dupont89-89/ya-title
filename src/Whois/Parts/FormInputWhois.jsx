import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { Button, TextField } from "@mui/material";

export default function FormInputWhois(props) {
  const { handleChange } = props;

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button onClick={handleChange} variant="contained">
        Contained
      </Button>
    </Paper>
  );
}
