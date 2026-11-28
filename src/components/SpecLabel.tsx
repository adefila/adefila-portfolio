// The small label above a section heading ("WORK", "INVESTMENT", "F.A.Q"). Section labels are switched off site-wide: every section
// opens straight on its heading. The component stays so each call site is unchanged and the labels can come back from here.
export default function SpecLabel({ text }: { text: string }) {
  void text;
  return null;
}
