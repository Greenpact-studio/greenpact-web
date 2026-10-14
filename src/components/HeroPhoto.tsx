"use client";

import { useEffect } from "react";

/**
 * Signale à l'en-tête que la page commence par une photo plein écran
 * (en-tête transparent au chargement, puis fond clair au défilement).
 */
export function HeroPhoto() {
  useEffect(() => {
    document.body.dataset.hero = "photo";
    return () => {
      delete document.body.dataset.hero;
    };
  }, []);
  return null;
}
