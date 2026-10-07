import type { MetadataRoute } from "next";

// Next serves this at /manifest.webmanifest and auto-injects the
// <link rel="manifest"> tag — making the app installable on desktop & mobile.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trella Marketing Consultant",
    short_name: "Trella",
    description:
      "Brand strategy, social media management, paid advertising, content, web and analytics that move the needle for Caribbean businesses.",
    start_url: "/?utm_source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#16019A",
    lang: "en",
    categories: ["business", "productivity", "marketing"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
