// import React, { useState, useEffect, useRef } from "react";
// import NotificationMessage from "./NotificationMessage";
// import Badge from "@mui/material/Badge";
// import MailIcon from "@mui/icons-material/Mail";
// import { IconButton, Stack } from "@mui/material";

// export default function Notification(props) {
//   const [show, setShow] = useState(false);
//   const notificationRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(event.target)
//       ) {
//         setShow(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   const handleClick = () => {
//     setShow(!show); // Toggle show state
//   };

//   return (
//     <div ref={notificationRef}>
//       <Stack direction="row" spacing={1}>
//         <IconButton onClick={handleClick} aria-label="Оповещения пользователя">
//           <Badge badgeContent={props.notificationCount} color="error" max={99}>
//             <MailIcon style={{ color: "#fff" }} fontSize="large" />
//           </Badge>
//         </IconButton>
//       </Stack>
//       {show && (
//         <NotificationMessage
//           userId={props.userId}
//           clearNotificationMessage={props.clearNotificationMessage}
//           notifications={props.notifications}
//         />
//       )}
//     </div>
//   );
// }

import * as React from "react";
import Popper from "@mui/material/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationMessage from "./NotificationMessage"; // убедитесь в правильности импорта
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box } from "@mui/material";

export default function PopperPopupState({
  notificationCount,
  userId,
  clearNotificationMessage,
  notifications,
}) {
  return (
    <PopupState
      sx={{ zIndex: "9999" }}
      variant="popper"
      popupId="demo-popup-popper"
    >
      {(popupState) => (
        <div>
          <Stack direction="row" spacing={1}>
            <IconButton
              disabled={!notifications.length > 0}
              {...bindToggle(popupState)}
              aria-label="Оповещения пользователя"
            >
              <Badge badgeContent={notificationCount} color="error" max={99}>
                <MailIcon style={{ color: "#fff" }} fontSize="large" />
              </Badge>
            </IconButton>
          </Stack>
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper position="relative">
                  <Box
                    top="0"
                    right="0"
                    zIndex="2"
                    position="absolute"
                    mr={2}
                    alignItems="start"
                    justifyContent="flex-end"
                  >
                    <IconButton
                      {...bindToggle(popupState)}
                      aria-label="Закрыть оповещения"
                      sx={{
                        background: "#fff",
                        display: !notifications.length > 0 && "none",
                      }}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </Box>
                  <NotificationMessage
                    userId={userId}
                    clearNotificationMessage={clearNotificationMessage}
                    notifications={notifications}
                  />
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
  );
}
