import { useEffect, useState } from "react";

export default function useInView<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null>,
  options?: IntersectionObserverInit
) {
  const [inView, setInView] = useState(false);
  const [outDirection, setOutDirection] = useState<null | "up" | "down">(null);

  useEffect(() => {
    if (!ref.current) return;
    let lastInView = false;
    const isMobile = window.innerWidth < 768;
    const threshold = isMobile ? 0.2 : 0.75;
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        setOutDirection("down");
      } else if (rect.bottom < 0) {
        setOutDirection("up");
      } else {
        setOutDirection(null);
      }
    };
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold) {
          setInView(true);
          lastInView = true;
          setOutDirection(null);
        } else {
          setInView(false);
          if (lastInView) {
            handleScroll();
            lastInView = false;
          }
        }
      },
      { threshold, ...options }
    );
    observer.observe(ref.current);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (ref.current) observer.unobserve(ref.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref, options]);

  return { inView, outDirection };
}
