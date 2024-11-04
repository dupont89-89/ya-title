import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
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

export default function PageNew() {
  const [metaTitle, setPageMetaTitle] = useState();
  const [metaDescription, setPageMetaDescription] = useState();
  const [slug, setPageSlug] = useState();
  const [pageTitle, setPageTitle] = useState();

  const newPageData = {
    metaTitle: metaTitle,
    metaDescription: metaDescription,
    slug: slug,
    pageTitle: pageTitle,
  };
  return (
    <>
      <Typography gutterBottom component="h1" variant="h2">
        Добавить страницу инструмента
      </Typography>
      <Box component="section">
        <Grid container gap={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField onChange={(e) => setPageTitle(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField onChange={(e) => setPageMetaTitle(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setPageMetaDescription(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box component="section">
        <Typography gutterBottom component="h2" variant="h4">
          Добавить описание инструмента
        </Typography>
        <TinyMC />
      </Box>
      <Button onClick={(e) => newPageApp(newPageData)}>
        Добавить страницу
      </Button>
    </>
  );
}
