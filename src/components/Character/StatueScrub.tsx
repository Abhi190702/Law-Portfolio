import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type StatueScrubProps = {
  images?: HTMLImageElement[];
};

const STATUE_FRAME_COUNT = 240;
const STATUE_ASSET_VERSION = 'statue-240-20260522';

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvas.width / canvas.height;
  let sx = 0;
  let sy = 0;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;

  if (imgRatio > canvasRatio) {
    sw = img.naturalHeight * canvasRatio;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / canvasRatio;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
}

function localImages() {
  const mobileOptimized = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
  const step = mobileOptimized ? 6 : 1;
  const frames: HTMLImageElement[] = [];

  for (let frame = 1; frame <= STATUE_FRAME_COUNT; frame += step) {
    const image = new Image();
    const number = String(frame).padStart(3, '0');
    image.src = `/assets/images/statue/ezgif-frame-${number}.jpg?v=${STATUE_ASSET_VERSION}`;
    frames.push(image);
  }

  if (frames.length && !frames[frames.length - 1].src.includes('ezgif-frame-240.jpg')) {
    const image = new Image();
    image.src = `/assets/images/statue/ezgif-frame-240.jpg?v=${STATUE_ASSET_VERSION}`;
    frames.push(image);
  }

  return frames;
}

export default function StatueScrub({ images }: StatueScrubProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(-1);

  useEffect(() => {
    if (images?.length) {
      framesRef.current = images;
    }
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    if (images && images.length === 0) return undefined;

    framesRef.current = images?.length ? images : localImages();
    if (!framesRef.current.length) return undefined;

    const mobileOptimized = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;

    const setCanvasSize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1 : 1.5);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      const frame = framesRef.current[Math.max(0, currentFrame.current)] || framesRef.current[0];
      if (frame?.complete && frame.naturalWidth) {
        drawCover(ctx, frame, canvas);
      }
    };

    const drawFrame = (index: number) => {
      const safeIndex = Math.min(Math.max(index, 0), framesRef.current.length - 1);
      if (safeIndex === currentFrame.current) return;
      const frame = framesRef.current[safeIndex];
      if (!frame || !frame.complete || !frame.naturalWidth) return;
      currentFrame.current = safeIndex;
      canvas.dataset.frame = String(safeIndex);
      canvas.dataset.frames = String(framesRef.current.length);
      requestAnimationFrame(() => drawCover(ctx, frame, canvas));
    };

    setCanvasSize();

    const firstFrame = framesRef.current[0];
    if (firstFrame?.complete && firstFrame.naturalWidth) {
      drawCover(ctx, firstFrame, canvas);
    } else if (firstFrame) {
      firstFrame.addEventListener('load', () => drawCover(ctx, firstFrame, canvas), { once: true });
    }

    let autoRaf = 0;
    let autoActive = false;
    let lastAutoTime = 0;

    const startAutoPlay = () => {
      if (autoRaf) return;

      const tick = (time: number) => {
        if (!autoActive) {
          autoRaf = 0;
          return;
        }

        if (time - lastAutoTime > 120) {
          const nextFrame = (Math.max(currentFrame.current, 0) + 1) % framesRef.current.length;
          drawFrame(nextFrame);
          lastAutoTime = time;
        }

        autoRaf = requestAnimationFrame(tick);
      };

      autoRaf = requestAnimationFrame(tick);
    };

    const trigger = ScrollTrigger.create({
      trigger: '#home',
      start: mobileOptimized ? 'top bottom' : 'top top',
      end: mobileOptimized ? 'bottom top' : 'bottom bottom',
      scrub: mobileOptimized ? 0.25 : 0.6,
      onUpdate: (self) => {
        const frameCount = framesRef.current.length;
        const index = Math.min(Math.floor(self.progress * frameCount), frameCount - 1);
        drawFrame(index);
      },
      onToggle: (self) => {
        if (!mobileOptimized) return;
        autoActive = self.isActive;
        if (autoActive) startAutoPlay();
      }
    });

    window.addEventListener('resize', setCanvasSize);

    return () => {
      autoActive = false;
      cancelAnimationFrame(autoRaf);
      trigger.kill();
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [images]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
