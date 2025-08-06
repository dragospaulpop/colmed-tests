import { useRef, useEffect } from 'react';

interface SwipeGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  preventDefaultTouchmoveEvent?: boolean;
}

interface TouchPosition {
  x: number;
  y: number;
}

export const useSwipeGesture = (options: SwipeGestureOptions) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    preventDefaultTouchmoveEvent = false
  } = options;

  const touchStartPos = useRef<TouchPosition | null>(null);
  const touchEndPos = useRef<TouchPosition | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    touchStartPos.current = {
      x: touch.clientX,
      y: touch.clientY
    };
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (preventDefaultTouchmoveEvent) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStartPos.current) return;

    const touch = e.changedTouches[0];
    touchEndPos.current = {
      x: touch.clientX,
      y: touch.clientY
    };

    const deltaX = touchEndPos.current.x - touchStartPos.current.x;
    const deltaY = touchEndPos.current.y - touchStartPos.current.y;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if this is a horizontal or vertical swipe
    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (absDeltaX > threshold) {
        if (deltaX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      }
    } else {
      // Vertical swipe
      if (absDeltaY > threshold) {
        if (deltaY > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }
    }

    // Reset positions
    touchStartPos.current = null;
    touchEndPos.current = null;
  };

  const swipeHandlers = {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  };

  return swipeHandlers;
};

// Hook for attaching swipe gestures to a ref element
export const useSwipeGestureRef = <T extends HTMLElement>(
  options: SwipeGestureOptions
) => {
  const elementRef = useRef<T>(null);
  const swipeHandlers = useSwipeGesture(options);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', swipeHandlers.onTouchStart, { passive: true });
    element.addEventListener('touchmove', swipeHandlers.onTouchMove, { passive: !options.preventDefaultTouchmoveEvent });
    element.addEventListener('touchend', swipeHandlers.onTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', swipeHandlers.onTouchStart);
      element.removeEventListener('touchmove', swipeHandlers.onTouchMove);
      element.removeEventListener('touchend', swipeHandlers.onTouchEnd);
    };
  }, [swipeHandlers, options.preventDefaultTouchmoveEvent]);

  return elementRef;
};