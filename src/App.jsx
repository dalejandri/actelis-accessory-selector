import React, { useState, useMemo, useCallback } from "react";
import {
  DEVICES, CATEGORIES, buildSlots, defaultPlacement,
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
const REGIONS = ["United States", "Canada", "United Kingdom", "European Union",
  "Mexico", "Australia", "Other"];

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

// A product thumbnail: real photo if `image` is set, else the on-brand icon.
function ProductImage({ item, size = 56 }) {
  if (item?.image) {
    return <img src={item.image} alt={item.model}
                style={{ width: size, height: size, objectFit: "contain" }} />;
  }
  return <Icon name={item?.icon || "node"} size={size} />;
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
  const setQty = (pn, v) =>
    setMulti(m => ({ ...m, [pn]: Math.max(1, Math.min(999, v | 0)) }));

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
                <input type="number" min={1} value={multi[o.pn]}
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
                    justifyContent: "flex-end", gap: 10 }}>
        <button onClick={onClose} style={btnGhost}>Cancel</button>
        <button onClick={apply} style={btnPrimary}>Apply</button>
      </div>
    </Overlay>
  );
}

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
//  MAIN APP
// ═════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [device, setDevice] = useState(null);
  const [sel, setSel] = useState({});           // slotKey -> pn | [{pn,qty}]
  const [placement, setPlacement] = useState("indoor");
  const [region, setRegion] = useState("United States");
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
    const rows = [{
      name: `${device.model} — ${device.desc}`, pn: device.pn,
      datasheet: device.datasheet, groupLabel: "Device", qty: 1,
      slotKey: "device", icon: device.icon,
    }];
    for (const slot of slots) {
      const picked = sel[slot.key];
      if (!picked) continue;
      if (slot.multi) {
        for (const { pn, qty } of picked) {
          const o = slot.options.find(x => x.pn === pn);
          if (o) rows.push({ name: `${o.model} — ${o.desc}`, pn: o.pn, datasheet: o.datasheet,
                             groupLabel: slot.label, qty, slotKey: slot.key, icon: o.icon });
        }
      } else {
        const o = slot.options.find(x => x.pn === picked);
        if (o) rows.push({ name: `${o.model} — ${o.desc}`, pn: o.pn, datasheet: o.datasheet,
                           groupLabel: slot.label, qty: 1, slotKey: slot.key, icon: o.icon });
      }
    }
    return rows;
  }, [device, slots, sel]);

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
              <div onClick={() => setModal("device")}
                   style={{ width: 168, minHeight: 150, background: "#fff",
                            border: `1px solid ${device ? C.amber : C.navy}`, borderRadius: 12, padding: 14,
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                            gap: 6, cursor: "pointer",
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
              </table>
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
            <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 4 }}>
              Country or region where project will be installed
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>
              Some accessories (power cords, regulatory variants) differ by region.
            </div>
            <select value={region} onChange={e => setRegion(e.target.value)}
                    style={{ width: "100%", padding: "9px 10px", border: `1px solid ${C.border}`,
                             borderRadius: 8, fontSize: 14, color: C.ink, fontFamily: font, background: "#fff" }}>
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </select>
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
