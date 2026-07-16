// ════════════════════════════════════════════════════════════════════════════
//  Rule conformance check —  node verify-rules.mjs
//
//  Asserts that buildSlots() reproduces the Access quote tool's "Wizard-Node"
//  behaviour. Run this after regenerating ari.js or editing the engine; a
//  failure means the web tool and the Access tool would quote differently.
// ════════════════════════════════════════════════════════════════════════════
import { DEVICES, buildSlots, isVerified, priceOf, PN_CATEGORY, CATEGORY_FILTER } from "./src/catalog.js";

let pass = 0, fail = 0;
// Fixtures are pinned by part number, not model name. Model names are not
// unique-forever: "ML684D" used to resolve to 501RG3230 until the real ML684D
// (501RG0220) was added, silently repointing three tests at a different device.
const get  = (pn) => {
  const d = DEVICES.find((x) => x.pn === pn);
  if (!d) throw new Error(`fixture ${pn} is not in the catalog`);
  return d;
};
const slot = (d, k)  => buildSlots(d).find((s) => s.key === k);
const pns  = (d, k)  => { const s = slot(d, k); return s ? s.options.map((o) => o.pn) : null; };
const eq   = (a, b)  => JSON.stringify(a) === JSON.stringify(b);

function t(name, cond) {
  if (cond) { pass++; console.log("  ✓ " + name); }
  else      { fail++; console.log("  ✗ " + name); }
}
const group = (n) => console.log("\n" + n);

group("SFP speed-class filtering (SFP Info)");
t("ML624 (100) excludes 10G",            !pns(get("501RG0046"), "optics").includes("506R61235"));
t("ML624 excludes 2500",                 !pns(get("501RG0046"), "optics").includes("506R61154"));
t("ML624 includes 100Base-FX SM",         pns(get("501RG0046"), "optics").includes("506R00032"));
t("ML684D New (1000) excludes 100Base-FX",   !pns(get("501RG3230"), "optics").includes("506R00032"));
t("ML684D New includes 1000Base-LX",          pns(get("501RG3230"), "optics").includes("506R00002"));
t("GL5030X (2500/10GE) excludes 1000",   !pns(get("506R61258"), "optics").includes("506R00002"));
t("GL5030X includes 10G-LR",              pns(get("506R61258"), "optics").includes("506R61235"));

group("SFP slot cap (SFP Qty/Mode)");
t("ML624 cap 1",   slot(get("501RG0046"), "optics").maxQty === 1);
t("ML6416E cap 2", slot(get("501RG0218"), "optics").maxQty === 2);
t("GL5030X cap 4", slot(get("506R61258"), "optics").maxQty === 4);

group("Copper cable (NumPairs)");
t("ML624 (4 pairs) → 4-pair cables",  eq(pns(get("501RG0046"), "cabling"), ["504R20110", "504R20140"]));
t("ML6416E (16) → 16-pair cables",    eq(pns(get("501RG0218"), "cabling"), ["504R60098", "504R60100", "504R60150"]));
t("ML680DLP-M (0 pairs) → none",      pns(get("501RG3378"), "cabling").length === 0);
t("ML684D New (PTP-D) → ML600D cable",    eq(pns(get("501RG3230"), "cabling"), ["504R60101"]));
t("GL5030X (ML5xx) → suppressed",     pns(get("506R61258"), "cabling").length === 0);

group("Power pool (PN Type / Power Input / PoE suffix)");
t("ML624 → PTP AC",                   eq(pns(get("501RG0046"), "power"), ["506R00006"]));
t("ML684D New → DIN AC (non-PoE)",        eq(pns(get("501RG3230"), "power"), ["506R61181", "506R61185"]));
t("ML684DLP-M (P-M) → PoE PSU",       eq(pns(get("501RG3358"), "power"), ["506R61191"]));
t("GL5030X (Power Input 3) → PoE PSU",eq(pns(get("506R61258"), "power"), ["506R61191"]));
t("GL6010X (Power Input 0) → builtin",pns(get("506R61287"), "power").length === 0);
t("EMEA-only 506R61184 never offered",!pns(get("501RG3230"), "power").includes("506R61184"));

group("Craft cable (OEM)");
t("ML624 → 504R20010",                eq(pns(get("501RG0046"), "craft"), ["504R20010"]));
t("ML684D New (OEM NewD) → 504R60119",        eq(pns(get("501RG3230"), "craft"), ["504R60119"]));
t("GL5030X (OEM NA) → no craft slot", slot(get("506R61258"), "craft") === undefined);

group("Mounting");
t("ML624 → ML600 Mounting pool",      pns(get("501RG0046"), "mount").length === 4);
t("ML684D New (DIN) → none",              pns(get("501RG3230"), "mount").length === 0);
t("GL5030X (OEM NA) → none",          pns(get("506R61258"), "mount").length === 0);

group("DC power cable");
t("ML624 → ML600 DC cable",           pns(get("501RG0046"), "dccable").includes("504R20043"));
t("GL5030X (ML5xx non-DC) → no slot", slot(get("506R61258"), "dccable") === undefined);

group("Coverage");
const verified = DEVICES.filter(isVerified).length;
t(`${verified}/${DEVICES.length} devices backed by AutoRepeaterInfo`, verified === 84);
t("every device builds slots without error",
  DEVICES.every((d) => { try { return buildSlots(d).length > 0; } catch { return false; } }));
t("every device has a list price", DEVICES.every((d) => priceOf(d.pn) != null));

group("Datasheets");
// The price list's link column contains Excel #N/A errors for parts with no
// datasheet. Those must never reach the UI as an href.
const url = (s) => typeof s === "string" && /^https?:\/\//.test(s);
t("every device datasheet is a real URL", DEVICES.every((d) => url(d.datasheet)));
t("every accessory datasheet is a real URL",
  DEVICES.every((d) => buildSlots(d).every((s) => s.options.every((o) => url(o.datasheet)))));
t("no datasheet contains #N/A",
  DEVICES.every((d) => !d.datasheet.includes("#N/A")));

group("Catalog completeness");
// This is the class of bug that hid ML6916EL: the device list was hand-written,
// so a product could be on the price list with full rules and still be absent.
t("ML6916EL (501RG0115) is in the catalog", DEVICES.some((d) => d.pn === "501RG0115"));
t("every device-category part on the price list is a device",
  Object.entries(PN_CATEGORY)
    .filter(([, c]) => CATEGORY_FILTER[c])
    .every(([pn]) => DEVICES.some((d) => d.pn === pn)));
t("no duplicate part numbers",
  new Set(DEVICES.map((d) => d.pn)).size === DEVICES.length);
t("no duplicate model names",
  new Set(DEVICES.map((d) => d.model)).size === DEVICES.length);
t("every device has a model and a category",
  DEVICES.every((d) => d.model && d.model.length > 1 && d.cat));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
