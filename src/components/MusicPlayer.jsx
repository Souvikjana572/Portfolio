import React, { useEffect, useRef, useState } from "react";

// Looks for an audio file at `public/music.mp3`.
// If you don't have one, the button will disable itself.
const DEFAULT_SRC = "/music.mp3";

export default function MusicPlayer({ src = DEFAULT_SRC }) {
  const audioRef = useRef(null);
  const [ready, setReady] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => setPlaying(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !ready) return;

    try {
      if (audio.paused) await audio.play();
      else audio.pause();
    } catch {
      // Autoplay restrictions or missing file — disable UI gracefully.
      setReady(false);
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onError={() => {
          setReady(false);
          setPlaying(false);
        }}
      />

      <button
        type="button"
        onClick={toggle}
        disabled={!ready}
        className="fixed bottom-5 right-5 z-50 rounded-full px-4 py-2 text-sm font-semibold
          bg-white/10 text-white border border-white/20 backdrop-blur
          hover:bg-white/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={playing ? "Pause music" : "Play music"}
        title={
          ready
            ? playing
              ? "Pause music"
              : "Play music"
            : "Add public/music.mp3 to enable"
        }
      >
        {ready ? (playing ? "Pause" : "Play") : "No audio"}
      </button>
    </>
  );
}

