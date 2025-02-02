"use client";

import { useState } from "react";
import Button from "@/components/common/button";
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
          isOpen ? "w-64" : "w-16"
        } p-4 shadow-lg`}
      >
        <div className="flex flex-col h-full">
          <div>
            <h1>logo keren</h1>
          </div>
          <div className="flex-1 flex items-center">
            <Navbar />
          </div>
        </div>
      </div>

      <Button
        className="fixed bottom-4 left-3 rounded-3xl z-50"
        icon={isOpen ? "Bars3BottomRightIcon" : "Bars3BottomLeftIcon"}
        color="opacity50"
        onClick={handleToggle}
      />
    </>
  );
}
