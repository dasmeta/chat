import { useState, useEffect } from 'react';

export default function useIsIntersecting(
  ref: { current: HTMLElement },
  rootMargin = '0px',
) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => ref.current && observer.unobserve(ref.current);
  }, [ref.current]);

  return isIntersecting;
}
