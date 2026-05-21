import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail, MapPin } from 'lucide-react';
import { CLIENT } from '../data/content';
import styles from './styles/Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

function encodeForm(formData: FormData) {
  return Array.from(formData.entries())
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const checkRef = useRef<SVGPathElement | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('[data-contact-word]', {
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.9,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set('form-name', 'contact');
    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm(formData)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setSubmitted(true);
      requestAnimationFrame(() => {
        if (checkRef.current) {
          gsap.fromTo(checkRef.current, {
            strokeDashoffset: 72
          }, {
            strokeDashoffset: 0,
            duration: 0.7,
            ease: 'power2.out'
          });
        }
      });
      form.reset();
    } catch {
      setSubmitError('Could not send this brief. Please use the email link.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className={styles.section}>
      <div className={styles.inner}>
        <div>
          <p className={styles.label}>{CLIENT.contact.label}</p>
          <h2 className={styles.heading}>
            {CLIENT.contact.heading.map((word) => <span key={word} data-contact-word>{word}</span>)}
          </h2>
          <div className={styles.links}>
            <a href={`mailto:${CLIENT.email}`}><Mail size={16} />{CLIENT.email}</a>
            <a href={CLIENT.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} />LinkedIn</a>
            <span><MapPin size={16} />{CLIENT.location}</span>
          </div>
          <a className={styles.resumeCard} href={CLIENT.assets.resume} download="Lakshya_Tyagi_CV.pdf">
            <img src={CLIENT.assets.logo} alt="" aria-hidden="true" />
            <span>
              <strong>Resume PDF</strong>
              <small>Download Lakshya Tyagi CV</small>
            </span>
          </a>
        </div>
        <form className={styles.form} name="contact" method="POST" data-netlify="true" action="/" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="contact" />
          <div className={styles.field}>
            <input id="name" name="name" type="text" placeholder=" " required />
            <label htmlFor="name">Name</label>
          </div>
          <div className={styles.field}>
            <input id="email" name="email" type="email" placeholder=" " required />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles.field}>
            <select id="subject" name="subject" required defaultValue={CLIENT.contact.subjects[0]}>
              {CLIENT.contact.subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
            </select>
            <label htmlFor="subject">Subject</label>
          </div>
          <div className={styles.field}>
            <textarea id="message" name="message" placeholder=" " required />
            <label htmlFor="message">Message</label>
          </div>
          <button className={styles.submit} type="submit" disabled={submitting}>
            {submitting ? 'Sending...' : CLIENT.contact.submit}
          </button>
          {submitError && <p className={styles.error}>{submitError}</p>}
          <div className={`${styles.success} ${submitted ? styles.visible : ''}`} aria-live="polite">
            <svg viewBox="0 0 80 80" aria-hidden="true">
              <path ref={checkRef} d="M18 42l14 14 30-34" />
            </svg>
            <span>{CLIENT.contact.success}</span>
          </div>
        </form>
      </div>
    </section>
  );
}
