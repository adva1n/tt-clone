import { useState, useContext, useEffect, useRef } from "react";
import { SoundContext } from "../../context/SoundContext";
import "../../styles/video.css";

const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  const [likes, setLikes] = useState(video.likes);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const { isMuted } = useContext(SoundContext);

  // Лайк
  const handleLike = (e) => {
    e.stopPropagation();
    setLikes((prev) => prev + 1);
    setLiked(true);
    setTimeout(() => setLiked(false), 300);
  };

  // Комменты
  const toggleComments = (e) => {
    e.stopPropagation();
    setShowComments((prev) => !prev);
  };

  // Пауза/воспроизведение
  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (isPlaying) vid.pause();
    else vid.play();

    setIsPlaying(!isPlaying);
  };

  // Прогресс
  const handleProgressChange = (e) => {
    const vid = videoRef.current;
    if (!vid) return;

    const newTime = (e.target.value / 100) * vid.duration;
    vid.currentTime = newTime;
    setProgress((vid.currentTime / vid.duration) * 100);
    if (!isPlaying) vid.play();
    setIsPlaying(true);
  };

  // Обновление прогресса
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const updateProgress = () => setProgress((vid.currentTime / vid.duration) * 100);
    vid.addEventListener("timeupdate", updateProgress);
    return () => vid.removeEventListener("timeupdate", updateProgress);
  }, []);

  // Звук
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = isMuted;
  }, [isMuted]);

  // **IntersectionObserver для автоплей и сброса**
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.currentTime = 0; // сброс при появлении
          vid.play();
          setIsPlaying(true);
        } else {
          vid.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.7 } // 70% видимости
    );

    observer.observe(vid);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="video-card">
      <video
        ref={videoRef}
        src={video.url}
        loop
        muted={isMuted}
        playsInline
        className="video"
        onClick={togglePlay}
      />

      <div className={`pause-overlay ${isPlaying ? "" : "show"}`}>⏸</div>

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
        className="video-progress"
      />

      <div className="video-info">
        <h4>@{video.author}</h4>
        <p>{video.description}</p>
      </div>

      <div className="video-actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLike(e);
          }}
          className={liked ? "like-btn liked" : "like-btn"}
        >
          ❤️
        </button>
        <span>{likes}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleComments(e);
          }}
          className="action-btn"
        >
          💬
        </button>
        <button className="action-btn">🔗</button>
        <button className="music-btn">🎵</button>
      </div>

      {showComments && (
        <div className="comments-container show">
          {video.comments && video.comments.length > 0
            ? video.comments.map((c) => (
                <div key={c.id} className="comment">
                  <span className="comment-text">{c.text}</span>
                  <span className="comment-likes">❤️ {c.likes}</span>
                </div>
              ))
            : <div className="comment">Нет комментариев</div>}
        </div>
      )}
    </div>
  );
};

export default VideoCard;
