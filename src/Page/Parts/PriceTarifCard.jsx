import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const tiers = [
  {
    title: "Бесплатно",
    price: "0",
    description: [
      "100 лимитов при регистрации",
      "Доступ к инструментам",
      "Возможность повышения тарифа",
    ],
    buttonText: "Попробовать",
    buttonVariant: "outlined",
  },
  {
    title: "PRO",
    subheader: "Рекомендуем",
    price: "2600",
    description: [
      "3 000 лимитов",
      "Цена доп лимита: 1.5 рубля",
      "Возможность докупки лимитов",
      "Инструменты без ограничений",
      "Техническая поддержка",
    ],
    buttonText: "Получить доступ",
    buttonVariant: "contained",
  },
  {
    title: "PRO Бизнес +",
    price: "4900",
    description: [
      "7 000 лимитов",
      "Цена доп лимита: 0,98 рубля",
      "Плагин для WordPress",
      "Возможность докупки лимитов",
      "Инструменты без ограничений",
      "Техническая поддержка",
    ],
    buttonText: "Выбрать",
    buttonVariant: "outlined",
  },
];

export default function Pricing() {
  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography
          gutterBottom
          component="h2"
          variant="h4"
          color="text.primary"
        >
          Выберите подходящую подписку
        </Typography>
        <Typography component="div" variant="body1" color="text.secondary">
          Чтобы правильно подобрать подписку, рекомендуем вам посчитать
          примерное кол-во обрабатываемых ключевых запросов. Если у вас в работе
          1 сайт с 300 страницами, вам вполне может хватить и тарифа{" "}
          <Typography component="span" variant="h6">
            PRO
          </Typography>
          .
          <Typography component="p">
            Если у вас 5 проектов в работе то вам скорее всего нужен тариф{" "}
            <Typography component="span" variant="h6">
              PRO Бизнес +
            </Typography>
            . Но вы можете не беспокоится, всегда можно докупить лимиты.
          </Typography>
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {tiers.map((tier) => (
          <Grid
            key={tier.title}
            size={{ xs: 12, sm: tier.title === "Enterprise" ? 12 : 6, md: 4 }}
          >
            <Card
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 4,
                border: tier.title === "PRO" ? "1px solid" : undefined,
                borderColor: tier.title === "PRO" ? "primary.main" : undefined,
                background:
                  tier.title === "PRO"
                    ? "linear-gradient(#2c95ff, #71c0e8)"
                    : "#f9f9f9",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: tier.title === "PRO" ? "grey.100" : "",
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.title === "PRO" && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={tier.subheader}
                      size="small"
                      sx={{
                        background: (theme) =>
                          theme.palette.mode === "light" ? "" : "none",
                        backgroundColor: "primary.contrastText",
                        "& .MuiChip-label": {
                          color: "primary.dark",
                        },
                        "& .MuiChip-icon": {
                          color: "primary.dark",
                        },
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    color: tier.title === "PRO" ? "grey.50" : undefined,
                  }}
                >
                  <Typography component="h3" variant="h2">
                    {tier.price}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; ₽/месяц
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: "grey.500",
                  }}
                />
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        width: 20,
                        color:
                          tier.title === "PRO" ? "#CDDC39" : "primary.main",
                      }}
                    />
                    <Typography
                      component="span"
                      variant="subtitle2"
                      sx={{
                        color: tier.title === "PRO" ? "grey.200" : undefined,
                      }}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant}
                  component="a"
                  href="/material-ui/getting-started/templates/checkout/"
                  target="_blank"
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
