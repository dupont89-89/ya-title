import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TextAreaIks from "./Parts/TextAreaIks";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SiteResultTable from "./Parts/SiteResultTable";
import YaIksTarif from "./Parts/YaIksTarif";

export default function YaIks(props) {
  const { handleChange, siteArray, siteResult, handleClick, handleClear } =
    props;

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box>
      {!siteResult.length > 0 && (
        <Box
          p={{ xs: 1, md: 12 }}
          pt={{ xs: 10 }}
          mt={2}
          mb={2}
          sx={{
            background:
              "linear-gradient(90deg, rgba(25, 118, 211, 1) 0%, rgba(25, 176, 211, 1) 100%)",
            borderRadius: "15px",
            position: "relative",
          }}
        >
          <Box>
            <Typography
              color="#fff"
              variant={isLargeScreen ? "h4" : "h5"}
              component="h1"
              textAlign="center"
              gutterBottom
            >
              Проверить Яндекс ИКС сайта
            </Typography>
          </Box>
          <Box>
            <YaIksTarif isLargeScreen={isLargeScreen} siteArray={siteArray} />
            <TextAreaIks
              handleClear={handleClear}
              siteArray={siteArray}
              handleChange={handleChange}
            />
          </Box>
          <Box>
            <Button
              disabled={!siteArray.length} // Проверка на пустоту массива
              startIcon={<PlayCircleOutlineIcon />}
              variant="contained"
              sx={{ backgroundColor: "#4CAF50" }}
              onClick={handleClick}
            >
              Собрать данные
            </Button>
          </Box>
        </Box>
      )}
      {siteResult.length > 0 && (
        <Box>
          <SiteResultTable siteResult={siteResult} />
        </Box>
      )}
    </Box>
  );
}
