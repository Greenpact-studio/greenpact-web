import type { Metadata } from "next";
import { EnTetePage } from "@/components/EnTetePage";

export const metadata: Metadata = {
  title: "Devenir investisseur",
  description: "Un double retour sur investissement : financier et à impact. Rejoindre les Greenpacters.",
};

export default function Page() {
  return (
    <>
      <EnTetePage titre="Devenir investisseur" intro="Un double retour sur investissement : financier et à impact. Rejoindre les Greenpacters." />
      <section className="conteneur section">
        <p className="sobre">Contenu en cours de construction (phase suivante).</p>
      </section>
    </>
  );
}
