'use client';

import { useParams } from 'next/navigation';
import NewsletterDetail from '@/components/Newsletters/NewsletterDetail';
import Header from '@/components/Header/Header';

export default function NewsletterDetailPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <>
      <Header />
      <NewsletterDetail id={id} />
    </>
  );
}