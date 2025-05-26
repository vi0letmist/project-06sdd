interface Book {
  id: string;
  cover: string;
  title: string;
  author: string;
  isbn: string;
  published_date: string;
  publisher: string;
  pages: number;
  description: string | null;
  language: string;
  available_copies: number;
  genres: string[];
}
