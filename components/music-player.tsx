"use client";

import {useEffect, useRef, useState} from "react";

type Track = {
  title: string;
  artist: string;
  src: string;
};

const tracks: Track[] = [
  {
    title: "Punsetes",
    artist: "La Silla Sessions",
    src: "/audio/punsetes.mp3",
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
  const volumePercentage = Math.round(volume * 100);
  const didRestoreTimeRef = useRef(false);
  const storedTimeRef = useRef(currentTime);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = storedTimeRef.current;
    didRestoreTimeRef.current = true;
  }, [currentTrackIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    window.localStorage.setItem("music-player-volume", String(volume));
  }, [volume]);

  useEffect(() => {
    window.localStorage.setItem("music-player-track", String(currentTrackIndex));
  }, [currentTrackIndex]);

  useEffect(() => {
    storedTimeRef.current = currentTime;
    window.localStorage.setItem("music-player-time", String(currentTime));
  }, [currentTime]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = 1;
    audioRef.current.defaultPlaybackRate = 1;

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
    audioRef.current.playbackRate = 1;
    audioRef.current.defaultPlaybackRate = 1;
    if (!didRestoreTimeRef.current && storedTimeRef.current > 0) {
      audioRef.current.currentTime = storedTimeRef.current;
      didRestoreTimeRef.current = true;
    }
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
    didRestoreTimeRef.current = false;

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }

  function handleSeek(value: number) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  }

  function enforceNormalPlayback() {
    if (!audioRef.current) return;
    if (audioRef.current.playbackRate !== 1) {
      audioRef.current.playbackRate = 1;
    }
    if (audioRef.current.defaultPlaybackRate !== 1) {
      audioRef.current.defaultPlaybackRate = 1;
    }
  }

  const controlBaseClassName =
    "flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:border-black/20 hover:bg-zinc-50";

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={enforceNormalPlayback}
        onRateChange={enforceNormalPlayback}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => handleTrackChange(currentTrackIndex + 1)}
      />

      <div className="fixed inset-x-0 bottom-0 z-50 hidden border-t border-black/10 bg-white/95 backdrop-blur md:block">
        <div className="container-site py-2.5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                Reproductor
              </p>
              <div className="mt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTrackChange(currentTrackIndex - 1)}
                  className={controlBaseClassName}
                  aria-label="Pista anterior"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m15 19-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying((value) => !value)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-[#E8452C]"
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? (
                    <span className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="h-4 w-1 rounded-full bg-current" />
                      <span className="h-4 w-1 rounded-full bg-current" />
                    </span>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleTrackChange(currentTrackIndex + 1)}
                  className={controlBaseClassName}
                  aria-label="Siguiente pista"
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m9 5 7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="min-w-0 flex-1 lg:px-5">
              <p className="truncate text-sm font-semibold leading-none text-black">
                {currentTrack.title}
              </p>
              <p className="mt-1 truncate text-xs text-zinc-500">{currentTrack.artist}</p>

              <div className="mt-2 flex items-center gap-2.5">
                <span className="w-9 text-[11px] text-zinc-500">
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
                <span className="w-9 text-right text-[11px] text-zinc-500">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-3 py-2 shadow-[0_10px_24px_rgba(17,17,17,0.06)] lg:w-52">
              <label
                htmlFor="player-volume"
                className="text-[10px] uppercase tracking-[0.2em] text-zinc-500"
              >
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
              <span className="min-w-9 text-right text-[11px] font-medium tabular-nums text-zinc-500">
                {volumePercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
