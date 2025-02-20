import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import * as HeroIcons from "@heroicons/react/24/outline";

interface DropdownItem {
  name: string;
  icon?: string;
}

interface DropdownProps {
  className?: string;
  list: DropdownItem[];
  withBackground?: boolean;
  withIcons?: boolean;
  imageSrc?: string;
  defaultText: string;
  hideOnMd?: boolean;
  onSelect: (selectedItem: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  className,
  list,
  withBackground = true,
  withIcons = true,
  imageSrc,
  defaultText,
  hideOnMd = true,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState(defaultText);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: string) => {
    setSelectedText(item);
    setIsOpen(false);
    onSelect(item);
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
        className={`px-4 py-2 rounded-3xl flex items-center space-x-2 whitespace-nowrap overflow-hidden truncate
          hover:bg-rose-600 hover:text-white focus:ring-rose-300
          ${withBackground ? "bg-gray-200" : "bg-transparent"}`}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="dropdown icon"
            width={20}
            height={20}
            className="w-5 h-5 rounded-full"
          />
        )}
        <span className={`text-sm ${hideOnMd ? "hidden md:flex" : "flex"}`}>
          {selectedText}
        </span>
        <HeroIcons.ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 bg-white rounded-3xl border border-gray-300 shadow-lg z-10">
          <ul className="py-2 text-sm">
            {list.map((menu, index) => {
              const IconComponent = withIcons
                ? (
                    HeroIcons as Record<
                      string,
                      React.FC<{ className?: string }>
                    >
                  )[menu.icon || ""]
                : null;

              return (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-rose-600 hover:text-white cursor-pointer rounded-3xl flex items-center space-x-2"
                  onClick={() => handleSelect(menu.name)}
                >
                  {withIcons && IconComponent && (
                    <IconComponent className="h-5 w-5" />
                  )}
                  <span>{menu.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
