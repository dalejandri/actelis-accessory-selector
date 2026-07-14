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

import { POOL, attrsOf } from "./ari.js";

// ─── Datasheet destinations (real, stable Actelis URLs) ──────────────────────
const DS_PRODUCTS = "https://actelis.com/actelis-products/products-technology/";
export const DATASHEETS = {
  GL800:     DS_PRODUCTS,
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

// ════════════════════════════════════════════════════════════════════════════
//  LIST PRICES  (USD) — keyed by part number
//  Source: Actelis price list. Keeping prices in one PN-keyed map (rather than
//  on each catalog row) means a price refresh is a paste over this block only.
//  A PN with no entry here simply shows "—" in the BOM and is excluded from the
//  total, so an unpriced item never silently reads as $0.
// ════════════════════════════════════════════════════════════════════════════
export const PRICES = {
  "501RG0140": 3148,  // GL830-8O
  "501RG0144": 2921,  // GL830-8R
  "501RG0139": 3748,  // GL830-16O
  "501RG0143": 3330,  // GL830-16R
  "501RG0134": 4251,  // GL850L-16O
  "501RG0135": 3917,  // GL850L-16R
  "506R61334": 1800,  // GL9110C
  "506R61342": 1550,  // GL9104C
  "506R61335": 162,  // GL901CS
  "506R61337": 110,  // GL93C
  "506R61336": 257,  // GL93C-W
  "501RG0302": 1950,  // GL916
  "501RG0300": 2230,  // GL916-R
  "501RG0303": 1380,  // GL908
  "501RG0301": 1680,  // GL908-R
  "501RG0167": 1120,  // GL904
  "501RG0168": 1410,  // GL904-R
  "506R61245": 110,  // GL91
  "501S61246": 120,  // GL91T
  "501S61247": 195,  // GL91T-RB
  "501RG0157": 117,  // GL92
  "501RG0158": 208,  // GL92-R
  "510KG0310": 1750,  // GL900E-OR-4
  "510KG0309": 2260,  // GL900E-OR-8
  "510KG0308": 2990,  // GL900E-OR-16
  "501RG0016": 1145,  // ML622
  "501RG0121": 800,  // ML622i with 24/48Vdc
  "501RG0046": 1720,  // ML624
  "501RG0122": 1260,  // ML624i with 24/48Vdc
  "501RG0067": 2306,  // ML638
  "501RG0218": 4595,  // ML6416E
  "501RG0216": 2341,  // ML644E
  "501RG0116": 3560,  // ML644EL
  "501RG0217": 3031,  // ML648E
  "501RG0078": 3308,  // ML650SV
  "501RG0076": 3748,  // ML654S
  "501RG0077": 4430,  // ML658S
  "501RG0477": 3330,  // ML658S Advanced CLK
  "501RG0106": 1950,  // ML684M
  "501RG0238": 6090,  // ML6916E (w/o SyncE)
  "501RG0115": 6665,  // ML6916EL
  "501RG0111": 6554,  // ML6916EN
  "501RG0254": 6550,  // ML6916ES
  "501RG0259": 3679,  // ML698E
  "501RG0253": 5055,  // ML698ES
  "501RG0240": 1145,  // ML622D
  "501RG3240": 1374,  // ML622D (New)
  "501RG0220": 1950,  // ML684D
  "501RG3230": 1950,  // ML684D (New)
  "501RG3255": 1995,  // ML684D-M (12/24V)
  "501RG3355": 2795,  // ML684DL-M (12/24V)
  "501RG3358": 2989,  // ML684DLP-M
  "501RG0232": 2295,  // ML684DTP
  "501RG0221": 1145,  // ML680DF
  "501RG3231": 953,  // ML680DF (New)
  "501RG0236": 1490,  // ML680DFTP
  "501RG3275": 1489,  // ML680D-M (12/24V)
  "501RG3375": 2019,  // ML680DL-M (12/24V)
  "501RG3378": 1410,  // ML680DLP-M
  "510KG6241": 2013,  // ML624 Kit
  "510KG6381": 2622,  // ML638 Kit
  "501S20394": 3163,  // ML638 Rackmount kit
  "510KG0065": 4825,  // ML6416E kit
  "510KG0064": 3261,  // ML648E kit
  "506R00013E": 138,  // AC/DC power supply for GL800 (EU)
  "506R00013": 138,  // AC/DC power supply for GL800 (NA)
  "506R00006D": 110,  // AC-DC power supply for ML684D-M (NA)
  "506R00008": 58,  // AC-DC power supply for GL900/old ML620i (501RG016x) (US/EU)
  "506R00006E": 110,  // AC-DC power supply for ML600/ML740/ML530 (EU)
  "506R00006": 110,  // AC-DC power supply for ML600/ML740/ML530 (NA)
  "506R00010": 58,  // AC-DC power supply for new ML620i (501RG012x) (US/EU)
  "506R61185": 184,  // DIN Rail 110-220VAC-24VDC PSU for ML600Dx/ML500Dx/GL5xxx + US Cables
  "506R61181": 156,  // DIN Rail 110-220VAC-24VDC PSU for ML600Dx/ML500Dx/GL5xxx without PoE
  "506R61191": 225,  // DIN Rail 110-220VAC-48VDC PSU for ML600Dx/ML500Dx/GL5xxx/GL7000 with PoE
  "510K00060": 23,  // Accessories Kit for ML600/ML700/ML530
  "506R32110": 2178,  // IP65 Enclosure for ML650S/SV, -48VDC Fiber & T1 Enclosure.
  "502R05080": 195,  // ML600/ML740/ML530/GL800/GL900 Sleeve Extension Slide Kit Installation
  "510R21070": 225,  // Rack Mount Sleeve Kit for two ML600/700/530/GL800 units
  "510R21080": 52,  // Wall Mount Kit for ML530/ML600/ML700/GL800/GL900
  "510R50955": 98,  // Wall Mount Kit for ML530/ML600/ML700/GL800/GL900, Flat faced
  "502R20230": 1127,  // Chassis 200 Shelf
  "502R02110": 2985,  // Chassis 2000B Shelf, 19 inch (CHS-2000B/19)
  "503R60042": 10345,  // Service Dispatcher Unit (SDU-450)
  "503R60043": 11495,  // Service Dispatcher Unit (SDU-450G)
  "503R60041": 12645,  // Service Dispatcher Unit (SDU-455G)
  "503R20132": 6325,  // MLU-32DF (Front Access Multi-Line Unit with 32 copper pairs, DRB Enabled)
  "503R20232": 6325,  // MLU-32DR (Rear Access Multi-Line Unit with 32 copper pairs, DRB Enabled)
  "503R20164": 9195,  // MLU-64DF (Front Access Multi-Line Unit with 64 copper pairs, DRB Enabled)
  "503R20264": 9195,  // MLU-64DR (Rear Access Multi-Line Unit with 64 copper pairs, DRB Enabled)
  "506R20230": 403,  // AC Power Feed Module (AC-PFM) for CHS-200
  "510K20230": 115,  // Accessories Kit for CHS-200
  "506R30060": 633,  // Fan Control Module for CHS-200 (FCM-200)
  "510R10955": 52,  // Wall Mount Kit for CHS-200, Flat faced
  "506R61311": 711,  // -48V / 600W Rectifier for ML2300
  "508R00680": 46,  // Blank Panel Kit (4 blank panels)
  "506R30070": 685,  // Fan Control Module for CHS-2000B/19(FCM-2000B/19)
  "550A00047": 173,  // Flash Card for SDU-440/G
  "550A00046": 173,  // Flash Card for SDU-450/G
  "502F60187A": 110,  // Metal 19” Shelf for rectifier installations for ML2300 rectifier
  "504R60105": 89,  // Rectifier Cable 110/220V to open-ended for ML2300 rectifier
  "503R20270": 2300,  // Streaker card for ML2300 and ML230
  "510K20270": 2530,  // Streaker card with probe for ML2300 and ML230
  "501S20442": 17797,  // ML230 Bundle: CHS-200/19" + SDU-450 + MLU-32DF
  "501S20443": 17797,  // ML230 Bundle: CHS-200/19" + SDU-450 + MLU-32DR
  "501S20441": 20666,  // ML230 Bundle: CHS-200/19" + SDU-450 + MLU-64DF
  "501S20436": 20666,  // ML230 Bundle: CHS-200/19" + SDU-450 + MLU-64DR
  "501S20445": 18947,  // ML230 Bundle: CHS-200/19" + SDU-450G + MLU-32DF
  "501S20446": 18947,  // ML230 Bundle: CHS-200/19" + SDU-450G + MLU-32DR
  "501S20444": 21816,  // ML230 Bundle: CHS-200/19" + SDU-450G + MLU-64DF
  "501S20456": 21816,  // ML230 Bundle: CHS-200/19" + SDU-450G + MLU-64DR
  "501S20448": 19654,  // ML2300 Bundle: CHS-2000B/19" + SDU-450 + MLU-32DF
  "501S20449": 19654,  // ML2300 Bundle: CHS-2000B/19" + SDU-450 + MLU-32DR
  "501S20447": 22523,  // ML2300 Bundle: CHS-2000B/19" + SDU-450 + MLU-64DF
  "501S20435": 22523,  // ML2300 Bundle: CHS-2000B/19" + SDU-450 + MLU-64DR
  "501S20451": 20804,  // ML2300 Bundle: CHS-2000B/19" + SDU-450G + MLU-32DF
  "501S20452": 20804,  // ML2300 Bundle: CHS-2000B/19" + SDU-450G + MLU-32DR
  "501S20450": 23673,  // ML2300 Bundle: CHS-2000B/19" + SDU-450G + MLU-64DF
  "501S20455": 23673,  // ML2300 Bundle: CHS-2000B/19" + SDU-450G + MLU-64DR
  "506R61254": 1185,  // GL5010-10J2F
  "506R61252": 1010,  // GL5010-8J2F
  "506R62107": 1190,  // GL5010-8J2F-P
  "506R61253": 1222,  // GL5010-8J4F
  "506R61255": 1580,  // GL5020-8J4F-P
  "506R61256": 2519,  // GL5020X-8J4F-P
  "506R61257": 1780,  // GL5030X-8J4F
  "506R61258": 1940,  // GL5030X-8J4F-P
  "506R61261": 2359,  // GL5030X-8J4F-P1
  "506R61262": 2260,  // GL5030X-8J4F-P2
  "506R61309": 2593,  // GL5060-16J4F-P
  "506R61264": 2296,  // GL5060X-16J4F
  "506R61265": 2750,  // GL5060X-16J4F-P
  "506R61263": 2140,  // GL5070X-8J12F (ML570D - Old P/N 506R62030)
  "506R62108": 4576,  // GL5080X-4J12F
  "506R62011": 1470,  // ML5114D
  "506R62012": 1499,  // ML5114DP
  "506R61296": 1640,  // GL5010R-8J2F
  "506R62106": 2659,  // GL5020R-8J4F-P
  "506R61259": 2550,  // GL5030XR-8J4F
  "506R61260": 3113,  // GL5030XR-8J4F-P
  "506R61306": 3230,  // GL5030XR-8J4F-P1
  "506R61267": 3111,  // GL5060XR-16J4F
  "506R61268": 3520,  // GL5060XR-16J4F-P
  "506R61295": 3150,  // GL5070XR-8J12F
  "506R61270": 5050,  // GL5080XR-4J12F
  "506R61286": 2750,  // GL6010X-24J4F-DC
  "506R61287": 2950,  // GL6010X-24J4F-AC
  "506R61271": 3520,  // GL6010X-24J4F-P-DC
  "506R61272": 3720,  // GL6010X-24J4F-P-AC
  "506R61277": 3789,  // GL6020-16J12FC-DC
  "506R61278": 4009,  // GL6020-16J12FC-AC
  "506R61283": 3190,  // GL6030-24J4F-P-DC
  "506R61284": 3330,  // GL6030-24J4F-P-AC
  "506R61280": 2630,  // GL6031-16J12FC-DC
  "506R61281": 2950,  // GL6031-16J12FC-AC
  "506R61289": 3999,  // GL6040X-8J28F-DC (GL2140X-0828-DC - Old P/N 506R62100)
  "506R61290": 4320,  // GL6040X-8J28F-AC
  "501RG0530": 920,  // ML530
  "501RG0252": 2295,  // ML540E
  "506R62016": 1460,  // ML540M DC
  "506R62006": 1680,  // ML540M AC
  "506R61274": 4520,  // GL6010XR-24J4F-P-DC
  "506R61275": 4850,  // GL6010XR-24J4F-P-AC
  "506R61292": 4810,  // GL6040XR-8J28F-DC
  "506R61293": 5130,  // GL6040XR-8J28F-AC
  "506R61332": 2800,  // GL7006-4J2F-P
  "506R61329": 3050,  // GL7010-6J4F-P
  "506R61330": 3328,  // GL7020-6J4F-P
  "506R61331": 3790,  // GL7030-6J4F-P
  "501S20496": 1434,  // IP65 enclosure with 1 XR239SE repeater
  "501S20502": 1515,  // IP65 enclosure with wall clip and 1 XR239SE repeater
  "501S20494": 953,  // IP68 dome enclosure with 1 XR239SE repeater
  "501S20495": 1772,  // IP68 dome enclosure with 2 XR239SE repeaters
  "510K20099": 1435,  // Kit for PFU-8 Rev D to ML600
  "510K14597": 1375,  // Kit for XR239SE- AD14 - XConnect - Customer side fed (MAEC Enclosure)
  "501RG2099": 1333,  // PFU-8 Rev D
  "510K14497": 1375,  // XR239SE Kit - Straight Rewiring (CO side fed)
  "501RG2097": 1260,  // XR239SE Repeater - No Rewiring
  "503RG3110": 805,  // ABA 3.0
  "503RG3111": 851,  // ABA 3.0E
  "503RG3088": 863,  // ABA LP ER 2.0
  "503RG3104": 920,  // VBA 3.0
  "503RG3107": 966,  // VBA 3.0E
  "501S20475": 4283,  // Bundle E4-EH and 4x VBA 3.0E
  "501S20484": 3105,  // Bundle E4-EL and 4x ABA 3.0
  "501S20485": 3289,  // Bundle E4-EL and 4x ABA 3.0E
  "501S20483": 3910,  // Bundle E4-EL and 4x VBA 3.0
  "501S20482": 4030,  // Bundle E4-EL and 4x VBA 3.0E
  "510K31220": 403,  // E2-EL - 2 Slot/4 port BBA Enclosure with Express power
  "510K31037": 1288,  // Single slot StreamLine enclosure and ABA 2.0ER (SLE-AR)
  "510K31032": 1231,  // Single slot StreamLine enclosure and ABA 3.0 (SLE-A)
  "510K31033": 1277,  // Single slot StreamLine enclosure and ABA 3.0E (SLE-AE)
  "510K31034": 1346,  // Single slot StreamLine enclosure and VBA 3.0 (SLE-V)
  "510K31035": 1392,  // Single slot StreamLine enclosure and VBA 3.0E (SLE-VE)
  "510K31036": 1507,  // Single slot StreamLine enclosure and VBA 3.0E with Express power cascaded (SLE-VE-C)
  "503RG4080": 276,  // BBA Flash Tool
  "506R0116R": 1299,  // ML632R
  "506R0146R": 2297,  // ML634R
  "506R00022": 115,  // 100Base-FX MMF SFP module (2km)
  "506R61186": 114,  // 100Base-FX SMF SFP module (10km) - hardened
  "506R00032": 68,  // 100Base-FX SMF SFP module (15km)
  "506R61213": 103,  // 100/1000Base-T SFP
  "506R00012": 68,  // 1000Base-SX MMF SFP module (500m)
  "506R00002": 68,  // 1000Base-LX SMF SFP module (10km)
  "506R61187": 114,  // 1000Base-LX SMF SFP module (10km) - hardened
  "506R51750": 287,  // 1000Base-LX SMF SFP module (40Km)
  "506R61188": 344,  // 1000Base-LX SMF SFP module (40Km) - hardened
  "506R00042": 103,  // 1000Base-T SFP module
  "506R61155": 127,  // 2500Base-FX MMF SFP Module (500m)
  "506R61154": 289,  // 2500Base-FX SMF SFP module (30Km)
  "506R61235": 147,  // 10G BASE-LR SFP+ Module (10Km)
  "506R61241": 294.4,  // 10G BASE-LR SFP+ Module (40Km)
  "506R61242": 885,  // 10G BASE-LR SFP+ Module (70Km)
  "506R61164": 87,  // BiDi MM SFP Transceiver for FE port, 2Km, TX=1310nm/RX=1550nm
  "506R61165": 87,  // BiDi MM SFP Transceiver for FE port, 2Km, TX=1550nm/RX=1310nm
  "506R61158": 87,  // BiDi SM SFP Transceiver for FE port, 20Km, TX=1310nm/RX=1550nm
  "506R61159": 87,  // BiDi SM SFP Transceiver for FE port, 20Km, TX=1550nm/RX=1310nm
  "506R61162": 87,  // BiDi SM SFP Transceiver for GE port, 3Km, TX=1310nm/RX=1550nm
  "506R61163": 87,  // BiDi SM SFP Transceiver for GE port, 3Km, TX=1550nm/RX=1310nm
  "506R61171": 87,  // BiDi SM CWDM SFP Transceiver for GE port, 20Km, TX=1310nm/RX=1490nm
  "506R61172": 190,  // BiDi SM CWDM SFP Transceiver for GE port, 20Km, TX=1490nm/RX=1310nm
  "506R61169": 225,  // BiDi SM CWDM SFP Transceiver for GE port, 40Km, TX=1310nm/RX=1490nm
  "506R61170": 225,  // BiDi SM CWDM SFP Transceiver for GE port, 40Km, TX=1490nm/RX=1310nm
  "506R51711": 482,  // CSFP Transceiver 1610nm, GbE, 80km
  "506R61205": 482,  // CSFP Transceiver, 1470nm GbE, 80km
  "506R61206": 482,  // CSFP Transceiver, 1490nm GbE, 80km
  "506R51716": 482,  // CSFP Transceiver, 1510nm GbE, 80km
  "506R51715": 482,  // CSFP Transceiver, 1530nm GbE, 80km
  "506R51712": 482,  // CSFP Transceiver, 1550nm GbE, 80km
  "506R51713": 482,  // CSFP Transceiver, 1570nm GbE, 80km
  "506R61207": 482,  // CSFP Transceiver, 1590nm GbE, 80km
  "506R61151": 1605,  // T3/E3 over Ethernet SFP - 100Base-FX
  "506R04820": 228,  // Newmar -48VDC Unity Fuse Panel
  "506R04815": 363,  // Newmar -48VDC Unity rectifier
  "502R04810": 326,  // Newmar -48VDC Unity rectifier shelf
  "506R04830": 367,  // Newmar Battery Module
  "502R04825": 245,  // Newmar Battery module shelf
  "504R60060": 237,  // Copper Loop 64-pairs DIN Connector, US Color code,  25ft.
  "504R60062": 657,  // Copper Loop 64-pairs DIN Connector, US Color code, 100ft.
  "504R60063": 733,  // Copper Loop 64-pairs DIN Connector, US Color code, 150ft.
  "504R60088": 449,  // Copper Loop 64-pairs FCI Connector, US Color code, 100ft.
  "504R60101": 46,  // DSL dual port cable 2 X RJ45 to open end solid
  "504R20160": 230,  // DSL Octal Cable, 8xRJ-45 to open end, solid wires, 100ft/30m
  "504R20120": 69,  // DSL Octal Cable, 8xRJ-45 to open end, solid wires, 10ft/3m
  "504R20180": 317,  // DSL Octal cable, 8xRJ-45 to open end, solid wires, 150ft/50m
  "504R60100": 253,  // DSL Octal Dual Port Cable, 8xRJ-45, open end,US solid wire,100ft /30 meter
  "504R60098": 92,  // DSL Octal Dual Port Cable, 8xRJ-45, open end,US solid wire,10ft /3 meter
  "504R60150": 486,  // DSL Octal Dual Port Cable, 8xRJ-45, open end,US solid wire,150ft / 45 meter
  "504R20140": 173,  // DSL Quad Cable, 4xRJ-45 to open end, solid wires, 100ft/30m
  "504R20110": 46,  // DSL Quad Cable, 4xRJ-45 to open end, solid wires, 10ft/3m
  "504R06012": 72,  // ML600-PFU MLP cable (8xRJ45->DB25) 0.3m
  "504R06017": 92,  // ML600-PFU MLP cable (8xRJ45->DB25) 3m
  "504R60099": 115,  // ML6x16-PFU MLP Cable (8xRJ45->2xDB25), 3m
  "504R24014": 52,  // PFU-8 to MDF Cable (DB-25 to 8-pairs Open End),  25ft.
  "504R24015": 80,  // PFU-8 to MDF Cable (DB-25 to 8-pairs Open End),  50ft.
  "504R24016": 104,  // PFU-8 to MDF Cable (DB-25 to 8-pairs Open End), 100ft.
  "504R24017": 115,  // PFU-8 to MDF Cable (DB-25 to 8-pairs Open End), 150ft.
  "504R24001": 80,  // Y-Cable: Champ-64 Plug to 2 X Champ-50 connectors
  "504R60064": 173,  // Y-Cable: DIN-128 Plug to 2 X Champ-64 connectors (11ft/3.3m)
  "504R60074": 242,  // Y-Cable: DIN-128 Plug to 2 X Champ-64 connectors (25ft/7.6m)
  "504R20060": 41,  // Alarm Cable, 50ft/15m solid wire 24AWG, DB-15 one end
  "504R06055": 76,  // Chassis-PFU MGMT cable (DB9/F->RJ45) 3m
  "504R60120": 12,  // Console port cable, RJ45 to DB9 , (12ft/3.6m)
  "504R20010": 12,  // Craft i/f cable, DB-9 con. both ends, (12ft/3.6m)
  "504R60109": 23,  // Craft2 i/f cable, Mini-jack to DB9M, 1.5m
  "504R60102": 23,  // DB9 to RJ45 RS232 adapter / cable
  "182K11030": 69,  // Edge Connector for XR-239 Repeater
  "504R60106": 23,  // Mgmt/Serial Server adapter, 15cm, RS232/V.24 DTE-DCE, RJ45-DB9F
  "504R60108": 23,  // Mgmt/Serial Server adapter, 15cm, RS-232/V.24, DTE-DTE (null modem), RJ45-DB9M
  "504R06065": 12,  // ML600 to PFU Alarm Cable 0.3m/1ft
  "504R06060": 20,  // ML600 to PFU MGMT Cable (RJ45-RJ45) 0.3m/1ft
  "504R60052": 23,  // ML650S E1/T1-Clock splitter cable (0.5m/1.6ft)
  "504R60110": 23,  // PFU MGMT cable for ML680Dx models
  "504R60107": 23,  // Serial Server cable 1.5m , RS-422/485, RJ45-DB9M
  "504R60119": 23,  // Serial Server cable 1.5m for new D series, RS-422/485, RJ45-DB9F
  "504R60094": 23,  // ML620i DC Power Cable; 2.5m
  "504R20047": 41,  // PWR/GND Harness - 20ft/6m open ended, 48VDC 14AWG, Gnd 10AWG
  "504R20043": 41,  // PWR/GND Harness - 20ft/6m open ended, 48VDC 18AWG, Gnd 14AWG
};

// List price for a part number, or null when not on the price list.
export const priceOf = (pn) => (pn && PRICES[pn] != null ? PRICES[pn] : null);

export const fmtUsd = (n) =>
  n == null ? "—" : "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

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
  // ── GL800 hybrid G.FAST/VDSL aggregation & remote units ──────────────────
  //  "O" = PTMP aggregation (office) end · "R" = remote end
  { pn:"501RG0140", model:"GL830-8O",   cat:"NODES", family:"GL800", form:"standalone",
    icon:"node", desc:"8-pair hybrid PTMP aggregation unit, 4×HSL",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },
  { pn:"501RG0144", model:"GL830-8R",   cat:"NODES", family:"GL800", form:"standalone",
    icon:"node", desc:"8-pair hybrid remote unit, 4×HSL",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },
  { pn:"501RG0139", model:"GL830-16O",  cat:"NODES", family:"GL800", form:"standalone",
    icon:"node", desc:"16-pair hybrid PTMP aggregation unit, 4×HSL",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },
  { pn:"501RG0143", model:"GL830-16R",  cat:"NODES", family:"GL800", form:"standalone",
    icon:"node", desc:"16-pair hybrid remote unit, 4×HSL",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },
  { pn:"501RG0134", model:"GL850L-16O", cat:"NODES", family:"GL800", form:"standalone",
    icon:"node", desc:"16-pair PTMP aggregation unit, 8×HSL, MACsec-256",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },
  { pn:"501RG0135", model:"GL850L-16R", cat:"NODES", family:"GL800", form:"standalone",
    icon:"node", desc:"16-pair hybrid remote unit, 8×HSL, MACsec-256",
    iface:{ copper:true, coax:false, fiber:true, poe:false } },

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
    A("506R61191", "DIN PSU 48VDC PoE",   "DIN-rail PSU 48VDC with PoE",      "power", "psu", { poe:true }),
  ],
  GL900: [
    A("506R00008",  "AC/DC PSU", "AC-DC PSU for GL900 (US/EU)", "power", "psu"),
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
// ════════════════════════════════════════════════════════════════════════════
//  COMPATIBILITY ENGINE
//  Ported from the Access quote tool's "Wizard-Node" form. Every rule below
//  switches on a real AutoRepeaterInfo column (see ari.js), not on hand-tagged
//  guesses. Where a device is absent from AutoRepeaterInfo the engine falls
//  back to the legacy iface tags and marks the slot as unverified.
// ════════════════════════════════════════════════════════════════════════════

// Wizard rule: the SFP list is filtered to the port's speed class.
//   "None"       → no SFP cage at all
//   "100"        → 100 only          · "1000" → 1000 only
//   "100/1000"   → anything that is not 2500 and not 10GE
//   "2500/10GE"  → anything that is not 100 and not 1000
function sfpsFor(sfpInfo) {
  const all = POOL["SFP"] || [];
  switch (sfpInfo) {
    case "None": case null: case undefined: return [];
    case "100":  return all.filter(s => s.sfpInfo === "100");
    case "1000": return all.filter(s => s.sfpInfo === "1000");
    case "100/1000":
      return all.filter(s => s.sfpInfo !== "2500" && s.sfpInfo !== "10GE");
    case "2500/10GE":
      return all.filter(s => s.sfpInfo !== "100" && s.sfpInfo !== "1000");
    case "100/1000/2500": case "All":
      return all;
    default: return all;
  }
}

// The wizard groups PN Types into product families, then branches on family.
const isML5xx = (a) => a.type === "PTPR Fiber" || a.type === "PTPD Fiber";

// Wizard rule: copper cable is chosen by the device's pair count.
//   0 pairs → no cable offered · ML600D uses its own cable family
//   16 or 32 → 16-pair cables · 8 → 8-pair · fewer → the small cables
//   ML5xx fiber switches → suppressed entirely, whatever their pair count:
//   their copper side is G.hn over existing plant, not an Actelis harness.
function cablesFor(a) {
  if (!a || !a.pairs) return [];
  if (isML5xx(a)) return [];
  if (a.type === "PTP-D") return POOL["PTP-D Cable"] || [];
  const pool = POOL["ML600 Cable (No PFU)"] || [];
  if (a.pairs === 16 || a.pairs === 32) return pool.filter(c => c.pairs === 16);
  if (a.pairs === 8) return pool.filter(c => c.pairs === 8);
  return pool.filter(c => c.pairs != null && c.pairs < 8);
}

// Wizard rule: a 32-pair unit consumes two cables; everything else one.
export const cableQtyFor = (a) => (a && a.pairs === 32 ? 2 : 1);

// Wizard rule: the AC/DC adapter pool depends on the product family, and for
// ML600D on whether the unit is a PoE/48V variant (description suffix).
function powerPoolFor(a) {
  if (!a) return { pool: [], note: "" };
  const poe = a.desc && /(TP|P-M|60V\))$/.test(a.desc.trim());
  switch (a.type) {
    case "PTP-D":
      return { pool: POOL[poe ? "PTP-D ACPOE" : "PTP-D AC"] || [], note: "" };
    case "PTP TDM":
      return { pool: POOL["PTP ML650x AC"] || [], note: "" };
    case "PTP ML620i CPE": case "PTP ML620i Bundle":
      return { pool: POOL["PTP ML620i AC"] || [], note: "" };
    case "PTP ML700 CO": case "PTP ML700 CPE":
      return { pool: POOL["PTP ML700 AC"] || [], note: "" };
    case "PTPR Fiber": case "PTPD Fiber":
      // Power Input: 0 built-in · 1 DC feed · 2 DIN non-PoE · 3 DIN PoE
      if (a.powerInput === 2) return { pool: POOL["PTP-D AC"] || [], note: "" };
      if (a.powerInput === 3) return { pool: POOL["PTP-D ACPOE"] || [], note: "" };
      if (a.powerInput === 1) return { pool: [], note: "DC-fed. No AC adapter listed for this unit." };
      return { pool: [], note: "Power built in. No external PSU required." };
    default:
      return { pool: POOL["PTP AC"] || [], note: "" };
  }
}

