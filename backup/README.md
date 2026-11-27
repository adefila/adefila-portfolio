# Backup: case study pages

The per-project case study pages (`/case-studies/[slug]`) were taken off the site. The page is saved here as `case-studies/[slug]/page.tsx.bak`.
The content is still in `src/lib/caseStudyData.ts` (it feeds the case studies on the personal page) and the page components are still in `src/components/case/`.

To bring the pages back: copy `page.tsx.bak` to `src/app/case-studies/[slug]/page.tsx`, add the paths to `src/app/sitemap.ts`, and remove the `/case-studies/:slug*` redirect in `next.config.ts`.
