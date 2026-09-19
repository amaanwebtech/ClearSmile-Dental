import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaStar, FaChevronDown } from 'react-icons/fa';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const ScrollVideoHero = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => setReady(true);
    video.addEventListener('loadedmetadata', onLoaded);
    video.load();

    return () => video.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, scrollable);
      const p = scrollable > 0 ? scrolled / scrollable : 0;
      setProgress(p);

      if (ready && video.duration) {
        const target = p * video.duration;
        if (Math.abs(video.currentTime - target) > 0.03) {
          video.currentTime = target;
        }
      }
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready]);

  const textOpacity = clamp(1 - progress / 0.35, 0, 1);
  const textShift = clamp(progress / 0.35, 0, 1) * -40;
  const overlayDarkness = 0.55 - clamp(progress, 0, 1) * 0.25;
  const scrollHintOpacity = clamp(1 - progress / 0.12, 0, 1);

  return (
    <section ref={sectionRef} className="relative" style={{ height: '280vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-primary-950">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          src="/videos/hero-smile.mp4"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, rgba(6,43,42,${overlayDarkness + 0.15}) 0%, rgba(6,43,42,${overlayDarkness}) 45%, rgba(6,43,42,${overlayDarkness + 0.2}) 100%)` }}
        />

        <div
          className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
          style={{ opacity: textOpacity, transform: `translateY(${textShift}px)` }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            Trusted Dental Care Since 2010
          </span>
          <h1 className="mt-6 max-w-3xl font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Your Smile Deserves <span className="text-accent-300">Expert Care</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-primary-50 sm:text-lg">
            Advanced technology, a gentle touch, and a team that genuinely cares — welcome to
            comfortable, premium dental care.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/appointment"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary-800 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-primary-50"
            >
              <FaCalendarCheck /> Book an Appointment
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Explore Services
            </Link>
          </div>

          <div className="mt-9 flex items-center gap-3 text-white">
            <div className="flex gap-0.5 text-accent-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} size={13} />
              ))}
            </div>
            <p className="text-sm text-primary-50">
              <span className="font-semibold text-white">4,000+</span> happy patients
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white"
          style={{ opacity: scrollHintOpacity }}
        >
          <div className="flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-widest">
            Scroll
            <FaChevronDown className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollVideoHero;
