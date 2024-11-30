const { PageApp } = require("../../models/PageAppSchema");

exports.newPageAppController = async (req, res) => {
  try {
    const pageNewSlug = await PageApp.findOne({ slug: req.body.slug });
    if (pageNewSlug) {
      return res.status(409).send({
        message: "Такой URL уже существует",
      });
    }
    console.log(req.body);
    const pageTitle = req.body.pageTitle;
    const slug = req.body.slug;
    const textContent = req.body.textContent;
    const metaTitle = req.body.metaTitle;
    const metaDescription = req.body.metaDescription;

    await PageApp.create({
      ...req.body,
      pageTitle: pageTitle,
      slug: slug,
      textContent: textContent,
      metaTitle: metaTitle,
      metaDescription: metaDescription,
    });

    res.status(201).send({ message: "Страница успешно создана" });
  } catch (error) {
    console.error("Ошибка в newPageAppController:", error);
    res.status(500).send({
      message: "Внутренняя ошибка сервера при создании новой страницы",
    });
  }
};

exports.getPageAppController = async (req, res) => {
  try {
    const pages = await PageApp.find({});

    if (pages.length > 0) {
      // Преобразовать данные каждого пользователя в нужный формат
      const pageData = pages.map((page) => ({
        pageId: page._id,
        pageTitle: page.pageTitle,
        slug: page.slug,
        textContent: page.textContent,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
      }));

      // Отправить данные пользователей в ответе
      res.status(200).json({ pages: pageData });
    } else {
      // Если пользователи не найдены, отправить соответствующее сообщение об ошибке
      res.status(404).json({ message: "Страницы инструментов не найдены" });
    }
  } catch (error) {
    // Обработать ошибку, возникшую во время запроса к базе данных
    console.error("Ошибка при извлечении страниц инструментов:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

exports.editPageAppController = async (req, res) => {
  try {
    const pageId = req.body.pageId;
    const pageTitle = req.body.pageTitle;
    const slug = req.body.slug;
    const textContent = req.body.textContent;
    const metaTitle = req.body.metaTitle;
    const metaDescription = req.body.metaDescription;

    const updatedPageApp = await PageApp.findOneAndUpdate(
      { _id: pageId },
      {
        $set: {
          pageTitle: pageTitle,
          slug: slug,
          textContent: textContent,
          metaTitle: metaTitle,
          metaDescription: metaDescription,
        },
      },
      { new: true } // Устанавливаем опцию new в true, чтобы получить обновленный объект пользователя
    );

    if (updatedPageApp) {
      // Если пользователь успешно обновлен, отправляем обновленные данные в ответе
      res.status(200).json({ message: "Страница успешно обновлена" });
    } else {
      // Если пользователь не найден, отправляем ответ с ошибкой 404 Not Found
      res.status(404).json({ message: "Страница не найдена" });
    }
  } catch (error) {
    // Обрабатываем любые ошибки, возникающие во время запроса
    console.error("Ошибка при обновлении страницы инструмента:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
