// Récupère les derniers posts de la page LinkedIn de Greenpact avant le build.
// Lancé par .github/workflows/deploy-ovh.yml (au push, toutes les 6 h et à la demande).
//
// Écrit data/linkedin-auto.json et télécharge les images dans public/images/linkedin/
// (deux sorties non versionnées). Sans identifiants, ou si LinkedIn ne répond pas,
// le script ne fait rien et le site garde data/linkedin.json, rempli à la main.
//
// Secrets GitHub (Settings → Secrets and variables → Actions) :
//   LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET : application LinkedIn (onglet Auth)
//   LINKEDIN_REFRESH_TOKEN : jeton de rafraîchissement, valable un an
//   LINKEDIN_ORG_ID : identifiant numérique de la page Greenpact
import fs from "node:fs";
import path from "node:path";

const { LINKEDIN_CLIENT_ID: id, LINKEDIN_CLIENT_SECRET: secret, LINKEDIN_REFRESH_TOKEN: refresh, LINKEDIN_ORG_ID: org } = process.env;
const VERSION = process.env.LINKEDIN_VERSION || "202608"; // version de l'API (AAAAMM), valable un an
const NOMBRE = 6;
const SORTIE = path.join("data", "linkedin-auto.json");
const IMAGES = path.join("public", "images", "linkedin");

const avertir = (m) => console.log(`::warning title=LinkedIn::${m}`);

async function jeton() {
  const r = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh, client_id: id, client_secret: secret }),
  });
  if (!r.ok) throw new Error(`jeton refusé (${r.status}) : le jeton de rafraîchissement a peut-être expiré`);
  return (await r.json()).access_token;
}

async function api(chemin, token) {
  const r = await fetch(`https://api.linkedin.com/rest/${chemin}`, {
    headers: { Authorization: `Bearer ${token}`, "LinkedIn-Version": VERSION, "X-Restli-Protocol-Version": "2.0.0" },
  });
  if (!r.ok) throw new Error(`${chemin.split("?")[0]} : ${r.status} ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

// Texte LinkedIn : {hashtag|\#|mot} → #mot, @[Nom](urn:…) → Nom, caractères échappés.
function texte(c = "") {
  return c
    .replace(/\{hashtag\|\\?#\|([^}]+)\}/g, "#$1")
    .replace(/@\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\\([\\|{}@[\]()<>#*_~])/g, "$1")
    .trim();
}

function couper(t, max) {
  if (t.length <= max) return t;
  const c = t.slice(0, max);
  return c.slice(0, Math.max(c.lastIndexOf(" "), max - 15)).replace(/[\s,;:.–-]+$/, "") + "…";
}

async function image(post, token) {
  const c = post.content || {};
  const urn = c.media?.id || c.multiImage?.images?.[0]?.id || c.article?.thumbnail;
  if (!urn) return null;
  const type = urn.includes(":video:") ? "videos" : urn.includes(":image:") ? "images" : null;
  if (!type) return null;
  const m = await api(`${type}/${encodeURIComponent(urn)}`, token);
  const url = type === "images" ? m.downloadUrl : m.thumbnail;
  if (!url) return null;
  const r = await fetch(url);
  if (!r.ok) return null;
  const ext = (r.headers.get("content-type") || "").includes("png") ? "png" : "jpg";
  const nom = `${urn.split(":").pop().replace(/[^\w-]/g, "")}.${ext}`;
  fs.writeFileSync(path.join(IMAGES, nom), Buffer.from(await r.arrayBuffer()));
  return `/images/linkedin/${nom}`;
}

async function main() {
  if (!id || !secret || !refresh || !org) {
    console.log("LinkedIn : identifiants absents, le site garde data/linkedin.json.");
    return;
  }
  const token = await jeton();
  const auteur = encodeURIComponent(`urn:li:organization:${org}`);
  const { elements = [] } = await api(`posts?author=${auteur}&q=author&count=20&sortBy=CREATED`, token);
  const publies = elements.filter((p) => p.lifecycleState === "PUBLISHED" && p.visibility === "PUBLIC" && texte(p.commentary)).slice(0, NOMBRE);
  if (!publies.length) return avertir("aucun post public trouvé, le site garde data/linkedin.json");

  fs.mkdirSync(IMAGES, { recursive: true });
  const posts = [];
  for (const p of publies) {
    const lignes = texte(p.commentary).split(/\n+/).map((l) => l.trim()).filter(Boolean);
    let img = null;
    try { img = await image(p, token); } catch (e) { avertir(`image non récupérée : ${e.message}`); }
    posts.push({
      titre: couper(lignes[0], 90),
      date: new Date(p.publishedAt || p.createdAt).toISOString().slice(0, 10),
      resume: couper(lignes.slice(1).join(" "), 200) || undefined,
      image: img || undefined,
      lien: `https://www.linkedin.com/feed/update/${p.id}/`,
    });
  }
  fs.writeFileSync(SORTIE, JSON.stringify(posts, null, 2) + "\n");
  console.log(`LinkedIn : ${posts.length} posts récupérés.`);
}

// Une panne de LinkedIn ne doit jamais empêcher la mise en ligne du site.
main().catch((e) => avertir(`posts non récupérés (${e.message}), le site garde data/linkedin.json`));
