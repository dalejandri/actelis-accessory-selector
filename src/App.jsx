import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  DEVICES, CATEGORIES, buildSlots, defaultPlacement, priceOf, fmtUsd, isVerified,
} from "./catalog.js";
import Icon from "./Icon.jsx";
import { exportBomPdf, exportBomExcel, copyBom } from "./exports.js";

// ─── Design tokens (match the Actelis Price Tool) ────────────────────────────
const C = {
  navy: "#0B1D3A", navy2: "#0B2343", amber: "#D97706", orange: "#E8600A",
  ink: "#1A2035", muted: "#64748B", faint: "#94A3B8",
  border: "#E2E8F0", bg: "#F8FAFC", amberBg: "#FFFBEB", green: "#10B981",
};
const LOGO = "https://actelis.com/wp-content/uploads/2021/10/a_logo-1.gif";
// The Access quote tool filters every PSU and cable list by QuoteRegion. This
// build targets NA only, so the accessory data in ari.js is pre-filtered to NA
// and the region is fixed rather than selectable — offering other regions would
// imply a catalog we haven't loaded.
const REGION = "North America (NA)";

const font = "'Segoe UI', system-ui, -apple-system, sans-serif";

// ─── Small reusable bits ─────────────────────────────────────────────────────
function DatasheetLink({ href, small }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noreferrer" title="Open datasheet"
       onClick={(e) => e.stopPropagation()}
       style={{ display: "inline-flex", alignItems: "center", color: C.orange,
                textDecoration: "none", fontSize: small ? 11 : 12, fontWeight: 600 }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginRight: small ? 0 : 4 }}>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"
              stroke={C.orange} strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M14 3v5h5" stroke={C.orange} strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
      {!small && "Datasheet"}
    </a>
  );
}

// A product thumbnail.
//
// Photos are convention-based: drop a file into public/img/ and it appears — no
// catalog edit needed. Two names are accepted, tried in order:
//    public/img/501RG0046.png   (part number)
//    public/img/ML624.png       (model)
// so existing artwork named by model works without renaming. If neither loads
// we fall back to the on-brand SVG silhouette, which means the tool always
// looks finished and photos can be added a few at a time.
function ProductImage({ item, size = 56 }) {
  const [step, setStep] = useState(0);

  const sources = useMemo(() => {
    // Vite replaces import.meta.env at build time; guard it so the component
    // also renders under plain Node (the SSR smoke test).
    const base = (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) || "/";
    const list = [];
    if (item?.image) list.push(item.image);
    if (item?.pn) list.push(`${base}img/${item.pn}.png`);
    if (item?.model && item.model !== item.pn) list.push(`${base}img/${item.model}.png`);
    return list;
  }, [item?.image, item?.pn, item?.model]);

  // Restart the chain when the part changes, or a failure would stick.
  useEffect(() => { setStep(0); }, [sources]);

  if (step >= sources.length) return <Icon name={item?.icon || "node"} size={size} />;
  // Photos sit on a white tile. Cards are white but the selected state is amber
  // tinted, so without this a white-background photo would show as a hard box
  // against the amber. The tile means transparent PNGs and plain white-backdrop
  // photos both look right — background removal is optional, not required.
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",
                   width: size, height: size, background: "#fff", borderRadius: 6,
                   overflow: "hidden" }}>
      <img src={sources[step]} alt={item?.model || item?.pn || ""}
           onError={() => setStep(s => s + 1)}
           style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </span>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
