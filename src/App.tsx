import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LoadingProvider } from './context/LoadingContext';
import MainContainer from './components/MainContainer';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
lenis.on('scroll', ScrollTrigger.update);

export default function App() {
  return (
    <LoadingProvider>
      <MainContainer />
    </LoadingProvider>
  );
}
