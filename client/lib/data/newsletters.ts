import type { Newsletter, CreateNewsletterInput } from "@/lib/types/newsletter";

// In-memory database (replace with actual DB in production)
let newsletters: Newsletter[] = [
  {
    id: "1",
    title: "December 2025 Newsletter",
    slug: "december-2025",
    month: "December",
    year: 2025,
    description:
      "Our latest newsletter featuring company updates and insights.",
    sections: [
      {
        id: "sec-1",
        title: "HIGHLIGHTS",
        content: "Check out our latest achievements and milestones.",
      },
      {
        id: "sec-2",
        title: "UPDATES",
        content: "Stay informed with the latest company updates.",
      },
    ],
    publishedAt: new Date("2025-12-01").toISOString(),
    status: "published",
    createdAt: new Date("2025-11-15").toISOString(),
    updatedAt: new Date("2025-11-15").toISOString(),
  },
];

export const newsletterDb = {
  getAll: (): Newsletter[] => {
    return newsletters;
  },

  getById: (id: string): Newsletter | undefined => {
    return newsletters.find((n) => n.id === id);
  },

  create: (input: CreateNewsletterInput): Newsletter => {
    const id = Date.now().toString();
    const slug = input.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");

    const newsletter: Newsletter = {
      id,
      ...input,
      slug,
      publishedAt: new Date().toISOString(),
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    newsletters.push(newsletter);
    return newsletter;
  },

  update: (
    id: string,
    input: Partial<CreateNewsletterInput> & { status?: string },
  ): Newsletter | undefined => {
    const index = newsletters.findIndex((n) => n.id === id);
    if (index === -1) return undefined;

    const updated = {
      ...newsletters[index],
      ...input,
      updatedAt: new Date().toISOString(),
    };

    newsletters[index] = updated;
    return updated;
  },

  delete: (id: string): boolean => {
    const index = newsletters.findIndex((n) => n.id === id);
    if (index === -1) return false;

    newsletters.splice(index, 1);
    return true;
  },
};
