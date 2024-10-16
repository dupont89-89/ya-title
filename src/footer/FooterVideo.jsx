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
  const [isExpanded, setIsExpanded] = useState(false); // Состояние для управления разворачиванием
  const [isPlaying, setIsPlaying] = useState(true); // Состояние для управления воспроизведением
  const [isMuted, setIsMuted] = useState(true); // Состояние для управления звуком
  const [isVisible, setIsVisible] = useState(true); // Состояние для управления видимостью компонента
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(true); // Состояние для управления видимостью кнопки Play/Pause
  const videoRef = useRef(null);

  const s = {
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
  };

  const sB = {
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
      // Медиазапросы для мобильных устройств
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
      // Медиазапросы для мобильных устройств
      "@media (max-width: 600px)": {
        bottom: "5px",
        left: "10px",
      },
    },
  };

  const handleExpandClick = () => {
    if (isExpanded) {
      setIsVisible(false); // Если свернуто и нажата иконка Cancel, скрываем компонент
    } else {
      setIsExpanded(true); // Иначе разворачиваем видео
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

  // Эффект для скрытия кнопки Play/Pause через 2 секунды
  useEffect(() => {
    let timer;
    if (isExpanded && showPlayPauseButton) {
      timer = setTimeout(() => {
        setShowPlayPauseButton(false);
      }, 2000);
    }
    return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента или изменении состояния
  }, [isExpanded, showPlayPauseButton]);

  if (!isVisible) {
    return null; // Если isVisible false, не рендерим компонент
  }

  return (
    <Box
      component="div"
      sx={isExpanded ? sB.isExpandedYesBox : sB.isExpandedNoBox}
      onMouseEnter={() => setShowPlayPauseButton(true)} // Показываем кнопку при наведении
      onMouseLeave={() => setShowPlayPauseButton(false)} // Скрываем кнопку при уходе курсора
    >
      <IconButton
        sx={{
          position: "absolute",
          top: isExpanded ? "-22px" : "-22px",
          right: isExpanded ? "-22px" : "0",
          color: "white",
        }}
        aria-label="delete"
        size="small"
        onClick={(e) => setIsVisible(false)}
      >
        <Cancel fontSize="small" />
      </IconButton>
      <Button component="a" onClick={handleExpandClick} sx={{ padding: 0 }}>
        <Card sx={isExpanded ? s.isExpandedYesCard : s.isExpandedNoCard}>
          <CardMedia
            sx={isExpanded ? s.isExpandedYes : s.isExpandedNo}
            component="video"
            image={"/video/video-footer_compressed.mp4"}
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
