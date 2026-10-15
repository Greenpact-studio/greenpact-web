"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Révèle ses enfants directs à l'apparition (fondu + léger déplacement),
 * un par un si `cascade`. Inactif avec prefers-reduced-motion.
 */
export function Reveal({
  children,
  cascade = false,
  as: Tag = "div",
  className,
  y = 28,
}: {
  children: ReactNode;
  cascade?: boolean;
  as?: "div" | "section" | "ul" | "ol";
  className?: string;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const cibles = cascade ? Array.from(el.children) : [el];
        gsap.from(cibles, {
          opacity: 0,
          y,
          duration: 1,
          stagger: cascade ? 0.12 : 0,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, [cascade, y]);
  // @ts-expect-error balise dynamique
  return <Tag ref={ref} className={className}>{children}</Tag>;
}
