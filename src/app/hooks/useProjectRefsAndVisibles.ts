import { useRef, useEffect, useState } from "react";

export function useProjectRefsAndVisibles(
  projectCount: number,
  isMobile: boolean
) {
  // Stable array of refs
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  if (refs.current.length !== projectCount) {
    refs.current = Array(projectCount)
      .fill(null)
      .map((_, i) => refs.current[i] || null);
  }

  // State for visibilities
  const [visibles, setVisibles] = useState<boolean[]>(
    Array(projectCount).fill(false)
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((ref, idx) => {
      if (!ref) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          setVisibles((prev) => {
            const next = [...prev];
            next[idx] = entry.isIntersecting;
            return next;
          });
        },
        { threshold: isMobile ? 0.2 : 0.5 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, [projectCount, isMobile]);

  return { refs, visibles };
}
