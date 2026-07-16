"""Regenerate the price / datasheet / category blocks in src/catalog.js from
Config_actelis-price-list.xlsx.

The config price list is the authoritative commercial source: what a part costs,
which datasheet describes it, and which filter tab it belongs to. Re-run this
whenever a new price list lands.

    python3 gen_pricelist.py
"""
import openpyxl, re

SRC = '/mnt/user-data/uploads/Config_actelis-price-list.xlsx'
CAT = '/home/claude/actelis-accessory-selector/src/catalog.js'

wb = openpyxl.load_workbook(SRC, data_only=True)
ws = wb['Sheet1']

rows = []
seen = set()
for r in ws.iter_rows(min_row=2, values_only=True):
    pn = r[1]
    if not pn:
        continue
    pn = str(pn).strip()
    if pn in seen:
        continue
    seen.add(pn)
    price = None
    if r[4] is not None:
        try:
            price = float(str(r[4]).strip().replace(',', ''))
        except ValueError:
            price = None
    link = str(r[5]).strip() if len(r) > 5 and r[5] else None
    # The link column carries Excel error values (#N/A) and stray text for parts
    # with no datasheet. Only accept a real URL; anything else means "no link",
    # so the part falls back to its product-family page.
    if link and not link.lower().startswith(('http://', 'https://')):
        link = None
    rows.append({
        'pn': pn,
        'cat': str(r[0]).strip() if r[0] else '',
        'model': str(r[2]).strip() if r[2] else '',
        'price': price,
        'link': link,
    })

def esc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

prices = '\n'.join(
    '  "%s": %s,%s' % (d['pn'], ('%g' % d['price']), ('  // ' + d['model'][:44]) if d['model'] else '')
    for d in rows if d['price'] is not None
)
links = '\n'.join(
    '  "%s": "%s",' % (d['pn'], esc(d['link']))
    for d in rows if d['link']
)
cats = '\n'.join(
    '  "%s": "%s",' % (d['pn'], esc(d['cat']))
    for d in rows if d['cat']
)

src = open(CAT).read()

def replace_block(text, decl, body):
    """Replace `export const NAME = {...};` keeping everything around it."""
    start = text.index(decl)
    end = text.index('\n};', start) + 3
    return text[:start] + decl + '\n' + body + '\n};' + text[end:]

src = replace_block(src, 'export const PRICES = {', prices)
src = replace_block(src, 'export const PN_CATEGORY = {', cats)

# DATASHEET_URL is new — insert it just before priceOf if not already present.
if 'export const DATASHEET_URL' not in src:
    anchor = '// List price for a part number, or null when not on the price list.'
    block = '''// Per-part datasheet PDFs, straight from the price list's link column.
// A part with no entry falls back to its product-family page (see ds()).
export const DATASHEET_URL = {
%s
};

// The datasheet for a part: its own PDF if the price list names one.
export const datasheetOf = (pn) => DATASHEET_URL[pn] || null;

''' % links
    src = src.replace(anchor, block + anchor, 1)
else:
    src = replace_block(src, 'export const DATASHEET_URL = {', links)

open(CAT, 'w').write(src)

print('PRICES:        %d' % sum(1 for d in rows if d['price'] is not None))
print('DATASHEET_URL: %d  (%d distinct PDFs)' % (
    sum(1 for d in rows if d['link']), len({d['link'] for d in rows if d['link']})))
print('PN_CATEGORY:   %d' % sum(1 for d in rows if d['cat']))
