"use client";

import "@/app/globals.css";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";
import { useSidebar } from "@/context/SidebarContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="relative">
      <Sidebar onSidebarToggle={toggleSidebar} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300
        ${isSidebarOpen ? "ml-48" : "ml-16"}`}
      >
        <Header />
        <main className="flex-1 pt-20 pl-6 pr-2 mr-4 min-h-[97vh]">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
