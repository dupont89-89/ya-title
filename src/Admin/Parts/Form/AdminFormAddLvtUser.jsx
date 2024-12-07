import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Alert, Box, Button, Typography } from "@mui/material";

export default function AdminFormAddLvtUser(props) {
  const [selectedLvt, setSelectedLvt] = useState("");
  const [infoServer, setInfoServer] = useState("");
  const handleOnClick = () => {
    props
      .addLvtAdminUser(props.userId, selectedLvt)
      .then((data) => {
        // Обработка успешного ответа от сервера
        console.log("Данные от сервера:", data);
        setInfoServer(data);

        // Здесь вы можете обновить состояние компонента или выполнить другие действия с полученными данными
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка при отправке запроса:", error);
        setInfoServer(error);
      });
  };

  const handleInputChange = (e) => {
    setSelectedLvt(e.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 15,
    p: 4,
  };

  return (
    <Box sx={style}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography
          textAlign="center"
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Укажите кол-во баллов
        </Typography>
        <TextField
          onChange={handleInputChange}
          id="lvt"
          name="lvt"
          label="Кол-во для зачисления"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          value={selectedLvt}
        />
        <Button onClick={handleOnClick} variant="contained">
          Зачислить
        </Button>
        {infoServer && <Alert severity="success">{infoServer}</Alert>}
      </Box>
    </Box>
  );
}
