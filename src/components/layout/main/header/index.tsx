import { useState } from "react";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import UserDropdown from "./UserDropdown";

const Header = () => {
  const [search, setValue] = useState("");

  const handleNotification = () => {};

  return (
    <header className="fixed bg-white z-20 py-4 px-6 transition-all duration-300">
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 md:col-span-2 flex">
          <InputText
            placeholder="Search book names, authors, genres"
            icon="MagnifyingGlassIcon"
            iconPosition="left"
            value={search}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="hidden md:col-span-6 md:flex justify-center"></div>
        <div className="col-span-6 md:col-span-4 flex justify-end items-center">
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
