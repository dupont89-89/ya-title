import React from "react";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AppsIcon from "@mui/icons-material/Apps";
import PostAddIcon from "@mui/icons-material/PostAdd";

export default function AdminPanel(props) {
  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        gap={3}
        alignItems="center"
        justifyContent="start"
        fontSize={15}
        padding="10px 0"
      >
        <Link
          display="flex"
          gap={1}
          alignItems="flex-end"
          color="#fff"
          underline="none"
          href="/admin/"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <AppsIcon fontSize="small" />
            <Typography component="span">Панель управления</Typography>
          </Stack>
        </Link>

        <Link
          display="flex"
          gap={1}
          alignItems="flex-end"
          color="#fff"
          underline="none"
          href="/admin/user/"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <ManageAccountsIcon fontSize="small" />
            <Typography component="span">Пользователи</Typography>
          </Stack>
        </Link>
        <Link
          display="flex"
          gap={1}
          alignItems="flex-end"
          color="#fff"
          underline="none"
          href="/admin/page-edit"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <PostAddIcon fontSize="small" />
            <Typography component="span">Страницы</Typography>
          </Stack>
        </Link>
      </Box>
    </Container>
  );
}
