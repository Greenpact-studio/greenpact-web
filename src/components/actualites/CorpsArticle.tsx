"use client";

import { useEffect, useRef } from "react";

/**
 * Corps d'un article : chaque bloc (paragraphe, titre, image, encadré) apparaît
 * en fondu quand il entre dans l'écran. Sans JavaScript ou avec
 * prefers-reduced-motion, tout est visible d'emblée.
 */
export function CorpsArticle({ html, className, pret, visible }: { html: string; className: string; pret: string; visible: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const blocs = Array.from(el.children) as HTMLElement[];
    el.classList.add(pret);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(visible);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    blocs.forEach((b) => io.observe(b));
    return () => {
      io.disconnect();
      el.classList.remove(pret);
      blocs.forEach((b) => b.classList.remove(visible));
    };
  }, [html, pret, visible]);

  return <div ref={ref} className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
