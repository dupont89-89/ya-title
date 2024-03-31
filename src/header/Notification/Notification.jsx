import React, { useState, useEffect, useRef } from "react";
import iconNotifications from "./../../img/icon/icon-envelope.png";
import NotificationMessage from "./NotificationMessage";
import s from "./Notification.module.css";

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

  const notificationsHeader = {
    backgroundImage: `url(${iconNotifications})`,
    backgroundSize: "45px",
    backgroundRepeat: "no-repeat",
    width: "45px",
    height: "45px",
    display: "block",
    position: "relative",
  };

  const numberNotifications = {
    display: "inline-block",
    background: props.notificationCount === 0 ? "#4CAF50" : "rgb(204 28 28)",
    borderRadius: "50%",
    color: "#fff",
    position: "absolute",
    width: "20px",
    height: "20px",
    top: "-3px",
    textAlign: "center",
    left: "-5px",
    lineHeight: "20px",
  };

  const handleClick = () => {
    setShow(!show); // Toggle show state
  };

  return (
    <div ref={notificationRef}>
      <button className={s.btnMessage} onClick={handleClick}>
        <div style={notificationsHeader}>
          <span style={numberNotifications}>{props.notificationCount}</span>
        </div>
      </button>
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
