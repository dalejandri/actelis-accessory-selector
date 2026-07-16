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
import { DEVICE_ROWS } from "./devices.js";

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
  "506R00013E": 138,  // AC/DC power supply for GL800 (EU)
  "506R00013": 138,  // AC/DC power supply for GL800 (NA)
  "506R00006D": 110,  // AC-DC power supply for ML684D-M (NA)
  "506R00008": 58,  // AC-DC power supply for GL900/old ML620i (501
  "506R00006E": 110,  // AC-DC power supply for ML600/ML740/ML530 (EU
  "506R00006": 110,  // AC-DC power supply for ML600/ML740/ML530 (NA
  "506R00010": 58,  // AC-DC power supply for new ML620i (501RG012x
  "506R61185": 184,  // DIN Rail 110-220VAC-24VDC PSU for ML600Dx/ML
  "506R61181": 156,  // DIN Rail 110-220VAC-24VDC PSU for ML600Dx/ML
  "506R61191": 225,  // DIN Rail 110-220VAC-48VDC PSU for ML600Dx/ML
  "506R32110": 2178,  // IP65 Enclosure for ML650S/SV, -48VDC Fiber &
  "502R05080": 195,  // ML600/ML740/ML530/GL800/GL900 Sleeve Extensi
  "510R21070": 225,  // Rack Mount Sleeve Kit for two ML600/700/530/
  "510R21080": 52,  // Wall Mount Kit for ML530/ML600/ML700/GL800/G
  "510R50955": 98,  // Wall Mount Kit for ML530/ML600/ML700/GL800/G
  "502R20230": 1127,  // Chassis 200 Shelf
  "502R02110": 2985,  // Chassis 2000B Shelf, 19 inch (CHS-2000B/19)
  "503R60042": 10345,  // Service Dispatcher Unit (SDU-450)
  "503R60043": 11495,  // Service Dispatcher Unit (SDU-450G)
  "503R60041": 12645,  // Service Dispatcher Unit (SDU-455G)
  "503R20132": 6325,  // MLU-32DF (Front Access Multi-Line Unit with 
  "503R20232": 6325,  // MLU-32DR (Rear Access Multi-Line Unit with 3
  "503R20164": 9195,  // MLU-64DF (Front Access Multi-Line Unit with 
  "503R20264": 9195,  // MLU-64DR (Rear Access Multi-Line Unit with 6
  "506R20230": 403,  // AC Power Feed Module (AC-PFM) for CHS-200
  "510K20230": 115,  // Accessories Kit for CHS-200
  "506R30060": 633,  // Fan Control Module for CHS-200 (FCM-200)
  "510R10955": 52,  // Wall Mount Kit for CHS-200, Flat faced
  "506R61311": 711,  // -48V / 600W Rectifier for ML2300
  "508R00680": 46,  // Blank Panel Kit (4 blank panels)
  "506R30070": 685,  // Fan Control Module for CHS-2000B/19(FCM-2000
  "550A00047": 173,  // Flash Card for SDU-440/G
  "550A00046": 173,  // Flash Card for SDU-450/G
  "502F60187A": 110,  // Metal 19” Shelf for rectifier installations 
  "504R60105": 89,  // Rectifier Cable 110/220V to open-ended for M
  "503R20270": 2300,  // Streaker card for ML2300 and ML230
  "510K20270": 2530,  // Streaker card with probe for ML2300 and ML23
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
  "506R61289": 3999,  // GL6040X-8J28F-DC (GL2140X-0828-DC - Old P/N 
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
  "506R61164": 87,  // BiDi MM SFP Transceiver for FE port, 2Km, TX
  "506R61165": 87,  // BiDi MM SFP Transceiver for FE port, 2Km, TX
  "506R61158": 87,  // BiDi SM SFP Transceiver for FE port, 20Km, T
  "506R61159": 87,  // BiDi SM SFP Transceiver for FE port, 20Km, T
  "506R61162": 87,  // BiDi SM SFP Transceiver for GE port, 3Km, TX
  "506R61163": 87,  // BiDi SM SFP Transceiver for GE port, 3Km, TX
  "506R61171": 87,  // BiDi SM CWDM SFP Transceiver for GE port, 20
  "506R61172": 190,  // BiDi SM CWDM SFP Transceiver for GE port, 20
  "506R61169": 225,  // BiDi SM CWDM SFP Transceiver for GE port, 40
  "506R61170": 225,  // BiDi SM CWDM SFP Transceiver for GE port, 40
  "506R51711": 482,  // CSFP Transceiver 1610nm, GbE, 80km
  "506R61205": 482,  // CSFP Transceiver, 1470nm GbE, 80km
  "506R61206": 482,  // CSFP Transceiver, 1490nm GbE, 80km
  "506R51716": 482,  // CSFP Transceiver, 1510nm GbE, 80km
  "506R51715": 482,  // CSFP Transceiver, 1530nm GbE, 80km
  "506R51712": 482,  // CSFP Transceiver, 1550nm GbE, 80km
  "506R51713": 482,  // CSFP Transceiver, 1570nm GbE, 80km
  "506R61207": 482,  // CSFP Transceiver, 1590nm GbE, 80km
  "506R61151": 1605,  // T3/E3 over Ethernet SFP - 100Base-FX
  "504R60060": 237,  // Copper Loop 64-pairs DIN Connector, US Color
  "504R60062": 657,  // Copper Loop 64-pairs DIN Connector, US Color
  "504R60063": 733,  // Copper Loop 64-pairs DIN Connector, US Color
  "504R60088": 449,  // Copper Loop 64-pairs FCI Connector, US Color
  "504R60101": 46,  // DSL dual port cable 2 X RJ45 to open end sol
  "504R20160": 230,  // DSL Octal Cable, 8xRJ-45 to open end, solid 
  "504R20120": 69,  // DSL Octal Cable, 8xRJ-45 to open end, solid 
  "504R20180": 317,  // DSL Octal cable, 8xRJ-45 to open end, solid 
  "504R60100": 253,  // DSL Octal Dual Port Cable, 8xRJ-45, open end
  "504R60098": 92,  // DSL Octal Dual Port Cable, 8xRJ-45, open end
  "504R60150": 486,  // DSL Octal Dual Port Cable, 8xRJ-45, open end
  "504R20140": 173,  // DSL Quad Cable, 4xRJ-45 to open end, solid w
  "504R20110": 46,  // DSL Quad Cable, 4xRJ-45 to open end, solid w
  "504R06012": 72,  // ML600-PFU MLP cable (8xRJ45->DB25) 0.3m
  "504R06017": 92,  // ML600-PFU MLP cable (8xRJ45->DB25) 3m
  "504R60099": 115,  // ML6x16-PFU MLP Cable (8xRJ45->2xDB25), 3m
  "504R24014": 52,  // PFU-8 to MDF Cable (DB-25 to 8-pairs Open En
  "504R24015": 80,  // PFU-8 to MDF Cable (DB-25 to 8-pairs Open En
  "504R24016": 104,  // PFU-8 to MDF Cable (DB-25 to 8-pairs Open En
  "504R24017": 115,  // PFU-8 to MDF Cable (DB-25 to 8-pairs Open En
  "504R24001": 80,  // Y-Cable: Champ-64 Plug to 2 X Champ-50 conne
  "504R60064": 173,  // Y-Cable: DIN-128 Plug to 2 X Champ-64 connec
  "504R60074": 242,  // Y-Cable: DIN-128 Plug to 2 X Champ-64 connec
  "504R20060": 41,  // Alarm Cable, 50ft/15m solid wire 24AWG, DB-1
  "504R06055": 76,  // Chassis-PFU MGMT cable (DB9/F->RJ45) 3m
  "504R60120": 12,  // Console port cable, RJ45 to DB9 , (12ft/3.6m
  "504R20010": 12,  // Craft i/f cable, DB-9 con. both ends, (12ft/
  "504R60109": 23,  // Craft2 i/f cable, Mini-jack to DB9M, 1.5m
  "504R60102": 23,  // DB9 to RJ45 RS232 adapter / cable
  "182K11030": 69,  // Edge Connector for XR-239 Repeater
  "504R60106": 23,  // Mgmt/Serial Server adapter, 15cm, RS232/V.24
  "504R60108": 23,  // Mgmt/Serial Server adapter, 15cm, RS-232/V.2
  "504R06065": 12,  // ML600 to PFU Alarm Cable 0.3m/1ft
  "504R06060": 20,  // ML600 to PFU MGMT Cable (RJ45-RJ45) 0.3m/1ft
  "504R60052": 23,  // ML650S E1/T1-Clock splitter cable (0.5m/1.6f
  "504R60110": 23,  // PFU MGMT cable for ML680Dx models
  "504R60107": 23,  // Serial Server cable 1.5m , RS-422/485, RJ45-
  "504R60119": 23,  // Serial Server cable 1.5m for new D series, R
  "504R60094": 23,  // ML620i DC Power Cable; 2.5m
  "504R20047": 41,  // PWR/GND Harness - 20ft/6m open ended, 48VDC 
  "504R20043": 41,  // PWR/GND Harness - 20ft/6m open ended, 48VDC 
};

