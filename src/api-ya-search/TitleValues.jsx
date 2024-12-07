import React from "react";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LinkIcon from "@mui/icons-material/Link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function TitleValues({ titleValues = [], urlPage = [] }) {
  const titleValuesDownloads = Array.isArray(titleValues) ? titleValues : [];
  const urlPageArray = Array.isArray(urlPage) ? urlPage : [];

  const generateDownloadFile = () => {
    const textToDownload = urlPageArray.join("\n");
    const blob = new Blob([textToDownload], { type: "text/plain" });
    return URL.createObjectURL(blob);
  };

  const generateDownloadFileTitle = () => {
    const textToDownload = titleValuesDownloads.join("\n");
    const blob = new Blob([textToDownload], { type: "text/plain" });
    return URL.createObjectURL(blob);
  };

  const downloadUrl = generateDownloadFile();
  const downloadTitle = generateDownloadFileTitle();

  return (
    <Container maxWidth="lg">
      {titleValuesDownloads.length > 0 && (
        <Grid container spacing={3}>
          <Grid
            sx={{
              backgroundColor: "#fbfbfb",
              borderRadius: "15px",
              padding: "15px",
            }}
            size={12}
          >
            <Typography
              textAlign="center"
              gutterBottom
              component="h2"
              variant="h4"
            >
              Собранные Title из ТОП выдачи
            </Typography>
            <Box sx={{ listStyleType: "none" }} p={0} component="ul">
              {titleValuesDownloads.map((title, index) => (
                <Box mb={1} sx={{ display: "flex" }} component="li" key={index}>
                  <CheckCircleOutlineIcon />
                  <Typography ml={1} component="p" variant="body1">
                    {title}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Button
              variant="contained"
              component="a"
              href={downloadTitle}
              download="title.txt"
            >
              Скачать
            </Button>
          </Grid>
          {urlPageArray.length > 0 && (
            <Grid
              sx={{
                backgroundColor: "#fbfbfb",
                borderRadius: "15px",
                padding: "15px",
              }}
              size={12}
            >
              <Typography
                textAlign="center"
                gutterBottom
                component="h2"
                variant="h4"
              >
                Адреса страниц
              </Typography>
              <Box p={0} component="ul">
                {urlPageArray.map((url, index) => (
                  <Box
                    mb={1}
                    sx={{ display: "flex" }}
                    component="li"
                    key={index}
                  >
                    <LinkIcon sx={{ color: "#1976d3" }} />
                    <Link
                      ml={1}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={url}
                    >
                      {url}
                    </Link>
                  </Box>
                ))}
              </Box>
              <Button
                variant="contained"
                component="a"
                href={downloadUrl}
                download="urls.txt"
              >
                Скачать
              </Button>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
}
