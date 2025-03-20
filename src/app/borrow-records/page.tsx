"use client";
import { useRef, useState, useEffect } from "react";
import Button from "@/components/common/Button";
import CardBook from "@/components/card/CardBook";

const bookList = [
  {
    id: "1001",
    title: "Hujan Bulan Juni",
    author: "Sapardi Djoko Damono",
    year: "2021",
    genre: "Finction",
    imageSrc: "Hujan-Bulan-Juni-Sebuah-Novel.jpg",
  },
  {
    id: "1002",
    title: "A Song of Ice and Fire: A Game of Thrones",
    author: "George R. R. Martin",
    year: "1996",
    genre: "Finction",
    imageSrc: "GOThcEng.jpg",
  },
  {
    id: "1003",
    title: "1984",
    author: "George Orwell",
    year: "1949",
    genre: "Finction",
    imageSrc: "1984 - george orwell2.jpg",
  },
  {
    id: "1004",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: "1951",
    genre: "Finction",
    imageSrc: "the catcher in the rye - jd salinger.jpg",
  },
];

const collectionList = [
  {
    id: "1003",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian fiction",
    imageSrc: "1984 - george orwell2.jpg",
  },
  {
    id: "1006",
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian Fiction",
    imageSrc: "brave-new-world_aldous-huxley.jpg",
  },
  {
    id: "1007",
    title: "Fahrenhait 451",
    author: "Ray Bradbury",
    genre: "Dystopian Fiction",
    imageSrc: "fahrenhait-451_ray-bradburry.jpg",
  },
  {
    id: "1008",
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    imageSrc: "animal-farm_george orwell.jpg",
  },
  {
    id: "1009",
    title: "The Road",
    author: "Cormac McCarthy",
    genre: "Post-apocalyptic fiction",
    imageSrc: "the-road_cormac-mcCarthy.jpg",
  },
];

const BorrowRecords = () => {
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

  useEffect(() => {
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
            {bookList.map((book, index) => (
              <div
                key={index}
                className="relative max-w-[250px] min-w-[250px] md:max-w-[500px] md:min-w-[500px] p-4 rounded-lg 
                md:h-56 overflow-hidden rounded-xl"
              >
                <CardBook
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  year={book.year}
                  genre={book.genre}
                  imageSrc={book.imageSrc}
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
            {bookList.map((book, index) => (
              <div
                key={index}
                className="relative max-w-[250px] min-w-[250px] md:max-w-[500px] md:min-w-[500px] p-4 rounded-lg 
                md:h-56 overflow-hidden rounded-xl"
              >
                <CardBook
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  year={book.year}
                  genre={book.genre}
                  imageSrc={book.imageSrc}
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