// Per-part datasheet PDFs, straight from the price list's link column.
// A part with no entry falls back to its product-family page (see ds()).
export const DATASHEET_URL = {
  "501RG0140": "https://actelis.com/download/591/gigaline-gl8xx-gigabit-to-hard-to-reach-locations-fiber-g-fast-and-vdsl2/24841/gl800_-data-sheet-170221.pdf",
  "501RG0144": "https://actelis.com/download/591/gigaline-gl8xx-gigabit-to-hard-to-reach-locations-fiber-g-fast-and-vdsl2/24841/gl800_-data-sheet-170221.pdf",
  "501RG0139": "https://actelis.com/download/591/gigaline-gl8xx-gigabit-to-hard-to-reach-locations-fiber-g-fast-and-vdsl2/24841/gl800_-data-sheet-170221.pdf",
  "501RG0143": "https://actelis.com/download/591/gigaline-gl8xx-gigabit-to-hard-to-reach-locations-fiber-g-fast-and-vdsl2/24841/gl800_-data-sheet-170221.pdf",
  "501RG0134": "https://actelis.com/download/591/gigaline-gl8xx-gigabit-to-hard-to-reach-locations-fiber-g-fast-and-vdsl2/24841/gl800_-data-sheet-170221.pdf",
  "501RG0135": "https://actelis.com/download/591/gigaline-gl8xx-gigabit-to-hard-to-reach-locations-fiber-g-fast-and-vdsl2/24841/gl800_-data-sheet-170221.pdf",
  "506R61334": "https://actelis.com/wp-content/uploads/2025/10/GL910C-Data-Sheet.pdf",
  "506R61342": "https://actelis.com/wp-content/uploads/2026/03/GL9104C-data-sheet.pdf",
  "506R61335": "https://actelis.com/wp-content/uploads/2025/10/GL910C-Data-Sheet.pdf",
  "506R61337": "https://actelis.com/wp-content/uploads/2026/03/GL93C-Data-sheet.pdf",
  "506R61336": "https://actelis.com/wp-content/uploads/2025/11/GL93C-W-Data-Sheet.pdf",
  "501RG0302": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "501RG0300": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "501RG0303": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "501RG0301": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "501RG0167": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "501RG0168": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "506R61245": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "501S61246": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "501S61247": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "501RG0157": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "501RG0158": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "510KG0310": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "510KG0309": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "510KG0308": "https://actelis.com/wp-content/uploads/2023/09/Actelis-GL900-In-Building-Fiber-Extension-Brochure_web.pdf",
  "501RG0016": "https://actelis.com/download/630/access-devices-ml600xx/24958/ml620-data-sheet-its-022014_16_nl.pdf",
  "501RG0121": "https://actelis.com/download/630/access-devices-ml600xx/24837/ml620i-_-inc-ml621i-_1_2_4-data-sheet-010116.pdf",
  "501RG0046": "https://actelis.com/download/630/access-devices-ml600xx/24958/ml620-data-sheet-its-022014_16_nl.pdf",
  "501RG0122": "https://actelis.com/download/630/access-devices-ml600xx/24837/ml620i-_-inc-ml621i-_1_2_4-data-sheet-010116.pdf",
  "501RG0067": "https://actelis.com/download/630/access-devices-ml600xx/24960/ml630-data-sheet-0418.pdf",
  "501RG0218": "https://actelis.com/download/630/access-devices-ml600xx/24249/ml640e-data-sheet-092915.pdf",
  "501RG0216": "https://actelis.com/download/630/access-devices-ml600xx/24249/ml640e-data-sheet-092915.pdf",
  "501RG0116": "https://actelis.com/download/630/access-devices-ml600xx/24249/ml640e-data-sheet-092915.pdf",
  "501RG0217": "https://actelis.com/download/630/access-devices-ml600xx/24249/ml640e-data-sheet-092915.pdf",
  "501RG0078": "https://actelis.com/wp-content/uploads/2025/09/ML650SV-Data-Sheet.pdf",
  "501RG0076": "https://actelis.com/wp-content/uploads/2023/10/ML650S-Data-Sheet.pdf",
  "501RG0077": "https://actelis.com/wp-content/uploads/2023/10/ML650S-Data-Sheet.pdf",
  "501RG0477": "https://actelis.com/wp-content/uploads/2023/10/ML650S-Data-Sheet.pdf",
  "501RG0106": "https://actelis.com/download/630/access-devices-ml600xx/24834/ml684m-data-sheet-its-updated-102020.pdf",
  "501RG0238": "https://actelis.com/download/632/aggregation-units-ml690x/24828/ml690e_data-sheet-022718.pdf",
  "501RG0115": "https://actelis.com/download/632/aggregation-units-ml690x/24968/ml690el_16-data-sheet-0520.pdf",
  "501RG0111": "https://actelis.com/download/632/aggregation-units-ml690x/24966/ml690en_-data-sheet-0220.pdf",
  "501RG0254": "https://actelis.com/download/632/aggregation-units-ml690x/24826/ml690es_8_16-data-sheet-031417.pdf",
  "501RG0259": "https://actelis.com/download/632/aggregation-units-ml690x/24828/ml690e_data-sheet-022718.pdf",
  "501RG0253": "https://actelis.com/download/632/aggregation-units-ml690x/24826/ml690es_8_16-data-sheet-031417.pdf",
  "501RG0240": "https://actelis.com/download/322/metalight-ml600dx-industrial-din-rail-product-line/24977/ml62xd_ml622d_ml624d-data-sheet_032816.pdf",
  "501RG3240": "https://actelis.com/download/322/metalight-ml600dx-industrial-din-rail-product-line/24977/ml62xd_ml622d_ml624d-data-sheet_032816.pdf",
  "501RG0220": "https://actelis.com/download/322/metalight-ml600dx-industrial-din-rail-product-line/28071/ml68xdx_data-sheet-06302022.pdf",
  "501RG3255": "https://actelis.com/download/322/metalight-ml600dx-industrial-din-rail-product-line/41978/ml600dx-m-high-density-industrial-iot-switch.pdf",
  "501RG3355": "https://actelis.com/download/322/metalight-ml600dx-industrial-din-rail-product-line/41978/ml600dx-m-high-density-industrial-iot-switch.pdf",
  "501RG0232": "https://actelis.com/download/322/metalight-ml600dx-industrial-din-rail-product-line/24254/ml684dt_ml684dtp-data-sheet.pdf",
  "501RG0221": "https://actelis.com/download/322/metalight-ml600dx-industrial-din-rail-product-line/24252/ml680df-data-sheet-single-and-dual-power-_032816.pdf",
  "501RG3231": "https://actelis.com/download/322/metalight-ml600dx-industrial-din-rail-product-line/24252/ml680df-data-sheet-single-and-dual-power-_032816.pdf",
  "501RG0236": "https://actelis.com/download/322/metalight-ml600dx-industrial-din-rail-product-line/24253/ml680dftp_ml680dft-data-sheet.pdf",
  "501RG3275": "https://actelis.com/download/322/metalight-ml600dx-industrial-din-rail-product-line/41978/ml600dx-m-high-density-industrial-iot-switch.pdf",
  "501RG3375": "https://actelis.com/download/322/metalight-ml600dx-industrial-din-rail-product-line/41978/ml600dx-m-high-density-industrial-iot-switch.pdf",
  "501RG3378": "https://actelis.com/download/322/metalight-ml600dx-industrial-din-rail-product-line/41978/ml600dx-m-high-density-industrial-iot-switch.pdf",
  "502R20230": "https://actelis.com/download/633/aggregation-units-ml2300x-ml2400x-ml230/24964/ml230-data-sheet-0220.pdf",
  "502R02110": "https://actelis.com/download/633/aggregation-units-ml2300x-ml2400x-ml230/24962/ml2300-data-sheet-022620.pdf",
  "503R60042": "https://actelis.com/download/633/aggregation-units-ml2300x-ml2400x-ml230/24963/sdu-data-sheet-updated-031914_16_nl.pdf",
  "503R60043": "https://actelis.com/download/633/aggregation-units-ml2300x-ml2400x-ml230/24963/sdu-data-sheet-updated-031914_16_nl.pdf",
  "503R60041": "https://actelis.com/download/633/aggregation-units-ml2300x-ml2400x-ml230/24963/sdu-data-sheet-updated-031914_16_nl.pdf",
  "503R20132": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "503R20232": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "503R20164": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "503R20264": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "506R20230": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "510K20230": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "506R30060": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "510R10955": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "506R61311": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "508R00680": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "506R30070": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "550A00047": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "550A00046": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "502F60187A": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "504R60105": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "503R20270": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "510K20270": "https://actelis.com/portfolio/ethernet-aggregation-switch-portfolio/",
  "506R61254": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33639/gl5010-data-sheet.pdf",
  "506R61252": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33639/gl5010-data-sheet.pdf",
  "506R62107": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33639/gl5010-data-sheet.pdf",
  "506R61253": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33639/gl5010-data-sheet.pdf",
  "506R61255": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33629/gl5020-data-sheet.pdf",
  "506R61256": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33629/gl5020-data-sheet.pdf",
  "506R61257": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33625/gl5030x-data-sheet.pdf",
  "506R61258": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33625/gl5030x-data-sheet.pdf",
  "506R61261": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33625/gl5030x-data-sheet.pdf",
  "506R61262": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33625/gl5030x-data-sheet.pdf",
  "506R61309": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33628/gl5060x-data-sheet.pdf",
  "506R61264": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33628/gl5060x-data-sheet.pdf",
  "506R61265": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33628/gl5060x-data-sheet.pdf",
  "506R61263": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33631/gl5070x-data-sheet.pdf",
  "506R62108": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33623/gl5080xr-data-sheet.pdf",
  "506R62011": "https://actelis.com/download/631/metalight-ml500dx-industrial-din-rail/25110/ml510d_ml5114d_ml5114dp-data-sheet-0421-2.pdf",
  "506R62012": "https://actelis.com/download/631/metalight-ml500dx-industrial-din-rail/25110/ml510d_ml5114d_ml5114dp-data-sheet-0421-2.pdf",
  "506R61296": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33639/gl5010-data-sheet.pdf",
  "506R62106": "https://actelis.com/wp-content/uploads/2023/06/GL5020-Data-Sheet.pdf",
  "506R61259": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33624/gl5030xr-data-sheet.pdf",
  "506R61260": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33624/gl5030xr-data-sheet.pdf",
  "506R61306": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33624/gl5030xr-data-sheet.pdf",
  "506R61267": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33626/gl5060xr-data-sheet.pdf",
  "506R61268": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33626/gl5060xr-data-sheet.pdf",
  "506R61295": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33630/gl5070xr-data-sheet.pdf",
  "506R61270": "https://actelis.com/download/684/gigaline-gl5xxx-industrial-fiber-switches-din-rail/33623/gl5080xr-data-sheet.pdf",
  "506R61286": "https://actelis.com/download/683/gigaline-gl6xxx-industrial-fiber-switches-rack-mounted/33637/gl6010x-data-sheet.pdf",
  "506R61287": "https://actelis.com/download/683/gigaline-gl6xxx-industrial-fiber-switches-rack-mounted/33637/gl6010x-data-sheet.pdf",
  "506R61271": "https://actelis.com/download/683/gigaline-gl6xxx-industrial-fiber-switches-rack-mounted/33637/gl6010x-data-sheet.pdf",
  "506R61272": "https://actelis.com/download/683/gigaline-gl6xxx-industrial-fiber-switches-rack-mounted/33637/gl6010x-data-sheet.pdf",
  "506R61283": "https://actelis.com/wp-content/uploads/2023/06/GL6030-Data-Sheet.pdf",
  "506R61284": "https://actelis.com/wp-content/uploads/2023/06/GL6030-Data-Sheet.pdf",
  "506R61280": "https://actelis.com/wp-content/uploads/2023/06/GL6031-Data-Sheet.pdf",
  "506R61281": "https://actelis.com/wp-content/uploads/2023/06/GL6031-Data-Sheet.pdf",
  "506R61289": "https://actelis.com/wp-content/uploads/2023/06/GL6040X-Data-Sheet.pdf",
  "506R61290": "https://actelis.com/wp-content/uploads/2023/06/GL6040X-Data-Sheet.pdf",
  "501RG0530": "https://actelis.com/download/621/access-device-ml500xx/24975/ml530-data-sheet-updated-070715.pdf",
  "501RG0252": "https://actelis.com/download/621/access-device-ml500xx/24230/ml540e-ds.pdf",
  "506R62016": "https://actelis.com/download/621/access-device-ml500xx/24976/ml540m_ml560m_200102.pdf",
  "506R62006": "https://actelis.com/download/621/access-device-ml500xx/24976/ml540m_ml560m_200102.pdf",
  "506R61274": "https://actelis.com/wp-content/uploads/2023/06/GL6010XR-Data-Sheet.pdf",
  "506R61275": "https://actelis.com/wp-content/uploads/2023/06/GL6010XR-Data-Sheet.pdf",
  "506R61292": "https://actelis.com/wp-content/uploads/2023/06/GL6040XR-Data-Sheet.pdf",
  "506R61293": "https://actelis.com/wp-content/uploads/2023/06/GL6040XR-Data-Sheet.pdf",
  "506R61332": "https://actelis.com/wp-content/uploads/2025/09/GL7000-Data-Sheet.pdf",
  "506R61329": "https://actelis.com/wp-content/uploads/2025/09/GL7000-Data-Sheet.pdf",
  "506R61330": "https://actelis.com/wp-content/uploads/2025/09/GL7000-Data-Sheet.pdf",
  "506R61331": "https://actelis.com/wp-content/uploads/2025/09/GL7000-Data-Sheet.pdf",
  "506R0116R": "https://actelis.com/wp-content/uploads/2023/09/ML630R-Data-Sheet.pdf",
  "506R0146R": "https://actelis.com/wp-content/uploads/2023/09/ML630R-Data-Sheet.pdf",
};

