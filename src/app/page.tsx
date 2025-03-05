"use client";
import { useRef, useState, useEffect } from "react";
import { useSidebar } from "@/context/SidebarContext";
import Button from "@/components/common/Button";
import CardBook from "@/components/card/CardBook";
import CardBookCollection from "@/components/card/CardBookCollection";
import CardBookMustRead from "@/components/card/CardBookMustRead";

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

const Home = () => {
  const { isSidebarOpen } = useSidebar();
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
        <div className="grid grid-cols-4 gap-4 py-4">
          <div className="col-span-4 md:col-span-3">
            <h1 className="text-xl font-bold py-4">New Collections</h1>
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
              {collectionList.map((book, index) => (
                <div
                  key={index}
                  className={`${isSidebarOpen ? "col-span-4" : "col-span-2"} md:col-span-1 flex flex-col items-center p-2`}
                >
                  <CardBookCollection
                    className="w-full break-all"
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    imageSrc={book.imageSrc}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 md:col-span-1 bg-rose-600 p-4 h-full rounded-lg text-white">
            <h1 className="text-xl font-bold">Must-Read Selections</h1>

            {collectionList.slice(0, 3).map((book, index) => (
              <CardBookMustRead
                key={index}
                id={book.id}
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
