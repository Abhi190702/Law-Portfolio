import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HammerScrub from './Character/HammerScrub';
import { CLIENT } from '../data/content';
import styles from './styles/Verdict.module.css';

gsap.registerPlugin(ScrollTrigger);

type VerdictProps = {
  images: HTMLImageElement[];
};

export default function Verdict({ images }: VerdictProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const verdictRef = useRef<HTMLDivElement | null>(null);
  const shown = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        if (self.progress > 0.65 && !shown.current) {
          shown.current = true;
          gsap.to(verdictRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power4.out'
          });
        }

        if (self.progress <= 0.58 && shown.current) {
          shown.current = false;
          gsap.to(verdictRef.current, {
            opacity: 0,
            y: 40,
            duration: 0.35,
            ease: 'power2.out'
          });
        }
      }
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} id="verdict" className={styles.section}>
      <div className={styles.stickyContainer}>
        <HammerScrub images={images} />
        <div className={styles.overlay} />
        <div className={styles.watermarkPatch} aria-hidden="true">
          <img src={CLIENT.assets.logo} alt="" />
          <span>LT Verdict</span>
        </div>
        <div ref={verdictRef} className={styles.verdictText}>
          <span className={styles.label}>{CLIENT.verdict.label}</span>
          <h2>
            {CLIENT.verdict.lines[0]}<br />
            {CLIENT.verdict.lines[1]}<br />
            <span className={styles.gold}>{CLIENT.verdict.lines[2]}</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
