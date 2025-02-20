"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

interface BookProps {
  className?: string;
  id: string;
  title: string;
  author: string;
  imageSrc: string;
}

const CardBookMustRead: React.FC<BookProps> = ({
  className,
  id,
  title,
  author,
  imageSrc,
}) => {
  const router = useRouter();

  const toDetail = () => {
    router.push(`/books/${id}`);
  };

  return (
    <div
      className={`grid grid-cols-3 p-4 cursor-pointer transition-transform duration-300 ease-in-out
      hover:translate-x-[-10px] will-change-transform ${className}`}
      onClick={toDetail}
    >
      <div className="col-span-1 flex justify-center">
        <Image
          src={`/images/${imageSrc}`}
          alt="Hujan Bulan Juni"
          width={50}
          height={124}
          className="h-auto rounded-lg shadow-[-10px_10px_10px_rgba(0,0,0,0.3)]"
        />
      </div>
      <div className="col-span-2 py-2">
        <h3 className="font-semibold text-md">{title}</h3>
        <p className="text-sm font-normal">{author}</p>
      </div>
    </div>
  );
};

export default CardBookMustRead;
