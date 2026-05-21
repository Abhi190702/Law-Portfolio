import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CLIENT } from '../data/content';
import styles from './styles/Navbar.module.css';

const links = [
  { label: CLIENT.nav[0], href: '#home' },
  { label: CLIENT.nav[1], href: '#about' },
  { label: CLIENT.nav[2], href: '#education' },
  { label: CLIENT.nav[3], href: '#work' },
  { label: CLIENT.nav[4], href: '#skills' },
  { label: CLIENT.nav[5], href: '#contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('#home');
  const navRef = useRef<HTMLDivElement | null>(null);
  const underlineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    links.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const underline = underlineRef.current;
    const target = nav?.querySelector<HTMLAnchorElement>(`a[href="${active}"]`);
    if (!nav || !underline || !target) return;

    const navRect = nav.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    gsap.to(underline, {
      x: targetRect.left - navRect.left,
      width: targetRect.width,
      duration: 0.45,
      ease: 'power3.out'
    });
  }, [active]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <a className={styles.brand} href="#home" aria-label={`${CLIENT.name} home`}>
          <img src={CLIENT.assets.logo} alt={`${CLIENT.name} logo`} />
        </a>
        <nav ref={navRef} className={styles.nav} aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} className={active === link.href ? styles.active : ''} href={link.href}>
              {link.label}
            </a>
          ))}
          <span ref={underlineRef} className={styles.underline} aria-hidden="true" />
        </nav>
        <a className={styles.resume} href={CLIENT.assets.resume} download="Lakshya_Tyagi_CV.pdf">
          Resume
        </a>
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>
      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOpen : ''}`} aria-hidden={!mobileOpen}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMobile}>
            {link.label}
          </a>
        ))}
        <a href={CLIENT.assets.resume} download="Lakshya_Tyagi_CV.pdf" onClick={closeMobile}>
          Resume
        </a>
      </div>
    </>
  );
}
