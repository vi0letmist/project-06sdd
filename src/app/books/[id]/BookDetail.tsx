"use client";

import { useEffect } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { useBookStore } from "@/store/book";
import Image from "next/image";
import Button from "@/components/common/Button";
import { formatFullDate } from "@/lib/formatDate";

interface BookDetailProps {
  id: string;
}

const BookDetail: React.FC<BookDetailProps> = ({ id }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { isSidebarOpen } = useSidebar();
  const { book, getBookById } = useBookStore();

  useEffect(() => {
    getBookById(id);
  }, [getBookById]);
  return (
    <div className="relative w-full py-2">
      <Image
        src={`${BASE_URL + (book?.cover || "/jpg")}`}
        alt="background blur"
        width={300}
        height={200}
        className="absolute bottom-0 left-0 w-full h-[90%] md:h-[68%] object-cover blur-sm py-2"
      />

      <div
        className={`absolute bottom-0 left-0 w-full ${isSidebarOpen ? "h-[96%]" : "h-[90%]"} md:h-[68%] 
        bg-black bg-opacity-30 backdrop-blur-2xl rounded-xl py-2`}
      ></div>

      <div className="grid grid-cols-2 min-h-full gap-2 px-4">
        <div className="col-span-2 md:col-span-1 flex items-end justify-center px-2 z-10">
          <Image
            src={`${BASE_URL + (book?.cover || "/jpg")}`}
            alt="book cover"
            width={240}
            height={200}
            className="rounded-lg shadow-[-20px_20px_20px_rgba(0,0,0,0.3)]"
          />
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col justify-between h-full z-10">
          <div className="flex flex-col min-h-[70%] text-white md:text-black">
            <div className="py-4">
              <h3 className="font-bold text-4xl min-h-[112px] flex items-center py-4">
                {book?.title || "-"}
              </h3>
              <span className="font-semibold text-xl py-4">
                {book?.author || "-"}
              </span>
            </div>
            <div className="py-2">
              <span className="font-semibold text-xl">
                {(book?.available_copies || "-") + " "}
                <span className="text-white md:text-gray-700 text-base font-normal">
                  available copies
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 flex flex items-center justify-between min-h-[30%] py-4 text-white border-b-2 border-white">
            <div
              className={`${isSidebarOpen ? "col-span-3" : "col-span-1"} md:col-span-1 flex`}
            >
              <Button className="rounded-full" color="white">
                Borrow
              </Button>
            </div>
            <div
              className={`${isSidebarOpen ? "col-span-3" : "col-span-2"} md:col-span-2 flex gap-1 justify-end`}
            >
              <Button
                className="rounded-full"
                icon="BookmarkIcon"
                color="white"
                size="md"
              />
              <Button
                className="rounded-full"
                icon="ShareIcon"
                color="white"
                size="md"
              />
              <Button
                className="rounded-full"
                icon="ChatBubbleLeftEllipsisIcon"
                color="white"
                size="md"
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 z-10 text-white p-2 md:p-6">
          <h3 className="text-lg font-semibold py-2">Description</h3>
          <p className="text-justify text-sm leading-normal">
            {book?.description || "-"}
          </p>
        </div>

        <div className="col-span-2 md:col-span-1 z-10 text-white p-2 md:p-6">
          <h3 className="text-lg font-semibold py-2">Publish Date</h3>
          <p className="text-justify text-sm leading-normal">
            {book?.published_date ? formatFullDate(book.published_date) : "-"}
          </p>
          <h3 className="text-lg font-semibold py-2">Publisher</h3>
          <p className="text-justify text-sm leading-normal">
            {book?.publisher || "-"}
          </p>
          <h3 className="text-lg font-semibold py-2">Language</h3>
          <p className="text-justify text-sm leading-normal">
            {book?.language || "-"}
          </p>
          <h3 className="text-lg font-semibold py-2">Pages</h3>
          <p className="text-justify text-sm leading-normal">
            {book?.pages || "-"}
          </p>
          <h3 className="text-lg font-semibold py-2">ISBN</h3>
          <p className="text-justify text-sm leading-normal">
            {book?.isbn || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
