import { useEffect } from 'react';

type Options = IntersectionObserverInit & {
  enabled?: boolean;
};

export function useIntersectionObserver(
  targetRef: React.RefObject<Element | null>,
  onIntersect: () => void,
  { enabled = true, root = null, rootMargin = '0px', threshold = 0 }: Options = {}
) {
  useEffect(() => {
    const el = targetRef.current;
    if (!enabled || !el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) onIntersect();
    }, { root, rootMargin, threshold });

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetRef, onIntersect, enabled, root, rootMargin, threshold]);
}
