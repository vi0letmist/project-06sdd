"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

interface BookProps {
  className?: string;
  id: string;
  title: string;
  author: string;
  description: string | null;
  imageSrc: string;
  lineClamp?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  size?: "sm" | "md" | "lg";
}

const CardBookWithDesc: React.FC<BookProps> = ({
  className,
  id,
  title,
  author,
  description,
  imageSrc,
  lineClamp = 4,
  size = "md",
}) => {
  const router = useRouter();

  const toDetail = () => {
    router.push(`/books/${id}`);
  };

  const sizeClasses = {
    sm: {
      title: "text-base min-h-[40px]",
      authorContainer: "font-semibold text-base",
      authorText: "text-sm font-normal",
      description: "text-xs md:text-sm font-light",
      padding: "py-2",
    },
    md: {
      title: "text-lg md:text-xl min-h-[56px]",
      authorContainer: "font-semibold text-lg md:text-xl",
      authorText: "text-base font-normal",
      description: "text-sm md:text-base font-light",
      padding: "py-4",
    },
    lg: {
      title: "text-2xl min-h-[56px]",
      authorContainer: "font-semibold text-2xl",
      authorText: "text-sm font-normal",
      description: "text-xs font-light",
      padding: "py-6",
    },
  };

  const getLineClampClass = (lines: number) => {
    switch (lines) {
      case 1: {
        return "line-clamp-1";
      }
      case 2: {
        return "line-clamp-2";
      }
      case 3: {
        return "line-clamp-3";
      }
      case 4: {
        return "line-clamp-4";
      }
      case 5: {
        return "line-clamp-5";
      }
      case 6: {
        return "line-clamp-6";
      }
      case 7: {
        return "line-clamp-7";
      }
      case 8: {
        return "line-clamp-8";
      }
      default: {
        return "line-clamp-4";
      }
    }
  };

  return (
    <div className={`cursor-pointer ${className}`} onClick={toDetail}>
      <Image
        src={`${imageSrc}`}
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
        <div className="col-span-3 md:col-span-1 flex items-end justify-start px-2 z-10">
          <Image
            src={`${imageSrc}`}
            alt="book cover"
            width={150}
            height={200}
            className="rounded-lg w-full shadow-[-10px_10px_10px_rgba(0,0,0,0.3)]"
          />
        </div>

        <div className="col-span-3 md:col-span-2 pt-[14%] flex flex-col justify-between h-full z-10">
          <div className={`${sizeClasses[size].padding}`}>
            <h3
              className={`font-semibold ${sizeClasses[size].title} flex items-center`}
            >
              {title}
            </h3>
            <span className={sizeClasses[size].authorContainer}>
              By <span className={sizeClasses[size].authorText}>{author}</span>
            </span>
          </div>

          <div className="flex items-stretch pb-2">
            <p
              className={`text-justify tracking-wider [word-spacing:2px] ${sizeClasses[size].description} ${getLineClampClass(lineClamp)}`}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBookWithDesc;
