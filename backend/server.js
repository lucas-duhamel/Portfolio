import app from "./app.js";
const port = Number(process.env.PORT) || 3000;
if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log("Portfolio API disponible sur http://localhost:" + port));
}
export default app;