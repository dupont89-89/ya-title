import React from "react";
import PriceTarifCard from "../Parts/PriceTarifCard";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CartToolsBlock from "../Parts/CartToolsBlock";
import CheckIcon from "@mui/icons-material/Check";
import GetTitlePresentation from "../../api-ya-search/GetTitlePresentation";
import FooterVideo from "../../footer/FooterVideo";
import AccordionFaq from "../Parts/FaqTools";

export default function Home(props) {
  const { isAuthenticated } = props;
  return (
    <Container maxWidth="xl">
      <Box sx={{ marginBottom: "70px" }} component="section">
        <Grid sx={{ alignItems: "center" }} container spacing={1}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                marginBottom: 1,
                color: "#000",
                textTransform: "uppercase",
              }}
            >
              <Typography variant="h6" component="p">
                SEO • БИЗНЕС • МАРКЕТИНГ
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                marginBottom: 1,
                color: "#000",
                textTransform: "uppercase",
              }}
            >
              <Typography variant="h3" component="h1">
                Инструменты Ptahini
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                marginBottom: 1,
                color: "#1976d3",
                fontWeight: "600",
              }}
            >
              <Typography fontWeight="600" variant="h1" component="span">
                SEO
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                color: "#282323",
                fontWeight: "600",
                marginBottom: 5,
              }}
            >
              <Typography variant="h6" component="p">
                Инструменты Ptahini - это уникально разработаные онлайн
                инструменты для SEO специалистов, маркетологов и бизнеса.
              </Typography>
            </Box>

            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                marginBottom: 5,
                color: "#000",
                textTransform: "uppercase",
              }}
              variant="h8"
              component="div"
            >
              <CheckIcon
                sx={{ marginRight: "5px" }}
                fontSize="large"
                color="primary"
              />{" "}
              Уникальность
              <CheckIcon
                sx={{ marginRight: "5px", marginLeft: "5px" }}
                fontSize="large"
                color="primary"
              />{" "}
              Доступная цена
              <CheckIcon
                sx={{ marginRight: "5px", marginLeft: "5px" }}
                fontSize="large"
                color="primary"
              />{" "}
              Точные инструменты
            </Typography>
            <Button
              href={isAuthenticated ? "/app/" : "/login/"}
              component="a"
              variant="contained"
            >
              {isAuthenticated ? "В инструменты" : "Начать пользоваться"}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="div">
              <Box
                component="img"
                sx={{
                  width: "100%",
                }}
                alt=""
                src="/img/baner/home-top-baner.png"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <GetTitlePresentation />
      <CartToolsBlock />
      <PriceTarifCard />
      <AccordionFaq />
      <FooterVideo />
    </Container>
  );
}
