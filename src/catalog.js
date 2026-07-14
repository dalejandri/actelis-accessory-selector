// ════════════════════════════════════════════════════════════════════════════
//  ACTELIS ACCESSORY SELECTOR — Catalog & Compatibility Engine
// ════════════════════════════════════════════════════════════════════════════
//  This file is the single source of truth. To maintain the tool you normally
//  only edit the data tables below — the UI reacts automatically.
//
//  HOW COMPATIBILITY WORKS
//  Each DEVICE is tagged with a `family`, a `form` (form-factor) and an `iface`
//  block describing its interfaces. The buildSlots() engine at the bottom reads
//  those tags and returns the compatible Power / Mounting / Optics / Cabling
//  options. Add a device by copying an existing row and adjusting the tags —
//  no changes to App.jsx required.
//
//  DATASHEETS
//  Actelis datasheet PDFs live under actelis.com/wp-content/uploads/YYYY/MM/….
//  Where a verified deep link is known it is used; otherwise the link points to
//  the correct product-family page. To wire an exact PDF, paste its URL into the
//  device's `datasheet` field (or into DATASHEETS below).
// ════════════════════════════════════════════════════════════════════════════

// ─── Datasheet destinations (real, stable Actelis URLs) ──────────────────────
const DS_PRODUCTS = "https://actelis.com/actelis-products/products-technology/";
export const DATASHEETS = {
  ML600:     "https://actelis.com/actelis-products/ethernet-access-devices/ml600dx/",
  ML600D:    "https://actelis.com/actelis-products/ethernet-access-devices/ml600dx/",
  ML600DL:   "https://actelis.com/wp-content/uploads/2021/11/ML600DL_Data-Sheet-_w.pdf",
  GL5000:    "https://actelis.com/actelis-products/aggregation-switches/",
  GL6000:    "https://actelis.com/actelis-products/aggregation-switches/",
  GL7000:    "https://actelis.com/actelis-products/aggregation-switches/",
  GL900HE:   DS_PRODUCTS,
  GL900CPE:  DS_PRODUCTS,
  GL9000HE:  DS_PRODUCTS,
  GL9000CPE: DS_PRODUCTS,
  ML500:     "https://actelis.com/actelis-products/aggregation-switches/",
  CHASSIS:   DS_PRODUCTS,
  ACCESSORY: DS_PRODUCTS,
};
const ds = (fam) => DATASHEETS[fam] || DS_PRODUCTS;

// ─── Device categories (drive the left-hand filter tabs, AXIS-style) ─────────
export const CATEGORIES = [
  { key: "NODES",   label: "Hybrid-Fiber Nodes" },
  { key: "SWITCHES",label: "Hardened Switches" },
  { key: "HEADEND", label: "Headend" },
  { key: "CPE",     label: "CPEs" },
  { key: "CHASSIS", label: "Chassis & Cards" },
];

