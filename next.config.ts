import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statique : `next build` produit le dossier `out/` (HTML/CSS/JS)
  // déposé tel quel sur OVH dans /www/ par GitHub Actions.
  output: "export",
  // /equipe -> /equipe/index.html : indispensable pour qu'Apache serve
  // chaque page sans configuration particulière.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
