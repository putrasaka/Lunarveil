import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';
import { protectImage } from '../lib/imageProtection';

interface ProtectedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
}

export default function ProtectedImage({ src, alt, className, ...props }: ProtectedImageProps) {
  const [blobSrc, setBlobSrc] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let revoked = false;
    protectImage(src).then((url) => {
      if (!revoked) setBlobSrc(url);
    });
    return () => { revoked = true; };
  }, [src]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stop = (e: Event) => e.preventDefault();

    container.addEventListener('contextmenu', stop);
    container.addEventListener('dragstart', stop);

    return () => {
      container.removeEventListener('contextmenu', stop);
      container.removeEventListener('dragstart', stop);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className || ''}`}
      style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      {blobSrc && (
        <img
          src={blobSrc}
          alt={alt}
          draggable={false}
          className="w-full h-full object-cover"
          {...props}
        />
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'rgba(0,0,0,0)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
