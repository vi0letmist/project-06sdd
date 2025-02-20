import React, { useState, useRef, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "@heroicons/react/24/outline";

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  placeholder = "Select a date",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={datePickerRef}>
      {/* Input Field */}
      <input
        type="text"
        value={selectedDate ? selectedDate.toLocaleDateString() : ""}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
        readOnly
        className={`w-full border rounded-3xl py-2 px-3 text-sm pr-10 border-gray-300 focus:ring-rose-300 focus:border-rose-300 focus:outline-none focus:ring-1 ${className}`}
      />

      <CalendarIcon
        className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50">
          <ReactDatePicker
            selected={selectedDate}
            onChange={(date) => {
              onChange(date);
              setIsOpen(false);
            }}
            inline
            calendarClassName="bg-white !rounded-3xl overflow-auto"
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
