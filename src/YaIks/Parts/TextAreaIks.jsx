import React, { useEffect } from "react";
import { TextareaAutosize } from "@mui/material";
import decodePunycode from "../../Whois/Parts/PunycodeConverter"; // Укажите правильный путь до файла с decodePunycode

export default function TextAreaIks(props) {
  const { siteArray, handleChange, handleClear } = props;

  useEffect(() => {
    if (siteArray && siteArray.length > 0) {
      // Преобразуем сайты в человеко-читаемый формат
      const transformedSites = siteArray.map(
        (site) => decodePunycode(site.trim()) || site.trim()
      );

      // Передаем преобразованный массив через handleChange
      handleChange({ target: { value: transformedSites.join("\n") } });
    }
  }, [siteArray, handleChange]);

  return (
    <TextareaAutosize
      style={{
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        width: "100%",
        fontSize: "18px",
        maxWidth: "100%",
        minWidth: "100%",
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
