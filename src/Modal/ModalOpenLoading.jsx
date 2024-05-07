import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import s from "./Modal.module.css";

export default function ModalOpenLoading(props) {
  const [isOpen, setIsOpen] = useState(props.open || true);

  useEffect(() => {
    setIsOpen(props.open || true);
  }, [props.open]);

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
      trigger={null}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      modal
      nested
    >
      {(close) => (
        <div>
          <button
            className={s.closeBtn}
            onClick={() => {
              setIsOpen(false);
              close();
            }}
          >
            ✖
          </button>
          {props.content(close)}
        </div>
      )}
    </Popup>
  );
}
