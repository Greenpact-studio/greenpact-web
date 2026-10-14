import type { Metadata } from "next";
import { EnTetePage } from "@/components/EnTetePage";

export const metadata: Metadata = {
  title: "Thèse d'investissement",
  description: "Pourquoi et où nous investissons : l'économie réelle, l'Europe, nos convictions et le venture studio.",
};

export default function Page() {
  return (
    <>
      <EnTetePage titre="Thèse d'investissement" intro="Pourquoi et où nous investissons : l'économie réelle, l'Europe, nos convictions et le venture studio." />
      <section className="conteneur section">
        <p className="sobre">Contenu en cours de construction (phase suivante).</p>
      </section>
    </>
  );
}
