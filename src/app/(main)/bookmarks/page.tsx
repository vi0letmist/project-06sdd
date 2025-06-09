"use client";
import { useEffect } from "react";
import { useBookStore } from "@/store/book";

import CardBookWithDesc from "@/components/card/CardBookWithDesc";

const Bookmarks = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const bookStore = useBookStore();
  const bookList = bookStore.bookList;

  const getBookList = () => {
    const params = {
      page: 1,
      limit: 6,
      title: "",
    };
    bookStore.getBookList(params);
  };

  useEffect(() => {
    getBookList();
  }, []);
  return (
    <div>
      {/* section bookmarks */}
      <section>
        <h1 className="text-xl font-bold py-2">Bookmarks</h1>
        <div className="grid grid-cols-3 flex flex-col gap-4">
          {bookList?.map((book, index) => (
            <div
              key={index}
              className="col-span-3 lg:col-span-1 px-2 py-4 relative"
            >
              <CardBookWithDesc
                id={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                imageSrc={BASE_URL + book.cover}
                lineClamp={2}
                size="sm"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Bookmarks;
