import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Samuel Adefila — Framer Developer & UI/UX Designer | Websites That Convert",
  description:
    "Top Rated Framer developer with 100% Job Success on Upwork. 50+ custom websites built for founders and agencies worldwide. Your site should win clients — book a free call.",
  keywords: [
    "Framer developer",
    "UI/UX designer",
    "Framer website",
    "Figma to Framer",
    "custom website design",
    "conversion-focused web design",
    "Upwork Top Rated",
    "Samuel Adefila",
  ],
  openGraph: {
    title: "Samuel Adefila — Framer Developer & UI/UX Designer",
    description:
      "50+ custom Framer websites delivered for founders and agencies. Top Rated on Upwork with 100% Job Success. Book a free strategy call.",
    type: "website",
    url: "https://adefilasamuel.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Adefila — Framer Developer & UI/UX Designer",
    description:
      "50+ conversion-focused Framer websites. Top Rated on Upwork. Book a free call.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
