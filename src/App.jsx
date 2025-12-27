import React from "react";
import { videos } from "./data/videos";
import VideoCard from "./components/video/VideoCard";
import SoundButton from "./components/SoundButton";
import useAutoPlayNext from "./hooks/useAutoPlayNext";
import "./styles/video.css";

export default function App() {
  const videoRefs = videos.map(() => React.createRef()); 
  useAutoPlayNext(videoRefs);

  return (
    <div className="home-container">
      <SoundButton />
      <div className="videos-wrapper">
        {videos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            videoRef={videoRefs[index]}
          />
        ))}
      </div>
    </div>
  );
}
