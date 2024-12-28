import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DomenDeleteResultTable from "./Parts/DomenDeleteResultTable";
// import SiteResultTable from "./Parts/SiteResultTable";

export default function DomenDelete(props) {
  const { handleClick, domenResult, domenResultData } = props;

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box>
      {!domenResult.length > 0 && (
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
              Список освобождающихся доменных имен
            </Typography>
          </Box>
          <Box>
            <Button
              startIcon={<PlayCircleOutlineIcon />}
              variant="contained"
              sx={{ backgroundColor: "#4CAF50" }}
              onClick={handleClick}
            >
              Получить список
            </Button>
          </Box>
        </Box>
      )}
      {domenResult.length > 0 && (
        <Box>
          <DomenDeleteResultTable
            domenResultData={domenResultData}
            domenResult={domenResult}
          />
        </Box>
      )}
    </Box>
  );
}
