// ════════════════════════════════════════════════════════════════════════════
//  Rule conformance check —  node verify-rules.mjs
//
//  Asserts that buildSlots() reproduces the Access quote tool's "Wizard-Node"
//  behaviour. Run this after regenerating ari.js or editing the engine; a
//  failure means the web tool and the Access tool would quote differently.
// ════════════════════════════════════════════════════════════════════════════
import { DEVICES, buildSlots, isVerified, priceOf } from "./src/catalog.js";

let pass = 0, fail = 0;
const get  = (model) => DEVICES.find((d) => d.model === model);
const slot = (d, k)  => buildSlots(d).find((s) => s.key === k);
const pns  = (d, k)  => { const s = slot(d, k); return s ? s.options.map((o) => o.pn) : null; };
const eq   = (a, b)  => JSON.stringify(a) === JSON.stringify(b);

function t(name, cond) {
  if (cond) { pass++; console.log("  ✓ " + name); }
  else      { fail++; console.log("  ✗ " + name); }
}
const group = (n) => console.log("\n" + n);

group("SFP speed-class filtering (SFP Info)");
t("ML624 (100) excludes 10G",            !pns(get("ML624"), "optics").includes("506R61235"));
t("ML624 excludes 2500",                 !pns(get("ML624"), "optics").includes("506R61154"));
t("ML624 includes 100Base-FX SM",         pns(get("ML624"), "optics").includes("506R00032"));
t("ML684D (1000) excludes 100Base-FX",   !pns(get("ML684D"), "optics").includes("506R00032"));
t("ML684D includes 1000Base-LX",          pns(get("ML684D"), "optics").includes("506R00002"));
t("GL5030X (2500/10GE) excludes 1000",   !pns(get("GL5030X-8J4F-P"), "optics").includes("506R00002"));
t("GL5030X includes 10G-LR",              pns(get("GL5030X-8J4F-P"), "optics").includes("506R61235"));

group("SFP slot cap (SFP Qty/Mode)");
t("ML624 cap 1",   slot(get("ML624"), "optics").maxQty === 1);
t("ML6416E cap 2", slot(get("ML6416E"), "optics").maxQty === 2);
t("GL5030X cap 4", slot(get("GL5030X-8J4F-P"), "optics").maxQty === 4);

group("Copper cable (NumPairs)");
t("ML624 (4 pairs) → 4-pair cables",  eq(pns(get("ML624"), "cabling"), ["504R20110", "504R20140"]));
t("ML6416E (16) → 16-pair cables",    eq(pns(get("ML6416E"), "cabling"), ["504R60098", "504R60100", "504R60150"]));
t("ML680DLP-M (0 pairs) → none",      pns(get("ML680DLP-M"), "cabling").length === 0);
t("ML684D (PTP-D) → ML600D cable",    eq(pns(get("ML684D"), "cabling"), ["504R60101"]));
t("GL5030X (ML5xx) → suppressed",     pns(get("GL5030X-8J4F-P"), "cabling").length === 0);

group("Power pool (PN Type / Power Input / PoE suffix)");
t("ML624 → PTP AC",                   eq(pns(get("ML624"), "power"), ["506R00006"]));
t("ML684D → DIN AC (non-PoE)",        eq(pns(get("ML684D"), "power"), ["506R61181", "506R61185"]));
t("ML684DLP-M (P-M) → PoE PSU",       eq(pns(get("ML684DLP-M"), "power"), ["506R61191"]));
t("GL5030X (Power Input 3) → PoE PSU",eq(pns(get("GL5030X-8J4F-P"), "power"), ["506R61191"]));
t("GL6010X (Power Input 0) → builtin",pns(get("GL6010X-24J4F-AC"), "power").length === 0);
t("EMEA-only 506R61184 never offered",!pns(get("ML684D"), "power").includes("506R61184"));

group("Craft cable (OEM)");
t("ML624 → 504R20010",                eq(pns(get("ML624"), "craft"), ["504R20010"]));
t("ML684D (NewD) → 504R60119",        eq(pns(get("ML684D"), "craft"), ["504R60119"]));
t("GL5030X (OEM NA) → no craft slot", slot(get("GL5030X-8J4F-P"), "craft") === undefined);

group("Mounting");
t("ML624 → ML600 Mounting pool",      pns(get("ML624"), "mount").length === 4);
t("ML684D (DIN) → none",              pns(get("ML684D"), "mount").length === 0);
t("GL5030X (OEM NA) → none",          pns(get("GL5030X-8J4F-P"), "mount").length === 0);

group("DC power cable");
t("ML624 → ML600 DC cable",           pns(get("ML624"), "dccable").includes("504R20043"));
t("GL5030X (ML5xx non-DC) → no slot", slot(get("GL5030X-8J4F-P"), "dccable") === undefined);

group("Coverage");
const verified = DEVICES.filter(isVerified).length;
t(`${verified}/${DEVICES.length} devices backed by AutoRepeaterInfo`, verified === 23);
t("every device builds slots without error",
  DEVICES.every((d) => { try { return buildSlots(d).length > 0; } catch { return false; } }));
t("every device has a list price", DEVICES.every((d) => priceOf(d.pn) != null));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
