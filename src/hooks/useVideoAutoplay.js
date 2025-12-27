import { useEffect } from "react";

const useVideoAutoplay = (videoRef) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true; // обязательно для автоплея

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.currentTime = 0; // сбрасываем на начало
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [videoRef]);
};

export default useVideoAutoplay;
