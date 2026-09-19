import { useEffect, useRef } from 'react';

// How many pixels of scroll advance the footage by one second.
// Lower = video cycles faster while scrolling, higher = slower/subtler.
const PX_PER_SECOND = 220;

const mod = (n, m) => ((n % m) + m) % m;

const VideoBackground = () => {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const readyRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => {
      readyRef.current = true;
    };
    video.addEventListener('loadedmetadata', onLoaded);
    video.load();
    return () => video.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const update = () => {
      if (readyRef.current && video.duration) {
        const raw = window.scrollY / PX_PER_SECOND;
        const looped = mod(raw, video.duration);
        if (Math.abs(video.currentTime - looped) > 0.02) {
          video.currentTime = looped;
        }
      }
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-primary-950">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
        src="/videos/hero-smile.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/75 via-primary-950/55 to-primary-950/80" />
    </div>
  );
};

export default VideoBackground;
