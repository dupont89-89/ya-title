import {
  Cancel,
  PlayArrow,
  Pause,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { Box, Button, Card, CardMedia, IconButton } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

export default function FooterVideo() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(true);
  const [opacity, setOpacity] = useState(1); // Новое состояние для управления прозрачностью

  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.body.scrollHeight;

      // Проверяем, достигнут ли низ страницы
      if (scrollTop + windowHeight >= bodyHeight) {
        setOpacity(0); // Устанавливаем прозрачность в 0, чтобы скрыть компонент
        setTimeout(() => setIsVisible(false), 500); // Через 500 мс полностью скрываем компонент
      } else {
        setIsVisible(true);
        setOpacity(1); // Устанавливаем прозрачность в 1, чтобы показать компонент
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const styles = {
    isExpandedYesCard: {
      maxWidth: "100%",
      height: "600px",
      boxShadow: "none",
      "@media (max-width: 600px)": {
        maxWidth: "100%",
        height: "500px",
      },
    },
    isExpandedNoCard: {
      maxWidth: 345,
      height: 240,
      boxShadow: 3,
      "@media (max-width: 600px)": {
        maxWidth: 200,
        height: 200,
      },
    },
    isExpandedYes: {
      height: "600px",
      width: "auto",
      maxHeight: "100vh",
      maxWidth: "100vw",
      "@media (max-width: 600px)": {
        height: "500px",
      },
    },
    isExpandedNo: {
      height: 240,
      width: "auto",
      maxHeight: "100vh",
      maxWidth: "100vw",
      "@media (max-width: 600px)": {
        height: 200,
      },
    },
    isExpandedYesBox: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "auto",
      height: "auto",
      zIndex: 1000,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "@media (max-width: 600px)": {
        top: "40%",
        left: "40%",
        transform: "translate(-40%, -40%)",
      },
    },
    isExpandedNoBox: {
      position: "fixed",
      bottom: "80px",
      left: "20px",
      width: "auto",
      height: "auto",
      zIndex: 1000,
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "@media (max-width: 600px)": {
        bottom: "5px",
        left: "10px",
      },
    },
  };

  const handleExpandClick = () => {
    if (isExpanded) {
      setIsVisible(false);
    } else {
      setIsExpanded(true);
      setIsMuted(false);
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  };

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let timer;
    if (isExpanded && showPlayPauseButton) {
      timer = setTimeout(() => {
        setShowPlayPauseButton(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isExpanded, showPlayPauseButton]);

  if (!isVisible) return null;

  return (
    <Box
      component="div"
      sx={{
        ...(isExpanded ? styles.isExpandedYesBox : styles.isExpandedNoBox),
        opacity: opacity, // Применяем значение прозрачности
        transition: "opacity 0.5s ease", // Плавный переход для прозрачности
      }}
      onMouseEnter={() => setShowPlayPauseButton(true)}
      onMouseLeave={() => setShowPlayPauseButton(false)}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: "-22px",
          right: isExpanded ? "-22px" : "0",
          color: "white",
        }}
        aria-label="delete"
        size="small"
        onClick={() => setIsVisible(false)}
      >
        <Cancel fontSize="small" />
      </IconButton>
      <Button component="a" onClick={handleExpandClick} sx={{ padding: 0 }}>
        <Card
          sx={isExpanded ? styles.isExpandedYesCard : styles.isExpandedNoCard}
        >
          <CardMedia
            sx={isExpanded ? styles.isExpandedYes : styles.isExpandedNo}
            component="video"
            image="/video/video-footer_compressed.mp4"
            autoPlay
            muted={isMuted}
            loop
            ref={videoRef}
          />
        </Card>
      </Button>
      {isExpanded && (
        <>
          {showPlayPauseButton && (
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                zIndex: 1100,
              }}
              onClick={handlePlayPauseClick}
            >
              {isPlaying ? (
                <Pause fontSize="large" />
              ) : (
                <PlayArrow fontSize="large" />
              )}
            </IconButton>
          )}
          <IconButton
            sx={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              color: "#fff",
              zIndex: 1100,
            }}
            onClick={() => {
              setIsMuted(!isMuted);
              videoRef.current.muted = !isMuted;
            }}
          >
            {isMuted ? (
              <VolumeOff fontSize="large" />
            ) : (
              <VolumeUp fontSize="large" />
            )}
          </IconButton>
        </>
      )}
    </Box>
  );
}
