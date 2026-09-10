import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adefila Samuel — Framer Developer & UI/UX Designer",
  description:
    "Convert more visitors into clients with custom Framer websites. Trusted by 50+ founders.",
  openGraph: {
    title: "Adefila Samuel — Framer Developer & UI/UX Designer",
    description: "Convert more visitors into clients with custom Framer websites.",
    type: "website",
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
