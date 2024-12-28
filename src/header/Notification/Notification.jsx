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
          <Popper style={{zIndex: "9999999"}} {...bindPopper(popupState)} transition>
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
