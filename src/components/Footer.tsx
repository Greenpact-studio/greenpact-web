import Link from "next/link";
import Image from "next/image";
import { NAV, SITE, MENTIONS_REGLEMENTAIRES } from "@/data/config";
import { EmailProtege } from "./EmailProtege";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`sur-vert ${styles.footer}`}>
      <div className={`conteneur ${styles.grille}`}>
        <div className={styles.marque}>
          <Image src="/logo-greenpact-blanc.png" alt="Greenpact" width={1200} height={138} className={styles.logo} loading="lazy" />
          <p className={`small ${styles.tagline}`}>{SITE.tagline}</p>
        </div>

        <nav aria-label="Pages du site" className={styles.pages}>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="lien">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contact}>
          <p className="small sobre">Contact</p>
          <EmailProtege email={SITE.contact.email} className="lien" />
          <p className="small sobre" style={{ marginTop: "1.25rem" }}>
            Suivre
          </p>
          <ul>
            <li>
              <a href={SITE.contact.linkedin} target="_blank" rel="noopener noreferrer" className="lien">
                LinkedIn Greenpact
              </a>
            </li>
            <li>
              <a href={SITE.podcast.apple} target="_blank" rel="noopener noreferrer" className="lien">
                Podcast {SITE.podcast.nom}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`conteneur ${styles.bas}`}>
        <p className={styles.mentions}>{MENTIONS_REGLEMENTAIRES}</p>
        <p className={`small ${styles.copy}`}>
          © {new Date().getFullYear()} Greenpact — www.greenpact.fr
        </p>
      </div>
    </footer>
  );
}
