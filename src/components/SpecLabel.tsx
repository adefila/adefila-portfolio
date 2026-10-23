// A numbered section label in the spec-sheet style: "01 / WORK ────────".
// The number is a CSS counter (see .spec-label in globals.css), so every page counts 01, 02, 03 in the order its
// sections appear, whichever sections that page uses.
export default function SpecLabel({ text }: { text: string }) {
  return (
    <p className="spec-label" data-reveal>
      <b aria-hidden="true" />
      <span aria-hidden="true">/</span>
      <span>{text}</span>
      <i aria-hidden="true" />
    </p>
  );
}
