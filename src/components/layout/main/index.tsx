"use client";

import "@/app/globals.css";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="relative">
      <Sidebar onSidebarToggle={handleSidebarToggle} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 mr-4
        ${isSidebarOpen ? "ml-48" : "ml-16"}`}
      >
        <Header isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 pt-20 pl-6 pr-2 min-h-[97vh]">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
