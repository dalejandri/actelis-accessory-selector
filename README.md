# Actelis Accessory Selector

An AXIS-style accessory selector for Actelis products. Pick a device and the tool
shows a compatible chain of **Power → Mounting → Optics (SFP) → Cabling → Placement**,
then builds a **Bill of Materials** you can export to PDF, Excel, or the clipboard.

Built to match the Actelis Price Tool: Vite + React 18, deployed to GitHub Pages,
embeddable in WordPress via iframe.

## Quick start (local)
```
npm install
npm run dev
# opens http://localhost:5173/actelis-accessory-selector/
```

## Deploy to GitHub Pages
1. Create a repo named **actelis-accessory-selector** (must match `REPO_NAME` in `vite.config.js`).
2. Push this folder:
   ```
   git init && git add . && git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/dalejandri/actelis-accessory-selector.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages → Source → GitHub Actions**.
4. The included workflow builds and deploys on every push to `main`.
   Live at `https://dalejandri.github.io/actelis-accessory-selector/`.

## Embed in WordPress (iframe)
```html
<iframe
  src="https://dalejandri.github.io/actelis-accessory-selector/"
  style="width:100%; height:1100px; border:none; border-radius:8px;"
  title="Actelis Accessory Selector"
  loading="lazy">
</iframe>
```
For a custom domain / subdirectory, set `base: "/"` in `vite.config.js` before building.

## Maintaining the catalog
Everything lives in **`src/catalog.js`** — the UI reacts automatically.

- **Add a device:** copy a row in `DEVICES`, set `model`, `pn`, `cat`, `family`,
  `form`, and the `iface` flags (`copper` = G.SHDSL pairs, `coax` = G.hn "J" ports,
  `fiber` = has SFP slots, `poe` = supplies PoE). Compatible accessories are derived
  from those tags by `buildSlots()` — no UI edits needed.
- **Add/adjust accessories:** edit the `POWER`, `MOUNTS`, `SFPS`, `CABLES_*` pools.
- **Change what's compatible:** edit the rules in `buildSlots()`.

## Datasheets & images
- **Datasheets:** each catalog entry has a `datasheet` URL. Verified links and the
  correct product-family pages are pre-filled. To wire an exact PDF, paste its URL
  (Actelis PDFs live under `actelis.com/wp-content/uploads/YYYY/MM/…`).
- **Product photos:** drop a PNG into `public/img/` and add `image: "/img/ml624.png"`
  to that catalog entry. If no `image` is set, an on-brand SVG icon is shown instead.

## File structure
```
actelis-accessory-selector/
├── .github/workflows/deploy.yml   ← auto-deploy on push
├── public/img/                    ← optional product photos
├── src/
│   ├── main.jsx                   ← React entry
│   ├── App.jsx                    ← selector UI + BOM
│   ├── catalog.js                 ← data + compatibility engine  ← edit this
│   ├── Icon.jsx                   ← SVG product silhouettes
│   └── exports.js                 ← PDF / Excel / clipboard
├── index.html
├── package.json
└── vite.config.js
```

## Where the compatibility rules come from

The engine is a port of the Access quote tool's **Wizard-Node** form. Every rule
switches on a real column of the **AutoRepeaterInfo** table rather than on a
hand-tagged guess:

| Rule | Driven by |
|---|---|
| Which SFPs are offered | `SFP Info` speed class (100 / 1000 / 100-1000 / 2500-10GE / None) |
| How many SFPs you can add | `SFP Qty/Mode` = the unit's cage count |
| Which copper cable | `NumPairs` (0 → none; 8 → 8-pair; 16/32 → 16-pair; else small). ML600D uses its own `PTP-D Cable` |
| Cable quantity | 32-pair units take 2 cables per unit |
| Which PSU | `PN Type` + `Power Input` (0 built-in · 1 DC · 2 DIN non-PoE · 3 DIN PoE); ML600D PoE detected from the `-TP`/`-P-M`/`60V)` suffix |
| Which craft cable | family + `OEM` (`DT` / `NewD` / plain D / ML600 / ML5xx) |
| Mounting shown at all | suppressed for DIN-rail and `OEM = "NA"`; kit `NumPairs` is its slot count |

### Region

This build is **NA only**. `src/ari.js` is pre-filtered to the NA region,
matching the Access tool's `QuoteRegion = "NA"`. EMEA/APAC parts (e.g. the
`+ EU Cables` DIN PSU `506R61184`) are absent by design. To add another region,
re-run the generator without the NA filter and restore the region selector.

### Regenerating `src/ari.js`

`src/ari.js` is **generated** — don't hand-edit it. Re-export `AutoRepeaterInfo`
from Access to `.xlsx` and re-run `gen_ari.py` against it.

### Verifying

```bash
node verify-rules.mjs
```

Asserts the engine still reproduces the wizard's behaviour (SFP classes, pair
rules, PSU pools, craft cables, mounting). Run it after regenerating `ari.js` or
touching the engine. A failure means the web tool and the Access tool would
quote differently.

### Coverage caveat

23 of the 39 devices are backed by AutoRepeaterInfo. The newer G.hn lines —
**GL800, GL900, GL9000** and `GL5010R-8J2F` — are **not in the Access data**, so
their options fall back to inference from the price list. The UI flags those
devices explicitly. As with the Access tool itself, software and specialised
accessories (CWDM, external powering) still need to be configured manually.
