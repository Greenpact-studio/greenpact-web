import type { Metadata } from "next";
import { EnTetePage } from "@/components/EnTetePage";

export const metadata: Metadata = {
  title: "Équipe",
  description: "Toutes les personnes de l'écosystème Greenpact, Hoji Ventures et 4Elements.",
};

export default function Page() {
  return (
    <>
      <EnTetePage titre="Équipe" intro="Toutes les personnes de l'écosystème Greenpact, Hoji Ventures et 4Elements." />
      <section className="conteneur section">
        <p className="sobre">Contenu en cours de construction (phase suivante).</p>
      </section>
    </>
  );
}
