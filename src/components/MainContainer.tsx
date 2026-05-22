import { useEffect, useState } from 'react';
import Loader from './Loader';
import Cursor from './Cursor';
import Navbar from './Navbar';
import Landing from './Landing';
import About from './About';
import Career from './Career';
import Work from './Work';
import TechStack from './TechStack';
import Verdict from './Verdict';
import Contact from './Contact';
import Footer from './Footer';
import { useLoading } from '../context/LoadingContext';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STATUE_FRAME_COUNT = 240;
const HAMMER_FRAME_COUNT = 50;
const STATUE_ASSET_VERSION = 'statue-240-20260522';

function frameRange(count: number, step: number) {
  const frames: number[] = [];
  for (let frame = 1; frame <= count; frame += step) {
    frames.push(frame);
  }
  if (frames[frames.length - 1] !== count) {
    frames.push(count);
  }
  return frames;
}

export default function MainContainer() {
  const { setProgress } = useLoading();
  const [statueImages, setStatueImages] = useState<HTMLImageElement[]>([]);
  const [hammerImages, setHammerImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const statue: HTMLImageElement[] = [];
    const hammer: HTMLImageElement[] = [];
    let loaded = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobileOptimized = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    const statueFrames = frameRange(STATUE_FRAME_COUNT, mobileOptimized || prefersReducedMotion ? 6 : 1);
    const hammerFrames = frameRange(HAMMER_FRAME_COUNT, mobileOptimized || prefersReducedMotion ? 2 : 1);
    const total = statueFrames.length + hammerFrames.length;

    const onLoad = () => {
      loaded += 1;
      setProgress(Math.floor((loaded / total) * 100));
      if (loaded === total) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };

    statueFrames.forEach((i) => {
      const img = new Image();
      const n = String(i).padStart(3, '0');
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = `/assets/images/statue/ezgif-frame-${n}.jpg?v=${STATUE_ASSET_VERSION}`;
      statue.push(img);
    });

    hammerFrames.forEach((i) => {
      const img = new Image();
      const n = String(i).padStart(3, '0');
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = `/assets/images/hammer/ezgif-frame-${n}.jpg`;
      hammer.push(img);
    });

    setStatueImages(statue);
    setHammerImages(hammer);
  }, [setProgress]);

  return (
    <>
      <Loader />
      <Cursor />
      <Navbar />
      <main>
        <Landing images={statueImages} />
        <About />
        <Career />
        <Work />
        <TechStack />
        <Verdict images={hammerImages} />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
