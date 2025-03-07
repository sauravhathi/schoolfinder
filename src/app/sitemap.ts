import type { MetadataRoute } from "next"

export const base = process.env.NEXT_PUBLIC_URL as string

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes = [
        {
            url: base,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 1,
        },
        {
            url: `${base}/docs`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }
    ]

    return [...routes]
}