import axios from "axios";
import AdmZip from "adm-zip";

export const getDomainListRu = async (req, res) => {
  try {
    const now = new Date();
    console.log("Текущее время UTC:", now.toISOString());

    const mskNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    console.log("Текущее время МСК:", mskNow.toISOString());

    let date = new Date(mskNow);
    console.log("Изначальная дата для файла:", date.toISOString());

    let fileContent = null;
    let fileDate = "";

    const formatDateForUrl = (date) => {
      return date.toISOString().split("T")[0].replace(/-/g, "");
    };

    const formatDateForUser = (fileDate) => {
      const [year, month, day] = [
        fileDate.substring(0, 4),
        fileDate.substring(4, 6),
        fileDate.substring(6, 8),
      ];
      const formattedDate = new Date(`${year}-${month}-${day}`);
      return formattedDate.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    while (true) {
      fileDate = formatDateForUrl(date);
      const fileUrl = `https://cctld.ru/files/docs/pendingdelete/RUDelList${fileDate}.zip`;

      console.log("Пробуем скачать файл по ссылке:", fileUrl);

      try {
        const response = await axios({
          url: fileUrl,
          method: "GET",
          responseType: "arraybuffer",
        });

        console.log("Файл успешно загружен за дату:", fileDate);

        if (response.status === 200) {
          const zip = new AdmZip(response.data);
          const zipEntries = zip.getEntries();

          if (zipEntries.length > 0) {
            const domainFile = zipEntries[0];
            fileContent = domainFile.getData().toString("utf8");
            break;
          } else {
            console.error("Ошибка: архив пустой.");
            throw new Error("Архив пустой");
          }
        }
      } catch (error) {
        console.log(`Ошибка при загрузке файла за ${fileDate}:`, error.message);
        console.log("Откатываем дату на день назад...");
        date.setDate(date.getDate() - 1);
      }
    }

    const domainList = fileContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    const domainObjects = domainList.map((domain, index) => ({
      id: index + 1,
      domains: domain,
    }));

    const userFriendlyDate = formatDateForUser(fileDate);

    console.log("Список доменов успешно извлечен.");
    console.log("Дата загруженного файла:", userFriendlyDate);

    return res.status(200).send({
      message: `Информация об освобождающихся доменов на 12:00 МСК, ${userFriendlyDate}`,
      domains: domainObjects,
    });
  } catch (error) {
    console.error("Ошибка при обработке файла доменов:", error);
    return res
      .status(500)
      .send({ message: "Ошибка сервера", error: error.message });
  }
};
