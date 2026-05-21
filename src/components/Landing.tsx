import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import StatueScrub from './Character/StatueScrub';
import ParticleField from './Character/ParticleField';
import { CLIENT } from '../data/content';
import styles from './styles/Landing.module.css';

type LandingProps = {
  images: HTMLImageElement[];
};

export default function Landing({ images }: LandingProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-line]', {
        yPercent: 110,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.2
      });
      gsap.from('[data-hero-meta]', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.65
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className={styles.section}>
      <div className={styles.stickyContainer}>
        <StatueScrub images={images} />
        <div className={styles.particles}>
          <ParticleField />
        </div>
        <div className={styles.overlay} />
        <div className={styles.watermarkPatch} aria-hidden="true">
          <img src={CLIENT.assets.logo} alt="" />
          <span>LT Brief</span>
        </div>
        <div className={styles.heroText}>
          <p data-hero-meta className={styles.eyebrow}>{CLIENT.hero.eyebrow}</p>
          <h1 aria-label={CLIENT.hero.headline.replace('\n', ' ')}>
            {CLIENT.hero.headline.split('\n').map((line) => (
              <span key={line} data-hero-line>{line}<br /></span>
            ))}
          </h1>
          <p data-hero-meta className={styles.subtitle}>{CLIENT.name} — {CLIENT.title}</p>
          <a data-hero-meta href="#about" className={styles.ctaBtn}>{CLIENT.hero.cta}</a>
        </div>
        <div className={styles.crawlWrapper}>
          <p className={styles.crawlText}>{CLIENT.hero.quote}</p>
        </div>
        <div className={styles.scrollIndicator}>
          <span>{CLIENT.hero.scroll}</span>
          <div className={styles.scrollLine} />
        </div>
      </div>
    </section>
  );
}
