"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ANCIENNES_ANCRES } from "@/data/config";

/** Redirige les anciens liens du site mono-page (ex. /#team) vers les nouvelles pages. */
export function AnciennesAncres() {
  const router = useRouter();
  useEffect(() => {
    if (window.location.pathname !== "/") return;
    const cible = ANCIENNES_ANCRES[window.location.hash];
    if (cible && cible !== "/") router.replace(cible);
  }, [router]);
  return null;
}
