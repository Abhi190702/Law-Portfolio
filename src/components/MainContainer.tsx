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

export default function MainContainer() {
  const { setProgress } = useLoading();
  const [statueImages, setStatueImages] = useState<HTMLImageElement[]>([]);
  const [hammerImages, setHammerImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const statue: HTMLImageElement[] = [];
    const hammer: HTMLImageElement[] = [];
    let loaded = 0;
    const total = STATUE_FRAME_COUNT + HAMMER_FRAME_COUNT;

    const onLoad = () => {
      loaded += 1;
      setProgress(Math.floor((loaded / total) * 100));
      if (loaded === total) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };

    for (let i = 1; i <= STATUE_FRAME_COUNT; i += 1) {
      const img = new Image();
      const n = String(i).padStart(3, '0');
      img.src = `/assets/images/statue/ezgif-frame-${n}.jpg?v=${STATUE_ASSET_VERSION}`;
      img.onload = onLoad;
      img.onerror = onLoad;
      statue.push(img);
    }

    for (let i = 1; i <= HAMMER_FRAME_COUNT; i += 1) {
      const img = new Image();
      const n = String(i).padStart(3, '0');
      img.src = `/assets/images/hammer/ezgif-frame-${n}.jpg`;
      img.onload = onLoad;
      img.onerror = onLoad;
      hammer.push(img);
    }

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
