import { MetadataRoute } from "next";
import { getNewsletters } from "@/lib/api/newsletter";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://jcss.in";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: appUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${appUrl}/newsletters`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic routes (Newsletters)
  let newsletterRoutes: MetadataRoute.Sitemap = [];
  try {
    // Fetch a large enough limit to cover all for sitemap
    // Or iterate if needed, but 1000 is likely plenty for now
    const response = await getNewsletters("published", 1, 1000);
    newsletterRoutes = response.data.map((newsletter) => ({
      url: `${appUrl}/newsletters/${newsletter.slug}`,
      lastModified: new Date(newsletter.updatedAt || newsletter.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Failed to generate sitemap for newsletters:", error);
  }

  return [...staticRoutes, ...newsletterRoutes];
}
