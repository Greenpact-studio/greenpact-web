import type { Metadata } from "next";
import { EnTetePage } from "@/components/EnTetePage";

export const metadata: Metadata = {
  title: "Thèse d'impact",
  description: "Impact by design : notre démarche, notre cycle d'impact et ce que les startups changent déjà chez des industriels.",
};

export default function Page() {
  return (
    <>
      <EnTetePage titre="Thèse d'impact" intro="Impact by design : notre démarche, notre cycle d'impact et ce que les startups changent déjà chez des industriels." />
      <section className="conteneur section">
        <p className="sobre">Contenu en cours de construction (phase suivante).</p>
      </section>
    </>
  );
}
