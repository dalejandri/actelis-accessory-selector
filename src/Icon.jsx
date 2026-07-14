import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  Product silhouettes. These are lightweight, on-brand placeholders so the
//  tool looks complete out of the box. To use real product photography, drop
//  PNGs into /public/img and set an `image` field on the catalog entry — the
//  card will render the photo instead of the icon (see ProductImage in App.jsx).
// ─────────────────────────────────────────────────────────────────────────────
const N = "#0B1D3A";   // navy
const G = "#94A3B8";   // slate accent
const A = "#D97706";   // amber

const paths = {
  node: (
    <>
      <rect x="10" y="26" width="60" height="28" rx="3" fill="#fff" stroke={N} strokeWidth="2.5"/>
      <rect x="10" y="26" width="60" height="7" rx="3" fill={N}/>
      <circle cx="17" cy="29.5" r="1.4" fill={A}/>
      <rect x="16" y="40" width="9" height="7" rx="1" fill={G}/>
      <rect x="28" y="40" width="9" height="7" rx="1" fill={G}/>
      <rect x="40" y="40" width="9" height="7" rx="1" fill={G}/>
      <rect x="54" y="39" width="11" height="9" rx="1.5" fill="none" stroke={A} strokeWidth="2"/>
    </>
  ),
  din: (
    <>
      <rect x="24" y="14" width="32" height="52" rx="3" fill="#fff" stroke={N} strokeWidth="2.5"/>
      <rect x="24" y="14" width="32" height="8" rx="3" fill={N}/>
      <circle cx="30" cy="18" r="1.4" fill={A}/>
      <rect x="29" y="28" width="10" height="6" rx="1" fill={G}/>
      <rect x="41" y="28" width="10" height="6" rx="1" fill={G}/>
      <rect x="29" y="38" width="22" height="7" rx="1.5" fill="none" stroke={A} strokeWidth="1.8"/>
      <rect x="29" y="49" width="22" height="7" rx="1.5" fill="none" stroke={G} strokeWidth="1.8"/>
    </>
  ),
  rack: (
    <>
      <rect x="6" y="30" width="68" height="20" rx="2" fill="#fff" stroke={N} strokeWidth="2.5"/>
      <rect x="6" y="30" width="6" height="20" fill={N}/>
      <rect x="68" y="30" width="6" height="20" fill={N}/>
      <circle cx="9" cy="34" r="1.1" fill={A}/><circle cx="9" cy="46" r="1.1" fill={A}/>
      {[16,24,32,40,48,56].map(x=>(<rect key={x} x={x} y="36" width="6" height="8" rx="1" fill={G}/>))}
    </>
  ),
  pole: (
    <>
      <rect x="36" y="8" width="8" height="64" rx="2" fill={G}/>
      <rect x="20" y="26" width="24" height="30" rx="3" fill="#fff" stroke={N} strokeWidth="2.5"/>
      <rect x="20" y="26" width="24" height="7" rx="3" fill={N}/>
      <circle cx="25" cy="29.5" r="1.3" fill={A}/>
      <rect x="24" y="38" width="16" height="6" rx="1" fill={G}/>
      <rect x="24" y="47" width="16" height="5" rx="1" fill="none" stroke={A} strokeWidth="1.6"/>
    </>
  ),
  cpe: (
    <>
      <rect x="26" y="20" width="28" height="40" rx="4" fill="#fff" stroke={N} strokeWidth="2.5"/>
      <rect x="26" y="20" width="28" height="7" rx="4" fill={N}/>
      <circle cx="32" cy="23.5" r="1.3" fill={A}/>
      <rect x="33" y="34" width="14" height="6" rx="1" fill={G}/>
      <rect x="33" y="44" width="14" height="6" rx="1" fill="none" stroke={A} strokeWidth="1.6"/>
    </>
  ),
  chassis: (
    <>
      <rect x="8" y="20" width="64" height="40" rx="2" fill="#fff" stroke={N} strokeWidth="2.5"/>
      <rect x="8" y="20" width="64" height="6" fill={N}/>
      {[14,25,36,47,58].map(x=>(<rect key={x} x={x} y="30" width="8" height="24" rx="1" fill="none" stroke={G} strokeWidth="1.6"/>))}
    </>
  ),
  card: (
    <>
      <rect x="14" y="22" width="52" height="36" rx="2" fill="#fff" stroke={N} strokeWidth="2.5"/>
      <rect x="14" y="22" width="6" height="36" fill={N}/>
      <rect x="26" y="30" width="32" height="6" rx="1" fill={G}/>
      <rect x="26" y="40" width="20" height="6" rx="1" fill="none" stroke={A} strokeWidth="1.6"/>
    </>
  ),
  psu: (
    <>
      <rect x="18" y="26" width="44" height="28" rx="3" fill="#fff" stroke={N} strokeWidth="2.5"/>
      <path d="M42 30 l-8 12 h6 l-3 8 10-13 h-6 z" fill={A}/>
    </>
  ),
  sfp: (
    <>
      <rect x="16" y="30" width="40" height="20" rx="2" fill="#fff" stroke={N} strokeWidth="2.5"/>
      <rect x="56" y="34" width="10" height="12" rx="1" fill={G}/>
      <circle cx="24" cy="40" r="2" fill={A}/>
    </>
  ),
  cable: (
    <>
      <path d="M18 26 q20 0 20 14 t20 14" fill="none" stroke={N} strokeWidth="3" strokeLinecap="round"/>
      <rect x="12" y="22" width="10" height="9" rx="1.5" fill={G}/>
      <rect x="54" y="49" width="10" height="9" rx="1.5" fill={A}/>
    </>
  ),
  mount: (
    <>
      <rect x="24" y="16" width="8" height="48" rx="1" fill={G}/>
      <rect x="24" y="16" width="34" height="8" rx="1" fill={N}/>
      <rect x="24" y="52" width="34" height="8" rx="1" fill={N}/>
      <circle cx="28" cy="20" r="1.6" fill="#fff"/><circle cx="28" cy="56" r="1.6" fill="#fff"/>
    </>
  ),
  kit: (
    <>
      <rect x="20" y="24" width="40" height="34" rx="3" fill="#fff" stroke={N} strokeWidth="2.5"/>
      <path d="M20 34 h40" stroke={N} strokeWidth="2"/>
      <rect x="34" y="24" width="12" height="6" rx="1" fill={A}/>
    </>
  ),
  fan: (
    <>
      <circle cx="40" cy="40" r="18" fill="#fff" stroke={N} strokeWidth="2.5"/>
      <g fill={G}>
        <path d="M40 40 q6-14 12-8 q-2 8-12 8"/>
        <path d="M40 40 q14 6 8 12 q-8-2-8-12"/>
        <path d="M40 40 q-6 14-12 8 q2-8 12-8"/>
        <path d="M40 40 q-14-6-8-12 q8 2 8 12"/>
      </g>
      <circle cx="40" cy="40" r="3.5" fill={A}/>
    </>
  ),
  placement: (
    <>
      <path d="M40 14 l22 16 v30 h-44 v-30 z" fill="#fff" stroke={N} strokeWidth="2.5" strokeLinejoin="round"/>
      <rect x="34" y="44" width="12" height="16" fill={A}/>
    </>
  ),
};

export default function Icon({ name = "node", size = 56, style }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={style}
         role="img" aria-hidden="true">
      {paths[name] || paths.node}
    </svg>
  );
}
