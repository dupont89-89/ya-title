import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Button, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import s from "./Notification.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function NotificationMessage(props) {
  const [notifications, setNotifications] = useState(props.notifications);
  useEffect(() => {
    setNotifications(props.notifications);
  }, [props.notifications]);

  const handleClearNotifications = () => {
    props.clearNotificationMessage(props.userId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <React.Fragment>
      {notifications.length > 0 ? (
        <React.Fragment>
          <Box className={s.notificationContainer}>
            {notifications.map((notification) => (
              <List
                key={notification._id}
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="center">
                  <ListItemAvatar>
                    <Avatar
                      sx={{ background: "#1a76d3", padding: "4px" }}
                      alt="Администрация"
                      src="/img/logo/white-logo-ptahini.png"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ padding: "3px" }}
                    primary="Администрация"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          {formatDate(notification.dateAdded)}
                        </Typography>
                        <Typography variant="subtitle1" component="p">
                          {notification.message}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            ))}
          </Box>
          <Stack
            mt={2}
            pr={2}
            pb={2}
            justifyContent="flex-end"
            direction="row"
            spacing={3}
          >
            <Button
              size="small"
              onClick={handleClearNotifications}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Прочитано
            </Button>
            <Button
              component="a"
              href="/history-message/"
              size="small"
              variant="contained"
              endIcon={<SendIcon />}
            >
              История
            </Button>
          </Stack>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
}
