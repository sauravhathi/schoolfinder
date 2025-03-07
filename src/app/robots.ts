import type { MetadataRoute } from "next"
import { base } from "./sitemap"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: base + "/sitemap.xml",
  }
}