import type { Metadata } from "next";
import { EnTetePage } from "@/components/EnTetePage";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Articles, podcast REGEN, apparitions et publications LinkedIn de Greenpact.",
};

export default function Page() {
  return (
    <>
      <EnTetePage titre="Actualités" intro="Articles, podcast REGEN, apparitions et publications LinkedIn de Greenpact." />
      <section className="conteneur section">
        <p className="sobre">Contenu en cours de construction (phase suivante).</p>
      </section>
    </>
  );
}
