import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import TinyMC from "./TinyMC";
import { newPageApp } from "../../Api/api-page";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("./../../config.dev");
} else {
  config = require("./../../config.prod");
}

const urlFront = config.REACT_APP_FRONT_URL;

export default function PageNew(props) {
  const [metaTitle, setPageMetaTitle] = useState();
  const [metaDescription, setPageMetaDescription] = useState();
  const [slug, setPageSlug] = useState();
  const [pageTitle, setPageTitle] = useState();
  const [textContent, setContent] = useState("");

  const newPageData = {
    metaTitle: metaTitle,
    metaDescription: metaDescription,
    slug: slug,
    pageTitle: pageTitle,
    textContent: textContent,
  };

  return (
    <>
      <Typography gutterBottom component="h1" variant="h2">
        Добавить страницу инструмента
      </Typography>
      <Box component="section">
        <Grid container spacing={2}>
          <Grid size={12}>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                URL страницы (slug)
              </InputLabel>
              <Input
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
              label="Название инструмента"
              variant="outlined"
              onChange={(e) => setPageTitle(e.target.value)}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Title заголовок"
              variant="outlined"
              onChange={(e) => setPageMetaTitle(e.target.value)}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              multiline
              rows={5}
              label="Description"
              variant="outlined"
              onChange={(e) => setPageMetaDescription(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box component="section">
        <Typography gutterBottom component="h2" variant="h4">
          Добавить описание инструмента
        </Typography>
        <TinyMC setContent={setContent} />
      </Box>
      <Button onClick={(e) => newPageApp(newPageData)}>
        Добавить страницу
      </Button>
    </>
  );
}
