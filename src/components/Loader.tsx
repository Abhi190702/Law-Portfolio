import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useLoading } from '../context/LoadingContext';
import styles from './styles/Loader.module.css';

export default function Loader() {
  const { progress, setLoaded } = useLoading();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const scalesRef = useRef<SVGSVGElement | null>(null);
  const [visible, setVisible] = useState(true);
  const finished = useRef(false);

  useEffect(() => {
    const paths = scalesRef.current?.querySelectorAll('path');
    if (!paths) return;

    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.05
    });
  }, []);

  useEffect(() => {
    if (progress < 100 || finished.current || !loaderRef.current) return;

    finished.current = true;
    const timeline = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        setLoaded(true);
        setVisible(false);
      }
    });

    timeline
      .to(counterRef.current, { opacity: 0, y: -20, duration: 0.45, ease: 'power2.out' })
      .to(scalesRef.current, { opacity: 0, y: -20, duration: 0.45, ease: 'power2.out' }, '<')
      .to(loaderRef.current, { y: '-100vh', duration: 1, ease: 'power4.inOut' });
  }, [progress, setLoaded]);

  if (!visible) return null;

  return (
    <div ref={loaderRef} className={styles.loader} aria-live="polite">
      <div className={styles.inner}>
        <svg ref={scalesRef} className={styles.scales} viewBox="0 0 220 180" aria-hidden="true">
          <path d="M110 18v132" />
          <path d="M70 48h80" />
          <path d="M70 48l-30 58h60L70 48Z" />
          <path d="M150 48l-30 58h60L150 48Z" />
          <path d="M52 106c5 12 30 12 36 0" />
          <path d="M132 106c5 12 30 12 36 0" />
          <path d="M82 150h56" />
          <path d="M66 166h88" />
        </svg>
        <div ref={counterRef} className={styles.counter}>{Math.round(progress)}%</div>
        <p className={styles.label}>Preparing the brief</p>
      </div>
    </div>
  );
}
