import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleField from './Character/ParticleField';
import { CLIENT } from '../data/content';
import styles from './styles/TechStack.module.css';

gsap.registerPlugin(ScrollTrigger);

const CIRCUMFERENCE = 2 * Math.PI * 45;

export default function TechStack() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-skill-ring]', {
        strokeDasharray: CIRCUMFERENCE,
        strokeDashoffset: CIRCUMFERENCE
      });

      gsap.from('[data-skill-card]', {
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-skill-grid]',
          start: 'top 78%'
        }
      });

      gsap.utils.toArray<SVGCircleElement>('[data-skill-ring]').forEach((ring) => {
        const percent = Number(ring.dataset.percent || '0');
        gsap.to(ring, {
          strokeDashoffset: CIRCUMFERENCE * (1 - percent / 100),
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ring,
            start: 'top 82%',
            once: true
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className={styles.section}>
      <div className={styles.wireframe}>
        <ParticleField variant="wireframe" />
      </div>
      <div className={styles.inner}>
        <p className={styles.label}>Skills</p>
        <h2 className={styles.title}>Measured strengths for legal practice.</h2>
        <div data-skill-grid className={styles.grid}>
          {CLIENT.skills.map((skill) => (
            <article key={skill.name} data-skill-card className={styles.skill}>
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle className={styles.ringBg} cx="50" cy="50" r="45" />
                <circle
                  data-skill-ring
                  data-percent={skill.percent}
                  className={styles.ring}
                  cx="50"
                  cy="50"
                  r="45"
                />
              </svg>
              <strong className={styles.percent}>{skill.percent}%</strong>
              <span className={styles.name}>{skill.name}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
