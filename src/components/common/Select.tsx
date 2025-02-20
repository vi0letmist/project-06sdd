import { useState, useRef, useEffect } from "react";
import * as HeroIcons from "@heroicons/react/24/outline";

interface Option {
  label: string;
  value: string;
  icon?: string;
}

interface SelectProps {
  options: Option[];
  defaultOption?: string;
  withIcons?: boolean;
  className?: string;
  onChange: (selectedValue: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  defaultOption = "Select an option",
  withIcons = false,
  className = "",
  onChange,
}) => {
  const [selected, setSelected] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    setSelected(option.label);
    setIsOpen(false);
    onChange(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-full flex justify-between items-center text-sm
        hover:bg-rose-50 focus:ring-1 focus:ring-rose-300 transition"
      >
        <span>{selected}</span>
        <HeroIcons.ChevronDownIcon
          className={`h-5 w-5 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-3xl shadow-lg z-10">
          <ul className="py-2 text-sm">
            {options.map((option) => {
              const IconComponent = withIcons
                ? (
                    HeroIcons as Record<
                      string,
                      React.FC<{ className?: string }>
                    >
                  )[option.icon || ""]
                : null;

              return (
                <li
                  key={option.value}
                  className="px-4 py-2 hover:bg-rose-600 hover:text-white rounded-3xl cursor-pointer flex items-center space-x-2"
                  onClick={() => handleSelect(option)}
                >
                  {withIcons && IconComponent && (
                    <IconComponent className="h-5 w-5" />
                  )}
                  <span>{option.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
