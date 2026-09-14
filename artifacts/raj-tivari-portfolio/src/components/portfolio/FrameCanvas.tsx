import { useEffect, useRef } from 'react';

const FRAME_COUNT = 238;
const FRAME_PATH = (frame: number) =>
  `/frames/ezgif-frame-${String(frame + 1).padStart(3, '0')}.jpg`;

type FrameCanvasProps = {
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
};

export function FrameCanvas({ onProgress, onComplete }: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageCache = useRef(new Map<number, HTMLImageElement>());
  const requestRef = useRef<number | null>(null);
  const targetProgress = useRef(0);
  const renderedProgress = useRef(0);
  const reducedMotion = useRef(false);
  const onProgressRef = useRef(onProgress);
  const onCompleteRef = useRef(onComplete);

  onProgressRef.current = onProgress;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let destroyed = false;
    let lastPaintedFrame = -1;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      lastPaintedFrame = -1;
    };

    const loadFrame = (frame: number) => {
      if (imageCache.current.has(frame)) return imageCache.current.get(frame);
      const image = new Image();
      image.decoding = 'async';
      image.src = FRAME_PATH(frame);
      imageCache.current.set(frame, image);
      return image;
    };

    const draw = (frame: number) => {
      const image = loadFrame(frame);
      if (!image?.complete || !image.naturalWidth) return;
      if (lastPaintedFrame === frame) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.fillStyle = '#080b0c';
      context.fillRect(0, 0, width, height);
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
      lastPaintedFrame = frame;
    };

    const preloadAround = (frame: number) => {
      const radius = window.innerWidth < 700 ? 3 : 7;
      for (let offset = -radius; offset <= radius; offset += 1) {
        const next = Math.max(0, Math.min(FRAME_COUNT - 1, frame + offset));
        const image = loadFrame(next);
        image?.decode?.().catch(() => undefined);
      }
      if (imageCache.current.size > 28) {
        for (const key of imageCache.current.keys()) {
          if (Math.abs(key - frame) > 15) imageCache.current.delete(key);
        }
      }
    };

    const getProgress = () => {
      const start = section.offsetTop;
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      return Math.max(0, Math.min(1, (window.scrollY - start) / travel));
    };

    const paint = () => {
      if (destroyed) return;
      const progress = reducedMotion.current
        ? 0
        : renderedProgress.current + (targetProgress.current - renderedProgress.current) * 0.14;
      renderedProgress.current = Math.abs(progress - targetProgress.current) < 0.001
        ? targetProgress.current
        : progress;
      const frame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(renderedProgress.current * (FRAME_COUNT - 1))));
      preloadAround(frame);
      draw(frame);
      onProgressRef.current?.(renderedProgress.current);
      if (targetProgress.current >= 0.995) onCompleteRef.current?.();
      requestRef.current = window.requestAnimationFrame(paint);
    };

    const onScroll = () => {
      targetProgress.current = getProgress();
    };

    resize();
    loadFrame(0)?.decode?.().catch(() => undefined);
    for (let index = 1; index < 5; index += 1) loadFrame(index);
    targetProgress.current = getProgress();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    requestRef.current = window.requestAnimationFrame(paint);

    return () => {
      destroyed = true;
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      if (requestRef.current) window.cancelAnimationFrame(requestRef.current);
      imageCache.current.clear();
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[360vh] w-full" data-testid="cinematic-intro">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#080b0c]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" aria-label="Scroll-controlled sky journey" />
        <div className="scanlines pointer-events-none absolute inset-0 opacity-50" />
        <div className="hud-grid pointer-events-none absolute inset-0 opacity-45" />
      </div>
    </div>
  );
}