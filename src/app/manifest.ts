import type { MetadataRoute } from "next";

// Lets phones add the site to the home screen with the SA icon.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Samuel Adefila | Web Developer & Framer Designer",
    short_name: "Samuel Adefila",
    start_url: "/",
    display: "browser",
    background_color: "#f7f7f7",
    theme_color: "#0f0f0f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
