import React, { useEffect } from "react";
import { TextareaAutosize } from "@mui/material";
import decodePunycode from "../../Whois/Parts/PunycodeConverter"; // Укажите правильный путь до файла с decodePunycode

export default function TextAreaIks(props) {
  const { siteArray, handleChange } = props;

  useEffect(() => {
    if (siteArray && siteArray.length > 0) {
      const transformedSites = siteArray.map(
        (site) => decodePunycode(site.trim()) || site.trim()
      );

      // Проверяем, отличаются ли преобразованные данные от текущих
      const joinedTransformedSites = transformedSites.join("\n");
      if (joinedTransformedSites !== siteArray.join("\n")) {
        handleChange({ target: { value: joinedTransformedSites } });
      }
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
