import type { Metadata } from "next";
import { HeroPhoto } from "@/components/HeroPhoto";
import { SITE } from "@/data/config";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Greenpact — Entrepreneurs for a better world",
  description: SITE.description,
};

export default function Accueil() {
  return (
    <>
      <HeroPhoto />
      <section className={`sur-photo ${styles.hero}`}>
        <div className={styles.photo} aria-hidden />
        <div className={styles.voile} aria-hidden />
        <div className={`conteneur ${styles.heroContenu}`}>
          <h1 className="display">{SITE.tagline}</h1>
          <p className="lead">{SITE.description}</p>
        </div>
        <div className={styles.defiler} aria-hidden>
          <span>Défiler</span>
        </div>
      </section>

      <section className="conteneur section">
        <p className="sobre">Le récit du modèle, les chiffres clés et le venture studio arrivent en phase 2.</p>
      </section>
    </>
  );
}
