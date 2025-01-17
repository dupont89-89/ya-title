import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function CartToolsBlock() {
  const flexHeight = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  // Массив данных для каждой карточки
  const cardsData = [
    {
      link: "/app/seo-title/",
      image: "/img/tools/title-cart.jpg",
      alt: "Тайтл",
      title: "Создание Title",
      description:
        "Уникальный инструмент для создания мета-тега Title, основного заголовка страницы. Используется несколько последних алгоритмов для получения правильного тайтл.",
    },
    {
      link: "/app/commerce-key/",
      image: "/img/tools/tip-cart.jpg",
      alt: "Тип запроса",
      title: "Определение типа ключевого запроса",
      description:
        "Самый точный инструмент определения типа ключевого запроса. Узнай коммерческий запрос, информационный, медиа или слишком общий. На какой странице его продвигать.",
    },
    {
      link: "/app/wordstat/",
      image: "/img/tools/wordstat-cart.jpg",
      alt: "Wordstat",
      title: "Частотность запроса Wordstat",
      description:
        "Проверка онлайн частотности ключевого запроса через сервис Wordstat. Базовая и точная частотность по регионам. Популярный инструмент всех специалистов.",
    },
    {
      link: "/app/whois/",
      image: "/img/tools/whois-jpg.jpg",
      alt: "Проверка домена",
      title: "Проверка домена Whois",
      description:
        "Для проверки введите доменное имя в поисковую строку, и сервис Whois покажет его текущий статус. Уникальность инструмента в том, что можно подписаться на оповещение об его освобождение. Удобно для работы с дропами.",
    },
    {
      link: "/app/yandex-iks/",
      image: "/img/tools/iks.png",
      alt: "Проверка ИКС сайта",
      title: "Проверка ИКС сайта",
      description:
        "Бесплатная массовая проверка Индекса Качества Сайта по Яндексу. Отслеживайте изменения ИКС. Проверить можно до 1000 сайтов за один проход.",
    },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Link to={card.link} style={{ textDecoration: "none" }}>
              <Card style={flexHeight}>
                <CardActionArea style={flexHeight}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.image}
                    alt={card.alt}
                  />
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
