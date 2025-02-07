"use client";
import { useRef, useState, useEffect } from "react";
import Button from "@/components/common/Button";

import Image from "next/image";
import julian from "@/components/assets/images/1984 - george orwell.jpg";

const Home = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollAmount = 500;

  const updateScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth); // Fix rounding issue
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
    updateScrollButtons();
    if (sliderRef.current) {
      sliderRef.current.addEventListener("scroll", updateScrollButtons);
      return () => {
        sliderRef.current?.removeEventListener("scroll", updateScrollButtons);
      };
    }
  }, []);

  return (
    <div>
      <div className="relative w-full">
        {!isAtStart && (
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg"
            icon="ArrowLeftIcon"
            color="opacity10"
            onClick={scrollLeft}
          />
        )}

        <div
          ref={sliderRef}
          className="flex overflow-x-auto overflow-y-hidden gap-4 py-4 items-center scroll-smooth scrollbar-hide"
        >
          <div className="max-w-[500px] min-w-[500px] p-4 bg-red-800 rounded-lg h-64">
            <h1>col 1</h1>
          </div>
          <div className="max-w-[500px] min-w-[500px] p-4 bg-red-600 rounded-lg h-64">
            <h1>col 2</h1>
          </div>
          <div className="max-w-[500px] min-w-[500px] p-4 bg-red-400 rounded-lg h-64">
            <h1>col 3</h1>
          </div>
          <div className="max-w-[500px] min-w-[500px] p-4 bg-red-200 rounded-lg h-64">
            <h1>col 4</h1>
          </div>
        </div>

        {!isAtEnd && (
          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-lg"
            icon="ArrowRightIcon"
            color="opacity10"
            onClick={scrollRight}
          />
        )}
      </div>

      <div className="relative w-[500px] h-48 overflow-hidden mt-10 rounded-xl">
        <Image
          src={julian}
          alt="background blur"
          className="absolute bottom-0 left-0 w-full h-[70%] object-cover blur-sm"
        />

        {/* Background Overlay (to darken the blur) */}
        <div className="absolute bottom-0 left-0 w-full h-[75%] backdrop-blur-lg rounded-xl"></div>
        <div className="grid grid-cols-3 min-h-full gap-2 p-4 pt-0 text-white w-full">
          <div className="col-span-1 flex items-end z-10 px-2">
            <Image
              src={julian}
              alt="dropdown icon"
              className="rounded-lg shadow-lg shadow-gray-700"
            />
          </div>
          <div className="col-span-2 pt-[20%] z-10">
            <h3 className="font-bold">ddddddddddddddd</h3>
            <p className="text-sm">By qaaaa</p>
            <p className="text-xs opacity-80">2021 • aa</p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
        <h1>content</h1>
      </div>
    </div>
  );
};

export default Home;
