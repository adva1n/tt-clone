import VideoCard from "../video/VideoCard";
import { videos } from "../../data/videos";

const VideoFeed = () => {
  return (
    <div className="feed">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoFeed;
