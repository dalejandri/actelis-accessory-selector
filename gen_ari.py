"""Generate src/ari.js from AutoRepeaterInfo.xlsx (NA region only).

The Access wizard reads every compatibility rule from the AutoRepeaterInfo
table. This script lifts that table verbatim so the web configurator switches
on the same attributes rather than on hand-tagged guesses.
"""
import openpyxl, json, re

SRC = '/mnt/user-data/uploads/AutoRepeaterInfo.xlsx'
OUT = '/home/claude/actelis-accessory-selector/src/ari.js'

wb = openpyxl.load_workbook(SRC, data_only=True)
ws = wb['AutoRepeaterInfo']
rows = list(ws.iter_rows(values_only=True))
hdr = [str(h).strip() for h in rows[0]]
data = [dict(zip(hdr, r)) for r in rows[1:] if any(r) and r[0]]
for d in data:
    d['Part Number'] = str(d['Part Number']).strip()
    d['PN Type'] = str(d['PN Type']).strip() if d['PN Type'] else ''

def is_na(d):
    """Region NULL means the row is not region-scoped; the wizard only
    region-filters device, PSU and AC-cable lists."""
    r = d['Region']
    return r is None or str(r) == 'None' or 'NA' in str(r).split()

def num(v):
    if v is None or str(v) in ('None', ''):
        return None
    try:
        return int(float(str(v)))
    except ValueError:
        return None

def s(v):
    if v is None or str(v) == 'None':
        return None
    return str(v).strip()

na = [d for d in data if is_na(d)]

# ── Per-part attributes (device rows switch on these) ────────────────────────
attrs = {}
for d in na:
    pn = d['Part Number']
    if pn in ('None', ''):
        continue
    a = {
        'type': d['PN Type'],
        'desc': s(d['Description']),
        'pairs': num(d['NumPairs']),
        'hsl': num(d['NumHSL']),
        'sfpInfo': s(d['SFP Info']),
        'sfpQty': num(d['SFP Qty/Mode']),
        'mode': s(d['SFP Qty/Mode']) if s(d['SFP Qty/Mode']) in ('SM', 'MM') else None,
        'powerInput': num(d['Power Input']),
        'oem': s(d['OEM']),
    }
    # A PN can appear under two PN Types (e.g. 506R00006 is both PTP AC and
    # PTP ML700 AC). Keep the first; pools below carry the type-specific rows.
    attrs.setdefault(pn, a)

# ── Accessory pools, keyed by PN Type ───────────────────────────────────────
POOL_TYPES = [
    'SFP',
    'ML600 Cable (No PFU)', 'PTP-D Cable',
    'ML600 Mounting', 'ML5xx Mounting',
    'PTP AC', 'PTP-D AC', 'PTP-D ACPOE', 'PTP ML700 AC', 'PTP ML620i AC', 'PTP ML650x AC',
    'AC Cable',
    'ML600 DC Cable', 'ML2300 DC Cable', 'ML130/230 DC Cable',
    'Craft Cable', 'Craft Cable ML600D', 'Craft Cable ML600D New',
    'Craft Cable ML600DT', 'Craft ML5xx',
    'PTMP Alarm',
]
pools = {}
for t in POOL_TYPES:
    items = []
    for d in na:
        if d['PN Type'] != t:
            continue
        pn = d['Part Number']
        # The table carries "None/Others" placeholder rows with a null PN.
        if pn in ('None', '') or not s(d['Description']):
            continue
        items.append({
            'pn': pn,
            'desc': s(d['Description']),
            'pairs': num(d['NumPairs']),
            'sfpInfo': s(d['SFP Info']),
            'mode': s(d['SFP Qty/Mode']) if s(d['SFP Qty/Mode']) in ('SM', 'MM') else None,
            'oem': s(d['OEM']),
        })
    pools[t] = items

def js(o, indent=0):
    return json.dumps(o, indent=2, ensure_ascii=False)

hdr_txt = """// ════════════════════════════════════════════════════════════════════════════
//  AutoRepeaterInfo — lifted from the Access quote tool (region: NA only)
//
//  GENERATED FILE — do not hand-edit. Regenerate from AutoRepeaterInfo.xlsx.
//
//  This is the table every rule in the Access "Wizard-Node" form reads. The
//  columns are the real compatibility switches:
//    type        PN Type      — what the part is, and which rule branch applies
//    pairs       NumPairs     — copper pair count (0 = no copper); on a mounting
//                               kit this is instead the number of unit slots
//    sfpInfo     SFP Info     — SFP speed class the port accepts
//    sfpQty      SFP Qty/Mode — number of SFP slots (or SM/MM on an SFP itself)
//    powerInput  Power Input  — 0 built-in · 1 DC · 2 DIN non-PoE · 3 DIN PoE
//    oem         OEM          — vendor variant; "NA" here means not-applicable
//                               (used to suppress the mounting slot)
//
//  Rows are pre-filtered to the NA region, matching the Access tool's
//  QuoteRegion = "NA" default. Parts sold only in EMEA/APAC/CALA are absent by
//  design, not by omission.
// ════════════════════════════════════════════════════════════════════════════

"""

with open(OUT, 'w') as f:
    f.write(hdr_txt)
    f.write('export const ATTRS = ' + js(attrs) + ';\n\n')
    f.write('export const POOL = ' + js(pools) + ';\n\n')
    f.write('export const attrsOf = (pn) => ATTRS[pn] || null;\n')

print('wrote', OUT)
print('attrs:', len(attrs), '| pools:', {k: len(v) for k, v in pools.items()})
