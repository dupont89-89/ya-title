import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import s from "./Modal.module.css";

export default function ToolsModalMenu(props) {
  const styleButtonTrigger = {
    display: "inline-block",
    border: "none",
    cursor: "pointer",
    borderRadius: "20px",
    fontSize: "20px",
    padding: "5px 15px",
    marginLeft: "20px",
    backgroundColor: props.backgroundColor ? props.backgroundColor : null,
    color: props.color ? props.color : null,
  };

  return (
    <Popup
      contentStyle={{
        padding: "20px",
        border: "1px solid rgb(0 0 0 / 0%)",
        background: "#FFC107",
        borderRadius: "0px 0px 15px 15px",
        height: "500px",
        margin: "146px 45px",
        width: "100%",
      }}
      trigger={
        <button style={styleButtonTrigger}> {props.nameBtnPopup} </button>
      }
      modal
      nested
    >
      {(close) => (
        <div>
          <button className={s.closeBtn} onClick={() => close()}>
            ✖
          </button>
          {/* Передаем функцию закрытия модального окна в дочерний компонент */}
          {React.cloneElement(props.content, { handleCloseModal: close })}
        </div>
      )}
    </Popup>
  );
}
