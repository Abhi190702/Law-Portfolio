import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './styles/Cursor.module.css';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState('');
  const [mode, setMode] = useState<'default' | 'hover' | 'view'>('default');

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return undefined;

    const dotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.1, ease: 'power2.out' });
    const dotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.1, ease: 'power2.out' });
    const ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.4, ease: 'power3.out' });
    const ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.4, ease: 'power3.out' });

    const move = (event: MouseEvent) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const enter = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const text = target.dataset.cursor;
      if (text) {
        setLabel(text);
        setMode('view');
      } else {
        setLabel('');
        setMode('hover');
      }
    };

    const leave = () => {
      setLabel('');
      setMode('default');
    };

    window.addEventListener('mousemove', move);
    const targets = document.querySelectorAll<HTMLElement>('a, button, [data-cursor]');
    targets.forEach((target) => {
      target.addEventListener('mouseenter', enter);
      target.addEventListener('mouseleave', leave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      targets.forEach((target) => {
        target.removeEventListener('mouseenter', enter);
        target.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.cursorDot} aria-hidden="true" />
      <div
        ref={ringRef}
        className={`${styles.cursorRing} ${mode === 'hover' ? styles.hover : ''} ${mode === 'view' ? styles.view : ''}`}
        aria-hidden="true"
      >
        {label}
      </div>
    </>
  );
}
