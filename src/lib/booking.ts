// The one place the booking page address lives. Every "Book a call" button links here,
// and BookingPopup.tsx opens it in the site's own window.
export const BOOKING_URL = "https://cal.com/adefila-samuel-adeyemi-rmpfei/30min";

export const BOOKING_HOST = "cal.com";

// True for any link to the booking page, whatever its path or query.
export function isBookingHref(href: string): boolean {
  try {
    const host = new URL(href, "https://adefilasamuel.com").hostname;
    return host === BOOKING_HOST || host.endsWith(`.${BOOKING_HOST}`);
  } catch {
    return false;
  }
}
