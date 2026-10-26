"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

// Instance partagée : le changement de page doit repositionner Lenis lui-même,
// sinon il ramène la page à l'ancienne position (souvent tout en bas).
let lenisActif: Lenis | null = null;

/** Hauteur de l'en-tête fixe, pour que la cible d'une ancre ne passe pas dessous. */
function hauteurEntete(): number {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const px = parseFloat(v) * (v.trim().endsWith("rem") ? parseFloat(getComputedStyle(document.documentElement).fontSize) : 1);
  return Number.isFinite(px) ? px + 16 : 96;
}

/** Va en haut de page, ou sur l'ancre de l'URL si elle existe. */
function positionner(doux = false) {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const cible = id ? document.getElementById(id) : null;
  const y = cible ? Math.max(0, cible.getBoundingClientRect().top + window.scrollY - hauteurEntete()) : 0;
  if (lenisActif) lenisActif.scrollTo(y, { immediate: !doux, force: true });
  window.scrollTo({ top: y, behavior: doux ? "smooth" : "instant" });
}

/**
 * Défilement amorti (Lenis) synchronisé avec GSAP ScrollTrigger.
 * - Désactivé si prefers-reduced-motion.
 * - Sur écrans tactiles, Lenis laisse le défilement natif (syncTouch: false),
 *   ce qui garde un comportement naturel au doigt et au pavé tactile.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      ScrollTrigger.refresh();
      return;
    }

    // Amorti léger : la page suit la molette presque immédiatement (lerp élevé),
    // sans l'effet d'inertie lourd ressenti sur les souris Windows.
    const lenis = new Lenis({
      lerp: 0.16,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
    });

    lenisActif = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisActif = null;
    };
  }, []);

  // Liens vers une ancre de la page courante (#…) : défilement jusqu'à la cible.
  useEffect(() => {
    const surClic = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      if (!document.getElementById(decodeURIComponent(url.hash.slice(1)))) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      positionner(true);
    };
    document.addEventListener("click", surClic);
    return () => document.removeEventListener("click", surClic);
  }, []);

  // Changement de page : haut de page (ou ancre visée), puis recalcul des
  // déclencheurs ; on repositionne une seconde fois une fois la mise en page stabilisée.
  useEffect(() => {
    positionner();
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (window.location.hash) positionner();
    }, 150);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
