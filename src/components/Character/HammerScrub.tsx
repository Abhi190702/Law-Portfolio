import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type HammerScrubProps = {
  images?: HTMLImageElement[];
};

const HAMMER_COUNT = 50;

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
  return Array.from({ length: HAMMER_COUNT }, (_, index) => {
    const image = new Image();
    const number = String(index + 1).padStart(3, '0');
    image.src = `/assets/images/hammer/ezgif-frame-${number}.jpg`;
    return image;
  });
}

export default function HammerScrub({ images }: HammerScrubProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<HTMLImageElement[]>(images?.length ? images : localImages());
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
      requestAnimationFrame(() => drawCover(ctx, frame, canvas));
    };

    setCanvasSize();

    const firstFrame = framesRef.current[0];
    if (firstFrame?.complete && firstFrame.naturalWidth) {
      drawCover(ctx, firstFrame, canvas);
    } else if (firstFrame) {
      firstFrame.onload = () => drawCover(ctx, firstFrame, canvas);
    }

    const trigger = ScrollTrigger.create({
      trigger: '#verdict',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const index = Math.min(Math.floor(self.progress * HAMMER_COUNT), HAMMER_COUNT - 1);
        drawFrame(index);
      }
    });

    window.addEventListener('resize', setCanvasSize);

    return () => {
      trigger.kill();
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