// ════════════════════════════════════════════════════════════════════════════
//  DEVICES  (things the user can select as the primary product)
//  iface: copper = bonded G.SHDSL pairs · coax = G.hn "J" ports ·
//         fiber = has SFP uplink slots · poe = supplies PoE
// ════════════════════════════════════════════════════════════════════════════
export const DEVICES = [
  // ── ML600 standalone hybrid-fiber nodes ──────────────────────────────────
  { pn:"501RG0046", model:"ML624",   cat:"NODES", family:"ML600",  form:"standalone",
    icon:"node",  desc:"4-pair EFM node, fiber uplink",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },
  { pn:"501RG0067", model:"ML638",   cat:"NODES", family:"ML600",  form:"standalone",
    icon:"node",  desc:"8-pair EFM node, fiber uplink",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },
  { pn:"501RG0217", model:"ML648E",  cat:"NODES", family:"ML600",  form:"standalone",
    icon:"node",  desc:"8-pair enhanced node",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },
  { pn:"501RG0218", model:"ML6416E", cat:"NODES", family:"ML600",  form:"standalone",
    icon:"node",  desc:"16-pair enhanced node",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },
  { pn:"501RG0259", model:"ML698E",  cat:"NODES", family:"ML600",  form:"standalone",
    icon:"node",  desc:"High-density aggregation node",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },

  // ── ML600D DIN-rail hardened nodes ───────────────────────────────────────
  { pn:"501RG3230", model:"ML684D",     cat:"NODES", family:"ML600D", form:"din",
    icon:"din", desc:"4-pair DIN-rail hardened node",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },
  { pn:"501RG3255", model:"ML684D-M",   cat:"NODES", family:"ML600D", form:"din",
    icon:"din", desc:"4-pair DIN node, 12/24V",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },
  { pn:"501RG3358", model:"ML684DLP-M", cat:"NODES", family:"ML600DL", form:"din",
    icon:"din", desc:"4-pair DIN node, PoE, MACsec",
    iface:{ copper:true, coax:false, fiber:true, poe:true } },
  { pn:"501RG3378", model:"ML680DLP-M", cat:"NODES", family:"ML600DL", form:"din",
    icon:"din", desc:"DIN node, PoE, MACsec",
    iface:{ copper:true, coax:false, fiber:true, poe:true } },

  // ── GL5000 fiber DIN-rail L2/L3 switches ─────────────────────────────────
  { pn:"506R61252", model:"GL5010-8J2F",     cat:"SWITCHES", family:"GL5000", form:"din",
    icon:"din", desc:"8×G.hn + 2×SFP DIN switch (L2)",
    iface:{ copper:false, coax:true, fiber:true, poe:false } },
  { pn:"506R61258", model:"GL5030X-8J4F-P",  cat:"SWITCHES", family:"GL5000", form:"din",
    icon:"din", desc:"8×G.hn + 4×SFP DIN switch, PoE (L2)",
    iface:{ copper:false, coax:true, fiber:true, poe:true } },
  { pn:"506R61265", model:"GL5060X-16J4F-P", cat:"SWITCHES", family:"GL5000", form:"din",
    icon:"din", desc:"16×G.hn + 4×SFP DIN switch, PoE (L2)",
    iface:{ copper:false, coax:true, fiber:true, poe:true } },
  { pn:"506R61296", model:"GL5010R-8J2F",    cat:"SWITCHES", family:"GL5000", form:"din",
    icon:"din", desc:"8×G.hn + 2×SFP DIN switch (L3)",
    iface:{ copper:false, coax:true, fiber:true, poe:false } },

  // ── GL6000 fiber rackmount L2/L3 switches ────────────────────────────────
  { pn:"506R61287", model:"GL6010X-24J4F-AC",  cat:"SWITCHES", family:"GL6000", form:"rack",
    icon:"rack", desc:"24×G.hn + 4×SFP rack switch, AC (L2)",
    iface:{ copper:false, coax:true, fiber:true, poe:false, powerBuiltIn:"AC" } },
  { pn:"506R61284", model:"GL6030-24J4F-P-AC", cat:"SWITCHES", family:"GL6000", form:"rack",
    icon:"rack", desc:"24×G.hn + 4×SFP rack switch, PoE, AC (L2)",
    iface:{ copper:false, coax:true, fiber:true, poe:true, powerBuiltIn:"AC" } },
  { pn:"506R61290", model:"GL6040X-8J28F-AC",  cat:"SWITCHES", family:"GL6000", form:"rack",
    icon:"rack", desc:"8×G.hn + 28×SFP aggregation switch, AC",
    iface:{ copper:false, coax:true, fiber:true, poe:false, powerBuiltIn:"AC" } },

  // ── GL7000 in-pole L2 switches (PoE) ─────────────────────────────────────
  { pn:"506R61329", model:"GL7010-6J4F-P", cat:"SWITCHES", family:"GL7000", form:"inpole",
    icon:"pole", desc:"6×G.hn + 4×SFP in-pole switch, PoE",
    iface:{ copper:false, coax:true, fiber:true, poe:true } },
  { pn:"506R61331", model:"GL7030-6J4F-P", cat:"SWITCHES", family:"GL7000", form:"inpole",
    icon:"pole", desc:"6×G.hn + 4×SFP in-pole switch, PoE",
    iface:{ copper:false, coax:true, fiber:true, poe:true } },

  // ── ML500 rackmount fiber switches ───────────────────────────────────────
  { pn:"501RG0530", model:"ML530",   cat:"SWITCHES", family:"ML500", form:"standalone",
    icon:"node", desc:"Compact fiber L2 switch",
    iface:{ copper:false, coax:false, fiber:true, poe:false } },
  { pn:"506R62012", model:"ML5114DP",cat:"SWITCHES", family:"GL5000", form:"din",
    icon:"din",  desc:"DIN fiber switch, PoE",
    iface:{ copper:false, coax:false, fiber:true, poe:true } },

  // ── GL900 headend (copper aggregation for GL91 CPEs) ─────────────────────
  { pn:"501RG0167", model:"GL904", cat:"HEADEND", family:"GL900HE", form:"standalone",
    icon:"node", desc:"4-line copper headend, fiber uplink",
    iface:{ copper:true, coax:false, fiber:true, poe:false }, pairsWith:"GL900CPE" },
  { pn:"501RG0302", model:"GL916", cat:"HEADEND", family:"GL900HE", form:"standalone",
    icon:"node", desc:"16-line copper headend, fiber uplink",
    iface:{ copper:true, coax:false, fiber:true, poe:false }, pairsWith:"GL900CPE" },
  { pn:"501RG0303", model:"GL908", cat:"HEADEND", family:"GL900HE", form:"standalone",
    icon:"node", desc:"8-line copper headend, fiber uplink",
    iface:{ copper:true, coax:false, fiber:true, poe:false }, pairsWith:"GL900CPE" },

  // ── GL9000 headend (coax G.hn) ───────────────────────────────────────────
  { pn:"506R61334", model:"GL9110C", cat:"HEADEND", family:"GL9000HE", form:"rack",
    icon:"rack", desc:"Coax G.hn headend, fiber uplink",
    iface:{ copper:false, coax:true, fiber:true, poe:false }, pairsWith:"GL9000CPE" },
  { pn:"506R61342", model:"GL9104C", cat:"HEADEND", family:"GL9000HE", form:"rack",
    icon:"rack", desc:"Coax G.hn headend, fiber uplink",
    iface:{ copper:false, coax:true, fiber:true, poe:false }, pairsWith:"GL9000CPE" },

  // ── CPEs ─────────────────────────────────────────────────────────────────
  { pn:"506R61245", model:"GL91",     cat:"CPE", family:"GL900CPE", form:"cpe",
    icon:"cpe", desc:"Single-port copper CPE",
    iface:{ copper:true, coax:false, fiber:false, poe:false }, pairsWith:"GL900HE" },
  { pn:"501S61246", model:"GL91T",    cat:"CPE", family:"GL900CPE", form:"cpe",
    icon:"cpe", desc:"Copper CPE with PoE-out",
    iface:{ copper:true, coax:false, fiber:false, poe:true }, pairsWith:"GL900HE" },
  { pn:"506R61337", model:"GL93C",    cat:"CPE", family:"GL9000CPE", form:"cpe",
    icon:"cpe", desc:"Coax G.hn CPE",
    iface:{ copper:false, coax:true, fiber:false, poe:false }, pairsWith:"GL9000HE" },
  { pn:"506R61336", model:"GL93C-W",  cat:"CPE", family:"GL9000CPE", form:"cpe",
    icon:"cpe", desc:"Coax G.hn CPE, wall-plate",
    iface:{ copper:false, coax:true, fiber:false, poe:false }, pairsWith:"GL9000HE" },

  // ── Chassis & cards ──────────────────────────────────────────────────────
  { pn:"502R20230", model:"CHS-200",   cat:"CHASSIS", family:"CHASSIS", form:"chassis",
    icon:"chassis", desc:"200-series shelf",
    iface:{ copper:false, coax:false, fiber:false, poe:false } },
  { pn:"502R02110", model:"CHS-2000B", cat:"CHASSIS", family:"CHASSIS", form:"chassis",
    icon:"chassis", desc:'19" 2000-series shelf',
    iface:{ copper:false, coax:false, fiber:false, poe:false } },
  { pn:"503R60042", model:"SDU-450",   cat:"CHASSIS", family:"CHASSIS", form:"chassis",
    icon:"card", desc:"Service Dispatcher Unit",
    iface:{ copper:false, coax:false, fiber:true, poe:false } },
  { pn:"503R20132", model:"MLU-32DF",  cat:"CHASSIS", family:"CHASSIS", form:"chassis",
    icon:"card", desc:"32-pair Multiport Line Unit",
    iface:{ copper:true, coax:false, fiber:false, poe:false } },
].map(d => ({ ...d, datasheet: d.datasheet || ds(d.family), isDevice:true }));

