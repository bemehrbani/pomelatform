import { providers } from "@/lib/mock-data";
import BookClient from "@/components/BookClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return providers.map(p => ({ id: p.id }));
}

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const provider = providers.find(p => p.id === id);
  if (!provider) notFound();

  return <BookClient provider={provider} id={id} />;
}
