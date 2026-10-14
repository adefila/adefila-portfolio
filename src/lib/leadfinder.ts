// Sends enquiries and page views to Lead Finder (leads.adefilasamuel.com), which turns them into
// leads. Server to server, so ad blockers can't stop it. Never throws: the site must keep working
// if Lead Finder is down.
const LEAD_FINDER_URL = (process.env.LEAD_FINDER_URL ?? "https://leads.adefilasamuel.com").replace(/\/+$/, "");

export async function sendToLeadFinder(path: "/api/capture" | "/api/visit", body: Record<string, unknown>): Promise<void> {
  const key = process.env.LEAD_FINDER_KEY;
  if (!key) { console.warn(`[lead-finder] ${path}: LEAD_FINDER_KEY is not set, nothing sent`); return; }
  try {
    const res = await fetch(`${LEAD_FINDER_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-capture-key": key },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(path === "/api/capture" ? 20000 : 8000),
    });
    if (!res.ok) console.warn(`[lead-finder] ${path}: HTTP ${res.status}`);
    else if (path === "/api/capture") console.log("[lead-finder] enquiry sent");
  } catch (err) {
    console.warn(`[lead-finder] ${path}:`, (err as Error).message);
  }
}

// For /api/visit?check=1: is the key set, and does Lead Finder accept it? Never reveals the key.
export async function checkLeadFinder(): Promise<Record<string, unknown>> {
  const key = process.env.LEAD_FINDER_KEY;
  if (!key) return { keyConfigured: false };
  try {
    const res = await fetch(`${LEAD_FINDER_URL}/api/capture`, { headers: { "x-capture-key": key }, signal: AbortSignal.timeout(8000) });
    const body = await res.json().catch(() => null);
    return { keyConfigured: true, leadFinderUrl: LEAD_FINDER_URL, status: res.status, ...(body && typeof body === "object" ? body : {}) };
  } catch (err) {
    return { keyConfigured: true, leadFinderUrl: LEAD_FINDER_URL, error: (err as Error).message };
  }
}
