import { Router } from "express";
import { lireDonnees, trouverProjet } from "../lib/donnees.js";
const router = Router();
router.get("/profil", async (_req,res,next) => { try { res.json(await lireDonnees("profil.json")); } catch(e) { next(e); } });
router.get("/projets", async (req,res,next) => {
  try {
    const projets = await lireDonnees("projets.json");
    const tag = typeof req.query.tag === "string" ? req.query.tag.trim().toLowerCase() : "";
    res.json(tag ? projets.filter(p => (p.tags || []).some(t => t.toLowerCase() === tag)) : projets);
  } catch(e) { next(e); }
});
router.get("/projets/:slug", async (req,res,next) => {
  try {
    const projet = await trouverProjet(req.params.slug);
    if (!projet) return res.status(404).json({error:"Projet introuvable."});
    return res.json(projet);
  } catch(e) { return next(e); }
});
router.get("/competences", async (_req,res,next) => { try { res.json(await lireDonnees("competences.json")); } catch(e) { next(e); } });
router.get("/parcours", async (_req,res,next) => { try { res.json(await lireDonnees("parcours.json")); } catch(e) { next(e); } });
export default router;