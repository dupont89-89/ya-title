import React from "react";
import s from "./Footer.module.css";
import SocialContact from "./SocialContact";
import MailContact from "./MailContact";
import UniversalModal from "../Modal/UniversalModal";
import Politika from "../parts/Politika";
import Oferta from "../parts/Oferta";
import { Box, Container, Grid } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{ backgroundColor: "#1a76d3", paddingBottom: "20px" }}
      component="footer"
    >
      <Container maxWidth="xl">
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid
            sx={{ display: "flex", flexDirection: "column" }}
            item
            md={4}
            xs={12}
          >
            <span className={s.linkModal}>
              <UniversalModal
                nameBtnPopup="*Политика конфиденциальности"
                content={<Politika />}
                height="90vh"
                backgroundBtn="#f5b24d00"
                colorBtn="#fff"
                borderBottom="1px solid"
                paddingBtn="0"
                fontSizeBtn="13px"
                width="80%"
              />
            </span>
            <span className={s.linkModal}>
              <UniversalModal
                nameBtnPopup="*Договор офёрты"
                content={<Oferta />}
                height="90vh"
                backgroundBtn="#f5b24d00"
                colorBtn="#fff"
                borderBottom="1px solid"
                paddingBtn="0"
                fontSizeBtn="13px"
                width="80%"
              />
            </span>
          </Grid>
          <Grid md={4} item xs={12}>
            <SocialContact />
          </Grid>
          <Grid md={4} item xs={12}>
            <MailContact />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
