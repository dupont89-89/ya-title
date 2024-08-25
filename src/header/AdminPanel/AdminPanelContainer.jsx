import React from "react";
import AdminPanel from "./AdminPanel";
import { Container } from "@mui/material";

export default function AdminPanelContainer(props) {
  return (
    <Container sx={{ backgroundColor: "#000" }} maxWidth="false">
      <AdminPanel />
    </Container>
  );
}
