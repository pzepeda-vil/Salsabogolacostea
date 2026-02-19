import type React from 'react';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

type ImageItem = string | { src: string; alt?: string };

interface InfiniteGalleryProps {
  images: ImageItem[];
  speed?: number;
  zSpacing?: number;
  visibleCount?: number;
  falloff?: { near: number; far: number };
  className?: string;
  style?: React.CSSProperties;
}

interface PlaneState {
  id: number;
  z: number;
  x: number;
  y: number;
  imageIndex: number;
}

const DEPTH_RANGE = 2000;
const PERSPECTIVE = 800;

export default function InfiniteGallery({
  images,
  speed = 1,
  visibleCount = 12,
  className = 'h-96 w-full',
  style,
}: InfiniteGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const planesRef = useRef<PlaneState[]>([]);
  const velocityRef = useRef(0);
  const autoPlayRef = useRef(true);
  const lastInteractionRef = useRef(Date.now());
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const [, forceRender] = useState(0);

  const normalizedImages = useMemo(
    () => images.map((img) => (typeof img === 'string' ? { src: img, alt: '' } : img)),
    [images]
  );

  const totalImages = normalizedImages.length;

  // Generate spatial positions with golden-angle distribution
  const spatialPositions = useMemo(() => {
    const positions: { x: number; y: number }[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const angle = i * 2.618;
      const radius = 80 + (i % 3) * 60;
      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle * 0.7 + Math.PI / 4) * (radius * 0.5);
      positions.push({ x, y });
    }
    return positions;
  }, [visibleCount]);

  // Initialize planes
  useEffect(() => {
    if (totalImages === 0) return;
    planesRef.current = Array.from({ length: visibleCount }, (_, i) => ({
      id: i,
      z: (DEPTH_RANGE / visibleCount) * i,
      x: spatialPositions[i]?.x ?? 0,
      y: spatialPositions[i]?.y ?? 0,
      imageIndex: i % totalImages,
    }));
    forceRender((n) => n + 1);
  }, [visibleCount, totalImages, spatialPositions]);

  // Scroll handler
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      velocityRef.current += e.deltaY * 0.5 * speed;
      autoPlayRef.current = false;
      lastInteractionRef.current = Date.now();
    },
    [speed]
  );

  // Touch handlers
  const touchStartY = useRef(0);
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    autoPlayRef.current = false;
    lastInteractionRef.current = Date.now();
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      e.preventDefault();
      const dy = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;
      velocityRef.current += dy * 1.5 * speed;
      lastInteractionRef.current = Date.now();
    },
    [speed]
  );

  // Keyboard handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        velocityRef.current -= 80 * speed;
        autoPlayRef.current = false;
        lastInteractionRef.current = Date.now();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        velocityRef.current += 80 * speed;
        autoPlayRef.current = false;
        lastInteractionRef.current = Date.now();
      }
    },
    [speed]
  );

  // Attach event listeners
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleKeyDown]);

  // Auto-play resume
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastInteractionRef.current > 3000) {
        autoPlayRef.current = true;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animation loop
  useEffect(() => {
    if (totalImages === 0) return;

    const imageAdvance = visibleCount % totalImages || totalImages;

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      // Auto-play forward drift
      if (autoPlayRef.current) {
        velocityRef.current += 30 * delta * speed;
      }

      // Damping
      velocityRef.current *= 0.93;

      const planes = planesRef.current;
      const vel = velocityRef.current;

      planes.forEach((plane) => {
        let newZ = plane.z + vel * delta;

        // Wrap around
        let wrapsForward = 0;
        let wrapsBackward = 0;

        if (newZ >= DEPTH_RANGE) {
          wrapsForward = Math.floor(newZ / DEPTH_RANGE);
          newZ -= DEPTH_RANGE * wrapsForward;
        } else if (newZ < 0) {
          wrapsBackward = Math.ceil(-newZ / DEPTH_RANGE);
          newZ += DEPTH_RANGE * wrapsBackward;
        }

        if (wrapsForward > 0 && imageAdvance > 0 && totalImages > 0) {
          plane.imageIndex = (plane.imageIndex + wrapsForward * imageAdvance) % totalImages;
        }
        if (wrapsBackward > 0 && imageAdvance > 0 && totalImages > 0) {
          const step = plane.imageIndex - wrapsBackward * imageAdvance;
          plane.imageIndex = ((step % totalImages) + totalImages) % totalImages;
        }

        plane.z = ((newZ % DEPTH_RANGE) + DEPTH_RANGE) % DEPTH_RANGE;
      });

      // Update DOM directly for performance (no React re-render per frame)
      planes.forEach((plane) => {
        const el = document.getElementById(`gallery-plane-${plane.id}`);
        if (!el) return;

        const worldZ = plane.z - DEPTH_RANGE / 2;
        const normalizedPos = plane.z / DEPTH_RANGE;

        // Fade in/out near edges
        let opacity = 1;
        if (normalizedPos < 0.15) opacity = normalizedPos / 0.15;
        else if (normalizedPos > 0.85) opacity = (1 - normalizedPos) / 0.15;
        opacity = Math.max(0, Math.min(1, opacity));

        // Blur near edges
        let blur = 0;
        if (normalizedPos < 0.1) blur = (1 - normalizedPos / 0.1) * 6;
        else if (normalizedPos > 0.9) blur = ((normalizedPos - 0.9) / 0.1) * 6;

        // Scale based on distance from center
        const distFactor = 1 - Math.abs(normalizedPos - 0.5) * 0.5;
        const scale = 0.6 + distFactor * 0.6;

        // Subtle tilt based on velocity
        const tiltX = (vel * 0.002) * (plane.x > 0 ? 1 : -1);

        el.style.transform = `translate3d(${plane.x}px, ${plane.y}px, ${-worldZ}px) scale(${scale}) rotateX(${tiltX}deg)`;
        el.style.opacity = String(opacity);
        el.style.filter = blur > 0.1 ? `blur(${blur}px)` : 'none';

        // Update image if needed
        const img = el.querySelector('img') as HTMLImageElement;
        if (img) {
          const src = normalizedImages[plane.imageIndex]?.src ?? '';
          if (img.src !== src) img.src = src;
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [totalImages, visibleCount, normalizedImages, speed]);

  if (totalImages === 0) return null;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        perspective: `${PERSPECTIVE}px`,
        perspectiveOrigin: '50% 50%',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {planesRef.current.map((plane) => (
          <div
            key={plane.id}
            id={`gallery-plane-${plane.id}`}
            style={{
              position: 'absolute',
              width: '280px',
              height: '200px',
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity, filter',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <img
              src={normalizedImages[plane.imageIndex]?.src ?? ''}
              alt={normalizedImages[plane.imageIndex]?.alt ?? ''}
              draggable={false}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                pointerEvents: 'none',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
