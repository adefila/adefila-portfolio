// Sends enquiries and page views to Lead Finder (leads.adefilasamuel.com), which turns them into
// leads. Server to server, so ad blockers can't stop it. Never throws: the site must keep working
// if Lead Finder is down.
const LEAD_FINDER_URL = (process.env.LEAD_FINDER_URL ?? "https://leads.adefilasamuel.com").replace(/\/+$/, "");

export async function sendToLeadFinder(path: "/api/capture" | "/api/visit", body: Record<string, unknown>): Promise<void> {
  const key = process.env.LEAD_FINDER_KEY;
  if (!key) return;
  try {
    const res = await fetch(`${LEAD_FINDER_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-capture-key": key },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(path === "/api/capture" ? 20000 : 8000),
    });
    if (!res.ok) console.warn(`[lead-finder] ${path}: HTTP ${res.status}`);
  } catch (err) {
    console.warn(`[lead-finder] ${path}:`, (err as Error).message);
  }
}
