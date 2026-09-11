"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className: string;
  revealClass?: string;
};

export function ScrollReveal({
  children,
  className,
  revealClass,
}: ScrollRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`${className} ${revealClass ?? "journey-grid"}${hasEntered ? " is-visible" : ""}`}
    >
      {children}
    </div>
  );
}

export function JourneyReveal(props: Omit<ScrollRevealProps, "revealClass">) {
  return <ScrollReveal {...props} revealClass="journey-grid" />;
}