// Wizard rule: craft cable part number depends on family and OEM variant.
// For ML5xx the wizard only offers one at all when OEM is "FB" or the model is
// an ML56xx; the rest of that family has no craft cable option.
function craftFor(a) {
  if (!a) return [];
  if (isML5xx(a)) {
    const ml56 = a.desc && a.desc.trim().slice(0, 4) === "ML56";
    return (a.oem === "FB" || ml56) ? (POOL["Craft ML5xx"] || []) : [];
  }
  if (a.type === "PTP-D") {
    if (a.oem === "DT")   return POOL["Craft Cable ML600DT"] || [];
    if (a.oem === "NewD") return POOL["Craft Cable ML600D New"] || [];
    return POOL["Craft Cable ML600D"] || [];
  }
  return POOL["Craft Cable"] || [];
}

// Wizard rule: the DC-power-cable option (its CODCPower checkbox) is only
// exposed for ML500/ML600/ML700 and for the DC-fed ML5xx variants. ML620i and
// the AC-only ML5xx units never show it. The part number then depends on the
// chassis/product type.
function dcCableFor(a, device) {
  if (!a) return [];
  if (isML5xx(a)) {
    // PTMPModel comes from the description suffix: -DC and -AD are DC-fed.
    const suf = (a.desc || "").trim().slice(-2).toUpperCase();
    if (suf !== "DC" && suf !== "AD") return [];
  }
  if (a.type === "PTP ML620i CPE" || a.type === "PTP ML620i Bundle") return [];
  if (device.form === "chassis") {
    const big = device.model === "CHS-2000" || device.model === "CHS-2000B";
    return POOL[big ? "ML2300 DC Cable" : "ML130/230 DC Cable"] || [];
  }
  return POOL["ML600 DC Cable"] || [];
}

