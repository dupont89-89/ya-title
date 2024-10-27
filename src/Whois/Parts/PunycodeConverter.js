import punycode from "punycode";

export default function decodePunycode(punycodeUrl) {
  try {
    // Преобразуем домен в человеко-читаемый формат
    const decodedDomain = punycode.toUnicode(punycodeUrl);
    return decodedDomain;
  } catch (error) {
    console.error("Ошибка при обработке Punycode: ", error);
    return null;
  }
}
