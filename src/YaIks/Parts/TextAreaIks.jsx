import { TextareaAutosize } from "@mui/material";
import React, { useEffect } from "react";

export default function TextAreaIks(props) {
  const { siteArray, handleChange, handleClear } = props;

  useEffect(() => {
    // Проверяем, если queryArray определен и не пустой
    if (siteArray && siteArray.length > 0 && siteArray[0].trim() === "") {
      handleClear(); // Вызываем очистку, если textarea была очищена
    }
  }, [siteArray, handleClear]);

  return (
    <TextareaAutosize
      style={{
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        width: "100%",
        fontSize: "18px",
        maxWidth: "100%", // Ограничивает максимальную ширину
        minWidth: "100%", // Ограничивает минимальную ширину
        padding: "10px",
      }}
      name="iks-get"
      id="iks-get"
      value={siteArray.join("\n")}
      onChange={handleChange}
      placeholder="Добавьте сайты для проверки..."
      minRows={7}
      maxRows={15}
    />
  );
}
