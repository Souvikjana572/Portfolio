import React from "react";

const EMBED_SRC =
  "https://open.spotify.com/embed/track/4Q0qVhFQa7j6jRKzo3HDmP?utm_source=generator";

export default function MusicPlayer({ src = EMBED_SRC }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 w-[min(92vw,360px)]">
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: "12px" }}
        src={src}
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify player"
      />
    </div>
  );
}
