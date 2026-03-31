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
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const currentTrack = tracks[currentTrackIndex];
  const volumePercentage = Math.round(volume * 100);
  const didRestoreTimeRef = useRef(false);
  const storedTimeRef = useRef(0);
  const lastVolumeRef = useRef(0.7);

  useEffect(() => {
    const storedTrack = getStoredNumber("music-player-track", 0);
    const safeTrack =
      Number.isInteger(storedTrack) && storedTrack >= 0 && storedTrack < tracks.length
        ? storedTrack
        : 0;
    const storedTime = getStoredNumber("music-player-time", 0);
    const storedVolume = getStoredNumber("music-player-volume", 0.7);

    storedTimeRef.current = storedTime;

    queueMicrotask(() => {
      setCurrentTrackIndex(safeTrack);
      setCurrentTime(storedTime);
      setVolume(storedVolume);
      lastVolumeRef.current = storedVolume > 0 ? storedVolume : 0.7;
    });
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = storedTimeRef.current;
    didRestoreTimeRef.current = true;
  }, [currentTrackIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    window.localStorage.setItem("music-player-volume", String(volume));
    if (volume > 0) {
      lastVolumeRef.current = volume;
    }
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

  async function handleTogglePlayback() {
    if (!audioRef.current) return;

    enforceNormalPlayback();

    if (audioRef.current.paused) {
      try {
        await audioRef.current.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    audioRef.current.pause();
  }

  function handleToggleMute() {
    if (volume === 0) {
      setVolume(lastVolumeRef.current > 0 ? lastVolumeRef.current : 0.7);
      return;
    }

    lastVolumeRef.current = volume;
    setVolume(0);
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
  const mobileProgress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => {
          enforceNormalPlayback();
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onRateChange={enforceNormalPlayback}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => handleTrackChange(currentTrackIndex + 1)}
      />

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/96 shadow-[0_-12px_30px_rgba(17,17,17,0.08)] backdrop-blur md:hidden">
        <div className="h-1 w-full bg-black/6">
          <div
            className="h-full bg-[#E8452C] transition-[width] duration-300"
            style={{width: `${mobileProgress}%`}}
          />
        </div>

        <div className="container-site py-2.5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleTogglePlayback}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white transition hover:bg-[#E8452C]"
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
              className="min-w-0 flex-1 text-left"
              aria-label="Informacion de reproduccion"
            >
              <p className="truncate text-sm font-semibold leading-tight text-black">
                {currentTrack.title}
              </p>
              <p className="mt-0.5 truncate text-xs text-zinc-500">
                {formatTime(currentTime)} / {formatTime(duration)}
              </p>
            </button>

            <button
              type="button"
              onClick={handleToggleMute}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black transition hover:border-black/20 hover:bg-zinc-50"
              aria-label={volume === 0 ? "Activar sonido" : "Silenciar"}
            >
              {volume === 0 ? (
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
                    d="M15.5 8.43A4.985 4.985 0 0 1 17 12c0 1.126-.5 2.5-1.5 3.5m2.864-9.864A8.972 8.972 0 0 1 21 12c0 2.023-.5 4.5-2.5 6M7.8 7.5l2.56-2.133a1 1 0 0 1 1.64.768V12m0 4.5v1.365a1 1 0 0 1-1.64.768L6 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1m1-4 14 14"
                  />
                </svg>
              ) : (
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
                    d="M17.5 8.43A4.985 4.985 0 0 1 19 12a4.984 4.984 0 0 1-1.43 3.5M14 6.135v11.73a1 1 0 0 1-1.64.768L8 15H6a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h2l4.36-3.633a1 1 0 0 1 1.64.768Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 hidden border-t border-black/10 bg-white/95 backdrop-blur md:block">
        <div className="container-site py-2.5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
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
                  onClick={handleTogglePlayback}
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
