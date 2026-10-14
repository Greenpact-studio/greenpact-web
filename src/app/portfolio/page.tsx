import type { Metadata } from "next";
import { EnTetePage } from "@/components/EnTetePage";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Nos participations directes et les startups de nos deux venture studios.",
};

export default function Page() {
  return (
    <>
      <EnTetePage titre="Portfolio" intro="Nos participations directes et les startups de nos deux venture studios." />
      <section className="conteneur section">
        <p className="sobre">Contenu en cours de construction (phase suivante).</p>
      </section>
    </>
  );
}
