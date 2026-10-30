// One small line drawing per stage of the DLP Africa project. They draw themselves in when their card is the
// active one (see .pv rules in globals.css). Colours: hairlines in the page ink, accents in the site purple,
// and the swatches use DLP Africa's own brand colours.
const PRODUCTS = ["Fish Africa", "Spider CRM", "Digital Receptionist", "Call Centre", "Konvo", "SIP Trunk", "Wabbit"];
const BRAND = ["#0a3cff", "#0a84ff", "#00e5c0", "#ffd400", "#ff9f0a", "#ff4757"];

function Kickoff() {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      <rect className="pv-draw" x="28" y="30" width="150" height="78" rx="4" />
      <path className="pv-draw" d="M56 108 L56 130 L84 108" />
      <path className="pv-line" d="M46 56 H154 M46 74 H132 M46 92 H108" style={{ ["--i" as string]: 0 }} />
      <rect className="pv-draw pv-accent" x="142" y="98" width="150" height="70" rx="4" />
      <path className="pv-draw pv-accent" d="M262 168 L262 186 L238 168" />
      <circle className="pv-pop pv-fill" cx="168" cy="133" r="9" style={{ ["--i" as string]: 3 }} />
      <path className="pv-line pv-accent" d="M190 124 H272 M190 142 H250" style={{ ["--i" as string]: 2 }} />
    </svg>
  );
}

function Design() {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      {BRAND.map((c, i) => (
        <circle key={c} className="pv-pop" cx={34 + i * 40} cy="40" r="15" fill={c} style={{ ["--i" as string]: i }} />
      ))}
      <text x="28" y="124" className="pv-type" style={{ fontSize: 56, fontWeight: 700 }}>Aa</text>
      <path className="pv-line" d="M112 90 H178 M112 106 H160 M112 122 H168" style={{ ["--i" as string]: 3 }} />
      <rect className="pv-draw" x="204" y="86" width="88" height="22" rx="2" />
      <rect className="pv-pop pv-fill pv-accent-fill" x="204" y="122" width="88" height="26" rx="2" style={{ ["--i" as string]: 5 }} />
      <rect className="pv-draw" x="28" y="154" width="264" height="30" rx="2" />
      <path className="pv-line" d="M44 169 H120 M200 169 H276" style={{ ["--i" as string]: 6 }} />
    </svg>
  );
}

function Cms() {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      {PRODUCTS.map((name, i) => (
        <g key={name} className="pv-row" style={{ ["--i" as string]: i }}>
          <rect x="24" y={12 + i * 25} width="272" height="21" rx="2" className="pv-box" />
          <text x="36" y={27 + i * 25} className="pv-type" style={{ fontSize: 11 }}>{name}</text>
          <circle cx="278" cy={22.5 + i * 25} r="3.5" className="pv-fill pv-accent-fill" />
        </g>
      ))}
    </svg>
  );
}

function Forms() {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      <rect className="pv-draw" x="24" y="24" width="150" height="152" rx="4" />
      <path className="pv-line" d="M40 52 H158 M40 80 H158 M40 108 H158" style={{ ["--i" as string]: 1 }} />
      <rect className="pv-pop pv-fill pv-accent-fill" x="40" y="130" width="70" height="26" rx="2" style={{ ["--i" as string]: 3 }} />
      <path className="pv-draw pv-accent" d="M178 100 H214" />
      <rect className="pv-draw" x="214" y="40" width="82" height="120" rx="4" />
      <text x="226" y="62" className="pv-type" style={{ fontSize: 11 }}>GA4</text>
      <rect className="pv-bar" x="228" y="132" width="12" height="16" style={{ ["--i" as string]: 0 }} />
      <rect className="pv-bar" x="246" y="116" width="12" height="32" style={{ ["--i" as string]: 1 }} />
      <rect className="pv-bar" x="264" y="96" width="12" height="52" style={{ ["--i" as string]: 2 }} />
    </svg>
  );
}

function Qa() {
  const tick = (x: number, y: number, i: number) => (
    <path className="pv-draw pv-accent" d={`M${x} ${y} l7 7 l13 -15`} style={{ ["--i" as string]: i }} />
  );
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      <rect className="pv-draw" x="20" y="40" width="140" height="92" rx="4" />
      <path className="pv-draw" d="M10 140 H170" />
      {tick(78, 80, 1)}
      <rect className="pv-draw" x="178" y="58" width="68" height="92" rx="6" />
      {tick(202, 94, 2)}
      <rect className="pv-draw" x="258" y="76" width="42" height="84" rx="7" />
      {tick(268, 110, 3)}
    </svg>
  );
}

function Redirects() {
  const rows = ["/old-page", "/old-product", "/old-contact"];
  const next = ["/new-page", "/new-product", "/new-contact"];
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      {rows.map((r, i) => (
        <g key={r} className="pv-row" style={{ ["--i" as string]: i }}>
          <rect x="20" y={30 + i * 50} width="108" height="30" rx="2" className="pv-box" />
          <text x="32" y={50 + i * 50} className="pv-type" style={{ fontSize: 11 }}>{r}</text>
          <path d={`M136 ${45 + i * 50} H184 m-8 -6 l8 6 l-8 6`} className="pv-accent-stroke" fill="none" />
          <rect x="192" y={30 + i * 50} width="108" height="30" rx="2" className="pv-box pv-box-on" />
          <text x="204" y={50 + i * 50} className="pv-type" style={{ fontSize: 11 }}>{next[i]}</text>
        </g>
      ))}
    </svg>
  );
}

function Handover() {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      <rect className="pv-draw" x="24" y="30" width="170" height="108" rx="4" />
      <path className="pv-pop pv-fill pv-accent-fill" d="M92 66 L92 102 L122 84 Z" style={{ ["--i" as string]: 2 }} />
      <path className="pv-draw" d="M24 154 H194" />
      <path className="pv-line pv-accent" d="M24 154 H120" style={{ ["--i" as string]: 3 }} />
      <rect className="pv-draw" x="214" y="30" width="82" height="130" rx="4" />
      <path className="pv-line" d="M228 56 H282 M228 74 H282 M228 92 H264 M228 110 H282 M228 128 H250" style={{ ["--i" as string]: 4 }} />
    </svg>
  );
}

const VISUALS = [Kickoff, Design, Cms, Forms, Qa, Redirects, Handover];
export default function ProcessVisual({ index }: { index: number }) {
  const V = VISUALS[index] ?? Kickoff;
  return <V />;
}
