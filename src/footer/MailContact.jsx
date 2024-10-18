import React from "react";
import s from "./Footer.module.css";
import { Link, Typography } from "@mui/material";

export default function MailContact() {
  return (
    <Typography variant="h5">
      <Typography sx={{ color: "#fff" }} variant="h5" component="div">
        Техническая поддержка:
      </Typography>
      <Link sx={{ color: "#fff" }} href="mailto:app@ptahini.ru">
        app@ptahini.ru
      </Link>
    </Typography>
  );
}
