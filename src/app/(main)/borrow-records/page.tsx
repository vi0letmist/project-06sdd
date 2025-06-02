"use client";
import { useRef, useState, useEffect } from "react";
import { useBookStore } from "@/store/book";
import { formatYearOnly } from "@/lib/formatDate";
import Button from "@/components/common/Button";
import CardBook from "@/components/card/CardBook";

const BorrowRecords = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const bookStore = useBookStore();
  const bookList = bookStore.bookList;

  const currentBorrowedRef = useRef<HTMLDivElement>(null!);
  const lastBorrowedRef = useRef<HTMLDivElement>(null!);

  // State for each section
  const [currentStart, setCurrentStart] = useState(true);
  const [currentEnd, setCurrentEnd] = useState(false);
  const [lastStart, setLastStart] = useState(true);
  const [lastEnd, setLastEnd] = useState(false);

  const scrollAmount = 500;

  const updateScrollButtons = (
    sliderRef: React.RefObject<HTMLDivElement>,
    setStart: (val: boolean) => void,
    setEnd: (val: boolean) => void
  ) => {
    if (!sliderRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

    setStart(scrollLeft <= 0);
    setEnd(scrollLeft + clientWidth >= scrollWidth - 1);
  };

  const scrollLeft = (
    sliderRef: React.RefObject<HTMLDivElement>,
    setStart: (val: boolean) => void,
    setEnd: (val: boolean) => void
  ) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    setTimeout(() => updateScrollButtons(sliderRef, setStart, setEnd), 300);
  };

  const scrollRight = (
    sliderRef: React.RefObject<HTMLDivElement>,
    setStart: (val: boolean) => void,
    setEnd: (val: boolean) => void
  ) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(() => updateScrollButtons(sliderRef, setStart, setEnd), 300);
  };

  const getBookList = () => {
    const params = {
      page: 1,
      limit: 5,
      title: "",
    };
    bookStore.getBookList(params);
  };

  useEffect(() => {
    getBookList();

    const handleScroll = (
      sliderRef: React.RefObject<HTMLDivElement>,
      setStart: (val: boolean) => void,
      setEnd: (val: boolean) => void
    ) => {
      return () =>
        requestAnimationFrame(() =>
          updateScrollButtons(sliderRef, setStart, setEnd)
        );
    };

    if (currentBorrowedRef.current) {
      currentBorrowedRef.current.addEventListener(
        "scroll",
        handleScroll(currentBorrowedRef, setCurrentStart, setCurrentEnd)
      );
      updateScrollButtons(currentBorrowedRef, setCurrentStart, setCurrentEnd);
    }

    if (lastBorrowedRef.current) {
      lastBorrowedRef.current.addEventListener(
        "scroll",
        handleScroll(lastBorrowedRef, setLastStart, setLastEnd)
      );
      updateScrollButtons(lastBorrowedRef, setLastStart, setLastEnd);
    }

    return () => {
      currentBorrowedRef.current?.removeEventListener(
        "scroll",
        handleScroll(currentBorrowedRef, setCurrentStart, setCurrentEnd)
      );
      lastBorrowedRef.current?.removeEventListener(
        "scroll",
        handleScroll(lastBorrowedRef, setLastStart, setLastEnd)
      );
    };
  }, []);
  return (
    <div>
      {/* section current borrowed books */}
      <section>
        <h1 className="text-xl font-bold py-2">Current Borrowed Books</h1>
        <div className="relative w-full">
          {!currentStart && (
            <Button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full shadow-lg"
              icon="ArrowLeftIcon"
              color="opacity10"
              onClick={() =>
                scrollLeft(currentBorrowedRef, setCurrentStart, setCurrentEnd)
              }
            />
          )}

          <div
            ref={currentBorrowedRef}
            className="flex overflow-x-auto overflow-y-hidden gap-4 py-4 items-center scroll-smooth scrollbar-hide"
          >
            {bookList?.map((book, index) => (
              <div
                key={index}
                className="relative max-w-[250px] min-w-[250px] md:max-w-[500px] md:min-w-[500px] p-4 rounded-lg 
                md:h-56 overflow-hidden rounded-xl"
              >
                <CardBook
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  year={formatYearOnly(book.published_date)}
                  genre={book.genres?.[0]}
                  imageSrc={BASE_URL + book.cover}
                />
              </div>
            ))}
          </div>

          {!currentEnd && (
            <Button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full shadow-lg"
              icon="ArrowRightIcon"
              color="opacity10"
              onClick={() =>
                scrollRight(currentBorrowedRef, setCurrentStart, setCurrentEnd)
              }
            />
          )}
        </div>
      </section>

      {/* section last borrowed books */}
      <section className="py-4">
        <h1 className="text-xl font-bold py-2">Last Borrowed Books</h1>
        <div className="relative w-full">
          {!lastStart && (
            <Button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full shadow-lg"
              icon="ArrowLeftIcon"
              color="opacity10"
              onClick={() =>
                scrollLeft(lastBorrowedRef, setLastStart, setLastEnd)
              }
            />
          )}

          <div
            ref={lastBorrowedRef}
            className="flex overflow-x-auto overflow-y-hidden gap-4 py-4 items-center scroll-smooth scrollbar-hide"
          >
            {bookList?.map((book, index) => (
              <div
                key={index}
                className="relative max-w-[250px] min-w-[250px] md:max-w-[500px] md:min-w-[500px] p-4 rounded-lg 
                md:h-56 overflow-hidden rounded-xl"
              >
                <CardBook
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  year={formatYearOnly(book.published_date)}
                  genre={book.genres?.[0]}
                  imageSrc={BASE_URL + book.cover}
                />
              </div>
            ))}
          </div>

          {!lastEnd && (
            <Button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full shadow-lg"
              icon="ArrowRightIcon"
              color="opacity10"
              onClick={() =>
                scrollRight(lastBorrowedRef, setLastStart, setLastEnd)
              }
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default BorrowRecords;