// Wizard rule: mounting is suppressed for DIN-rail and OEM="NA" products; the
// kit's own NumPairs is its slot count (a 2-slot kit serves two units).
function mountsFor(a, device) {
  if (!a) return [];
  if (a.oem === "NA") return [];
  if (a.type === "PTP-D") return [];
  if (a.type === "PTPR Fiber" || a.type === "PTPD Fiber") {
    if (a.oem === "TL" || a.oem === "FB")
      return (POOL["ML5xx Mounting"] || []).filter(m => m.oem === a.oem);
  }
  return POOL["ML600 Mounting"] || [];
}

// Map an AutoRepeaterInfo pool row into the option shape the UI renders.
const opt = (o, group, icon) => ({
  pn: o.pn, model: o.pn, desc: o.desc || "",
  group, icon, datasheet: DS_PRODUCTS,
});

export function buildSlots(device) {
  if (!device) return [];
  const a = attrsOf(device.pn);
  const slots = [];

  // Devices the Access wizard never covered (the newer G.hn lines) fall back
  // to the legacy tags. Flag it rather than implying the same authority.
  if (!a) return buildSlotsLegacy(device);

  // ── POWER ────────────────────────────────────────────────────────────────
  const { pool: psus, note: pnote } = powerPoolFor(a);
  if (device.form === "chassis") {
    slots.push({ key:"power", label:"Power", multi:false, options:[],
      note:"Shelf-powered. Configure PSU modules in the chassis build." });
  } else {
    slots.push({ key:"power", label:"Power", multi:false,
      options: psus.map(o => opt(o, "Power", "psu")),
      note: pnote || (psus.length ? "" : "No AC adapter listed for this unit.") });
  }

  // ── DC POWER CABLE (wizard's CODCPower checkbox) ─────────────────────────
  const dc = dcCableFor(a, device);
  if (dc.length && a.powerInput !== 0) {
    slots.push({ key:"dccable", label:"DC power cable", multi:false,
      options: dc.map(o => opt(o, "DC power cable", "cable")),
      note:"Optional — only when feeding the unit from a DC plant." });
  }

  // ── MOUNTING ──────────────────────────────────────────────────────────────
  const mounts = mountsFor(a, device);
  if (mounts.length) {
    slots.push({ key:"mount", label:"Mounting", multi:false,
      options: mounts.map(o => opt(o, "Mounting", "mount")),
      note:"A 2-slot kit holds two units." });
  } else {
    slots.push({ key:"mount", label:"Mounting", multi:false, options:[],
      note: a.type === "PTP-D" ? "35 mm DIN-rail clip integrated."
          : a.oem === "NA"     ? "Rack ears / clip integrated."
          : "No mount kit required." });
  }

  // ── OPTICS (SFP) ──────────────────────────────────────────────────────────
  const sfps = sfpsFor(a.sfpInfo);
  if (sfps.length) {
    const cap = a.sfpQty && a.sfpQty > 0 ? a.sfpQty : 1;
    slots.push({ key:"optics", label:"Optics (SFP)", multi:true, maxQty:cap,
      options: sfps.map(o => opt(o, "Optics (SFP)", "sfp")),
      note:`${a.sfpInfo} ports · up to ${cap} SFP${cap > 1 ? "s" : ""}.` });
  } else {
    slots.push({ key:"optics", label:"Optics (SFP)", multi:false, options:[],
      note:"No SFP cage on this unit." });
  }

  // ── CABLING ───────────────────────────────────────────────────────────────
  const cables = cablesFor(a);
  if (cables.length) {
    const q = cableQtyFor(a);
    slots.push({ key:"cabling", label:"Cabling", multi:true,
      options: cables.map(o => opt(o, "Cabling", "cable")),
      note:`${a.pairs} pairs${q > 1 ? ` · takes ${q} cables per unit` : ""}.` });
  } else {
    slots.push({ key:"cabling", label:"Cabling", multi:false, options:[],
      note: a.pairs === 0 ? "No copper pairs — fiber/coax only."
                          : "No cable kit required." });
  }

  // ── CRAFT CABLE ───────────────────────────────────────────────────────────
  const craft = craftFor(a);
  if (craft.length) {
    slots.push({ key:"craft", label:"Craft cable", multi:false,
      options: craft.map(o => opt(o, "Craft cable", "cable")),
      note:"Optional local console cable." });
  }

  return slots;
}