// ════════════════════════════════════════════════════════════════════════════
//  ACCESSORIES  (grouped pools the engine draws from)
// ════════════════════════════════════════════════════════════════════════════
const A = (pn, model, desc, group, icon, family="ACCESSORY", extra={}) =>
  ({ pn, model, desc, group, icon, family, datasheet: ds(family), ...extra });

export const POWER = {
  ML600: [
    A("506R00006",  "AC/DC PSU (NA)",  "AC-DC PSU for ML600/ML700/ML530", "power", "psu"),
    A("506R00006E", "AC/DC PSU (EU)",  "AC-DC PSU for ML600/ML700/ML530", "power", "psu"),
  ],
  DIN: [
    A("506R61181", "DIN PSU 24VDC",       "DIN-rail PSU 24VDC (no PoE)",      "power", "psu"),
    A("506R61185", "DIN PSU 24VDC +US",   "DIN-rail PSU 24VDC + US cables",   "power", "psu"),
    A("506R61184", "DIN PSU 24VDC +EU",   "DIN-rail PSU 24VDC + EU cables",   "power", "psu"),
    A("506R61191", "DIN PSU 48VDC PoE",   "DIN-rail PSU 48VDC with PoE",      "power", "psu", { poe:true }),
  ],
  GL900: [
    A("506R00008",  "AC/DC PSU (NA)", "AC-DC PSU for GL900", "power", "psu"),
    A("506R00008U", "AC/DC PSU (UK)", "AC-DC PSU for GL900", "power", "psu"),
  ],
  GL800: [
    A("506R00013",  "AC/DC PSU (NA)", "AC/DC PSU for GL800", "power", "psu"),
    A("506R00013E", "AC/DC PSU (EU)", "AC/DC PSU for GL800", "power", "psu"),
  ],
};

