import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLIENT } from '../data/content';
import styles from './styles/Career.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Career() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<SVGLineElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 35%',
            scrub: true
          }
        });
      }

      gsap.utils.toArray<HTMLElement>('[data-career-card]').forEach((card, index) => {
        gsap.from(card, {
          x: index % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 75%'
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="education" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>Education</p>
        <h2 className={styles.title}>The record so far.</h2>
        <div className={styles.timeline}>
          <svg className={styles.line} viewBox="0 0 2 1000" preserveAspectRatio="none" aria-hidden="true">
            <line ref={lineRef} x1="1" y1="0" x2="1" y2="1000" />
          </svg>
          {CLIENT.education.map((item) => (
            <div key={`${item.degree}-${item.year}`} data-career-card className={styles.card}>
              <span className={styles.year}>{item.year}</span>
              <h3>{item.degree}</h3>
              <p>{item.institution}</p>
              {item.score && <strong>{item.score}</strong>}
              {item.courses.length > 0 && (
                <ul className={styles.courses}>
                  {item.courses.map((course) => <li key={course}>{course}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