// The datasheet for a part: its own PDF if the price list names one.
export const datasheetOf = (pn) => DATASHEET_URL[pn] || null;

// List price for a part number, or null when not on the price list.
export const priceOf = (pn) => (pn && PRICES[pn] != null ? PRICES[pn] : null);

export const fmtUsd = (n) =>
  n == null ? "—" : "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

// ─── Device categories (drive the left-hand filter tabs, AXIS-style) ─────────
// ════════════════════════════════════════════════════════════════════════════
//  DEVICE FILTERS
//
//  The "Select device" tabs come straight from the price list's own category
//  column, renamed via the mapping Actelis supplied. Editing CATEGORY_FILTER is
//  the only thing needed to rename or regroup a tab; PN_CATEGORY is generated
//  from the price list so a newly added SKU lands in the right tab on its own.
// ════════════════════════════════════════════════════════════════════════════

// price-list category  →  filter tab label
export const CATEGORY_FILTER = {
  "A1.1 GL800 Solutions":            "GL800",
  "A1.2 GL9000 Headend Solutions":   "GL9000 Headend",
  "A1.3 GL9000 CPEs":                "GL9000 CPEs",
  "A1.4 GL900 Headend Solutions":    "GL900 Headend",
  "A1.5 GL900 CPEs":                 "GL900 CPEs",
  "A2. ML600 Family":                "ML600",
  "A2.1 ML600D Family":              "ML600D",
  // A4.x is the shelf family: the shelves plus the cards that populate them.
  "A4.1 Shelves":                    "Aggregators",
  "A4.2 SDU (Service Dispatch Units)": "Aggregators",
  "A4.3 MLU (Multiport Line Units)": "Aggregators",
  "A5.1 Fiber DIN Rail L2 Switches": "Fiber DIN Rail L2 Switches",
  "A5.2 Fiber DIN Rail L3 Switches": "Fiber DIN Rail L3 Switches",
  "A5.3 Fiber Rackmount L2 Switches":"Fiber Rackmount L2 Switches",
  "A5.4 Fiber Rackmount L3 Switches":"Fiber Rackmount L3 Switches",
  "A5.5 Fiber In-Pole L2 Switches":  "Fiber In-Pole L2 Switches",
  "A9. L3 CPEs":                     "L3 CPEs",
};