export const MOUNTS = {
  standalone: [
    A("510R21080", "Wall Mount Kit",   "Wall mount for ML600/ML700/GL800/GL900", "mount", "mount"),
    A("510R21070", "Rack Sleeve Kit",  "Rack-mount sleeve (holds 2 units)",      "mount", "mount"),
    A("510K00060", "Accessories Kit",  "Accessories kit for ML600/ML700/ML530",  "mount", "kit"),
  ],
  din: [
    A("510R21080", "Wall Mount Kit",   "Optional wall mount (DIN clip integrated)", "mount", "mount"),
  ],
  chassis200: [
    A("510K20230", "CHS-200 Kit",  "Accessories kit for CHS-200",       "mount", "kit"),
    A("506R30060", "FCM-200",      "Fan Control Module for CHS-200",    "mount", "fan"),
  ],
  chassis2000: [
    A("506R30070", "Fan Module",   "Fan Control Module for CHS-2000B",  "mount", "fan"),
    A("550A00046", "SDU Flash",    "Flash card for SDU-450/G",          "mount", "card"),
  ],
};

export const SFPS = [
  A("506R00042", "1000Base-T",     "1000Base-T copper SFP",       "optics", "sfp"),
  A("506R00002", "1000Base-LX",    "1000Base-LX SMF (10 km)",     "optics", "sfp"),
  A("506R00012", "1000Base-SX",    "1000Base-SX MMF (500 m)",     "optics", "sfp"),
  A("506R00032", "100Base-FX SMF", "100Base-FX SMF (15 km)",      "optics", "sfp"),
  A("506R00022", "100Base-FX MMF", "100Base-FX MMF (2 km)",       "optics", "sfp"),
  A("506R61154", "2500Base-FX SMF","2.5G SMF (30 km)",            "optics", "sfp"),
  A("506R61155", "2500Base-FX MMF","2.5G MMF (500 m)",            "optics", "sfp"),
  A("506R61235", "10G-LR SFP+",    "10GBase-LR SMF (10 km)",      "optics", "sfp"),
];

export const CABLES_DSL = [
  A("504R20110", "Quad 10ft",   "DSL quad cable, 4×RJ-45, 10 ft",   "cabling", "cable"),
  A("504R20140", "Quad 100ft",  "DSL quad cable, 4×RJ-45, 100 ft",  "cabling", "cable"),
  A("504R20120", "Octal 10ft",  "DSL octal cable, 8×RJ-45, 10 ft",  "cabling", "cable"),
  A("504R20160", "Octal 100ft", "DSL octal cable, 8×RJ-45, 100 ft", "cabling", "cable"),
  A("504R20180", "Octal 150ft", "DSL octal cable, 8×RJ-45, 150 ft", "cabling", "cable"),
];

export const CABLES_LOOP = [
  A("504R60060", "Loop 25ft",  "64-pair copper loop, US, 25 ft",  "cabling", "cable"),
  A("504R60062", "Loop 100ft", "64-pair copper loop, US, 100 ft", "cabling", "cable"),
  A("504R60063", "Loop 150ft", "64-pair copper loop, US, 150 ft", "cabling", "cable"),
];