// ── Fallback for devices absent from AutoRepeaterInfo (GL800/GL900/GL9000) ───
function buildSlotsLegacy(device) {
  const { form, iface = {}, family } = device;
  const slots = [];
  const U = "Not in the Access data — verify before quoting.";

  if (iface.powerBuiltIn) {
    slots.push({ key:"power", label:"Power", multi:false, options:[],
      note:`Power built in (${iface.powerBuiltIn}).` });
  } else if (form === "cpe") {
    slots.push({ key:"power", label:"Power", multi:false,
      options: family === "GL900CPE" ? POWER.GL900 : [],
      note: family === "GL900CPE" ? U : "Line-powered from headend." });
  } else if (form === "din" || form === "inpole") {
    slots.push({ key:"power", label:"Power", multi:false,
      options: iface.poe ? POWER.DIN : POWER.DIN.filter(p => !p.poe), note:U });
  } else if (family === "GL800") {
    slots.push({ key:"power", label:"Power", multi:false, options:POWER.GL800, note:U });
  } else if (family === "GL900HE") {
    slots.push({ key:"power", label:"Power", multi:false, options:POWER.GL900, note:U });
  } else {
    slots.push({ key:"power", label:"Power", multi:false, options:POWER.ML600, note:U });
  }

  if (form === "standalone")
    slots.push({ key:"mount", label:"Mounting", multi:false, options:MOUNTS.standalone, note:U });
  else
    slots.push({ key:"mount", label:"Mounting", multi:false, options:[], note:"Integrated." });

  if (iface.fiber)
    slots.push({ key:"optics", label:"Optics (SFP)", multi:true,
      options:(POOL["SFP"] || []).map(o => opt(o, "Optics (SFP)", "sfp")), note:U });

  if (iface.copper)
    slots.push({ key:"cabling", label:"Cabling", multi:true,
      options:(POOL["ML600 Cable (No PFU)"] || []).map(o => opt(o, "Cabling", "cable")), note:U });
  else if (iface.coax)
    slots.push({ key:"cabling", label:"Cabling", multi:false, options:[],
      note:"Runs over existing coax." });

  return slots;
}

// True when the device's rules come from AutoRepeaterInfo rather than fallback.
export const isVerified = (device) => !!(device && attrsOf(device.pn));

// ── Placement default per form-factor (UI toggle, mirrors AXIS) ──────────────
export function defaultPlacement(device) {
  if (!device) return "indoor";
  if (device.form === "inpole") return "pole";
  if (device.family === "ML600D" || device.family === "ML600DL") return "outdoor";
  return "indoor";
}
