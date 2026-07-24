// ════════════════════════════════════════════════════════════════════════════
//  UI interaction test —  node ui-test.cjs
//
//  Renders the real App in jsdom, picks a device, and drives the Bill of
//  Materials quantity fields the way a user would. verify-rules.mjs covers the
//  compatibility engine; this covers the parts of the UI where state is written
//  back from a different component than the one that owns it.
//
//  Needs jsdom, which is deliberately NOT a dependency — it would be installed
//  on every GitHub Pages deploy for no benefit. Install it once, locally:
//
//      npm install --no-save jsdom
// ════════════════════════════════════════════════════════════════════════════
const path = require("path");
const fs = require("fs");

let JSDOM;
try {
  ({ JSDOM } = require("jsdom"));
} catch {
  console.error("jsdom is not installed. Run:  npm install --no-save jsdom");
  process.exit(1);
}

const esbuild = require("esbuild");
const bundle = path.join(__dirname, ".ui-test-bundle.cjs");

esbuild.buildSync({
  entryPoints: [path.join(__dirname, "qty.test.jsx")],
  bundle: true,
  platform: "browser",
  format: "cjs",
  outfile: bundle,
  loader: { ".jsx": "jsx" },
  jsx: "automatic",
  define: { "import.meta.env": '{"BASE_URL":"/"}' },
  logLevel: "error",
});

const dom = new JSDOM(
  '<!doctype html><html><body><div id="root"></div></body></html>',
  { url: "http://localhost/", pretendToBeVisual: true });

for (const k of ["window", "document", "navigator", "HTMLElement", "Element",
                 "Node", "Event", "MouseEvent", "self"]) {
  global[k] = k === "window" || k === "self" ? dom.window : dom.window[k];
}
global.IS_REACT_ACT_ENVIRONMENT = true;

try {
  require(bundle);
} finally {
  fs.unlinkSync(bundle);
}
