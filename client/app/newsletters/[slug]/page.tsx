import { Metadata, ResolvingMetadata } from "next";
import NewsletterDetail from "@/components/Newsletters/NewsletterDetail";
import Header from "@/components/Header/Header";
import { getNewsletterBySlug } from "@/lib/api/newsletter";
import ScrollablePageProvider from "@/components/ScrollablePageProvider";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const newsletter = await getNewsletterBySlug(slug);
    const title = `${newsletter.title} | JCSS Newsletters`;
    const description =
      newsletter.description.replace(/<[^>]*>/g, "").slice(0, 160) + "...";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: newsletter.publishedAt || newsletter.createdAt,
      },
    };
  } catch (error) {
    return {
      title: "Newsletter | JCSS",
    };
  }
}

export default async function NewsletterDetailPage({ params }: Props) {
  const { slug } = await params;
  let newsletter = null;

  try {
    newsletter = await getNewsletterBySlug(slug);
  } catch (error) {
    console.error("Failed to fetch newsletter for page:", error);
  }

  // Structured Data (JSON-LD)
  const jsonLd = newsletter
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: newsletter.title,
        description: newsletter.description.replace(/<[^>]*>/g, ""),
        datePublished: newsletter.publishedAt || newsletter.createdAt,
        dateModified: newsletter.updatedAt || newsletter.createdAt,
        author: {
          "@type": "Organization",
          name: "JCSS",
        },
      }
    : null;

  return (
    <ScrollablePageProvider>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Header />
      <NewsletterDetail slug={slug} initialData={newsletter ?? undefined} />
    </ScrollablePageProvider>
  );
}
