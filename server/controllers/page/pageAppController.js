const { PageApp } = require("../../models/PageAppSchema");

exports.newPageAppController = async (req, res) => {
  try {
    const pageNewSlug = await PageApp.findOne({ slug: req.body.slug });
    if (pageNewSlug) {
      return res.status(409).send({
        message: "Такой URL уже существует",
      });
    }
    const title = req.body.title;
    const slug = req.body.slug;
    const textContent = req.body.textContent;
    const metaTitle = req.body.metaTitle;
    const metaDescription = req.body.metaDescription;

    await PageApp.create({
      ...req.body,
      title: title,
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
