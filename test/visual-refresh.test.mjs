import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../aether-visual-upgrade.css", import.meta.url), "utf8");
const sw = await readFile(new URL("../sw.js", import.meta.url), "utf8");
const game = await readFile(new URL("../game.js", import.meta.url), "utf8");

test("HTML document closes cleanly and loads the visual layer", () => {
  assert.match(html, /<link rel="stylesheet" href="\.\/aether-visual-upgrade\.css"\s*\/>/);
  assert.match(html.trimEnd(), /<\/html>$/);
  assert.doesNotMatch(html.slice(html.lastIndexOf("</html>") + 7), /\S/);
});

test("PWA app shell precaches the visual layer and rotates its cache", () => {
  assert.match(sw, /aether-visual-upgrade\.css/);
  assert.match(sw, /aether-nova-visual-refresh-/);
});

test("visual layer includes ship silhouettes and responsive/reduced-motion rules", () => {
  assert.match(css, /ALPHA 35/);
  assert.match(css, /\.ship-opt:nth-child\(8\):before/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("menu copy matches the implemented ten-sector boss cadence", () => {
  assert.match(html, /cada diez sectores/);
  assert.doesNotMatch(html, /cada cinco sectores/);
  assert.match(game, /state\.level % 10 === 0/);
});
