import BookDetail from "./BookDetail";

type Params = Promise<{ id: string }>;

export default async function BookDetailPage(props: { params: Params }) {
  const params = await props.params;
  const id = params.id;

  return <BookDetail id={id} />;
}
