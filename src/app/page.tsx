"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Button from "@/components/common/Button";
import CardBook from "@/components/card/CardBook";
import CardBookCollection from "@/components/card/CardBookCollection";
import CardBookMustRead from "@/components/card/CardBookMustRead";

const bookList = [
  {
    title: "Hujan Bulan Juni",
    author: "Sapardi Djoko Damono",
    year: "2021",
    genre: "Finction",
    imageSrc: "Hujan-Bulan-Juni-Sebuah-Novel.jpg",
  },
  {
    title: "A Song of Ice and Fire: A Game of Thrones",
    author: "George R. R. Martin",
    year: "1996",
    genre: "Finction",
    imageSrc: "GOThcEng.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    year: "1949",
    genre: "Finction",
    imageSrc: "1984 - george orwell2.jpg",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: "1951",
    genre: "Finction",
    imageSrc: "the catcher in the rye - jd salinger.jpg",
  },
];

const collectionList = [
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian fiction",
    imageSrc: "1984 - george orwell2.jpg",
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian Fiction",
    imageSrc: "brave-new-world_aldous-huxley.jpg",
  },
  {
    title: "Fahrenhait 451",
    author: "Ray Bradbury",
    genre: "Dystopian Fiction",
    imageSrc: "fahrenhait-451_ray-bradburry.jpg",
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    imageSrc: "animal-farm_george orwell.jpg",
  },
  {
    title: "The Road",
    author: "Cormac McCarthy",
    genre: "Post-apocalyptic fiction",
    imageSrc: "the-road_cormac-mcCarthy.jpg",
  },
];

const Home = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollAmount = 500;

  const updateScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      const isAtStart = scrollLeft <= 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;

      setIsAtStart(isAtStart);
      setIsAtEnd(isAtEnd);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300);
    }
  };

  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(updateScrollButtons);

    if (sliderRef.current) {
      sliderRef.current.addEventListener("scroll", handleScroll);
      updateScrollButtons();

      return () =>
        sliderRef.current?.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div>
      {/* section last borrowed books */}
      <section>
        <h1 className="text-xl font-bold py-2">Last Borrowed Books</h1>
        <div className="relative w-full">
          {!isAtStart && (
            <Button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full shadow-lg"
              icon="ArrowLeftIcon"
              color="opacity10"
              onClick={scrollLeft}
            />
          )}

          <div
            ref={sliderRef}
            className="flex overflow-x-auto overflow-y-hidden gap-4 py-4 items-center scroll-smooth scrollbar-hide"
          >
            {bookList.map((book, index) => (
              <div
                key={index}
                className="relative max-w-[500px] min-w-[500px] p-4 rounded-lg h-56 overflow-hidden rounded-xl"
              >
                <CardBook
                  title={book.title}
                  author={book.author}
                  year={book.year}
                  genre={book.genre}
                  imageSrc={book.imageSrc}
                />
              </div>
            ))}
          </div>

          {!isAtEnd && (
            <Button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black text-white p-2 rounded-full shadow-lg"
              icon="ArrowRightIcon"
              color="opacity10"
              onClick={scrollRight}
            />
          )}
        </div>
      </section>

      {/* section newcollections and must-read selections */}
      <section>
        <div className="grid grid-cols-4 gap-4 py-2">
          <div className="col-span-3">
            <h1 className="text-xl font-bold py-4">New Collections</h1>
            <div className="grid grid-cols-5 gap-4">
              {collectionList.map((book, index) => (
                <div
                  key={index}
                  className="col-span-1 flex flex-col items-center p-2"
                >
                  <CardBookCollection
                    className="w-full"
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    imageSrc={book.imageSrc}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 bg-rose-600 p-4 h-full rounded-lg text-white">
            <h1 className="text-xl font-bold">Must-Read Selections</h1>

            {collectionList.slice(0, 3).map((book, index) => (
              <CardBookMustRead
                key={index}
                title={book.title}
                author={book.author}
                imageSrc={book.imageSrc}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