// part number → price-list category (GENERATED from the price list)
export const PN_CATEGORY = {
  "501RG0140": "A1.1 GL800 Solutions",
  "501RG0144": "A1.1 GL800 Solutions",
  "501RG0139": "A1.1 GL800 Solutions",
  "501RG0143": "A1.1 GL800 Solutions",
  "501RG0134": "A1.1 GL800 Solutions",
  "501RG0135": "A1.1 GL800 Solutions",
  "506R61334": "A1.2 GL9000 Headend Solutions",
  "506R61342": "A1.2 GL9000 Headend Solutions",
  "506R61335": "A1.2 GL9000 Headend Solutions",
  "506R61337": "A1.3 GL9000 CPEs",
  "506R61336": "A1.3 GL9000 CPEs",
  "501RG0302": "A1.4 GL900 Headend Solutions",
  "501RG0300": "A1.4 GL900 Headend Solutions",
  "501RG0303": "A1.4 GL900 Headend Solutions",
  "501RG0301": "A1.4 GL900 Headend Solutions",
  "501RG0167": "A1.4 GL900 Headend Solutions",
  "501RG0168": "A1.4 GL900 Headend Solutions",
  "506R61245": "A1.5 GL900 CPEs",
  "501S61246": "A1.5 GL900 CPEs",
  "501S61247": "A1.5 GL900 CPEs",
  "501RG0157": "A1.5 GL900 CPEs",
  "501RG0158": "A1.5 GL900 CPEs",
  "510KG0310": "A1.6 GL900 Enclosures & Bundles",
  "510KG0309": "A1.6 GL900 Enclosures & Bundles",
  "510KG0308": "A1.6 GL900 Enclosures & Bundles",
  "501RG0016": "A2. ML600 Family",
  "501RG0121": "A2. ML600 Family",
  "501RG0046": "A2. ML600 Family",
  "501RG0122": "A2. ML600 Family",
  "501RG0067": "A2. ML600 Family",
  "501RG0218": "A2. ML600 Family",
  "501RG0216": "A2. ML600 Family",
  "501RG0116": "A2. ML600 Family",
  "501RG0217": "A2. ML600 Family",
  "501RG0078": "A2. ML600 Family",
  "501RG0076": "A2. ML600 Family",
  "501RG0077": "A2. ML600 Family",
  "501RG0477": "A2. ML600 Family",
  "501RG0106": "A2. ML600 Family",
  "501RG0238": "A2. ML600 Family",
  "501RG0115": "A2. ML600 Family",
  "501RG0111": "A2. ML600 Family",
  "501RG0254": "A2. ML600 Family",
  "501RG0259": "A2. ML600 Family",
  "501RG0253": "A2. ML600 Family",
  "501RG0240": "A2.1 ML600D Family",
  "501RG3240": "A2.1 ML600D Family",
  "501RG0220": "A2.1 ML600D Family",
  "501RG3230": "A2.1 ML600D Family",
  "501RG3255": "A2.1 ML600D Family",
  "501RG3355": "A2.1 ML600D Family",
  "501RG3358": "A2.1 ML600D Family",
  "501RG0232": "A2.1 ML600D Family",
  "501RG0221": "A2.1 ML600D Family",
  "501RG3231": "A2.1 ML600D Family",
  "501RG0236": "A2.1 ML600D Family",
  "501RG3275": "A2.1 ML600D Family",
  "501RG3375": "A2.1 ML600D Family",
  "501RG3378": "A2.1 ML600D Family",
  "506R00013E": "A3.1 Power Supplies for GL800/GL900/ML500/ML600/ML700",
  "506R00013": "A3.1 Power Supplies for GL800/GL900/ML500/ML600/ML700",
  "506R00006D": "A3.1 Power Supplies for GL800/GL900/ML500/ML600/ML700",
  "506R00008": "A3.1 Power Supplies for GL800/GL900/ML500/ML600/ML700",
  "506R00006E": "A3.1 Power Supplies for GL800/GL900/ML500/ML600/ML700",
  "506R00006": "A3.1 Power Supplies for GL800/GL900/ML500/ML600/ML700",
  "506R00010": "A3.1 Power Supplies for GL800/GL900/ML500/ML600/ML700",
  "506R61185": "A3.1 Power Supplies for GL800/GL900/ML500/ML600/ML700",
  "506R61181": "A3.1 Power Supplies for GL800/GL900/ML500/ML600/ML700",
  "506R61191": "A3.1 Power Supplies for GL800/GL900/ML500/ML600/ML700",
  "506R32110": "A3.2 GL800/GL900ML500/ML600/ML700 Related Items",
  "502R05080": "A3.2 GL800/GL900ML500/ML600/ML700 Related Items",
  "510R21070": "A3.2 GL800/GL900ML500/ML600/ML700 Related Items",
  "510R21080": "A3.2 GL800/GL900ML500/ML600/ML700 Related Items",
  "510R50955": "A3.2 GL800/GL900ML500/ML600/ML700 Related Items",
  "502R20230": "A4.1 Shelves",
  "502R02110": "A4.1 Shelves",
  "503R60042": "A4.2 SDU (Service Dispatch Units)",
  "503R60043": "A4.2 SDU (Service Dispatch Units)",
  "503R60041": "A4.2 SDU (Service Dispatch Units)",
  "503R20132": "A4.3 MLU (Multiport Line Units)",
  "503R20232": "A4.3 MLU (Multiport Line Units)",
  "503R20164": "A4.3 MLU (Multiport Line Units)",
  "503R20264": "A4.3 MLU (Multiport Line Units)",
  "506R20230": "A4.4 CHS-200 Related Items",
  "510K20230": "A4.4 CHS-200 Related Items",
  "506R30060": "A4.4 CHS-200 Related Items",
  "510R10955": "A4.4 CHS-200 Related Items",
  "506R61311": "A4.5 CHS-2000 Related Items",
  "508R00680": "A4.5 CHS-2000 Related Items",
  "506R30070": "A4.5 CHS-2000 Related Items",
  "550A00047": "A4.5 CHS-2000 Related Items",
  "550A00046": "A4.5 CHS-2000 Related Items",
  "502F60187A": "A4.5 CHS-2000 Related Items",
  "504R60105": "A4.5 CHS-2000 Related Items",
  "503R20270": "A4.5 CHS-2000 Related Items",
  "510K20270": "A4.5 CHS-2000 Related Items",
  "506R61254": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61252": "A5.1 Fiber DIN Rail L2 Switches",
  "506R62107": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61253": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61255": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61256": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61257": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61258": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61261": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61262": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61309": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61264": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61265": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61263": "A5.1 Fiber DIN Rail L2 Switches",
  "506R62108": "A5.1 Fiber DIN Rail L2 Switches",
  "506R62011": "A5.1 Fiber DIN Rail L2 Switches",
  "506R62012": "A5.1 Fiber DIN Rail L2 Switches",
  "506R61296": "A5.2 Fiber DIN Rail L3 Switches",
  "506R62106": "A5.2 Fiber DIN Rail L3 Switches",
  "506R61259": "A5.2 Fiber DIN Rail L3 Switches",
  "506R61260": "A5.2 Fiber DIN Rail L3 Switches",
  "506R61306": "A5.2 Fiber DIN Rail L3 Switches",
  "506R61267": "A5.2 Fiber DIN Rail L3 Switches",
  "506R61268": "A5.2 Fiber DIN Rail L3 Switches",
  "506R61295": "A5.2 Fiber DIN Rail L3 Switches",
  "506R61270": "A5.2 Fiber DIN Rail L3 Switches",
  "506R61286": "A5.3 Fiber Rackmount L2 Switches",
  "506R61287": "A5.3 Fiber Rackmount L2 Switches",
  "506R61271": "A5.3 Fiber Rackmount L2 Switches",
  "506R61272": "A5.3 Fiber Rackmount L2 Switches",
  "506R61277": "A5.3 Fiber Rackmount L2 Switches",
  "506R61278": "A5.3 Fiber Rackmount L2 Switches",
  "506R61283": "A5.3 Fiber Rackmount L2 Switches",
  "506R61284": "A5.3 Fiber Rackmount L2 Switches",
  "506R61280": "A5.3 Fiber Rackmount L2 Switches",
  "506R61281": "A5.3 Fiber Rackmount L2 Switches",
  "506R61289": "A5.3 Fiber Rackmount L2 Switches",
  "506R61290": "A5.3 Fiber Rackmount L2 Switches",
  "501RG0530": "A5.3 Fiber Rackmount L2 Switches",
  "501RG0252": "A5.3 Fiber Rackmount L2 Switches",
  "506R62016": "A5.3 Fiber Rackmount L2 Switches",
  "506R62006": "A5.3 Fiber Rackmount L2 Switches",
  "506R61274": "A5.4 Fiber Rackmount L3 Switches",
  "506R61275": "A5.4 Fiber Rackmount L3 Switches",
  "506R61292": "A5.4 Fiber Rackmount L3 Switches",
  "506R61293": "A5.4 Fiber Rackmount L3 Switches",
  "506R61332": "A5.5 Fiber In-Pole L2 Switches",
  "506R61329": "A5.5 Fiber In-Pole L2 Switches",
  "506R61330": "A5.5 Fiber In-Pole L2 Switches",
  "506R61331": "A5.5 Fiber In-Pole L2 Switches",
  "506R0116R": "A9. L3 CPEs",
  "506R0146R": "A9. L3 CPEs",
  "506R00022": "C1. SFP Transceivers",
  "506R61186": "C1. SFP Transceivers",
  "506R00032": "C1. SFP Transceivers",
  "506R61213": "C1. SFP Transceivers",
  "506R00012": "C1. SFP Transceivers",
  "506R00002": "C1. SFP Transceivers",
  "506R61187": "C1. SFP Transceivers",
  "506R51750": "C1. SFP Transceivers",
  "506R61188": "C1. SFP Transceivers",
  "506R00042": "C1. SFP Transceivers",
  "506R61155": "C1. SFP Transceivers",
  "506R61154": "C1. SFP Transceivers",
  "506R61235": "C1. SFP Transceivers",
  "506R61241": "C1. SFP Transceivers",
  "506R61242": "C1. SFP Transceivers",
  "506R61164": "C1. SFP Transceivers",
  "506R61165": "C1. SFP Transceivers",
  "506R61158": "C1. SFP Transceivers",
  "506R61159": "C1. SFP Transceivers",
  "506R61162": "C1. SFP Transceivers",
  "506R61163": "C1. SFP Transceivers",
  "506R61171": "C1. SFP Transceivers",
  "506R61172": "C1. SFP Transceivers",
  "506R61169": "C1. SFP Transceivers",
  "506R61170": "C1. SFP Transceivers",
  "506R51711": "C1. SFP Transceivers",
  "506R61205": "C1. SFP Transceivers",
  "506R61206": "C1. SFP Transceivers",
  "506R51716": "C1. SFP Transceivers",
  "506R51715": "C1. SFP Transceivers",
  "506R51712": "C1. SFP Transceivers",
  "506R51713": "C1. SFP Transceivers",
  "506R61207": "C1. SFP Transceivers",
  "506R61151": "C1. SFP Transceivers",
  "504R60060": "C4.1 DSL Cables",
  "504R60062": "C4.1 DSL Cables",
  "504R60063": "C4.1 DSL Cables",
  "504R60088": "C4.1 DSL Cables",
  "504R60101": "C4.1 DSL Cables",
  "504R20160": "C4.1 DSL Cables",
  "504R20120": "C4.1 DSL Cables",
  "504R20180": "C4.1 DSL Cables",
  "504R60100": "C4.1 DSL Cables",
  "504R60098": "C4.1 DSL Cables",
  "504R60150": "C4.1 DSL Cables",
  "504R20140": "C4.1 DSL Cables",
  "504R20110": "C4.1 DSL Cables",
  "504R06012": "C4.1 DSL Cables",
  "504R06017": "C4.1 DSL Cables",
  "504R60099": "C4.1 DSL Cables",
  "504R24014": "C4.1 DSL Cables",
  "504R24015": "C4.1 DSL Cables",
  "504R24016": "C4.1 DSL Cables",
  "504R24017": "C4.1 DSL Cables",
  "504R24001": "C4.1 DSL Cables",
  "504R60064": "C4.1 DSL Cables",
  "504R60074": "C4.1 DSL Cables",
  "504R20060": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R06055": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R60120": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R20010": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R60109": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R60102": "C4.2 Service, Alarm, Clock and Misc. cables",
  "182K11030": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R60106": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R60108": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R06065": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R06060": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R60052": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R60110": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R60107": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R60119": "C4.2 Service, Alarm, Clock and Misc. cables",
  "504R60094": "C4.3 Power and Grounding cables",
  "504R20047": "C4.3 Power and Grounding cables",
  "504R20043": "C4.3 Power and Grounding cables",
};

