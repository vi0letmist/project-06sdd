"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-[88vh] flex-col">
      <h1 className="text-3xl md:text-6xl font-bold py-6 text-center">oops!</h1>
      <img
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm55N2sxZmg4M2s5Z3VudW4xa2lmOXR1NmlzeG5maXJ0YWt6MGh0YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WoWm8YzFQJg5i/giphy.gif"
        alt="Funny GIF"
      />
      <h1 className="text-3xl md:text-6xl font-bold py-6 text-center">
        404 page not found.
      </h1>

      <Button
        className="rounded-full"
        color="black"
        onClick={() => router.push("/")}
      >
        go home
      </Button>
    </div>
  );
};

export default NotFound;
