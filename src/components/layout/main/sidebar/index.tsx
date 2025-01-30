"use client";

import { useState } from "react";

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
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white transform transition-all duration-300 z-40 h-full ${
          isOpen ? "w-64" : "w-16"
        } p-4 shadow-lg`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <h2
              className={`text-lg font-bold mb-4 overflow-hidden text-ellipsis whitespace-nowrap ${
                isOpen ? "" : "hidden"
              }`}
            >
              Sidebar Menu
            </h2>
            <ul className="space-y-2">
              <li className="p-2 hover:bg-gray-700 rounded text-xs md:text-sm">
                <a href="#">Home</a>
              </li>
              <li className="p-2 hover:bg-gray-700 rounded text-xs md:text-sm">
                <a href="#">Dashboard</a>
              </li>
              <li className="p-2 hover:bg-gray-700 rounded text-xs md:text-sm">
                <a href="#">Settings</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button
        className="fixed bottom-4 left-4 p-3 bg-gray-800 text-white rounded-lg z-50"
        onClick={handleToggle}
      >
        {isOpen ? "✕" : "☰"}
      </button>
    </>
  );
}