export const CABLES_PWR = [
  A("504R20047", "PWR/GND 14AWG", "Power/ground harness 20 ft, 48VDC 14AWG", "cabling", "cable"),
  A("504R20043", "PWR/GND 18AWG", "Power/ground harness 20 ft, 48VDC 18AWG", "cabling", "cable"),
];

// ════════════════════════════════════════════════════════════════════════════
//  COMPATIBILITY ENGINE
//  Returns the ordered list of accessory "slots" for a given device.
//  Each slot: { key, label, note, multi, options[] }
// ════════════════════════════════════════════════════════════════════════════
export function buildSlots(device) {
  if (!device) return [];
  const { form, iface = {}, family } = device;
  const slots = [];

  // ── POWER ────────────────────────────────────────────────────────────────
  if (iface.powerBuiltIn) {
    slots.push({ key:"power", label:"Power", multi:false, options:[],
      note:`Power built in (${iface.powerBuiltIn}). No external PSU required.` });
  } else if (form === "chassis") {
    slots.push({ key:"power", label:"Power", multi:false, options:[],
      note:"Shelf-powered. Configure PSU modules in the chassis build." });
  } else if (form === "cpe") {
    slots.push({ key:"power", label:"Power", multi:false,
      options: family === "GL900CPE" ? POWER.GL900 : [],
      note: family === "GL900CPE" ? "" : "Line-powered from headend. No local PSU needed." });
  } else if (form === "din" || form === "inpole") {
    slots.push({ key:"power", label:"Power", multi:false,
      options: iface.poe ? POWER.DIN : POWER.DIN.filter(p => !p.poe),
      note:"DIN-rail PSU — pick voltage to match the cabinet." });
  } else if (family === "GL900HE" || family === "GL900CPE") {
    slots.push({ key:"power", label:"Power", multi:false, options:POWER.GL900, note:"" });
  } else {
    slots.push({ key:"power", label:"Power", multi:false, options:POWER.ML600, note:"" });
  }

  // ── MOUNTING ───────────────────────────────────────────────────────────────
  if (form === "standalone") {
    slots.push({ key:"mount", label:"Mounting", multi:false, options:MOUNTS.standalone, note:"" });
  } else if (form === "din") {
    slots.push({ key:"mount", label:"Mounting", multi:false, options:MOUNTS.din,
      note:"35 mm DIN-rail clip integrated." });
  } else if (form === "rack") {
    slots.push({ key:"mount", label:"Mounting", multi:false, options:[],
      note:'19" rack ears integrated.' });
  } else if (form === "inpole") {
    slots.push({ key:"mount", label:"Mounting", multi:false, options:[],
      note:"In-pole / cabinet form-factor. No external bracket." });
  } else if (form === "chassis") {
    const opts = device.model === "CHS-200" ? MOUNTS.chassis200 : MOUNTS.chassis2000;
    slots.push({ key:"mount", label:"Shelf accessories", multi:true, options:opts, note:"" });
  } else if (form === "cpe") {
    slots.push({ key:"mount", label:"Mounting", multi:false, options:[],
      note:"Desktop / wall-plate. No mount kit required." });
  }

  // ── OPTICS (SFP) ───────────────────────────────────────────────────────────
  if (iface.fiber) {
    slots.push({ key:"optics", label:"Optics (SFP)", multi:true, options:SFPS,
      note:"Add one SFP per fiber uplink port in use." });
  }

  // ── CABLING ────────────────────────────────────────────────────────────────
  if (iface.copper) {
    if (form === "chassis" || family === "GL900HE") {
      slots.push({ key:"cabling", label:"Cabling", multi:true,
        options:[...CABLES_LOOP, ...CABLES_DSL], note:"Copper loop harnesses and RJ-45 patch cables." });
    } else if (form !== "cpe") {
      slots.push({ key:"cabling", label:"Cabling", multi:true,
        options:[...CABLES_DSL, ...CABLES_PWR], note:"One cable per active line group." });
    }
  } else if (iface.coax) {
    slots.push({ key:"cabling", label:"Cabling", multi:false, options:[],
      note:"Runs over existing coax. No Actelis cable kit required." });
  }

  return slots;
}

// ── Placement default per form-factor (UI toggle, mirrors AXIS) ──────────────
export function defaultPlacement(device) {
  if (!device) return "indoor";
  if (device.form === "inpole") return "pole";
  if (device.family === "ML600D" || device.family === "ML600DL") return "outdoor";
  return "indoor";
}
