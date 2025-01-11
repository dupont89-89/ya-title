import { PageApp } from "../../models/PageAppSchema.js";

export const newPageAppController = async (req, res) => {
  try {
    const pageNewSlug = await PageApp.findOne({ slug: req.body.slug });
    if (pageNewSlug) {
      return res.status(409).send({
        message: "Такой URL уже существует",
      });
    }
    console.log(req.body);
    const { pageTitle, slug, textContent, metaTitle, metaDescription } =
      req.body;

    await PageApp.create({
      ...req.body,
      pageTitle,
      slug,
      textContent,
      metaTitle,
      metaDescription,
    });

    res.status(201).send({ message: "Страница успешно создана" });
  } catch (error) {
    console.error("Ошибка в newPageAppController:", error);
    res.status(500).send({
      message: "Внутренняя ошибка сервера при создании новой страницы",
    });
  }
};

export const getPageAppController = async (req, res) => {
  try {
    const pages = await PageApp.find({});

    if (pages.length > 0) {
      const pageData = pages.map((page) => ({
        pageId: page._id,
        pageTitle: page.pageTitle,
        slug: page.slug,
        textContent: page.textContent,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
      }));

      res.status(200).json({ pages: pageData });
    } else {
      res.status(404).json({ message: "Страницы инструментов не найдены" });
    }
  } catch (error) {
    console.error("Ошибка при извлечении страниц инструментов:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export const editPageAppController = async (req, res) => {
  try {
    const { pageId, pageTitle, slug, textContent, metaTitle, metaDescription } =
      req.body;

    const updatedPageApp = await PageApp.findOneAndUpdate(
      { _id: pageId },
      {
        $set: {
          pageTitle,
          slug,
          textContent,
          metaTitle,
          metaDescription,
        },
      },
      { new: true }
    );

    if (updatedPageApp) {
      res.status(200).json({ message: "Страница успешно обновлена" });
    } else {
      res.status(404).json({ message: "Страница не найдена" });
    }
  } catch (error) {
    console.error("Ошибка при обновлении страницы инструмента:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
