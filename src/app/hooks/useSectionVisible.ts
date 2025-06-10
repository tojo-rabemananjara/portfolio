import { useEffect, useState } from "react";

export function useSectionVisible(
  ref: React.RefObject<HTMLElement | null>,
  threshold = 0.1
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [ref, threshold]);

  return isVisible;
}

export default useSectionVisible;
