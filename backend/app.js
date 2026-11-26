import express from "express";
import cors from "cors";
import routes from "./routes/contenu.js";
const app = express();
const origins = (process.env.CORS_ORIGINS || "http://localhost:5173").split(",").map(x => x.trim()).filter(Boolean);
app.use(cors({origin(origin, callback) {
  if (!origin || origins.includes(origin)) return callback(null, true);
  return callback(new Error("Origine non autorisée par la politique CORS."));
}}));
app.use(express.json());
app.get("/api/health", (_req, res) => res.json({status:"ok", service:"portfolio-api"}));
app.use("/api", routes);
app.use((_req, res) => res.status(404).json({error:"Route introuvable."}));
app.use((error, _req, res, _next) => {
  console.error(error.message);
  const denied = error.message.includes("CORS");
  res.status(denied ? 403 : 500).json({error:denied ? error.message : "Une erreur serveur est survenue."});
});
export default app;