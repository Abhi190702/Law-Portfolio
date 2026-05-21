import { motion } from 'motion/react';
import { ArrowUpRight, Facebook, FileText, Instagram, Music2, Twitter, Youtube } from 'lucide-react';
import { CLIENT } from '../data/content';
import styles from './styles/Footer.module.css';

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4';

type FooterLink = {
  label: string;
  href: string;
  download?: boolean;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const footerColumns: FooterColumn[] = [
  {
    title: 'Discover',
    links: [
      { label: 'Legal Research', href: '#skills' },
      { label: 'Drafting Work', href: '#work' },
      { label: 'Education Record', href: '#education' },
      { label: 'Resume PDF', href: CLIENT.assets.resume, download: true },
      { label: 'Contact Brief', href: '#contact' }
    ]
  },
  {
    title: 'The Mission',
    links: [
      { label: 'Profile', href: '#about' },
      { label: 'Client Clarity', href: '#work' },
      { label: 'Practice Signals', href: '#skills' },
      { label: 'Verdict Statement', href: '#verdict' }
    ]
  },
  {
    title: 'Concierge',
    links: [
      { label: 'Get in Touch', href: `mailto:${CLIENT.email}` },
      { label: 'LinkedIn', href: CLIENT.linkedin, external: true },
      { label: 'Privacy on Request', href: '#contact' },
      { label: 'Report Concern', href: '#contact' }
    ]
  }
];

const socials = [
  { label: 'Music', href: '#home', Icon: Music2 },
  { label: 'Facebook', href: '#contact', Icon: Facebook },
  { label: 'Twitter', href: '#contact', Icon: Twitter },
  { label: 'Youtube', href: '#contact', Icon: Youtube },
  { label: 'Instagram', href: '#contact', Icon: Instagram }
];

export default function Footer() {
  return (
    <div className={styles.section}>
      <video className={styles.video} autoPlay loop muted playsInline src={VIDEO_SRC} />
      <div className={styles.shade} />
      <div className={styles.container}>
        <div className={styles.cta}>
          <p>Final Brief</p>
          <h2>Prepared, precise, and ready for the next matter.</h2>
          <a href="#contact">
            Start a Conversation
            <ArrowUpRight size={16} />
          </a>
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          className={`${styles.footer} liquid-glass w-full rounded-3xl p-6 md:p-10 text-white/70 mt-32 md:mt-64`}
        >
          <div className={styles.topGrid}>
            <div className={styles.brandColumn}>
              <div className={styles.brand}>
                <span className={styles.brandMark}>
                  <img src={CLIENT.assets.logo} alt={`${CLIENT.name} logo`} />
                </span>
                <span>{CLIENT.name}</span>
              </div>
              <p>
                A law student portfolio built around legal research, contract clarity,
                disciplined drafting, and client-ready communication.
              </p>
              <a className={styles.resumeLink} href={CLIENT.assets.resume} download="Lakshya_Tyagi_CV.pdf">
                <FileText size={16} />
                Download Resume PDF
              </a>
            </div>

            <div className={styles.linksGrid}>
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3>{column.title}</h3>
                  <ul>
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          download={link.download ? 'Lakshya_Tyagi_CV.pdf' : undefined}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noreferrer' : undefined}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.bottomBar}>
            <p>Curated for {CLIENT.name}</p>
            <div className={styles.socials}>
              <span>Join the Journey:</span>
              <div>
                {socials.map(({ label, href, Icon }) => (
                  <a key={label} href={href} aria-label={label}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
