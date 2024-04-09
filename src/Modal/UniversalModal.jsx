import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import s from "./Modal.module.css";

export default function UniversalModal(props) {
  const styleButtonTrigger = {
    display: "inline-block",
    border: "none",
    cursor: "pointer",
    borderRadius: "3px",
    fontSize: "15px",
    padding: "4px 9px",
  };

  return (
    <Popup
      contentStyle={{
        padding: "20px",
        border: "1px solid #000",
        background: "#fff",
        borderRadius: "15px",
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
          {props.content}
        </div>
      )}
    </Popup>
  );
}
