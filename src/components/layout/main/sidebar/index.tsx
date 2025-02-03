"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Navbar from "@/components/layout/main/navbar";

interface SidebarProps {
  onSidebarToggle: (isOpen: boolean) => void;
}

export default function Sidebar({ onSidebarToggle }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onSidebarToggle(!isOpen);
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 transform transition-all duration-300 z-40 h-full ${
          isOpen ? "w-48" : "w-16"
        } py-4 pr-0`}
      >
        <div className="flex flex-col h-full border-r">
          <div className="h-16 flex justify-center items-start text-center">
            <h1>logo keren</h1>
          </div>
          <div className="flex-1 flex items-center px-3">
            <Navbar isSidebarOpen={isOpen} />
          </div>
        </div>
      </div>

      <Button
        className="fixed bottom-4 left-3 rounded-3xl z-50"
        icon={isOpen ? "Bars3BottomRightIcon" : "Bars3BottomLeftIcon"}
        color="opacity10"
        onClick={handleToggle}
      />
    </>
  );
}
