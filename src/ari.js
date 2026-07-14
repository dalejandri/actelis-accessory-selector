// ════════════════════════════════════════════════════════════════════════════
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

export const ATTRS = {
  "501RG0016": {
    "type": "PTP",
    "desc": "ML622",
    "pairs": 2,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": 0,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0046": {
    "type": "PTP",
    "desc": "ML624",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": "100",
    "sfpQty": 1,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0067": {
    "type": "PTP",
    "desc": "ML638",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 1,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0076": {
    "type": "PTP",
    "desc": "ML654S",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0077": {
    "type": "PTP",
    "desc": "ML658S",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0078": {
    "type": "PTP ML500",
    "desc": "ML650SV",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "501RG0103": {
    "type": "PTP TDM",
    "desc": "ML652T",
    "pairs": 2,
    "hsl": 1,
    "sfpInfo": null,
    "sfpQty": 0,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "501RG0104": {
    "type": "PTP TDM",
    "desc": "ML652VT",
    "pairs": 2,
    "hsl": 1,
    "sfpInfo": null,
    "sfpQty": 0,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "501RG0105": {
    "type": "PTP TDM",
    "desc": "ML652V",
    "pairs": 2,
    "hsl": 1,
    "sfpInfo": null,
    "sfpQty": 0,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "501RG0106": {
    "type": "PTMP CO",
    "desc": "ML684M",
    "pairs": 4,
    "hsl": 2,
    "sfpInfo": "100/1000",
    "sfpQty": 1,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "501RG0107": {
    "type": "PTP TDM",
    "desc": "ML654VT",
    "pairs": 4,
    "hsl": 1,
    "sfpInfo": null,
    "sfpQty": 0,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "501RG0111": {
    "type": "PTMP CO",
    "desc": "ML6916EN",
    "pairs": 16,
    "hsl": 16,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 0,
    "oem": "SyncE"
  },
  "501RG0113": {
    "type": "TDM EXT",
    "desc": "MLE-16E",
    "pairs": 16,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": 0,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "501RG0115": {
    "type": "PTMP CO",
    "desc": "ML6916EL",
    "pairs": 16,
    "hsl": 4,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "501RG0116": {
    "type": "PTP",
    "desc": "ML644EL",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0121": {
    "type": "PTP ML620i CPE",
    "desc": "ML622i-New",
    "pairs": 2,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": 0,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0122": {
    "type": "PTP ML620i CPE",
    "desc": "ML624i-New",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": 0,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0137": {
    "type": "PTP ML700 CO",
    "desc": "ML748-O",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0156": {
    "type": "PTP ML700 CO",
    "desc": "ML744-O",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0162": {
    "type": "PTP ML620i CPE",
    "desc": "ML622i-Old",
    "pairs": 2,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": 0,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0164": {
    "type": "PTP ML620i CPE",
    "desc": "ML624i-Old",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": 0,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0216": {
    "type": "PTP",
    "desc": "ML644E",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0217": {
    "type": "PTP",
    "desc": "ML648E",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0218": {
    "type": "PTP",
    "desc": "ML6416E",
    "pairs": 16,
    "hsl": 1,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0220": {
    "type": "PTP-D",
    "desc": "ML684D",
    "pairs": 4,
    "hsl": 2,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 1,
    "oem": "D"
  },
  "501RG0221": {
    "type": "PTP-D",
    "desc": "ML680DF",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 1,
    "oem": "D"
  },
  "501RG0232": {
    "type": "PTP-D",
    "desc": "ML684DTP",
    "pairs": 4,
    "hsl": 2,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 2,
    "oem": "DT"
  },
  "501RG0236": {
    "type": "PTP-D",
    "desc": "ML680DFTP",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 2,
    "oem": "DT"
  },
  "501RG0237": {
    "type": "PTP ML700 CPE",
    "desc": "ML748-R",
    "pairs": 8,
    "hsl": 1,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0238": {
    "type": "PTMP CO",
    "desc": "ML6916E",
    "pairs": 16,
    "hsl": 4,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0240": {
    "type": "PTP-D",
    "desc": "ML622D",
    "pairs": 2,
    "hsl": 2,
    "sfpInfo": null,
    "sfpQty": 0,
    "mode": null,
    "powerInput": 1,
    "oem": "D"
  },
  "501RG0250": {
    "type": "PTP-D",
    "desc": "ML604D",
    "pairs": 4,
    "hsl": 2,
    "sfpInfo": null,
    "sfpQty": 0,
    "mode": null,
    "powerInput": 2,
    "oem": "D"
  },
  "501RG0252": {
    "type": "PTP ML500",
    "desc": "ML540E",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "501RG0253": {
    "type": "PTMP CO",
    "desc": "ML698ES",
    "pairs": 8,
    "hsl": 4,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0254": {
    "type": "PTMP CO",
    "desc": "ML6916ES",
    "pairs": 16,
    "hsl": 4,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0256": {
    "type": "PTP ML700 CPE",
    "desc": "ML744-R",
    "pairs": 4,
    "hsl": 1,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0259": {
    "type": "PTMP CO",
    "desc": "ML698E",
    "pairs": 8,
    "hsl": 4,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "501RG0447": {
    "type": "PTP",
    "desc": "ML688",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 1,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0477": {
    "type": "PTP",
    "desc": "ML658S Advanced CLK",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG0530": {
    "type": "PTP ML500",
    "desc": "ML530",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG2097": {
    "type": "Repeater",
    "desc": "XR239SE Repeater",
    "pairs": 2,
    "hsl": null,
    "sfpInfo": "Non-rDSS All",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG2099": {
    "type": "PTMP PFU",
    "desc": "PFU-8 Rev D",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": "All",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501RG3230": {
    "type": "PTP-D",
    "desc": "ML684D (New)",
    "pairs": 4,
    "hsl": 2,
    "sfpInfo": "1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 1,
    "oem": "NewD"
  },
  "501RG3231": {
    "type": "PTP-D",
    "desc": "ML680DF (New)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 2,
    "oem": "NewD"
  },
  "501RG3240": {
    "type": "PTP-D",
    "desc": "ML622D (New)",
    "pairs": 2,
    "hsl": 2,
    "sfpInfo": "1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 2,
    "oem": "NewD"
  },
  "501RG3255": {
    "type": "PTP-D",
    "desc": "ML684D-M (12/24V)",
    "pairs": 4,
    "hsl": 2,
    "sfpInfo": "1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 2,
    "oem": "NewD"
  },
  "501RG3275": {
    "type": "PTP-D",
    "desc": "ML680D-M (12/24V)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 2,
    "oem": "NewD"
  },
  "501RG3355": {
    "type": "PTP-D",
    "desc": "ML684DL-M (12/24V)",
    "pairs": 4,
    "hsl": 2,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 2,
    "oem": "NewD"
  },
  "501RG3358": {
    "type": "PTP-D",
    "desc": "ML684DLP-M",
    "pairs": 4,
    "hsl": 2,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 2,
    "oem": "NewD"
  },
  "501RG3375": {
    "type": "PTP-D",
    "desc": "ML680DL-M (12/24V)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 2,
    "oem": "NewD"
  },
  "501RG3378": {
    "type": "PTP-D",
    "desc": "ML680DLP-M",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 2,
    "oem": "NewD"
  },
  "501S20062": {
    "type": "PTP ML620i Bundle",
    "desc": "ML622i+US/EU AC/DC adapter",
    "pairs": 2,
    "hsl": 1,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501S20064": {
    "type": "PTP ML620i Bundle",
    "desc": "ML624i+US/EU AC/DC adapter",
    "pairs": 4,
    "hsl": 1,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "501S20394": {
    "type": "PTP Bundle",
    "desc": "ML638G Rackmount kit (+Copper Cables+Rackmount)",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 1,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "502R02110": {
    "type": "PTMP CO",
    "desc": "Chassis 2000B Shelf, 19\"/23\"",
    "pairs": 256,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "502R05080": {
    "type": "ML600 Mounting",
    "desc": "ML600 Sleeve Extension Slide Kit Installation",
    "pairs": 1,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "502R20230": {
    "type": "PTMP CO",
    "desc": "Chassis 200 Shelf",
    "pairs": 128,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "503R20132": {
    "type": "MLU",
    "desc": "MLU-32DF",
    "pairs": 32,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "503R20164": {
    "type": "MLU",
    "desc": "MLU-64DF",
    "pairs": 64,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "503R20232": {
    "type": "MLU",
    "desc": "MLU-32DR",
    "pairs": 32,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "503R20264": {
    "type": "MLU",
    "desc": "MLU-64DR",
    "pairs": 64,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "503R60041": {
    "type": "SDU",
    "desc": "SDU-455G",
    "pairs": 256,
    "hsl": 128,
    "sfpInfo": "100/1000",
    "sfpQty": 4,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "503R60042": {
    "type": "SDU",
    "desc": "SDU-450",
    "pairs": 256,
    "hsl": 128,
    "sfpInfo": "100/1000",
    "sfpQty": 4,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "503R60043": {
    "type": "SDU",
    "desc": "SDU-450G",
    "pairs": 256,
    "hsl": 128,
    "sfpInfo": "100/1000/2500",
    "sfpQty": 8,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R06055": {
    "type": "CO-PFU Cascade",
    "desc": "10ft/3m",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R20010": {
    "type": "Craft Cable",
    "desc": "Craft i/f cable, DB-9 con. both ends",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R20043": {
    "type": "ML600 DC Cable",
    "desc": "DC Power for ML600",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R20047": {
    "type": "ML130/230 DC Cable",
    "desc": "DC Power for ML230",
    "pairs": 64,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R20060": {
    "type": "PTMP Alarm",
    "desc": "50ft/15m",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R20110": {
    "type": "ML600 Cable (No PFU)",
    "desc": "10ft/3m",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R20120": {
    "type": "ML600 Cable (No PFU)",
    "desc": "10ft/3m",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R20140": {
    "type": "ML600 Cable (No PFU)",
    "desc": "100ft/30m",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R20160": {
    "type": "ML600 Cable (No PFU)",
    "desc": "100ft/30m",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R20180": {
    "type": "ML600 Cable (No PFU)",
    "desc": "150ft/50m",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R24016": {
    "type": "PFU Cable",
    "desc": "100ft/30m",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R24017": {
    "type": "PFU Cable",
    "desc": "150ft/50m",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60060": {
    "type": "CHS-2000B Cable",
    "desc": "25ft/7.5m",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60062": {
    "type": "CHS-2000B Cable",
    "desc": "100ft/30m",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60063": {
    "type": "CHS-2000B Cable",
    "desc": "150ft/50m",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60084": {
    "type": "MLU-32DF Cable EU",
    "desc": "10m",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60085": {
    "type": "MLU-32DF Cable EU",
    "desc": "20m",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60086": {
    "type": "MLU-32DF Cable EU",
    "desc": "50m",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60087": {
    "type": "MLU-32DF Cable US",
    "desc": "25ft",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60088": {
    "type": "MLU-32DF Cable US",
    "desc": "100ft",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60098": {
    "type": "ML600 Cable (No PFU)",
    "desc": "10ft/3m",
    "pairs": 16,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60099": {
    "type": "PFU Cable16",
    "desc": "3m",
    "pairs": 16,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "504R60100": {
    "type": "ML600 Cable (No PFU)",
    "desc": "100ft/30m",
    "pairs": 16,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60101": {
    "type": "PTP-D Cable",
    "desc": "ML600D Cable",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "504R60102": {
    "type": "Craft Cable ML600D",
    "desc": "Craft i/f cable, DB-9 to RJ45 RS232 adapter / cable",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60103": {
    "type": "MLU-32DF Cable EU",
    "desc": "80m",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "504R60106": {
    "type": "Craft Cable ML600DT",
    "desc": "Craft i/f cable, DB-9 to RJ45 RS232 adapter / cable",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "504R60119": {
    "type": "Craft Cable ML600D New",
    "desc": "Craft i/f cable, DB-9 to RJ45 RS232 adapter / cable",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "504R60120": {
    "type": "Craft ML5xx",
    "desc": "Craft Cable for ML540L/S, ML550, ML560M",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "504R60150": {
    "type": "ML600 Cable (No PFU)",
    "desc": "150ft/45m",
    "pairs": 16,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "506R00002": {
    "type": "SFP",
    "desc": "1000Base-LX  Single Mode (10km)",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R00006": {
    "type": "PTP AC",
    "desc": "AC-DC Adapter for ML600 (110/220V-US)",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R00008": {
    "type": "PTP ML620i AC",
    "desc": "AC-DC Adapter for old ML620i (US/EU)",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R00010": {
    "type": "PTP ML620i AC",
    "desc": "AC-DC Adapter for New ML620i (US/EU)",
    "pairs": null,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R00012": {
    "type": "SFP",
    "desc": "1000Base-SX Multi Mode (500m)",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": "MM",
    "powerInput": null,
    "oem": null
  },
  "506R00022": {
    "type": "SFP",
    "desc": "100Base-FX Multi Mode (2km)",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "100",
    "sfpQty": null,
    "mode": "MM",
    "powerInput": null,
    "oem": null
  },
  "506R00032": {
    "type": "SFP",
    "desc": "100Base-FX Single Mode (15km)",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "100",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R00042": {
    "type": "SFP",
    "desc": "1000Base-T (Copper Converter - 100m)",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R51711": {
    "type": "SFP",
    "desc": "CSFP 1610nm, GbE, 80km",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R51712": {
    "type": "SFP",
    "desc": "CSFP 1550nm, GbE, 80km",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R51713": {
    "type": "SFP",
    "desc": "CSFP 1570nm, GbE, 80km",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R51715": {
    "type": "SFP",
    "desc": "CSFP 1530nm, GbE, 80km",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R51716": {
    "type": "SFP",
    "desc": "CSFP 1510nm, GbE, 80km",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R51750": {
    "type": "SFP",
    "desc": "1000Base-IR Single Mode (40km)",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61120": {
    "type": "SFP",
    "desc": "CSFP 1610nm, GbE, 120Km",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R61151": {
    "type": "SFP",
    "desc": "T3/E3 over Ethernet SFP",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "100",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R61154": {
    "type": "SFP",
    "desc": "2500Base-FX Single Mode (30km)",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "2500",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61155": {
    "type": "SFP",
    "desc": "2500Base-FX Multi Mode (500m)",
    "pairs": null,
    "hsl": null,
    "sfpInfo": "2500",
    "sfpQty": null,
    "mode": "MM",
    "powerInput": null,
    "oem": null
  },
  "506R61158": {
    "type": "SFP",
    "desc": "BiDi FE SM TX=1310nm/RX=1550nm (20Km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61159": {
    "type": "SFP",
    "desc": "BiDi FE SM TX=1550nm/RX=1310nm (20Km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61162": {
    "type": "SFP",
    "desc": "BiDi GE SM TX=1310nm/RX=1550nm (3Km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61163": {
    "type": "SFP",
    "desc": "BiDi GE SM TX=1550nm/RX=1310nm (3Km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61164": {
    "type": "SFP",
    "desc": "BiDi FE MM TX=1310nm/RX=1550nm (2km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100",
    "sfpQty": null,
    "mode": "MM",
    "powerInput": null,
    "oem": null
  },
  "506R61165": {
    "type": "SFP",
    "desc": "BiDi FE MM TX=1550nm/RX=1310nm (2km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100",
    "sfpQty": null,
    "mode": "MM",
    "powerInput": null,
    "oem": null
  },
  "506R61169": {
    "type": "SFP",
    "desc": "BiDi GE SM CWDM TX=1310nm/RX=1490nm (40Km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61170": {
    "type": "SFP",
    "desc": "BiDi GE SM CWDM TX=1490nm/RX=1310nm (40Km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61171": {
    "type": "SFP",
    "desc": "BiDi GE SM CWDM TX=1310nm/RX=1490nm (20Km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61172": {
    "type": "SFP",
    "desc": "BiDi GE SM CWDM TX=1490nm/RX=1310nm (20Km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61173": {
    "type": "SFP",
    "desc": "Ethernet over T3 SFP module, 1000Base-FX - version 3.0",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R61174": {
    "type": "SFP",
    "desc": "Ethernet over T3 SFP module, 100Base-FX - version 3.0",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R61181": {
    "type": "PTP-D AC",
    "desc": "DIN PSU -24VDC <40W (-40+74C)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R61185": {
    "type": "PTP-D AC",
    "desc": "DIN PSU -24VDC <40W (-40+74C) + US Cables",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R61186": {
    "type": "SFP",
    "desc": "100Base-FX SM hardened (10km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61187": {
    "type": "SFP",
    "desc": "1000Base-LX SM hardened (10km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61188": {
    "type": "SFP",
    "desc": "1000Base-FX SM 1310nm hardened (40Km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61191": {
    "type": "PTP-D ACPOE",
    "desc": "DIN PSU -48VDC 240W for PoE (-40+74C)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R61205": {
    "type": "SFP",
    "desc": "CSFP 1470nm, GbE, 80km",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R61206": {
    "type": "SFP",
    "desc": "CSFP 1490nm, GbE, 80km",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R61207": {
    "type": "SFP",
    "desc": "CSFP 1590nm, GbE, 80km",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "1000",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R61213": {
    "type": "SFP",
    "desc": "100/1000Base-T SFP",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "100",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "506R61235": {
    "type": "SFP",
    "desc": "10G BASE-LR SFP+ Module (10Km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "10GE",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": null,
    "oem": null
  },
  "506R61241": {
    "type": "SFP",
    "desc": "10G BASE-LR SFP+ Module (40Km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "10GE",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": 0,
    "oem": null
  },
  "506R61242": {
    "type": "SFP",
    "desc": "10G BASE-LR SFP+ Module (70Km)",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": "10GE",
    "sfpQty": null,
    "mode": "SM",
    "powerInput": 0,
    "oem": null
  },
  "506R61252": {
    "type": "PTPD Fiber",
    "desc": "GL5010-8J2F",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 2,
    "oem": "NA"
  },
  "506R61253": {
    "type": "PTPD Fiber",
    "desc": "GL5010-8J4F",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 2,
    "oem": "NA"
  },
  "506R61254": {
    "type": "PTPD Fiber",
    "desc": "GL5010-10J2F",
    "pairs": 10,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 2,
    "oem": "NA"
  },
  "506R61255": {
    "type": "PTPD Fiber",
    "desc": "GL5020-8J4F-P",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 3,
    "oem": "NA"
  },
  "506R61256": {
    "type": "PTPD Fiber",
    "desc": "GL5020X-8J4F-P",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 3,
    "oem": "NA"
  },
  "506R61257": {
    "type": "PTPD Fiber",
    "desc": "GL5030X-8J4F",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 2,
    "oem": "NA"
  },
  "506R61258": {
    "type": "PTPD Fiber",
    "desc": "GL5030X-8J4F-P",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 3,
    "oem": "NA"
  },
  "506R61259": {
    "type": "PTPD Fiber",
    "desc": "GL5030XR-8J4F",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 2,
    "oem": "NA"
  },
  "506R61260": {
    "type": "PTPD Fiber",
    "desc": "GL5030XR-8J4F-P",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 3,
    "oem": "NA"
  },
  "506R61262": {
    "type": "PTPD Fiber",
    "desc": "GL5030X-8J4F-P2",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 3,
    "oem": "NA"
  },
  "506R61263": {
    "type": "PTPD Fiber",
    "desc": "GL5070X-8J12F",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 8,
    "mode": null,
    "powerInput": 2,
    "oem": "NA"
  },
  "506R61264": {
    "type": "PTPD Fiber",
    "desc": "GL5060X-16J4F",
    "pairs": 16,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 2,
    "oem": "NA"
  },
  "506R61265": {
    "type": "PTPD Fiber",
    "desc": "GL5060X-16J4F-P",
    "pairs": 16,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 3,
    "oem": "NA"
  },
  "506R61267": {
    "type": "PTPD Fiber",
    "desc": "GL5060XR-16J4F",
    "pairs": 16,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 2,
    "oem": "NA"
  },
  "506R61268": {
    "type": "PTPD Fiber",
    "desc": "GL5060XR-16J4F-P",
    "pairs": 16,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 3,
    "oem": "NA"
  },
  "506R61270": {
    "type": "PTPD Fiber",
    "desc": "GL5080XR-4J12F",
    "pairs": 4,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 12,
    "mode": null,
    "powerInput": 2,
    "oem": "NA"
  },
  "506R61271": {
    "type": "PTPR Fiber",
    "desc": "GL6010X-24J4F-P-DC",
    "pairs": 24,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61272": {
    "type": "PTPR Fiber",
    "desc": "GL6010X-24J4F-P-AC",
    "pairs": 24,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61273": {
    "type": "PTPR Fiber",
    "desc": "GL6010X-24J4F-P-AD",
    "pairs": 24,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61274": {
    "type": "PTPR Fiber",
    "desc": "GL6010XR-24J4F-P-DC",
    "pairs": 24,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61275": {
    "type": "PTPR Fiber",
    "desc": "GL6010XR-24J4F-P-AC",
    "pairs": 24,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61276": {
    "type": "PTPR Fiber",
    "desc": "GL6010XR-24J4F-P-AD",
    "pairs": 24,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61280": {
    "type": "PTPR Fiber",
    "desc": "GL6031-16J12FC-DC",
    "pairs": 16,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 12,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61281": {
    "type": "PTPR Fiber",
    "desc": "GL6031-16J12FC-AC",
    "pairs": 16,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 12,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61282": {
    "type": "PTPR Fiber",
    "desc": "GL6031-16J12FC-AD",
    "pairs": 16,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 12,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61283": {
    "type": "PTPR Fiber",
    "desc": "GL6030-24J4F-P-DC",
    "pairs": 24,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61284": {
    "type": "PTPR Fiber",
    "desc": "GL6030-24J4F-P-AC",
    "pairs": 24,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61285": {
    "type": "PTPR Fiber",
    "desc": "GL6030-24J4F-P-AD",
    "pairs": 24,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61286": {
    "type": "PTPR Fiber",
    "desc": "GL6030X-24J4F-DC",
    "pairs": 24,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61287": {
    "type": "PTPR Fiber",
    "desc": "GL6030X-24J4F-AC",
    "pairs": 24,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61288": {
    "type": "PTPR Fiber",
    "desc": "GL6030X-24J4F-AD",
    "pairs": 24,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61289": {
    "type": "PTPR Fiber",
    "desc": "GL6040X-8J28F-DC",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 24,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61290": {
    "type": "PTPR Fiber",
    "desc": "GL6040X-8J28F-AC",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 24,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61291": {
    "type": "PTPR Fiber",
    "desc": "GL6040X-8J28F-AD",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 24,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61292": {
    "type": "PTPR Fiber",
    "desc": "GL6040XR-8J28F-DC",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 24,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61293": {
    "type": "PTPR Fiber",
    "desc": "GL6040XR-8J28F-AC",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 24,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61294": {
    "type": "PTPR Fiber",
    "desc": "GL6040XR-8J28F-AD",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 24,
    "mode": null,
    "powerInput": 0,
    "oem": "NA"
  },
  "506R61295": {
    "type": "PTPD Fiber",
    "desc": "GL5070XR-8J12F",
    "pairs": 8,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 8,
    "mode": null,
    "powerInput": 2,
    "oem": "NA"
  },
  "506R61329": {
    "type": "PTPD Fiber",
    "desc": "GL7010-6J4F-P",
    "pairs": 6,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 3,
    "oem": "NA"
  },
  "506R61330": {
    "type": "PTPD Fiber",
    "desc": "GL7020-6J4F-P",
    "pairs": 6,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 3,
    "oem": "NA"
  },
  "506R61331": {
    "type": "PTPD Fiber",
    "desc": "GL7030-6J4F-P",
    "pairs": 6,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 3,
    "oem": "NA"
  },
  "506R61332": {
    "type": "PTPD Fiber",
    "desc": "GL7006-4J2F-P",
    "pairs": 4,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 3,
    "oem": "NA"
  },
  "506R62006": {
    "type": "PTPR Fiber",
    "desc": "ML540M AC",
    "pairs": 4,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 6,
    "mode": null,
    "powerInput": 0,
    "oem": "TL"
  },
  "506R62007": {
    "type": "PTPR Fiber",
    "desc": "ML562M AC",
    "pairs": 4,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 0,
    "oem": "TL"
  },
  "506R62011": {
    "type": "PTPD Fiber",
    "desc": "ML5114D DC",
    "pairs": 10,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 2,
    "oem": "NA"
  },
  "506R62012": {
    "type": "PTPD Fiber",
    "desc": "ML5114DP DC",
    "pairs": 10,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 4,
    "mode": null,
    "powerInput": 3,
    "oem": "NA"
  },
  "506R62016": {
    "type": "PTPR Fiber",
    "desc": "ML540M DC",
    "pairs": 4,
    "hsl": 0,
    "sfpInfo": "100/1000",
    "sfpQty": 6,
    "mode": null,
    "powerInput": 0,
    "oem": "TL"
  },
  "506R62017": {
    "type": "PTPR Fiber",
    "desc": "ML562M DC",
    "pairs": 4,
    "hsl": 0,
    "sfpInfo": "2500/10GE",
    "sfpQty": 2,
    "mode": null,
    "powerInput": 0,
    "oem": "TL"
  },
  "510K14497": {
    "type": "CPE Enclosure",
    "desc": "XR239SE Kit - AD14 (MAEC - Actelis Generic) - Xconnect",
    "pairs": 2,
    "hsl": null,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510K20099": {
    "type": "PTP PFU",
    "desc": "PFU-8 Rev D Kit",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": "All",
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510K60064": {
    "type": "PTP ML620i Bundle",
    "desc": "ML624i Kit (+AC/DC+Copper Cables+Wall Mount)",
    "pairs": 4,
    "hsl": 1,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510KG0060": {
    "type": "PTP Bundle",
    "desc": "ML644 Kit (+AC/DC+Copper Cables+Wall Mount)",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510KG0061": {
    "type": "PTP Bundle",
    "desc": "ML648 Kit (+AC/DC+Copper Cables+Wall Mount)",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510KG0062": {
    "type": "PTP Bundle",
    "desc": "ML6416 Kit (+AC/DC+Copper Cables+Wall Mount)",
    "pairs": 16,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510KG0063": {
    "type": "PTP Bundle",
    "desc": "ML644E kit (+AC/DC+Copper Cables+Wall Mount)",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510KG0064": {
    "type": "PTP Bundle",
    "desc": "ML648E kit (+AC/DC+Copper Cables+Wall Mount)",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510KG0065": {
    "type": "PTP Bundle",
    "desc": "ML6416E kit (+AC/DC+Copper Cables+Wall Mount)",
    "pairs": 16,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 2,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510KG6241": {
    "type": "PTP Bundle",
    "desc": "ML624 Kit (+AC/DC+Copper Cables+Wall Mount)",
    "pairs": 4,
    "hsl": null,
    "sfpInfo": "100",
    "sfpQty": 1,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510KG6281": {
    "type": "PTP Bundle",
    "desc": "ML628 Kit (+AC/DC+Copper Cables+Wall Mount)",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": "100",
    "sfpQty": 1,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510KG6381": {
    "type": "PTP Bundle",
    "desc": "ML638 Kit (+AC/DC+Copper Cables+Wall Mount)",
    "pairs": 8,
    "hsl": null,
    "sfpInfo": "100/1000",
    "sfpQty": 1,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510R21070": {
    "type": "ML600 Mounting",
    "desc": "Rack Mount Kit for 2xML600/PFU",
    "pairs": 2,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510R21076": {
    "type": "ML5xx Mounting",
    "desc": "Rack Mount Tray for 2xunits",
    "pairs": 2,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": "FB"
  },
  "510R21077": {
    "type": "ML5xx Mounting",
    "desc": "Rack Mount Bracket for 1xML5x0M",
    "pairs": 1,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": "TL"
  },
  "510R21078": {
    "type": "ML5xx Mounting",
    "desc": "Rack Mount Tray for 2xML5x0M units",
    "pairs": 2,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": "TL"
  },
  "510R21079": {
    "type": "ML5xx Mounting",
    "desc": "Rack Mount Tray for ML5x0M + ML600",
    "pairs": 1,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": "TL"
  },
  "510R21080": {
    "type": "ML600 Mounting",
    "desc": "Wall Mount Kit for ML600",
    "pairs": 1,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "510R50955": {
    "type": "ML600 Mounting",
    "desc": "Wall Mount Kit for ML600, Flat faced",
    "pairs": 1,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "EMSL00105": {
    "type": "PTP EMS",
    "desc": "EMS License for ML600 PTP Configurations",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "EMSL00106": {
    "type": "PTMP EMS",
    "desc": "EMS License for ML2300 PTMP Configurations",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "EMSL00107": {
    "type": "PTMP ML230 EMS",
    "desc": "EMS License for ML230/ML698 PTMP Configurations",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": null,
    "oem": null
  },
  "EMSL00109": {
    "type": "EMSNB",
    "desc": "SNMP NB Interface License",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL00110": {
    "type": "EMSREDUN",
    "desc": "Redundancy License",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL00111": {
    "type": "EMSXML",
    "desc": "TL1 NB Interface License",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL00113": {
    "type": "EMSSNMP",
    "desc": "SNMP NE Licenses - up to 10 Devices",
    "pairs": 10,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL00114": {
    "type": "EMSSNMP",
    "desc": "SNMP NE Licenses - up to 50 Devices",
    "pairs": 50,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL00115": {
    "type": "EMSSNMP",
    "desc": "SNMP NE Licenses - up to 100 Devices",
    "pairs": 100,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL00116": {
    "type": "EMSSNMP",
    "desc": "SNMP NE Licenses - up to 500 Devices",
    "pairs": 500,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL00142": {
    "type": "EMSEMAIL",
    "desc": "EMS Alarm email notifications",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL00143": {
    "type": "EMSFIPS",
    "desc": "EMS security package",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL00144": {
    "type": "EMSRTU",
    "desc": "EMS Right-to-use",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40001": {
    "type": "EMSSITE",
    "desc": "Site license for up to 100 devices",
    "pairs": 100,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40002": {
    "type": "EMSSITE",
    "desc": "Site license for up to 500 devices",
    "pairs": 500,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40003": {
    "type": "EMSSITE",
    "desc": "Site license for up to 1000 devices",
    "pairs": 1000,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40004": {
    "type": "EMSSITE",
    "desc": "Site license for more than 1000 devices",
    "pairs": 10000,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40100": {
    "type": "EMSNODE",
    "desc": "Node license for 10x ML600",
    "pairs": 10,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40101": {
    "type": "EMSNODE",
    "desc": "Node license for 50x ML600",
    "pairs": 50,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40102": {
    "type": "EMSNODE",
    "desc": "Node license for 100x ML600",
    "pairs": 100,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40103": {
    "type": "EMSNODE",
    "desc": "Node license for 500x ML600",
    "pairs": 500,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40104": {
    "type": "EMSNODE",
    "desc": "Node license for 1000x ML600",
    "pairs": 1000,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40105": {
    "type": "EMSNODE",
    "desc": "Node license for 5000x ML600",
    "pairs": 5000,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40107": {
    "type": "EMSAGG",
    "desc": "Node license for 5x ML2300",
    "pairs": 5,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40108": {
    "type": "EMSAGG",
    "desc": "Node license for 10x ML2300",
    "pairs": 10,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40109": {
    "type": "EMSAGG",
    "desc": "Node license for 50x ML2300",
    "pairs": 50,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40110": {
    "type": "EMSAGG",
    "desc": "Node license for 100x ML2300",
    "pairs": 100,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40111": {
    "type": "EMSSTATS",
    "desc": "PM and statistics license per 100 NEs",
    "pairs": 100,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40112": {
    "type": "EMSTOP",
    "desc": "Topology View license per 100 NEs",
    "pairs": 100,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40118": {
    "type": "EMSREST",
    "desc": "REST NB Interface License for alarms",
    "pairs": 0,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  },
  "EMSL40119": {
    "type": "EMSCLIENT",
    "desc": "Bundle of 5 additional EMS clients",
    "pairs": 5,
    "hsl": 0,
    "sfpInfo": null,
    "sfpQty": null,
    "mode": null,
    "powerInput": 0,
    "oem": null
  }
};

export const POOL = {
  "SFP": [
    {
      "pn": "506R00002",
      "desc": "1000Base-LX  Single Mode (10km)",
      "pairs": null,
      "sfpInfo": "1000",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R00012",
      "desc": "1000Base-SX Multi Mode (500m)",
      "pairs": null,
      "sfpInfo": "1000",
      "mode": "MM",
      "oem": null
    },
    {
      "pn": "506R00022",
      "desc": "100Base-FX Multi Mode (2km)",
      "pairs": null,
      "sfpInfo": "100",
      "mode": "MM",
      "oem": null
    },
    {
      "pn": "506R00032",
      "desc": "100Base-FX Single Mode (15km)",
      "pairs": null,
      "sfpInfo": "100",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R00042",
      "desc": "1000Base-T (Copper Converter - 100m)",
      "pairs": null,
      "sfpInfo": "1000",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R51711",
      "desc": "CSFP 1610nm, GbE, 80km",
      "pairs": null,
      "sfpInfo": "1000",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R51712",
      "desc": "CSFP 1550nm, GbE, 80km",
      "pairs": null,
      "sfpInfo": "1000",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R51713",
      "desc": "CSFP 1570nm, GbE, 80km",
      "pairs": null,
      "sfpInfo": "1000",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R51715",
      "desc": "CSFP 1530nm, GbE, 80km",
      "pairs": null,
      "sfpInfo": "1000",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R51716",
      "desc": "CSFP 1510nm, GbE, 80km",
      "pairs": null,
      "sfpInfo": "1000",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R51750",
      "desc": "1000Base-IR Single Mode (40km)",
      "pairs": null,
      "sfpInfo": "1000",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61120",
      "desc": "CSFP 1610nm, GbE, 120Km",
      "pairs": null,
      "sfpInfo": "1000",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R61151",
      "desc": "T3/E3 over Ethernet SFP",
      "pairs": null,
      "sfpInfo": "100",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R61154",
      "desc": "2500Base-FX Single Mode (30km)",
      "pairs": null,
      "sfpInfo": "2500",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61155",
      "desc": "2500Base-FX Multi Mode (500m)",
      "pairs": null,
      "sfpInfo": "2500",
      "mode": "MM",
      "oem": null
    },
    {
      "pn": "506R61158",
      "desc": "BiDi FE SM TX=1310nm/RX=1550nm (20Km)",
      "pairs": 0,
      "sfpInfo": "100",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61159",
      "desc": "BiDi FE SM TX=1550nm/RX=1310nm (20Km)",
      "pairs": 0,
      "sfpInfo": "100",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61162",
      "desc": "BiDi GE SM TX=1310nm/RX=1550nm (3Km)",
      "pairs": 0,
      "sfpInfo": "1000",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61163",
      "desc": "BiDi GE SM TX=1550nm/RX=1310nm (3Km)",
      "pairs": 0,
      "sfpInfo": "1000",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61164",
      "desc": "BiDi FE MM TX=1310nm/RX=1550nm (2km)",
      "pairs": 0,
      "sfpInfo": "100",
      "mode": "MM",
      "oem": null
    },
    {
      "pn": "506R61165",
      "desc": "BiDi FE MM TX=1550nm/RX=1310nm (2km)",
      "pairs": 0,
      "sfpInfo": "100",
      "mode": "MM",
      "oem": null
    },
    {
      "pn": "506R61169",
      "desc": "BiDi GE SM CWDM TX=1310nm/RX=1490nm (40Km)",
      "pairs": 0,
      "sfpInfo": "1000",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61170",
      "desc": "BiDi GE SM CWDM TX=1490nm/RX=1310nm (40Km)",
      "pairs": 0,
      "sfpInfo": "1000",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61171",
      "desc": "BiDi GE SM CWDM TX=1310nm/RX=1490nm (20Km)",
      "pairs": 0,
      "sfpInfo": "1000",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61172",
      "desc": "BiDi GE SM CWDM TX=1490nm/RX=1310nm (20Km)",
      "pairs": 0,
      "sfpInfo": "1000",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61173",
      "desc": "Ethernet over T3 SFP module, 1000Base-FX - version 3.0",
      "pairs": 0,
      "sfpInfo": "1000",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R61174",
      "desc": "Ethernet over T3 SFP module, 100Base-FX - version 3.0",
      "pairs": 0,
      "sfpInfo": "100",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R61186",
      "desc": "100Base-FX SM hardened (10km)",
      "pairs": 0,
      "sfpInfo": "100",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61187",
      "desc": "1000Base-LX SM hardened (10km)",
      "pairs": 0,
      "sfpInfo": "1000",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61188",
      "desc": "1000Base-FX SM 1310nm hardened (40Km)",
      "pairs": 0,
      "sfpInfo": "1000",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61205",
      "desc": "CSFP 1470nm, GbE, 80km",
      "pairs": 0,
      "sfpInfo": "1000",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R61206",
      "desc": "CSFP 1490nm, GbE, 80km",
      "pairs": 0,
      "sfpInfo": "1000",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R61207",
      "desc": "CSFP 1590nm, GbE, 80km",
      "pairs": 0,
      "sfpInfo": "1000",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R61213",
      "desc": "100/1000Base-T SFP",
      "pairs": 0,
      "sfpInfo": "100",
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R61235",
      "desc": "10G BASE-LR SFP+ Module (10Km)",
      "pairs": 0,
      "sfpInfo": "10GE",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61241",
      "desc": "10G BASE-LR SFP+ Module (40Km)",
      "pairs": 0,
      "sfpInfo": "10GE",
      "mode": "SM",
      "oem": null
    },
    {
      "pn": "506R61242",
      "desc": "10G BASE-LR SFP+ Module (70Km)",
      "pairs": 0,
      "sfpInfo": "10GE",
      "mode": "SM",
      "oem": null
    }
  ],
  "ML600 Cable (No PFU)": [
    {
      "pn": "504R20110",
      "desc": "10ft/3m",
      "pairs": 4,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    },
    {
      "pn": "504R20120",
      "desc": "10ft/3m",
      "pairs": 8,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    },
    {
      "pn": "504R20140",
      "desc": "100ft/30m",
      "pairs": 4,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    },
    {
      "pn": "504R20160",
      "desc": "100ft/30m",
      "pairs": 8,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    },
    {
      "pn": "504R20180",
      "desc": "150ft/50m",
      "pairs": 8,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    },
    {
      "pn": "504R60098",
      "desc": "10ft/3m",
      "pairs": 16,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    },
    {
      "pn": "504R60100",
      "desc": "100ft/30m",
      "pairs": 16,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    },
    {
      "pn": "504R60150",
      "desc": "150ft/45m",
      "pairs": 16,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "PTP-D Cable": [
    {
      "pn": "504R60101",
      "desc": "ML600D Cable",
      "pairs": 0,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "ML600 Mounting": [
    {
      "pn": "502R05080",
      "desc": "ML600 Sleeve Extension Slide Kit Installation",
      "pairs": 1,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    },
    {
      "pn": "510R21070",
      "desc": "Rack Mount Kit for 2xML600/PFU",
      "pairs": 2,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    },
    {
      "pn": "510R21080",
      "desc": "Wall Mount Kit for ML600",
      "pairs": 1,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    },
    {
      "pn": "510R50955",
      "desc": "Wall Mount Kit for ML600, Flat faced",
      "pairs": 1,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "ML5xx Mounting": [
    {
      "pn": "510R21076",
      "desc": "Rack Mount Tray for 2xunits",
      "pairs": 2,
      "sfpInfo": null,
      "mode": null,
      "oem": "FB"
    },
    {
      "pn": "510R21077",
      "desc": "Rack Mount Bracket for 1xML5x0M",
      "pairs": 1,
      "sfpInfo": null,
      "mode": null,
      "oem": "TL"
    },
    {
      "pn": "510R21078",
      "desc": "Rack Mount Tray for 2xML5x0M units",
      "pairs": 2,
      "sfpInfo": null,
      "mode": null,
      "oem": "TL"
    },
    {
      "pn": "510R21079",
      "desc": "Rack Mount Tray for ML5x0M + ML600",
      "pairs": 1,
      "sfpInfo": null,
      "mode": null,
      "oem": "TL"
    }
  ],
  "PTP AC": [
    {
      "pn": "506R00006",
      "desc": "AC-DC Adapter for ML600 (110/220V-US)",
      "pairs": null,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "PTP-D AC": [
    {
      "pn": "506R61181",
      "desc": "DIN PSU -24VDC <40W (-40+74C)",
      "pairs": 0,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R61185",
      "desc": "DIN PSU -24VDC <40W (-40+74C) + US Cables",
      "pairs": 0,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "PTP-D ACPOE": [
    {
      "pn": "506R61191",
      "desc": "DIN PSU -48VDC 240W for PoE (-40+74C)",
      "pairs": 0,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "PTP ML700 AC": [
    {
      "pn": "506R00006",
      "desc": "AC-DC Adapter for ML700 (110/220V-US)",
      "pairs": null,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "PTP ML620i AC": [
    {
      "pn": "506R00008",
      "desc": "AC-DC Adapter for old ML620i (US/EU)",
      "pairs": null,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    },
    {
      "pn": "506R00010",
      "desc": "AC-DC Adapter for New ML620i (US/EU)",
      "pairs": null,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "PTP ML650x AC": [
    {
      "pn": "506R00010",
      "desc": "AC-DC Adapter for ML650x (US/EU)",
      "pairs": null,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "AC Cable": [],
  "ML600 DC Cable": [
    {
      "pn": "504R20043",
      "desc": "DC Power for ML600",
      "pairs": 8,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "ML2300 DC Cable": [
    {
      "pn": "504R20047",
      "desc": "DC Power for ML2300",
      "pairs": 128,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "ML130/230 DC Cable": [
    {
      "pn": "504R20047",
      "desc": "DC Power for ML230",
      "pairs": 64,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "Craft Cable": [
    {
      "pn": "504R20010",
      "desc": "Craft i/f cable, DB-9 con. both ends",
      "pairs": 0,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "Craft Cable ML600D": [
    {
      "pn": "504R60102",
      "desc": "Craft i/f cable, DB-9 to RJ45 RS232 adapter / cable",
      "pairs": 0,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "Craft Cable ML600D New": [
    {
      "pn": "504R60119",
      "desc": "Craft i/f cable, DB-9 to RJ45 RS232 adapter / cable",
      "pairs": 0,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "Craft Cable ML600DT": [
    {
      "pn": "504R60106",
      "desc": "Craft i/f cable, DB-9 to RJ45 RS232 adapter / cable",
      "pairs": 0,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "Craft ML5xx": [
    {
      "pn": "504R60120",
      "desc": "Craft Cable for ML540L/S, ML550, ML560M",
      "pairs": 0,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ],
  "PTMP Alarm": [
    {
      "pn": "504R20060",
      "desc": "50ft/15m",
      "pairs": null,
      "sfpInfo": null,
      "mode": null,
      "oem": null
    }
  ]
};

export const attrsOf = (pn) => ATTRS[pn] || null;
