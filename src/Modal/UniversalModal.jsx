import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import s from "./Modal.module.css";

export default function UniversalModal(props) {
  const styleButtonTrigger = {
    display: "inline-block",
    border: "none",
    borderBottom: props.borderBottom ? props.borderBottom : "none",
    cursor: "pointer",
    borderRadius: "3px",
    fontSize: props.fontSizeBtn ? props.fontSizeBtn : "15px",
    padding: props.paddingBtn ? props.paddingBtn : "4px 9px",
    backgroundColor: props.backgroundBtn,
    color: props.colorBtn,
  };

  return (
    <Popup
      contentStyle={{
        padding: "20px",
        border: "1px solid #000",
        background: "#fff",
        borderRadius: "15px",
        height: props.height,
        overflow: "auto",
        width: props.width ? props.width : "50%",
      }}
      trigger={
        <button style={styleButtonTrigger} className={s.universalModalEditBtn}>
          {" "}
          {props.nameBtnPopup}{" "}
        </button>
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