// The filter label a part belongs to, or null if its category isn't mapped.
export const filterOf = (pn) => CATEGORY_FILTER[PN_CATEGORY[pn]] || null;

// The tabs shown in "Select device". Derived, not hand-listed: ordered by the
// price-list category code (A1.1, A1.2, … A9) and de-duplicated, since several
// codes can share one label. A tab only appears once a device uses it, so the
// A5.4 / A9 mappings sit dormant until those SKUs are added.
function deriveCategories() {
  const order = Object.keys(CATEGORY_FILTER).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  const used = new Set(DEVICES.map(d => d.cat).filter(Boolean));
  const out = [], seen = new Set();
  for (const code of order) {
    const label = CATEGORY_FILTER[code];
    if (seen.has(label) || !used.has(label)) continue;
    seen.add(label);
    out.push({ key: label, label });
  }
  return out;
}

// ════════════════════════════════════════════════════════════════════════════
//  DEVICES  (things the user can select as the primary product)
//  iface: copper = bonded G.SHDSL pairs · coax = G.hn "J" ports ·
//         fiber = has SFP uplink slots · poe = supplies PoE
// ════════════════════════════════════════════════════════════════════════════
// The device list is GENERATED from the price list (see devices.js and
// gen_devices.py). Price, datasheet and filter tab are attached here so those
// three concerns stay in one place; a part with no datasheet PDF on the price
// list falls back to its product-family page.
export const DEVICES = DEVICE_ROWS.map(d => ({
  ...d,
  cat: filterOf(d.pn),
  datasheet: datasheetOf(d.pn) || ds(d.family),
  isDevice: true,
}));

