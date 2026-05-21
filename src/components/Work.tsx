import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLIENT } from '../data/content';
import styles from './styles/Work.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-work-card]', {
        y: 42,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 78%'
        }
      });

      gsap.fromTo(progressRef.current, {
        scaleX: 0
      }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 72%',
          scrub: 0.6
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 12,
      rotateX: -y * 12,
      transformPerspective: 800,
      ease: 'power2.out',
      duration: 0.4
    });
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    gsap.to(event.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out'
    });
  };

  return (
    <section ref={sectionRef} id="work" className={styles.section}>
      <div className={styles.heading}>
        <p className={styles.label}>Freelance Work</p>
        <h2 className={styles.title}>Documents, research, and advice built for action.</h2>
        <div className={styles.rail} aria-hidden="true">
          <span ref={progressRef} />
        </div>
      </div>
      <div className={styles.track}>
        <div ref={cardsRef} className={styles.cards}>
          {CLIENT.work.map((item, index) => (
            <article
              key={item.title}
              className={styles.card}
              data-work-card
              data-cursor="VIEW"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <span className={styles.number}>0{index + 1}</span>
              <span className={styles.type}>{item.type}</span>
              <h3>{item.title}</h3>
              <div className={styles.client}>{item.client}</div>
              <p>{item.description}</p>
              <div className={styles.tags}>
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <div className={styles.year}>{item.year}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
