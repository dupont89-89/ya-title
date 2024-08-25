import React, { useState, useEffect, useRef } from "react";
import NotificationMessage from "./NotificationMessage";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton, Stack } from "@mui/material";

export default function Notification(props) {
  const [show, setShow] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setShow(!show); // Toggle show state
  };

  return (
    <div ref={notificationRef}>
      <Stack direction="row" spacing={1}>
        <IconButton onClick={handleClick} aria-label="Оповещения пользователя">
          <Badge badgeContent={props.notificationCount} color="error" max={99}>
            <MailIcon style={{ color: "#fff" }} fontSize="large" />
          </Badge>
        </IconButton>
      </Stack>
      {show && (
        <NotificationMessage
          userId={props.userId}
          clearNotificationMessage={props.clearNotificationMessage}
          notifications={props.notifications}
        />
      )}
    </div>
  );
}
