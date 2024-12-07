import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Modal,
  MenuItem,
  FormControl,
  Select,
  Container,
  Typography,
} from "@mui/material";
import AdminFormAddLvtUser from "../Parts/Form/AdminFormAddLvtUser";

export default function AdminUser({
  getAdminUserData,
  editAdminUserStatus,
  addLvtAdminUser,
  dataUser,
}) {
  useEffect(() => {
    getAdminUserData();
  }, [getAdminUserData]);

  const [open, setOpen] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpen = (userId) => {
    setSelectedUserId(userId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  const handleStatusChange = (userId, newRole) => {
    editAdminUserStatus(userId, newRole);
  };

  const numberRegUser = dataUser.length;

  const columns = [
    { field: "userId", headerName: "ID пользователя", flex: 1 },
    { field: "email", headerName: "Эл. почта", flex: 1 },
    {
      field: "totalLvt",
      headerName: "Баланс баллов",
      flex: 1,
      renderCell: (params) => (
        <div>
          <span>{params.value} бал.</span>
        </div>
      ),
    },
    {
      field: "addBall",
      headerName: "Управления баллами",
      flex: 1,
      renderCell: (params) => (
        <Button
          onClick={() => handleOpen(params.row.userId)}
          size="small"
          style={{ marginTop: 8 }}
        >
          Добавить баллы
        </Button>
      ),
    },
    {
      field: "money",
      flex: 1,
      headerName: "Баланс деньги",
      renderCell: (params) => (
        <div>
          <span>{params.value} руб</span>
        </div>
      ),
    },
    {
      field: "HistoryMoney",
      headerName: "Всего пополнений",
      flex: 1,
      renderCell: (params) => (
        <div>
          <span>{params.row.moneyHistory} руб</span>
        </div>
      ),
    },
    {
      field: "referals",
      headerName: "Рефер. кол-во",
      flex: 1,
      renderCell: (params) => (
        <div>
          <span>{params.row.referal.length} польз.</span>
        </div>
      ),
    },
    {
      field: "referalsHistoryBonus",
      headerName: "Получ. бонус за рефер",
      flex: 1,
      renderCell: (params) => (
        <div>
          <span>{params.row.lvtPresent.moneyPresentReferal} руб</span>
        </div>
      ),
    },
    {
      field: "role",
      headerName: "Статус",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              value={params.value}
              onChange={(e) =>
                handleStatusChange(params.row.userId, e.target.value)
              }
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="moder">Moder</MenuItem>
              <MenuItem value="partner">Partner</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ),
    },
  ];

  const rows = dataUser.map((user) => ({
    id: user.userId, // Важно для уникальной идентификации строки
    ...user,
  }));

  return (
    <Container maxWidth="xl">
      <Box component="section">
        <Box
          sx={{ display: "flex", alignItems: "center", gap: "30px" }}
          component="div"
        >
          <Typography component="h1" variant="h3" gutterBottom>
            Пользователи
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              background: "#FFC107",
              padding: "5px 10px",
              borderRadius: "8px",
            }}
            component="div"
          >
            {numberRegUser} человек
          </Typography>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 30, 50]}
          checkboxSelection
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            "& .MuiBackdrop-root": { backgroundColor: "#00000012" },
          }}
        >
          <AdminFormAddLvtUser
            addLvtAdminUser={addLvtAdminUser}
            userId={selectedUserId}
          />
        </Modal>
      </Box>
    </Container>
  );
}
