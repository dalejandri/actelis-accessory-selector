import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react";
import App from "./src/App.jsx";
import { priceOf } from "./src/catalog.js";

const root = createRoot(document.getElementById("root"));
let pass = 0, fail = 0;
const t = (name, cond) => {
  if (cond) { pass++; console.log("  ✓ " + name); }
  else { fail++; console.log("  ✗ " + name); }
};

const $ = (sel) => document.querySelector(sel);
const all = (sel) => [...document.querySelectorAll(sel)];
const byText = (sel, re) => all(sel).find((e) => re.test(e.textContent || ""));

function click(el) {
  act(() => {
    el.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
  });
}

// React overrides the value setter on inputs; go through the native one so the
// synthetic onChange actually fires.
function type(input, value) {
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype, "value").set;
  act(() => {
    setter.call(input, value);
    input.dispatchEvent(new window.Event("input", { bubbles: true }));
  });
  // React delegates onBlur through "focusout"; a plain "blur" event never
  // reaches the handler.
  act(() => {
    input.dispatchEvent(new window.Event("focusout", { bubbles: true }));
  });
}

const qtyInputs = () => all('input[aria-label="Quantity"]');
const totalText = () =>
  (byText("td", /^\$[\d,]+$/) && document.body.textContent) || document.body.textContent;

act(() => { root.render(<App />); });

console.log("\nBOM quantity editing");

// Pick a device: open the picker from the empty device card, choose ML624.
click(all("button").find((b) => /^Choose$/.test((b.textContent || "").trim())));

// Picker rows are clickable divs, not buttons — find them by cursor style.
const clickableRow = (re) =>
  all("div, button").find(
    (e) => /cursor:\s*pointer/i.test(e.getAttribute("style") || "") &&
           re.test(e.textContent || ""));

click(clickableRow(/501RG0046/));

const inputs = qtyInputs();
t("device row shows an editable quantity field", inputs.length >= 1);

const unit = priceOf("501RG0046");
const hasTotal = (n) => document.body.textContent.includes(
  "$" + (unit * n).toLocaleString("en-US"));

t("device line starts at qty 1", inputs[0] && inputs[0].value === "1");
t("total starts at one unit", hasTotal(1));

if (inputs[0]) {
  type(inputs[0], "7");
  t("quantity accepts a free value above 1", qtyInputs()[0].value === "7");
  t("line total and grand total scale with quantity", hasTotal(7));

  type(qtyInputs()[0], "0");
  t("zero is rejected and reverts", qtyInputs()[0].value === "7");

  type(qtyInputs()[0], "");
  t("blank is rejected and reverts", qtyInputs()[0].value === "7");

  type(qtyInputs()[0], "3");
  t("quantity can be lowered again", hasTotal(3));
}

// ── Accessory rows: quantity must write back to the right store ────────────
console.log("\nAccessory quantity");

// Add a power supply (single-select slot).
click(all("button").find((b) => /Power/.test((b.textContent || "").trim())));
click(clickableRow(/506R00006/));
click(all("button").find((b) => /^Apply$/.test((b.textContent || "").trim())));

const rows2 = qtyInputs();
t("power line added with its own quantity field", rows2.length === 2);

const psuUnit = priceOf("506R00006");
if (rows2.length === 2) {
  type(rows2[1], "4");
  t("accessory quantity is editable", qtyInputs()[1].value === "4");
  t("grand total includes the scaled accessory",
    document.body.textContent.includes(
      "$" + (unit * 3 + psuUnit * 4).toLocaleString("en-US")));
  t("device quantity is unchanged by the accessory edit",
    qtyInputs()[0].value === "3");
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail) process.exitCode = 1;
