// Pictogrammes des quatre domaines d'investissement : trait fin, vert Greenpact.

const trait = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Engrenage traversé d'une flèche montante : la performance industrielle. */
function Performance() {
  const dents = 8;
  const rExt = 13;
  const rInt = 10.5;
  const pts: string[] = [];
  for (let i = 0; i < dents * 2; i++) {
    const r = i % 2 === 0 ? rExt : rInt;
    const a0 = ((i - 0.35) / (dents * 2)) * Math.PI * 2;
    const a1 = ((i + 0.35) / (dents * 2)) * Math.PI * 2;
    pts.push(`${(22 + Math.cos(a0) * r).toFixed(2)},${(26 + Math.sin(a0) * r).toFixed(2)}`, `${(22 + Math.cos(a1) * r).toFixed(2)},${(26 + Math.sin(a1) * r).toFixed(2)}`);
  }
  return (
    <>
      <polygon points={pts.join(" ")} {...trait} />
      <circle cx="22" cy="26" r="4" {...trait} />
      <path d="M30 20 L42 8" {...trait} />
      <path d="M35 8 H42 V15" {...trait} />
    </>
  );
}

/** Éclair dans une feuille : la transition énergétique. */
function Transition() {
  return (
    <>
      <path d="M8 40 C8 18 22 8 40 8 C40 28 30 40 8 40 Z" {...trait} />
      <path d="M26 15 L18 27 H25 L21 35 L31 22 H24 Z" {...trait} />
    </>
  );
}

/** Deux flèches qui se suivent en cercle : la circularité. */
function Circularite() {
  return (
    <>
      <path d="M38.5 18 A15 15 0 0 0 10 17" {...trait} />
      <path d="M9.5 30 A15 15 0 0 0 38 31" {...trait} />
      <path d="M10 9.5 V17 H17.5" {...trait} />
      <path d="M38 38.5 V31 H30.5" {...trait} />
    </>
  );
}

/** Bouclier abritant une jeune pousse : la résilience et l'adaptation. */
function Resilience() {
  return (
    <>
      <path d="M24 5 L39 10 V22 C39 32 32.5 39 24 43 C15.5 39 9 32 9 22 V10 Z" {...trait} />
      <path d="M24 34 V22" {...trait} />
      <path d="M24 26 C24 20 19 17 15 18 C15 23 19 26 24 26 Z" {...trait} />
      <path d="M24 23 C24 18 28 15 33 16 C33 21 29 23 24 23 Z" {...trait} />
    </>
  );
}

const PICTOS = {
  "Performance industrielle": Performance,
  "Transition énergétique": Transition,
  "Circularité et chaînes de valeur": Circularite,
  "Résilience et adaptation": Resilience,
} as const;

export type Domaine = keyof typeof PICTOS;

export function Picto({ domaine, className }: { domaine: Domaine; className?: string }) {
  const Dessin = PICTOS[domaine];
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <Dessin />
    </svg>
  );
}
