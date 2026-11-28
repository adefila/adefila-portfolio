Backup of the removed web.adefilasamuel.com /contact page (Nov 2026).
The page was replaced by a contact popup (src/components/ContactPopup.tsx) opened from the "Contact me" buttons.
To restore: copy page.tsx.bak back to src/app/business/contact/page.tsx, re-add the "/contact" rewrite in next.config.ts,
add it to src/app/business/sitemap.xml/route.ts and set Navbar contactHref="/contact" on the business page.
