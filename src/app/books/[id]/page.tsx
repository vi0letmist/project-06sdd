// This is a Server Component (it can be async)
import BookDetail from "./BookDetail";

interface BookPageProps {
  params: { id: string };
}

export default async function BookDetailPage({ params }: BookPageProps) {
  return <BookDetail id={params.id} />;
}
