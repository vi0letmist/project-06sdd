import React from "react";
import Image from "next/image";

interface BookProps {
  className?: string;
  title: string;
  author: string;
  imageSrc: string;
}

const CardBookMustRead: React.FC<BookProps> = ({
  className,
  title,
  author,
  imageSrc,
}) => {
  return (
    <div className={`grid grid-cols-3 p-4 ${className}`}>
      <div className="col-span-1 flex justify-center">
        <Image
          src={`/images/${imageSrc}`}
          alt="Hujan Bulan Juni"
          width={50}
          height={124}
          className="h-auto rounded-lg shadow-lg shadow-gray-700"
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
