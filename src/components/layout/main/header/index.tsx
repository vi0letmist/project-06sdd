import { useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const [search, setValue] = useState("");
  const { isSidebarOpen } = useSidebar();

  const handleNotification = () => {};

  return (
    <header
      className={`fixed bg-white z-50 py-4 pl-6 transition-all duration-300 w-full ${
        isSidebarOpen ? "pr-52" : "pr-20"
      }`}
    >
      <div className="grid grid-cols-2 items-center gap-4">
        <div
          className={`${isSidebarOpen ? "col-span-2" : "col-span-1"} md:col-span-1 flex`}
        >
          <InputText
            placeholder="Search book names, authors, genres"
            icon="MagnifyingGlassIcon"
            iconPosition="left"
            value={search}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div
          className={`${isSidebarOpen ? "sm:col-span-2 sm:flex hidden" : "flex col-span-1"} md:col-span-1 flex justify-end items-center px-2`}
        >
          <UserDropdown className="pr-4" />
          <Button
            className={`rounded-3xl z-50e`}
            icon="BellIcon"
            color="transparent"
            size="md"
            onClick={handleNotification}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
