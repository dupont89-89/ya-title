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
      sx={{
        position: isExpanded ? "fixed" : "fixed",
        top: isExpanded ? "50%" : null,
        bottom: isExpanded ? null : "80px",
        left: isExpanded ? "50%" : "20px",
        transform: isExpanded ? "translate(-50%, -50%)" : "none",
        width: isExpanded ? "auto" : "auto",
        height: isExpanded ? "auto" : "auto",
        zIndex: 1000,
        backgroundColor: isExpanded ? "rgba(0, 0, 0, 0.5)" : "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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
        <Card
          sx={{
            maxWidth: isExpanded ? "100%" : 345,
            height: isExpanded ? "600px" : 240,
            boxShadow: isExpanded ? "none" : 3,
          }}
        >
          <CardMedia
            sx={{
              height: isExpanded ? "600px" : 240,
              width: isExpanded ? "auto" : "auto",
              maxHeight: "100vh", // Ограничиваем высоту, чтобы видео не выходило за пределы экрана
              maxWidth: "100vw", // Ограничиваем ширину, чтобы видео не выходило за пределы экрана
            }}
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
