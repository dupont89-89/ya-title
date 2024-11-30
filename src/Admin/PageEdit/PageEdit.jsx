import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import TinyMC from "./TinyMC";
import { editPageApp, newPageApp } from "../../Api/api-page";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("./../../config.dev");
} else {
  config = require("./../../config.prod");
}

const urlFront = config.REACT_APP_FRONT_URL;

export default function PageEdit(props) {
  const {
    slugState,
    metaTitleState,
    metaDescriptionState,
    pageTitleState,
    textContentState,
    getPageApp,
    pageData,
    pageId,
  } = props;
  const [metaTitle, setPageMetaTitle] = useState(metaTitleState);
  const [metaDescription, setPageMetaDescription] =
    useState(metaDescriptionState);
  const [slug, setPageSlug] = useState(slugState);
  const [pageTitle, setPageTitle] = useState(pageTitleState);
  const [textContent, setContent] = useState(textContentState);

  const newPageData = {
    metaTitle: metaTitle,
    metaDescription: metaDescription,
    slug: slug,
    pageTitle: pageTitle,
    textContent: textContent,
    pageId: pageId,
  };

  return (
    <Container maxWidth>
      <Box mt={5}>
        <Typography gutterBottom component="h1" variant="h4">
          Редактировать страницу инструмента
        </Typography>
        <Box component="section">
          <Grid container spacing={2}>
            <Grid size={12}>
              <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                  URL страницы (slug)
                </InputLabel>
                <Input
                  value={slug}
                  onChange={(e) => setPageSlug(e.target.value)}
                  id="input-slug"
                  startAdornment={
                    <InputAdornment position="start">
                      <InsertLinkIcon sx={{ marginRight: "5px;" }} />{" "}
                      {`${urlFront}/app/`}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid size={12}>
              <TextField
                sx={{ width: "700px" }}
                value={pageTitle}
                label="Название инструмента"
                variant="outlined"
                onChange={(e) => setPageTitle(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                sx={{ width: "700px" }}
                value={metaTitle}
                label="Title заголовок"
                variant="outlined"
                onChange={(e) => setPageMetaTitle(e.target.value)}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                sx={{ width: "700px" }}
                value={metaDescription}
                multiline
                rows={5}
                label="Description"
                variant="outlined"
                onChange={(e) => setPageMetaDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mt={5} component="section">
          <Typography gutterBottom component="h2" variant="h4">
            Добавить описание инструмента
          </Typography>
          <TinyMC textContent={textContent} setContent={setContent} />
        </Box>
        <Button onClick={(e) => editPageApp(newPageData)}>
          Обновить страницу
        </Button>
      </Box>
    </Container>
  );
}
