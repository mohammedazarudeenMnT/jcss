export interface NewsletterSection {
  _id?: string;
  title: string;
  content: string;
}

export interface Newsletter {
  id: string;
  _id?: string;
  title: string;
  slug: string;
  month: string;
  year: number;
  description: string;
  sections: NewsletterSection[];
  publishedAt: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface CreateNewsletterInput {
  title: string;
  month: string;
  year: number;
  description: string;
  sections: NewsletterSection[];
}

export interface UpdateNewsletterInput extends Partial<CreateNewsletterInput> {
  status?: "draft" | "published";
}
