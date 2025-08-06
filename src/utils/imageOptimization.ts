// Image optimization utilities for mobile devices

export interface ResponsiveImageOptions {
  src: string;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

export const getOptimizedImageSrc = (originalSrc: string, width?: number): string => {
  // In a real implementation, this would generate different sized images
  // For now, we'll return the original src but this structure allows for future optimization
  if (width && width <= 768) {
    // For mobile, we could serve smaller images
    return originalSrc;
  }
  return originalSrc;
};

export const getResponsiveImageProps = (options: ResponsiveImageOptions) => {
  const { src, alt, sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw', loading = 'lazy', className } = options;
  
  return {
    src: getOptimizedImageSrc(src),
    alt,
    sizes,
    loading,
    className,
    // Add responsive image attributes
    style: {
      maxWidth: '100%',
      height: 'auto',
    }
  };
};

// Hook for detecting device capabilities
export const useDeviceCapabilities = () => {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isHighDPI = window.devicePixelRatio > 1;
  const isMobile = window.innerWidth <= 768;
  
  return {
    isTouchDevice,
    isHighDPI,
    isMobile,
    supportsWebP: (() => {
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    })()
  };
};

// Preload critical images for better performance
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Lazy load images with intersection observer
export const useLazyImage = (src: string, threshold = 0.1) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  React.useEffect(() => {
    if (isInView && !isLoaded) {
      preloadImage(src)
        .then(() => setIsLoaded(true))
        .catch(() => console.warn(`Failed to load image: ${src}`));
    }
  }, [isInView, isLoaded, src]);

  return {
    ref: imgRef,
    src: isLoaded ? src : undefined,
    isLoaded,
    isInView
  };
};

// Add React import for the hook
import React from 'react';