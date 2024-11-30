import React from "react";
import {
  Box,
  Container,
  Link,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AppsIcon from "@mui/icons-material/Apps";
import PostAddIcon from "@mui/icons-material/PostAdd";

export const ListItem = styled(Stack)(() => ({
  position: "relative",
  "&:hover .MuiPaper-root": {
    display: "block",
  },
}));
export const AccountPopover = styled(Paper)(() => ({
  position: "absolute",
  zIndex: 2,
  left: 0,
  top: 17,
  width: 250,
  display: "none",
}));

export default function AdminPanel(props) {
  return (
    <Container sx={{ backgroundColor: "#000" }} maxWidth>
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
        <ListItem sx={{ zIndex: "999999" }}>
          <Link sx={{ color: "#fff" }} href="#">
            Страницы
          </Link>
          <AccountPopover elevation={4}>
            <MenuList>
              <MenuItem component="a" href="/admin/page-app/">
                Cтраницы инструментов
              </MenuItem>
              <MenuItem component="a" href="#">
                Новая страница инструмента
              </MenuItem>
            </MenuList>
          </AccountPopover>
        </ListItem>
      </Box>
    </Container>
  );
}
