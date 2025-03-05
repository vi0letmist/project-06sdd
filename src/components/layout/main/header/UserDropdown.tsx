import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as HeroIcons from "@heroicons/react/24/outline";
import julian from "@/components/assets/images/julian.jpg";

interface UserDropdownProps {
  className?: string;
}

const dropdownList = [
  { name: "Settings", destination: "/settings", icon: "Cog8ToothIcon" },
  { name: "Logout", destination: "/logout", icon: "ArrowRightOnRectangleIcon" },
];

const UserDropdown: React.FC<UserDropdownProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const username = "Julian Casablancas";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-gray-200 rounded-3xl flex items-center space-x-2 whitespace-nowrap 
          overflow-hidden truncate hover:bg-rose-600 hover:text-white focus:ring-rose-300"
      >
        <Image
          src={julian}
          alt="dropdown icon"
          className="w-5 h-5 rounded-full"
        />
        <span className="text-sm hidden md:flex">{username}</span>
        <HeroIcons.ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-4 mt-2 w-48 bg-white rounded-3xl border border-gray-300">
          <ul className="py-2 text-sm">
            {dropdownList.map((menu, index) => {
              const IconComponent = (
                HeroIcons as Record<string, React.FC<{ className?: string }>>
              )[menu.icon];
              return (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-rose-600 hover:text-white cursor-pointer rounded-3xl"
                >
                  <Link href={menu.destination} passHref>
                    <div className="flex items-center space-x-2">
                      {IconComponent && <IconComponent className="h-5 w-5" />}
                      <span>{menu.name}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
