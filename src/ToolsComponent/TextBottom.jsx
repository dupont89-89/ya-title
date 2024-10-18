import React from "react";
import t from "../css/Tools.module.css";
import { Typography } from "@mui/material";

export default function TextBottom(props) {
  return (
    <Typography variant="h6" component="p">
      {props.text}
    </Typography>
  );
}
