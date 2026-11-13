// One small line drawing per stage of the Baton case study. Same drawing classes as the DLP Africa ones (.pv rules in
// globals.css): they draw themselves in when their card is the active one. The swatches are Baton's own colours.
const SWATCH = ["#12110f", "#ff3d12", "#f3f0e9", "#ffb224"];
const STACKS = ["WordPress", "Shopify", "Webflow", "Next.js"];

function Problem() {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      <rect className="pv-draw" x="24" y="28" width="176" height="118" rx="4" />
      <path className="pv-line" d="M40 54 H168 M40 74 H148 M40 94 H160" style={{ ["--i" as string]: 1 }} />
      <rect className="pv-draw pv-accent" x="226" y="86" width="56" height="44" rx="5" />
      <path className="pv-draw pv-accent" d="M238 86 V74 a16 16 0 0 1 32 0 V86" />
      <circle className="pv-pop pv-fill pv-accent-fill" cx="254" cy="106" r="5" style={{ ["--i" as string]: 3 }} />
      <path className="pv-line" d="M200 108 H222" style={{ ["--i" as string]: 2 }} />
    </svg>
  );
}

function Brand() {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      {SWATCH.map((c, i) => (
        <circle key={c} className="pv-pop" cx={34 + i * 40} cy="40" r="15" fill={c} stroke="rgba(128,128,128,0.45)" strokeWidth="1" style={{ ["--i" as string]: i }} />
      ))}
      <rect className="pv-draw" x="40" y="86" width="12" height="70" rx="6" />
      <circle className="pv-pop pv-fill pv-accent-fill" cx="86" cy="130" r="26" style={{ ["--i" as string]: 4 }} />
      <text x="128" y="150" className="pv-type" style={{ fontSize: 60, fontWeight: 800 }}>aton</text>
    </svg>
  );
}

function Detect() {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      <rect className="pv-draw" x="24" y="20" width="272" height="28" rx="14" />
      <path className="pv-line" d="M44 34 H150" style={{ ["--i" as string]: 1 }} />
      {STACKS.map((name, i) => (
        <g key={name} className="pv-row" style={{ ["--i" as string]: i + 1 }}>
          <rect x="24" y={64 + i * 31} width="272" height="25" rx="2" className={i === 3 ? "pv-box pv-box-on" : "pv-box"} />
          <text x="36" y={80 + i * 31} className="pv-type" style={{ fontSize: 11 }}>{name}</text>
          {i === 3 && <path className="pv-accent-stroke" fill="none" d="M270 76 l6 6 l12 -13" />}
        </g>
      ))}
    </svg>
  );
}

function Editor() {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      <rect className="pv-draw" x="20" y="26" width="196" height="132" rx="4" />
      <path className="pv-line" d="M36 52 H96 M36 118 H150 M36 134 H128" style={{ ["--i" as string]: 1 }} />
      <rect className="pv-draw pv-accent" x="32" y="70" width="140" height="30" rx="2" />
      <path className="pv-line pv-accent" d="M44 85 H150" style={{ ["--i" as string]: 3 }} />
      <rect className="pv-draw" x="228" y="26" width="76" height="132" rx="4" />
      <path className="pv-line" d="M240 48 H292 M240 66 H280" style={{ ["--i" as string]: 4 }} />
      <rect className="pv-pop pv-fill pv-accent-fill" x="240" y="130" width="52" height="16" rx="3" style={{ ["--i" as string]: 5 }} />
    </svg>
  );
}

function Versions() {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      <path className="pv-draw" d="M30 100 H290" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle className={i === 3 ? "pv-pop pv-fill pv-accent-fill" : "pv-pop pv-fill"} cx={50 + i * 66} cy="100" r="9" style={{ ["--i" as string]: i }} />
          <text x={42 + i * 66} y="132" className="pv-type" style={{ fontSize: 11 }}>{`v${i + 2}`}</text>
        </g>
      ))}
      <path className="pv-draw pv-accent" d="M248 78 C 220 38, 150 38, 120 78 m0 0 l2 -12 m-2 12 l12 -2" />
    </svg>
  );
}

function Roles() {
  const people = [{ x: 60, label: "Owner" }, { x: 160, label: "Developer" }, { x: 260, label: "Editor" }];
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      {people.map((p, i) => (
        <g key={p.label} className="pv-row" style={{ ["--i" as string]: i }}>
          <circle cx={p.x} cy="64" r="16" className={i === 0 ? "pv-box pv-box-on" : "pv-box"} />
          <path className="pv-draw" d={`M${p.x - 26} 122 a26 26 0 0 1 52 0`} />
          <text x={p.x - 24} y="150" className="pv-type" style={{ fontSize: 11 }}>{p.label}</text>
        </g>
      ))}
      <path className="pv-draw pv-accent" d="M84 64 H140 m-8 -6 l8 6 l-8 6" />
    </svg>
  );
}

function Secure() {
  return (
    <svg viewBox="0 0 320 200" aria-hidden="true" className="pv">
      <path className="pv-draw" d="M70 28 L120 46 V96 C120 128 98 148 70 160 C42 148 20 128 20 96 V46 Z" transform="translate(10 0)" />
      <path className="pv-draw pv-accent" d="M56 98 l16 16 l30 -34" transform="translate(10 0)" style={{ ["--i" as string]: 2 }} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="pv-row" style={{ ["--i" as string]: i + 1 }}>
          <circle cx="186" cy={44 + i * 36} r="9" className={i === 3 ? "pv-box pv-box-on" : "pv-box"} />
          <text x="183" y={48 + i * 36} className="pv-type" style={{ fontSize: 10 }}>{i + 1}</text>
          <path className="pv-line" d={`M208 ${44 + i * 36} H${270 - (i % 2) * 24}`} style={{ ["--i" as string]: i + 2 }} />
        </g>
      ))}
    </svg>
  );
}

export const BATON_VISUALS = [Problem, Brand, Detect, Editor, Versions, Roles, Secure];