export const CATEGORIES = deriveCategories();

// ════════════════════════════════════════════════════════════════════════════
//  ACCESSORIES  (grouped pools the engine draws from)
// ════════════════════════════════════════════════════════════════════════════
const A = (pn, model, desc, group, icon, family="ACCESSORY", extra={}) =>
  ({ pn, model, desc, group, icon, family,
     datasheet: datasheetOf(pn) || ds(family), ...extra });

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
    // 510K00060 "Accessories Kit" was removed here when it was dropped from the
    // price list — it has no price and no replacement in A3.2, so it can't be
    // quoted. Re-add it if it returns to the list.
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
    // The wizard picks the shelf's DC cable by testing the description for
    // "Chassis 2000" (ML2300) versus the 100/200 shelves (ML230). Match on the
    // model number rather than an exact string so a renamed SKU still resolves.
    const big = /2000/.test(device.model || "");
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

// Map an AutoRepeaterInfo pool row into the option shape the UI renders. The
// datasheet is the part's own PDF from the price list where one exists.
const opt = (o, group, icon) => ({
  pn: o.pn, model: o.pn, desc: o.desc || "",
  group, icon, datasheet: datasheetOf(o.pn) || DS_PRODUCTS,
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

// Placement (Indoor/Outdoor/Pole) was removed from the UI — the wizard has no
// such rule and it fed nothing but a PDF label.
