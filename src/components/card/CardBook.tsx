import React from "react";
import Image from "next/image";

interface BookProps {
  className?: string;
  title: string;
  author: string;
  year: string;
  genre: string;
  imageSrc: string;
}

const CardBook: React.FC<BookProps> = ({
  className,
  title,
  author,
  year,
  genre,
  imageSrc,
}) => {
  return (
    <div className={`${className}`}>
      <Image
        src={`/images/${imageSrc}`}
        alt="background blur"
        width={300}
        height={200}
        className="absolute bottom-0 left-0 w-full h-[70%] object-cover blur-sm"
      />

      <div className="absolute bottom-0 left-0 w-full h-[75%] bg-black bg-opacity-30 backdrop-blur-2xl rounded-xl"></div>
      <div className="grid grid-cols-3 min-h-full gap-2 px-4 text-white">
        <div className="col-span-1 flex items-end px-2 z-10">
          <Image
            src={`/images/${imageSrc}`}
            alt="book cover"
            width={150}
            height={200}
            className="rounded-lg shadow-lg shadow-gray-700"
          />
        </div>

        <div className="col-span-2 pt-[14%] flex flex-col justify-between h-full z-10">
          <div className="py-2">
            <h3 className="font-semibold text-xl min-h-[56px] flex items-center">
              {title}
            </h3>
            <span className="font-semibold text-xl">
              By <span className="text-sm font-normal">{author}</span>
            </span>
          </div>

          <div className="flex items-stretch pb-2">
            <p className="text-sm font-normal tracking-wider [word-spacing:2px]">
              {year} <span className="font-extrabold text-lg">•</span> {genre}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBook;
