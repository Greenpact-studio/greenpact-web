"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, ESPACE_INVESTISSEUR } from "@/data/config";
import styles from "./Header.module.css";

/**
 * En-tête sans bordure. Deux états :
 * - « transparent » sur la photo d'accueil (logo et textes blancs) ;
 * - « plein » (fond #edeae4, textes verts) dès que l'on défile au-delà
 *   de la photo, ou d'emblée sur les pages sans photo plein écran.
 * La page signale la présence d'une photo plein écran avec
 * <body data-hero="photo"> via le composant <HeroPhoto />.
 */
export function Header() {
  const pathname = usePathname();
  const [plein, setPlein] = useState(true);
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    const surPhoto = () => document.body.dataset.hero === "photo";
    const maj = () => {
      if (!surPhoto()) return setPlein(true);
      setPlein(window.scrollY > window.innerHeight - 80);
    };
    maj();
    window.addEventListener("scroll", maj, { passive: true });
    const obs = new MutationObserver(maj);
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-hero"] });
    return () => {
      window.removeEventListener("scroll", maj);
      obs.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    setOuvert(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", ouvert);
    document.body.style.overflow = ouvert ? "hidden" : "";
  }, [ouvert]);

  const actif = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header className={`${styles.header} ${plein ? styles.plein : styles.transparent} ${ouvert ? styles.ouvert : ""}`}>
      <div className={`conteneur ${styles.barre}`}>
        <Link href="/" className={styles.logo} aria-label="Greenpact, accueil">
          <Image src="/logo-greenpact.png" alt="Greenpact" width={1200} height={138} priority className={styles.logoVert} />
          <Image src="/logo-greenpact-blanc.png" alt="" width={1200} height={138} priority className={styles.logoBlanc} aria-hidden />
        </Link>

        <nav className={styles.nav} aria-label="Navigation principale">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={actif(n.href) ? styles.actif : undefined} aria-current={actif(n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* L'espace est une application à part (public/actionnaires/) : lien classique, pas de navigation Next. */}
        <a href={ESPACE_INVESTISSEUR.href} className={styles.espace}>
          <Cadenas />
          {ESPACE_INVESTISSEUR.label}
        </a>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOuvert((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="menu-mobile" className={styles.menuMobile} hidden={!ouvert}>
        <ul>
          {NAV.map((n, i) => (
            <li key={n.href} style={{ transitionDelay: `${80 + i * 40}ms` }}>
              <Link href={n.href} aria-current={actif(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            </li>
          ))}
          <li style={{ transitionDelay: `${80 + NAV.length * 40}ms` }}>
            <a href={ESPACE_INVESTISSEUR.href}>{ESPACE_INVESTISSEUR.label}</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

function Cadenas() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}