//  DEVICE SELECTION MODAL
// ═════════════════════════════════════════════════════════════════════════════
function DeviceModal({ onPick, onClose }) {
  const [tab, setTab] = useState("ALL");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return DEVICES.filter(d =>
      (tab === "ALL" || d.cat === tab) &&
      (!t || d.model.toLowerCase().includes(t) || d.desc.toLowerCase().includes(t) || d.pn.toLowerCase().includes(t))
    );
  }, [tab, q]);

  return (
    <Overlay onClose={onClose}>
      <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}`, display: "flex",
                    alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0, fontSize: 20, color: C.ink, fontWeight: 700 }}>Select device</h2>
        <CloseBtn onClose={onClose} />
      </div>

      <div style={{ padding: "16px 22px 0" }}>
        <div style={{ position: "relative", marginBottom: 14 }}>
          <span style={{ position: "absolute", left: 2, top: 6, color: C.faint }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke={C.faint} strokeWidth="2"/>
              <path d="m20 20-3-3" stroke={C.faint} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)}
                 placeholder="Search for a model or part number"
                 style={{ width: "100%", padding: "6px 6px 8px 26px", border: "none",
                          borderBottom: `2px solid ${C.navy}`, fontSize: 15, outline: "none",
                          fontFamily: font, color: C.ink, background: "transparent" }} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
          <Tab active={tab === "ALL"} onClick={() => setTab("ALL")}>ALL</Tab>
          {CATEGORIES.map(cat => (
            <Tab key={cat.key} active={tab === cat.key} onClick={() => setTab(cat.key)}>
              {cat.label.toUpperCase()}
            </Tab>
          ))}
        </div>
      </div>

      <div style={{ overflowY: "auto", padding: "6px 10px 12px" }}>
        {list.length === 0 && (
          <div style={{ padding: 30, textAlign: "center", color: C.muted, fontSize: 14 }}>
            No devices match “{q}”. Try a different model or clear the filter.
          </div>
        )}
        {list.map(d => (
          <div key={d.pn} onClick={() => onPick(d)}
               style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 12px",
                        borderRadius: 10, cursor: "pointer" }}
               onMouseEnter={e => (e.currentTarget.style.background = C.bg)}
               onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <div style={{ flexShrink: 0 }}><ProductImage item={d} size={46} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, color: C.ink, fontSize: 15 }}>{d.model}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{d.desc}</div>
            </div>
            <code style={{ fontSize: 11, color: C.faint }}>{d.pn}</code>
            <DatasheetLink href={d.datasheet} />
          </div>
        ))}
      </div>
    </Overlay>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
//  ACCESSORY PICKER MODAL (per slot)
// ═════════════════════════════════════════════════════════════════════════════
function AccessoryModal({ slot, current, onApply, onClose }) {
  // current: for single → pn|null; for multi → array of {pn,qty}
  const [multi, setMulti] = useState(
    slot.multi ? Object.fromEntries((current || []).map(x => [x.pn, x.qty])) : {}
  );
  const [single, setSingle] = useState(slot.multi ? null : (current || null));

  const toggleMulti = (pn) =>
    setMulti(m => {
      const n = { ...m };
      if (n[pn]) delete n[pn]; else n[pn] = 1;
      return n;
    });
  // The wizard caps SFP quantity at the unit's actual cage count; slot.maxQty
  // carries that from AutoRepeaterInfo's "SFP Qty/Mode" column.
  const cap = slot.maxQty || 999;
  const used = Object.entries(multi).reduce((s, [, q]) => s + q, 0);
  const over = slot.maxQty ? used > cap : false;

  const setQty = (pn, v) =>
    setMulti(m => ({ ...m, [pn]: Math.max(1, Math.min(cap, v | 0)) }));

  const apply = () => {
    if (slot.multi) onApply(Object.entries(multi).map(([pn, qty]) => ({ pn, qty })));
    else onApply(single);
  };

  return (
    <Overlay onClose={onClose} width={620}>
      <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}`, display: "flex",
                    alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 19, color: C.ink, fontWeight: 700 }}>{slot.label}</h2>
          {slot.note && <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{slot.note}</div>}
        </div>
        <CloseBtn onClose={onClose} />
      </div>

      <div style={{ overflowY: "auto", padding: "12px 16px" }}>
        {!slot.multi && (
          <button onClick={() => setSingle(null)}
                  style={optRow(single === null)}>
            <div style={{ width: 40 }} />
            <div style={{ flex: 1, fontWeight: 600, color: C.ink, fontSize: 13 }}>None</div>
          </button>
        )}
        {slot.options.map(o => {
          const on = slot.multi ? !!multi[o.pn] : single === o.pn;
          return (
            <div key={o.pn} style={optRow(on)}
                 onClick={() => slot.multi ? toggleMulti(o.pn) : setSingle(o.pn)}>
              <div style={{ width: 40, flexShrink: 0 }}><ProductImage item={o} size={38} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: C.ink, fontSize: 13 }}>{o.model}</div>
                <div style={{ fontSize: 11.5, color: C.muted }}>{o.desc}</div>
                <code style={{ fontSize: 10.5, color: C.faint }}>{o.pn}</code>
              </div>
              <DatasheetLink href={o.datasheet} small />
              {slot.multi && on && (
                <input type="number" min={1} max={cap} value={multi[o.pn]}
                       onClick={e => e.stopPropagation()}
                       onChange={e => setQty(o.pn, +e.target.value)}
                       style={{ width: 52, marginLeft: 10, padding: "5px 6px", border: `1px solid ${C.border}`,
                                borderRadius: 6, fontSize: 13, textAlign: "center", fontFamily: font }} />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ padding: "12px 22px", borderTop: `1px solid ${C.border}`, display: "flex",
                    justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 12, color: over ? C.orange : C.muted }}>
          {slot.maxQty
            ? over
              ? `${used} selected — this unit has only ${cap} port${cap > 1 ? "s" : ""}.`
              : `${used} of ${cap} port${cap > 1 ? "s" : ""} used`
            : ""}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={btnGhost}>Cancel</button>
          <button onClick={apply} style={btnPrimary}>Apply</button>
        </div>
      </div>
    </Overlay>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
//  DEVICE DETAIL — opened by clicking the device card. Shows the product photo
//  large plus its key facts. Changing the device is deliberately NOT wired here;
//  that's the "Change device" button's job, so clicking the picture never throws
//  away a configuration you're part-way through.
// ═════════════════════════════════════════════════════════════════════════════
function DeviceDetail({ device, onClose, onChange }) {
  if (!device) return null;
  const price = priceOf(device.pn);
  const verified = isVerified(device);
  const cat = (CATEGORIES.find(c => c.key === device.cat) || {}).label;

  return (
    <Overlay onClose={onClose} width={620}>
      <div style={{ padding: "18px 22px", borderBottom: `1px solid ${C.border}`,
                    display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, color: C.navy }}>{device.model}</div>
          {cat && <div style={{ fontSize: 12, color: C.faint, textTransform: "uppercase",
                                letterSpacing: 0.4, marginTop: 2 }}>{cat}</div>}
        </div>
        <button onClick={onClose} title="Close"
                style={{ background: "none", border: "none", cursor: "pointer", color: C.muted,
                         padding: 4, display: "inline-flex" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div style={{ padding: 22, overflowY: "auto" }}>
        <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 12,
                      padding: 18, display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 18 }}>
          <ProductImage item={device} size={260} />
        </div>

        <div style={{ fontSize: 14.5, color: C.ink, lineHeight: 1.55, marginBottom: 16 }}>
          {device.desc}
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
          <tbody>
            <Row k="Part number" v={<code style={{ color: C.navy2 }}>{device.pn}</code>} />
            <Row k="List price" v={fmtUsd(price)} />
            <Row k="Region" v={REGION} />
            <Row k="Compatibility data"
                 v={verified
                   ? <span style={{ color: C.green, fontWeight: 600 }}>From the Access quote tool</span>
                   : <span style={{ color: C.orange, fontWeight: 600 }}>Inferred — verify before quoting</span>} />
          </tbody>
        </table>
      </div>

      <div style={{ padding: "12px 22px", borderTop: `1px solid ${C.border}`, display: "flex",
                    justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <DatasheetLink href={device.datasheet} />
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onChange} style={btnGhost}>Change device</button>
          <button onClick={onClose} style={btnPrimary}>Close</button>
        </div>
      </div>
    </Overlay>
  );
}

const Row = ({ k, v }) => (
  <tr style={{ borderTop: `1px solid ${C.bg}` }}>
    <td style={{ padding: "9px 0", color: C.muted, width: 160 }}>{k}</td>
    <td style={{ padding: "9px 0", color: C.ink, fontWeight: 600 }}>{v}</td>
  </tr>
);

// ═════════════════════════════════════════════════════════════════════════════
//  SLOT CARD (a column in the flow)
// ═════════════════════════════════════════════════════════════════════════════
function SlotCard({ slot, picked, onOpen }) {
  const hasOptions = slot.options.length > 0;
  const filled = slot.multi ? (picked && picked.length > 0) : !!picked;

  let bodyIcon = "placement", title = "", sub = "";
  if (slot.multi) {
    const n = (picked || []).reduce((s, x) => s + (x.qty || 1), 0);
    bodyIcon = slot.options[0]?.icon || "sfp";
    title = filled ? `${n} item${n > 1 ? "s" : ""}` : (hasOptions ? "None selected" : "—");
    sub = slot.label;
  } else if (filled) {
    const opt = slot.options.find(o => o.pn === picked);
    bodyIcon = opt?.icon || "psu";
    title = opt?.model || picked;
    sub = slot.label;
  } else {
    bodyIcon = slot.options[0]?.icon || "placement";
    title = hasOptions ? "Not selected" : "Included";
    sub = slot.label;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.faint, textTransform: "uppercase",
                    letterSpacing: 0.4, marginBottom: 8, height: 14 }}>{slot.label}</div>
      <div onClick={hasOptions ? onOpen : undefined}
           style={{ width: 160, minHeight: 150, background: "#fff", border: `1px solid ${filled ? C.amber : C.border}`,
                    borderRadius: 12, padding: 14, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 6,
                    cursor: hasOptions ? "pointer" : "default",
                    boxShadow: filled ? "0 4px 14px rgba(217,119,6,0.12)" : "0 1px 3px rgba(11,29,58,0.06)" }}>
        {hasOptions || filled
          ? <Icon name={bodyIcon} size={52} />
          : <div style={{ opacity: 0.35 }}><Icon name={bodyIcon} size={44} /></div>}
        <div style={{ fontWeight: 700, fontSize: 13, color: C.ink, textAlign: "center", lineHeight: 1.2 }}>
          {title}
        </div>
        {!hasOptions && slot.note && (
          <div style={{ fontSize: 10.5, color: C.muted, textAlign: "center", lineHeight: 1.3 }}>{slot.note}</div>
        )}
      </div>
      {hasOptions && (
        <button onClick={onOpen}
                style={{ marginTop: 8, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8,
                         padding: "5px 12px", fontSize: 12, fontWeight: 600, color: C.navy2,
                         cursor: "pointer", fontFamily: font, display: "inline-flex", alignItems: "center", gap: 4 }}>
          <span style={{ color: C.orange, fontWeight: 800, fontSize: 14 }}>+</span>
          {filled ? "Change" : slot.label}
        </button>
      )}
    </div>
  );
}

const Connector = () => (
  <div style={{ flex: "0 0 24px", height: 1, background: C.border, alignSelf: "center", marginTop: 22 }} />
);

// ═════════════════════════════════════════════════════════════════════════════
//  PREDICTIVE SEARCH (type-ahead) — for when you already know the equipment
// ═════════════════════════════════════════════════════════════════════════════
const CAT_LABEL = Object.fromEntries((CATEGORIES || []).map(c => [c.key, c.label]));

function highlightMatch(text, q) {
  const t = q.trim();
  if (!t) return text;
  const i = text.toLowerCase().indexOf(t.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark style={{ background: C.amberBg, color: C.orange, padding: 0, fontWeight: 700 }}>
        {text.slice(i, i + t.length)}
      </mark>
      {text.slice(i + t.length)}
    </>
  );
}

function QuickSearch({ onPick, current }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);

  const matches = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    const scored = [];
    for (const d of DEVICES) {
      const model = d.model.toLowerCase();
      const pn = d.pn.toLowerCase();
      const desc = (d.desc || "").toLowerCase();
      let score = -1;
      if (pn.startsWith(t) || model.startsWith(t)) score = 0;
      else if (pn.includes(t) || model.includes(t)) score = 1;
      else if (desc.includes(t)) score = 2;
      if (score >= 0) scored.push({ d, score });
    }
    scored.sort((a, b) => a.score - b.score || a.d.model.localeCompare(b.d.model));
    return scored.slice(0, 8).map(s => s.d);
  }, [q]);

  const choose = (d) => { onPick(d); setQ(""); setOpen(false); setHi(0); };

  const onKey = (e) => {
    if (!open || !matches.length) {
      if (e.key === "ArrowDown" && matches.length) setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); setHi(h => Math.min(h + 1, matches.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHi(h => Math.max(h - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); choose(matches[hi]); }
    else if (e.key === "Escape") { setOpen(false); }
  };

  return (
    <div style={{ position: "relative", marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#fff",
                    border: `1.5px solid ${open && matches.length ? C.navy : C.border}`, borderRadius: 10,
                    padding: "11px 14px", boxShadow: "0 1px 3px rgba(11,29,58,0.05)",
                    transition: "border-color 120ms" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="7" stroke={C.muted} strokeWidth="2" />
          <path d="M21 21l-4.3-4.3" stroke={C.muted} strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); setHi(0); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={onKey}
          placeholder="Know the model? Search by name or part number — e.g. ML624, GL5030X, GL9110C…"
          style={{ flex: 1, border: "none", outline: "none", fontSize: 14.5, color: C.ink,
                   fontFamily: font, background: "transparent" }}
        />
        {q && (
          <button onMouseDown={(e) => { e.preventDefault(); setQ(""); setOpen(false); }}
                  title="Clear"
                  style={{ background: "none", border: "none", cursor: "pointer", color: C.faint,
                           padding: 0, display: "inline-flex", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {open && matches.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 40,
                      background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10,
                      boxShadow: "0 12px 30px rgba(11,29,58,0.16)", overflow: "hidden" }}>
          {matches.map((d, idx) => (
            <div key={d.pn}
                 onMouseDown={(e) => { e.preventDefault(); choose(d); }}
                 onMouseEnter={() => setHi(idx)}
                 style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                          cursor: "pointer", background: idx === hi ? C.amberBg : "#fff",
                          borderBottom: idx < matches.length - 1 ? `1px solid ${C.bg}` : "none" }}>
              <span style={{ flexShrink: 0 }}><ProductImage item={d} size={34} /></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.ink }}>{highlightMatch(d.model, q)}</div>
                <div style={{ fontSize: 12, color: C.muted, overflow: "hidden", textOverflow: "ellipsis",
                              whiteSpace: "nowrap" }}>{d.desc}</div>
              </div>
              <div style={{ flexShrink: 0, textAlign: "right" }}>
                <code style={{ fontSize: 12, color: C.navy2 }}>{highlightMatch(d.pn, q)}</code>
                {CAT_LABEL[d.cat] && (
                  <div style={{ fontSize: 10.5, color: C.faint, textTransform: "uppercase",
                                letterSpacing: 0.3, marginTop: 2 }}>{CAT_LABEL[d.cat]}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {open && q.trim() && matches.length === 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 40,
                      background: "#fff", border: `1px solid ${C.border}`, borderRadius: 10,
                      boxShadow: "0 12px 30px rgba(11,29,58,0.16)", padding: "12px 14px",
                      fontSize: 13.5, color: C.muted }}>
          No device matches “{q.trim()}”. Try a family like ML600, GL5000 or GL9000 — or use{" "}
          <span style={{ color: C.orange, fontWeight: 600 }}>Choose</span> to browse by category.
        </div>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
//  MAIN APP
// ═════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [device, setDevice] = useState(null);
  const [sel, setSel] = useState({});           // slotKey -> pn | [{pn,qty}]
  const [placement, setPlacement] = useState("indoor");
  const region = REGION;
  const [project, setProject] = useState("");
  const [modal, setModal] = useState(null);      // "device" | slotKey | null
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  const slots = useMemo(() => buildSlots(device), [device]);

  const pickDevice = (d) => {
    setDevice(d);
    setSel({});
    setPlacement(defaultPlacement(d));
    setModal(null);
  };
  const reset = () => { setDevice(null); setSel({}); setModal(null); };

  const applySlot = (slotKey, value) => {
    setSel(s => ({ ...s, [slotKey]: value }));
    setModal(null);
  };

  // ── Build the Bill of Materials rows ──────────────────────────────────────
  const bom = useMemo(() => {
    if (!device) return [];
    const row = (o, groupLabel, qty, slotKey) => {
      const unit = priceOf(o.pn);
      return { name: `${o.model} — ${o.desc}`, pn: o.pn, datasheet: o.datasheet,
               groupLabel, qty, slotKey, icon: o.icon,
               unitPrice: unit, lineTotal: unit == null ? null : unit * qty };
    };
    const rows = [row(device, "Device", 1, "device")];
    for (const slot of slots) {
      const picked = sel[slot.key];
      if (!picked) continue;
      if (slot.multi) {
        for (const { pn, qty } of picked) {
          const o = slot.options.find(x => x.pn === pn);
          if (o) rows.push(row(o, slot.label, qty, slot.key));
        }
      } else {
        const o = slot.options.find(x => x.pn === picked);
        if (o) rows.push(row(o, slot.label, 1, slot.key));
      }
    }
    return rows;
  }, [device, slots, sel]);

  // Total covers priced lines only; unpriced lines are reported separately so
  // the number is never quietly understated.
  const totals = useMemo(() => {
    let sum = 0, unpriced = 0;
    for (const r of bom) {
      if (r.lineTotal == null) unpriced++;
      else sum += r.lineTotal;
    }
    return { sum, unpriced };
  }, [bom]);

  const removeRow = (row) => {
    if (row.slotKey === "device") { reset(); return; }
    setSel(s => {
      const slot = slots.find(sl => sl.key === row.slotKey);
      if (!slot) return s;
      if (slot.multi) return { ...s, [row.slotKey]: (s[row.slotKey] || []).filter(x => x.pn !== row.pn) };
      const n = { ...s }; delete n[row.slotKey]; return n;
    });
  };

  const exportMeta = { device, rows: bom, placement, region, projectLabel: project };

  const doPdf = useCallback(async () => {
    setBusy(true);
    try { await exportBomPdf(exportMeta); }
    catch (e) { alert("PDF export failed: " + e.message); }
    finally { setBusy(false); }
  }, [exportMeta]);

  const doExcel = useCallback(async () => {
    try { await exportBomExcel(exportMeta); }
    catch (e) { alert("Excel export failed: " + e.message); }
  }, [exportMeta]);

  const doCopy = useCallback(async () => {
    const ok = await copyBom(exportMeta);
    if (ok) { setCopied(true); setTimeout(() => setCopied(false), 1800); }
  }, [exportMeta]);

  return (
    <div style={{ fontFamily: font, color: C.ink, background: C.bg, minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ background: "#fff", borderBottom: `1px solid ${C.border}`, padding: "14px 24px",
                       display: "flex", alignItems: "center", gap: 16 }}>
        <img src={LOGO} alt="Actelis" style={{ height: 30 }} />
        <div style={{ width: 1, height: 26, background: C.border }} />
        <h1 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: C.navy }}>Accessory Selector</h1>
      </header>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 20px 60px" }}>
        {/* Predictive search — jump straight to a device you already know */}
        <QuickSearch onPick={pickDevice} current={device} />

        {/* Flow controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>Configuration</span>
          {device && (
            <button onClick={reset} style={{ background: "none", border: "none", color: C.orange,
                     fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: font }}>Reset</button>
          )}
        </div>

        {/* ── The flow row ─────────────────────────────────────────────────── */}
        <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14,
                      padding: "22px 20px", overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 4, minWidth: "min-content" }}>
            {/* Device card */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.faint, textTransform: "uppercase",
                            letterSpacing: 0.4, marginBottom: 8, height: 14 }}>Device</div>
              {/* Clicking the card inspects the product. It only opens the
                  picker when nothing is chosen yet, where the card IS the
                  call to action. Once a device is set, swapping it is the
                  button's job — an accidental click on the picture shouldn't
                  discard a configuration in progress. */}
              <div onClick={() => setModal(device ? "detail" : "device")}
                   title={device ? `View ${device.model}` : "Select a device"}
                   style={{ width: 168, minHeight: 150, background: "#fff",
                            border: `1px solid ${device ? C.amber : C.navy}`, borderRadius: 12, padding: 14,
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                            gap: 6, cursor: device ? "zoom-in" : "pointer",
                            boxShadow: device ? "0 4px 14px rgba(217,119,6,0.12)" : "0 2px 10px rgba(11,29,58,0.10)" }}>
                <ProductImage item={device} size={58} />
                <div style={{ fontWeight: 700, fontSize: 14, color: C.ink, textAlign: "center" }}>
                  {device ? device.model : "Select device"}
                </div>
                {device && <div style={{ fontSize: 11, color: C.muted, textAlign: "center" }}>{device.desc}</div>}
              </div>
              <button onClick={() => setModal("device")}
                      style={{ marginTop: 8, background: device ? "#fff" : C.navy,
                               border: `1px solid ${device ? C.border : C.navy}`, borderRadius: 8,
                               padding: "5px 14px", fontSize: 12, fontWeight: 600,
                               color: device ? C.navy2 : "#fff", cursor: "pointer", fontFamily: font }}>
                {device ? "Change device" : "Choose"}
              </button>
              {device && (
                <div style={{ marginTop: 6 }}><DatasheetLink href={device.datasheet} /></div>
              )}
            </div>

            {/* Slots */}
            {device && slots.map(slot => (
              <React.Fragment key={slot.key}>
                <Connector />
                <SlotCard slot={slot} picked={sel[slot.key]} onOpen={() => setModal(slot.key)} />
              </React.Fragment>
            ))}

            {/* Placement */}
            {device && (
              <>
                <Connector />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.faint, textTransform: "uppercase",
                                letterSpacing: 0.4, marginBottom: 8, height: 14 }}>Placement</div>
                  <div style={{ width: 160, minHeight: 150, background: "#fff", border: `1px solid ${C.border}`,
                                borderRadius: 12, padding: 14, display: "flex", flexDirection: "column",
                                alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <Icon name="placement" size={48} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 5, width: "100%" }}>
                      {["indoor", "outdoor", "pole"].map(p => (
                        <button key={p} onClick={() => setPlacement(p)}
                                style={{ padding: "5px 8px", borderRadius: 7,
                                         border: `1.5px solid ${placement === p ? C.amber : C.border}`,
                                         background: placement === p ? C.amberBg : "#fff",
                                         color: C.ink, fontSize: 12, fontWeight: 600, cursor: "pointer",
                                         textTransform: "capitalize", fontFamily: font }}>{p}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Provenance banner: say plainly where this device's rules came from. */}
        {device && !isVerified(device) && (
          <div style={{ marginTop: 12, padding: "10px 14px", background: C.amberBg,
                        border: `1px solid ${C.amber}`, borderRadius: 10, fontSize: 12.5,
                        color: C.ink, lineHeight: 1.5 }}>
            <strong>{device.model}</strong> isn’t in the Access quote tool’s data, so the options
            below are inferred from the price list rather than taken from Actelis’ compatibility
            rules. Verify power, optics and cabling before quoting.
          </div>
        )}

        {/* Empty state hint */}
        {!device && (
          <div style={{ textAlign: "center", color: C.muted, fontSize: 14, marginTop: 22 }}>
            Start by choosing a device. Compatible power, mounting, optics and cabling appear automatically.
          </div>
        )}

        {/* ── Bill of materials ────────────────────────────────────────────── */}
        {device && (
          <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14,
                        marginTop: 26, padding: "22px 24px" }}>
            <h2 style={{ margin: "0 0 16px", fontSize: 17, fontWeight: 700, color: C.navy }}>Bill of materials</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                <thead>
                  <tr style={{ textAlign: "left", color: C.muted, fontSize: 12,
                               borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ padding: "8px 6px", fontWeight: 600 }}>Name</th>
                    <th style={{ padding: "8px 6px", fontWeight: 600 }}>Group</th>
                    <th style={{ padding: "8px 6px", fontWeight: 600, width: 60, textAlign: "center" }}>Qty</th>
                    <th style={{ padding: "8px 6px", fontWeight: 600, width: 110 }}>Part number</th>
                    <th style={{ padding: "8px 6px", fontWeight: 600, width: 90, textAlign: "right" }}>List price</th>
                    <th style={{ padding: "8px 6px", fontWeight: 600, width: 90, textAlign: "right" }}>Total</th>
                    <th style={{ padding: "8px 6px", width: 70 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {bom.map((r, i) => (
                    <tr key={r.pn + i} style={{ borderBottom: `1px solid ${C.bg}` }}>
                      <td style={{ padding: "10px 6px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ flexShrink: 0 }}><Icon name={r.icon || "node"} size={26} /></span>
                          <span style={{ color: C.ink }}>{r.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: "10px 6px", color: C.muted }}>{r.groupLabel}</td>
                      <td style={{ padding: "10px 6px", textAlign: "center", color: C.ink }}>{r.qty}</td>
                      <td style={{ padding: "10px 6px" }}><code style={{ color: C.navy2 }}>{r.pn}</code></td>
                      <td style={{ padding: "10px 6px", textAlign: "right",
                                   color: r.unitPrice == null ? C.faint : C.ink }}>
                        {fmtUsd(r.unitPrice)}
                      </td>
                      <td style={{ padding: "10px 6px", textAlign: "right", fontWeight: 600,
                                   color: r.lineTotal == null ? C.faint : C.ink }}>
                        {fmtUsd(r.lineTotal)}
                      </td>
                      <td style={{ padding: "10px 6px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-end" }}>
                          <DatasheetLink href={r.datasheet} small />
                          <button onClick={() => removeRow(r)} title="Remove"
                                  style={{ background: "none", border: "none", cursor: "pointer", color: C.faint,
                                           padding: 0, display: "inline-flex" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7"
                                    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ borderTop: `2px solid ${C.border}` }}>
                    <td colSpan={4} style={{ padding: "12px 6px", textAlign: "right",
                                             fontWeight: 700, color: C.navy }}>
                      Estimated list total
                    </td>
                    <td />
                    <td style={{ padding: "12px 6px", textAlign: "right", fontWeight: 700,
                                 fontSize: 15, color: C.navy }}>
                      {fmtUsd(totals.sum)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style={{ marginTop: 10, fontSize: 11.5, color: C.muted, lineHeight: 1.5 }}>
              List prices in USD, excluding tax, freight and any regional adjustment — indicative only,
              not a quotation.
              {totals.unpriced > 0 && (
                <> {totals.unpriced} line{totals.unpriced > 1 ? "s are" : " is"} not on the price
                list and {totals.unpriced > 1 ? "are" : "is"} excluded from the total.</>
              )}
            </div>

            {/* Export row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center",
                          marginTop: 22, paddingTop: 18, borderTop: `1px solid ${C.border}` }}>
              <button onClick={doPdf} disabled={busy} style={exportLink}>
                <ExpIcon /> {busy ? "Generating…" : "Download as PDF"}
              </button>
              <button onClick={doExcel} style={exportLink}><ExpIcon /> Export to Excel</button>
              <button onClick={doCopy} style={exportLink}>
                <ExpIcon /> {copied ? "Copied ✓" : "Copy to clipboard"}
              </button>
            </div>
          </div>
        )}

        {/* Region */}
        {device && (
          <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14,
                        marginTop: 20, padding: "18px 24px", maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 4 }}>Region</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 10px",
                          border: `1px solid ${C.border}`, borderRadius: 8, background: C.bg }}>
              <span style={{ fontSize: 14, color: C.ink, fontWeight: 600 }}>{REGION}</span>
            </div>
            <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6 }}>
              Power supplies and cables are filtered to the NA catalog. EMEA/APAC parts
              are intentionally excluded.
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 4 }}>Project label (optional)</div>
              <input value={project} onChange={e => setProject(e.target.value)}
                     placeholder="e.g. City of Springfield — ITS Phase 2"
                     style={{ width: "100%", padding: "9px 10px", border: `1px solid ${C.border}`,
                              borderRadius: 8, fontSize: 14, color: C.ink, fontFamily: font }} />
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {modal === "device" && <DeviceModal onPick={pickDevice} onClose={() => setModal(null)} />}
      {modal === "detail" && (
        <DeviceDetail device={device}
                      onClose={() => setModal(null)}
                      onChange={() => setModal("device")} />
      )}
      {device && slots.map(slot => modal === slot.key && (
        <AccessoryModal key={slot.key} slot={slot} current={sel[slot.key]}
                        onApply={(v) => applySlot(slot.key, v)} onClose={() => setModal(null)} />
      ))}
    </div>
  );
}

// ─── Shared UI primitives ────────────────────────────────────────────────────
function Overlay({ children, onClose, width = 760 }) {
  return (
    <div onClick={onClose}
         style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(11,29,58,0.55)",
                  backdropFilter: "blur(2px)", display: "flex", alignItems: "center",
                  justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()}
           style={{ background: "#fff", borderRadius: 16, width: `min(${width}px, 96vw)`,
                    maxHeight: "88vh", display: "flex", flexDirection: "column", overflow: "hidden",
                    boxShadow: "0 24px 80px rgba(0,0,0,0.30)", fontFamily: font }}>
        {children}
      </div>
    </div>
  );
}
const CloseBtn = ({ onClose }) => (
  <button onClick={onClose} aria-label="Close"
          style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4 }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={C.border} strokeWidth="1.6"/>
      <path d="m9 9 6 6M15 9l-6 6" stroke={C.muted} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  </button>
);
const Tab = ({ active, children, onClick }) => (
  <button onClick={onClick}
          style={{ padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
                   fontFamily: font, border: `1px solid ${active ? C.amber : C.border}`,
                   background: active ? C.amber : "#fff", color: active ? "#fff" : C.ink }}>
    {children}
  </button>
);
const optRow = (on) => ({
  display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", width: "100%",
  borderRadius: 10, cursor: "pointer", textAlign: "left", fontFamily: font, marginBottom: 4,
  border: `1.5px solid ${on ? C.amber : C.border}`, background: on ? C.amberBg : "#fff",
});
const btnPrimary = {
  padding: "9px 22px", borderRadius: 8, border: "none", background: C.orange, color: "#fff",
  fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: font,
  boxShadow: "0 2px 8px rgba(232,96,10,0.3)",
};
const btnGhost = {
  padding: "9px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: "#fff",
  color: C.navy2, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: font,
};
const exportLink = {
  display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none",
  color: C.orange, fontSize: 13.5, fontWeight: 700, cursor: "pointer", fontFamily: font,
};
const ExpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" stroke={C.orange} strokeWidth="1.9"
          strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
