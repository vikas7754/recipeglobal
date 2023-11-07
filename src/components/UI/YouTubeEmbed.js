import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

function YouTubeEmbed({ video, title = "" }) {
  return (
    <div style={{ borderRadius: "20px", overflow: "hidden" }}>
      <LiteYouTubeEmbed id={video} title={title} />
    </div>
  );
}

export default YouTubeEmbed;
