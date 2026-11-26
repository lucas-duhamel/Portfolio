import test from "node:test";
import assert from "node:assert/strict";
import app from "../app.js";

let server;
let baseUrl;

test.before(async () => {
  server = app.listen(0);
  await new Promise(resolve => server.once("listening", resolve));
  baseUrl = "http://127.0.0.1:" + server.address().port;
});

test.after(() => server?.close());

test("GET /api/health renvoie un statut OK", async () => {
  const response = await fetch(baseUrl + "/api/health");
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {status:"ok",service:"portfolio-api"});
});

test("les routes de contenu renvoient du JSON", async () => {
  for (const route of ["/api/profil","/api/projets","/api/competences","/api/parcours"]) {
    const response = await fetch(baseUrl + route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type"), /application\\/json/);
  }
});

test("une route inconnue renvoie un JSON 404", async () => {
  const response = await fetch(baseUrl + "/api/inconnue");
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {error:"Route introuvable."});
});

test("un projet inexistant renvoie un JSON 404", async () => {
  const response = await fetch(baseUrl + "/api/projets/slug-inexistant");
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {error:"Projet introuvable."});
});
