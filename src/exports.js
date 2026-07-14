// ════════════════════════════════════════════════════════════════════════════
//  Bill-of-materials exports — PDF (jsPDF), Excel (SheetJS via CDN), Clipboard.
//  Mirrors the styling conventions of the Actelis Price Tool.
// ════════════════════════════════════════════════════════════════════════════
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const NAVY   = [11, 29, 58];
const AMBER  = [217, 119, 6];
const MUTED  = [100, 100, 100];
const BORDER = [180, 180, 180];
const LOGO_URL = "https://actelis.com/wp-content/uploads/2021/10/a_logo-1.gif";

function today() {
  return new Date().toLocaleDateString("en-US",
    { year: "numeric", month: "long", day: "numeric" });
}

// Convert the (GIF) logo to PNG through a canvas so jsPDF can embed it.
async function logoPng() {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth || 300;
        c.height = img.naturalHeight || 90;
        c.getContext("2d").drawImage(img, 0, 0);
        resolve({ data: c.toDataURL("image/png"), w: c.width, h: c.height });
      } catch { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = LOGO_URL;
  });
}

// ─── PDF ─────────────────────────────────────────────────────────────────────
export async function exportBomPdf({ device, rows, placement, region, projectLabel }) {
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  let y = 14;

  const logo = await logoPng();
  if (logo) {
    const h = 12, w = (logo.w / logo.h) * h;
    doc.addImage(logo.data, "PNG", 12, y, w, h);
  } else {
    doc.setFont("helvetica", "bold").setFontSize(16).setTextColor(...NAVY);
    doc.text("ACTELIS", 12, y + 8);
  }
  doc.setFont("helvetica", "normal").setFontSize(8).setTextColor(...MUTED);
  doc.text("Actelis Networks, Inc.", W - 12, y + 3, { align: "right" });
  doc.text("710 Lakeway Drive, Ste 200", W - 12, y + 7, { align: "right" });
  doc.text("Sunnyvale, CA 94085", W - 12, y + 11, { align: "right" });

  y += 20;
  doc.setDrawColor(...AMBER).setLineWidth(0.6).line(12, y, W - 12, y);
  y += 8;

  doc.setFont("helvetica", "bold").setFontSize(15).setTextColor(...NAVY);
  doc.text("Bill of Materials", 12, y);
  y += 7;
  doc.setFont("helvetica", "normal").setFontSize(9).setTextColor(60, 60, 60);
  doc.text(`Device:  ${device?.model || "—"}   (${device?.desc || ""})`, 12, y); y += 5;
  const meta = [];
  if (placement) meta.push(`Placement: ${placement[0].toUpperCase() + placement.slice(1)}`);
  if (region) meta.push(`Region: ${region}`);
  if (projectLabel) meta.push(`Project: ${projectLabel}`);
  if (meta.length) { doc.text(meta.join("     "), 12, y); y += 5; }
  y += 2;

  autoTable(doc, {
    startY: y,
    head: [["#", "Name", "Group", "Qty", "Part number"]],
    body: rows.map((r, i) => [
      String(i + 1), r.name, r.groupLabel, String(r.qty || 1), r.pn,
    ]),
    theme: "grid",
    styles: { font: "helvetica", fontSize: 9, cellPadding: 2.4, textColor: [30, 30, 30] },
    headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: "bold", fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      3: { cellWidth: 14, halign: "center" },
      4: { cellWidth: 34 },
    },
    alternateRowStyles: { fillColor: [246, 248, 251] },
    margin: { left: 12, right: 12 },
  });

  const H = doc.internal.pageSize.getHeight();
  doc.setDrawColor(...BORDER).setLineWidth(0.3).line(12, H - 12, W - 12, H - 12);
  doc.setFont("helvetica", "normal").setFontSize(7).setTextColor(...MUTED);
  doc.text(today(), 12, H - 7);
  doc.text("Generated with the Actelis Accessory Selector", W - 12, H - 7, { align: "right" });

  const safe = (device?.model || "device").replace(/[^\w.-]+/g, "_");
  doc.save(`Actelis_BOM_${safe}.pdf`);
}

// ─── Excel (SheetJS lazy-loaded from CDN, same as the price tool) ────────────
export async function exportBomExcel({ device, rows, placement, region, projectLabel }) {
  if (!window.XLSX) {
    await new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }
  const XL = window.XLSX;
  const wb = XL.utils.book_new();
  const aoa = [
    ["Actelis Networks, Inc. — Bill of Materials"],
    [`Device`, device?.model || "", device?.desc || ""],
    [`Placement`, placement || "", `Region`, region || ""],
    projectLabel ? ["Project", projectLabel] : [],
    [],
    ["#", "Name", "Group", "Qty", "Part number", "Datasheet"],
    ...rows.map((r, i) => [i + 1, r.name, r.groupLabel, r.qty || 1, r.pn, r.datasheet || ""]),
  ];
  const ws = XL.utils.aoa_to_sheet(aoa);
  ws["!cols"] = [{ wch: 4 }, { wch: 46 }, { wch: 18 }, { wch: 5 }, { wch: 16 }, { wch: 50 }];
  XL.utils.book_append_sheet(wb, ws, "BOM");
  const safe = (device?.model || "device").replace(/[^\w.-]+/g, "_");
  XL.writeFile(wb, `Actelis_BOM_${safe}.xlsx`);
}

// ─── Clipboard (tab-separated, pastes cleanly into Excel/Sheets) ─────────────
export async function copyBom({ rows }) {
  const header = ["Name", "Group", "Qty", "Part number"].join("\t");
  const body = rows.map(r => [r.name, r.groupLabel, r.qty || 1, r.pn].join("\t")).join("\n");
  const text = `${header}\n${body}`;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for restrictive iframe permission policies
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}
