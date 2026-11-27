import { VIDEOS } from "@/data/videos";
import styles from "./VideosParticipations.module.css";

/**
 * Vidéos publiques des participations (lecteur YouTube sans cookies, chargé à la demande du navigateur).
 * Utilisé sur la page Portfolio (avec titre de section) et dans l'onglet Vidéos de la page Médias.
 */
export function VideosParticipations({ ancres = false }: { ancres?: boolean }) {
  return (
    <ul className={styles.grille}>
      {VIDEOS.map((v) => (
        <li key={v.id} id={ancres ? `video-${v.id}` : undefined} className={styles.carte}>
          <div className={styles.video}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?rel=0`}
              title={`${v.startup} en vidéo`}
              loading="lazy"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className={styles.etiquette}>
            {v.startup} <span aria-hidden>|</span> {v.studio}
          </p>
          <h3 className={styles.titre}>{v.titre}</h3>
          <p className={styles.texte}>{v.texte}</p>
        </li>
      ))}
    </ul>
  );
}
