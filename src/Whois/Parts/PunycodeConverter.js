import punycode from "punycode";

export default function decodePunycode(punycodeUrl) {
  if (typeof punycodeUrl !== "string") {
    console.error("Ошибка: передано не строковое значение", punycodeUrl);
    return null;
  }

  try {
    // Преобразуем домен в человеко-читаемый формат
    const decodedDomain = punycode.toUnicode(punycodeUrl);
    return decodedDomain;
  } catch (error) {
    console.error("Ошибка при обработке Punycode: ", error);
    return null;
  }
}
