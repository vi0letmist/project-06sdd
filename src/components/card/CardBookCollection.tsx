import React from "react";
import Image from "next/image";

interface BookProps {
  className?: string;
  title: string;
  author: string;
  genre: string;
  imageSrc: string;
}

const CardBookCollection: React.FC<BookProps> = ({
  className,
  title,
  author,
  genre,
  imageSrc,
}) => {
  return (
    <div className={`${className}`}>
      <Image
        src={`/images/${imageSrc}`}
        alt="Hujan Bulan Juni"
        width={124}
        height={124}
        className="h-auto rounded-lg shadow-lg shadow-gray-700"
      />
      <h3 className="font-semibold text-xl min-h-[56px] py-2">{title}</h3>
      <p className="text-sm font-normal pb-2">{author}</p>
      <div className="bg-gray-200 px-2 rounded-full inline-block">
        <small className="font-bold text-xs">{genre}</small>
      </div>
    </div>
  );
};

export default CardBookCollection;
