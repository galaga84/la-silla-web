"use client";

import {useEffect, useRef, useState} from "react";

type Track = {
  title: string;
  artist: string;
  src: string;
};

const tracks: Track[] = [
  {
    title: "Demo Track 01",
    artist: "La Silla Sessions",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Demo Track 02",
    artist: "La Silla Sessions",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Demo Track 03",
    artist: "La Silla Sessions",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

function getStoredNumber(key: string, fallback: number) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const value = Number(window.localStorage.getItem(key));
  return Number.isNaN(value) ? fallback : value;
}

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    const value = getStoredNumber("music-player-track", 0);
    return Number.isInteger(value) && value >= 0 && value < tracks.length ? value : 0;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(() =>
    getStoredNumber("music-player-time", 0),
  );
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => getStoredNumber("music-player-volume", 0.7));
  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = currentTime;
  }, [currentTrackIndex, currentTime]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    window.localStorage.setItem("music-player-volume", String(volume));
  }, [volume]);

  useEffect(() => {
    window.localStorage.setItem("music-player-track", String(currentTrackIndex));
  }, [currentTrackIndex]);

  useEffect(() => {
    window.localStorage.setItem("music-player-time", String(currentTime));
  }, [currentTime]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      void audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      return;
    }

    audioRef.current.pause();
  }, [isPlaying, currentTrackIndex]);

  function handleLoadedMetadata() {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration || 0);
  }

  function handleTimeUpdate() {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  }

  function handleTrackChange(nextIndex: number) {
    const safeIndex = (nextIndex + tracks.length) % tracks.length;
    setCurrentTrackIndex(safeIndex);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }

  function handleSeek(value: number) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => handleTrackChange(currentTrackIndex + 1)}
      />

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 backdrop-blur">
        <div className="container-site py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                Reproductor
              </p>
              <div className="mt-1 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleTrackChange(currentTrackIndex - 1)}
                  className="rounded-full border border-black/10 px-3 py-2 text-sm text-black transition hover:border-black/25"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying((value) => !value)}
                  className="rounded-full bg-black px-4 py-2 text-sm text-white transition hover:bg-[#E8452C]"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                  type="button"
                  onClick={() => handleTrackChange(currentTrackIndex + 1)}
                  className="rounded-full border border-black/10 px-3 py-2 text-sm text-black transition hover:border-black/25"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="min-w-0 flex-1 lg:px-6">
              <p className="truncate text-sm font-semibold text-black">
                {currentTrack.title}
              </p>
              <p className="truncate text-sm text-zinc-500">{currentTrack.artist}</p>

              <div className="mt-3 flex items-center gap-3">
                <span className="w-10 text-xs text-zinc-500">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={1}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={(event) => handleSeek(Number(event.target.value))}
                  className="w-full accent-[#E8452C]"
                />
                <span className="w-10 text-right text-xs text-zinc-500">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 lg:w-44">
              <label htmlFor="player-volume" className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Vol
              </label>
              <input
                id="player-volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                className="w-full accent-[#E8452C]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
