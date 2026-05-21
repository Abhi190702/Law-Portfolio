import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CLIENT } from '../data/content';
import styles from './styles/About.module.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let split: SplitText | null = null;
      if (headingRef.current) {
        split = new SplitText(headingRef.current, {
          type: 'words',
          wordsClass: 'split-word'
        });
        gsap.to(split.words, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 78%'
          }
        });
      }

      gsap.from(photoRef.current, {
        x: 90,
        scale: 0.96,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: photoRef.current,
          start: 'top 78%'
        }
      });

      gsap.to(photoRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.from('[data-about-badge]', {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-about-badges]',
          start: 'top 82%'
        }
      });

      return () => split?.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.section}>
      <div className={styles.inner}>
        <div>
          <p className={styles.label}>{CLIENT.about.label}</p>
          <h2 ref={headingRef} className={styles.heading}>{CLIENT.about.heading}</h2>
          <div className={styles.copy}>
            {CLIENT.about.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div data-about-badges className={styles.badges}>
            {CLIENT.skills.slice(0, 4).map((skill, index) => (
              <span
                key={skill.name}
                data-about-badge
                className={styles.badge}
                style={{ animationDelay: `${index * 0.4}s` }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
        <div ref={photoRef} className={styles.photoWrap}>
          <div className={styles.photo}>
            <img src={CLIENT.assets.photo} alt={`${CLIENT.name} portrait`} />
          </div>
          <div className={styles.logoStamp} aria-hidden="true">
            <img src={CLIENT.assets.logo} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
