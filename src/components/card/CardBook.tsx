"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

interface BookProps {
  className?: string;
  id: string;
  title: string;
  author: string;
  year: string;
  genre: string;
  imageSrc: string;
}

const CardBook: React.FC<BookProps> = ({
  className,
  id,
  title,
  author,
  year,
  genre,
  imageSrc,
}) => {
  const router = useRouter();

  const toDetail = () => {
    router.push(`/books/${id}`);
  };

  return (
    <div className={`cursor-pointer ${className}`} onClick={toDetail}>
      <Image
        src={`/images/${imageSrc}`}
        alt="background blur"
        width={300}
        height={200}
        className="absolute bottom-0 left-0 w-full h-[70%] object-cover blur-sm py-2"
      />

      <div className="absolute bottom-0 left-0 w-full h-[75%] bg-black bg-opacity-30 backdrop-blur-2xl rounded-xl py-2"></div>
      <div
        className="grid grid-cols-3 min-h-full gap-2 px-4 text-white transition-transform duration-300 ease-in-out
      hover:translate-y-[-10px] will-change-transform"
      >
        <div className="col-span-3 md:col-span-1 flex items-end justify-center px-2 z-10">
          <Image
            src={`/images/${imageSrc}`}
            alt="book cover"
            width={150}
            height={200}
            className="rounded-lg shadow-[-10px_10px_10px_rgba(0,0,0,0.3)]"
          />
        </div>

        <div className="col-span-3 md:col-span-2 pt-[14%] flex flex-col justify-between h-full z-10">
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
