import { useEffect, useRef } from 'react';

const FRAME_COUNT = 238;
const FRAME_PATH = (frame: number) =>
  `/frames/ezgif-frame-${String(frame + 1).padStart(3, '0')}.jpg`;

type FrameCanvasProps = {
  onProgress?: (progress: number) => void;
  onLoadingProgress?: (progress: number) => void;
  onReady?: () => void;
  onComplete?: () => void;
};

export function FrameCanvas({
  onProgress,
  onLoadingProgress,
  onReady,
  onComplete,
}: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageCache = useRef(new Map<number, HTMLImageElement>());
  const failedFrames = useRef(new Set<number>());
  const requestRef = useRef<number | null>(null);
  const targetProgress = useRef(0);
  const renderedProgress = useRef(0);
  const reducedMotion = useRef(false);
  const onProgressRef = useRef(onProgress);
  const onLoadingProgressRef = useRef(onLoadingProgress);
  const onReadyRef = useRef(onReady);
  const onCompleteRef = useRef(onComplete);

  onProgressRef.current = onProgress;
  onLoadingProgressRef.current = onLoadingProgress;
  onReadyRef.current = onReady;
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let destroyed = false;
    let lastPaintedFrame = -1;
    let lastValidFrame = 0;
    let lastValidImage: HTMLImageElement | null = null;
    let ready = false;
    let loadedCount = 0;
    const requestedFrames = new Set<number>();

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      lastPaintedFrame = -1;
    };

    const isRenderable = (image: HTMLImageElement | undefined) =>
      Boolean(
        image &&
          image.complete &&
          image.naturalWidth > 0 &&
          !failedFrames.current.has(
            Number(image.dataset.frame ?? Number.NaN),
          ),
      );

    const loadFrame = (frame: number) => {
      const safeFrame = Math.max(0, Math.min(FRAME_COUNT - 1, frame));
      const existing = imageCache.current.get(safeFrame);
      if (existing) return existing;

      const image = new Image();
      image.decoding = 'async';
      image.dataset.frame = String(safeFrame);
      image.onload = () => {
        if (destroyed) return;
        loadedCount += 1;
        onLoadingProgressRef.current?.(
          Math.min(1, Math.max(0.08, loadedCount / 12)),
        );
        if (!ready) {
          ready = true;
          onReadyRef.current?.();
        }
      };
      image.onerror = () => {
        failedFrames.current.add(safeFrame);
      };
      image.src = FRAME_PATH(safeFrame);
      imageCache.current.set(safeFrame, image);
      requestedFrames.add(safeFrame);
      return image;
    };

    const nearestLoadedFrame = (frame: number) => {
      const target = Math.max(0, Math.min(FRAME_COUNT - 1, frame));
      for (let distance = 0; distance < FRAME_COUNT; distance += 1) {
        const candidates = [target - distance, target + distance];
        for (const candidate of candidates) {
          if (
            candidate >= 0 &&
            candidate < FRAME_COUNT &&
            isRenderable(imageCache.current.get(candidate))
          ) {
            return candidate;
          }
        }
      }
      return null;
    };

    const drawFallbackAtmosphere = (width: number, height: number) => {
      const gradient = context.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#07131e');
      gradient.addColorStop(0.55, '#102c42');
      gradient.addColorStop(1, '#071013');
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      context.fillStyle = 'rgba(156, 204, 222, 0.08)';
      context.beginPath();
      context.ellipse(
        width * 0.5,
        height * 0.7,
        width * 0.62,
        height * 0.2,
        0,
        0,
        Math.PI * 2,
      );
      context.fill();
    };

    const drawFrame = (requestedFrame: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const frame = nearestLoadedFrame(requestedFrame);
      const image = frame === null ? lastValidImage : imageCache.current.get(frame);

      if (!image || !isRenderable(image)) {
        if (lastValidImage && isRenderable(lastValidImage)) {
          drawFrame(lastValidFrame);
        } else {
          drawFallbackAtmosphere(width, height);
        }
        return;
      }

      if (frame !== null) {
        lastValidFrame = frame;
        lastValidImage = image;
      }

      if (lastPaintedFrame === lastValidFrame && canvas.width > 0) return;

      const imageRatio = image.naturalWidth / image.naturalHeight;
      const viewportRatio = width / height;
      const coverScale = Math.max(
        width / image.naturalWidth,
        height / image.naturalHeight,
      );
      const containScale = Math.min(
        (width * 0.98) / image.naturalWidth,
        (height * 0.9) / image.naturalHeight,
      );

      // Extend the image gently behind the contained frame so tall phones never
      // force the important airplane-window composition to crop.
      context.save();
      context.filter = `blur(${Math.min(24, Math.max(8, width * 0.035))}px) brightness(.62) saturate(.9)`;
      const backgroundWidth = image.naturalWidth * coverScale * 1.08;
      const backgroundHeight = image.naturalHeight * coverScale * 1.08;
      context.drawImage(
        image,
        (width - backgroundWidth) / 2,
        (height - backgroundHeight) / 2,
        backgroundWidth,
        backgroundHeight,
      );
      context.restore();

      context.fillStyle =
        viewportRatio < imageRatio
          ? 'rgba(4, 10, 14, 0.1)'
          : 'rgba(4, 10, 14, 0.06)';
      context.fillRect(0, 0, width, height);

      const frameWidth = image.naturalWidth * containScale;
      const frameHeight = image.naturalHeight * containScale;
      context.drawImage(
        image,
        (width - frameWidth) / 2,
        (height - frameHeight) / 2,
        frameWidth,
        frameHeight,
      );
      lastPaintedFrame = lastValidFrame;
    };

    const preloadAround = (frame: number) => {
      const radius = window.innerWidth < 700 ? 4 : 8;
      for (let offset = -radius; offset <= radius; offset += 1) {
        const next = Math.max(0, Math.min(FRAME_COUNT - 1, frame + offset));
        loadFrame(next);
      }

      // Keep enough frames to absorb fast scrolls, but never retain the entire
      // 238-frame sequence in memory.
      if (imageCache.current.size > 34) {
        for (const key of imageCache.current.keys()) {
          if (Math.abs(key - frame) > 18 && key !== lastValidFrame) {
            imageCache.current.delete(key);
            requestedFrames.delete(key);
          }
        }
      }
    };

    const getProgress = () => {
      const start = section.offsetTop;
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      return Math.max(
        0,
        Math.min(1, (window.scrollY - start) / travel),
      );
    };

    const paint = () => {
      if (destroyed) return;

      const easing = reducedMotion.current ? 1 : 0.11;
      const progress =
        renderedProgress.current +
        (targetProgress.current - renderedProgress.current) * easing;
      renderedProgress.current =
        Math.abs(progress - targetProgress.current) < 0.0008
          ? targetProgress.current
          : progress;

      const frame = Math.max(
        0,
        Math.min(
          FRAME_COUNT - 1,
          Math.round(renderedProgress.current * (FRAME_COUNT - 1)),
        ),
      );
      preloadAround(frame);
      drawFrame(frame);
      onProgressRef.current?.(renderedProgress.current);
      onLoadingProgressRef.current?.(
        Math.min(1, Math.max(0.05, loadedCount / 12)),
      );

      if (targetProgress.current >= 0.995) {
        onCompleteRef.current?.();
      }

      requestRef.current = window.requestAnimationFrame(paint);
    };

    const onScroll = () => {
      targetProgress.current = getProgress();
    };

    resize();
    onLoadingProgressRef.current?.(0.05);
    loadFrame(0);
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
      requestedFrames.clear();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-[480vh] w-full md:h-[420vh]"
      data-testid="cinematic-intro"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#080b0c]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-label="Scroll-controlled sky journey"
        />
        <div className="scanlines pointer-events-none absolute inset-0 opacity-50" />
        <div className="hud-grid pointer-events-none absolute inset-0 opacity-45" />
      </div>
    </div>
  );
}