import React, { InputHTMLAttributes, useState } from "react";
import * as HeroIcons from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  iconPosition?: "left" | "right";
  isValid?: boolean;
  errorMessage?: string;
}

const InputText: React.FC<InputTextProps> = ({
  icon,
  iconPosition = "left",
  isValid,
  errorMessage,
  className = "",
  ...props
}) => {
  const [touched, setTouched] = useState(false);
  const IconComponent =
    icon &&
    (HeroIcons as Record<string, React.FC<{ className?: string }>>)[icon];

  const handleBlur = () => setTouched(true);

  const getBorderClasses = () => {
    if (!touched)
      return "border-gray-300 focus:ring-rose-300 focus:border-rose-300";
    if (isValid === true)
      return "border-green-500 focus:ring-green-500 focus:border-green-500";
    if (isValid === false)
      return "border-red-500 focus:ring-red-500 focus:border-red-500";
    return "border-gray-300 focus:ring-rose-300 focus:border-rose-300";
  };

  return (
    <div className="flex flex-col space-y-1">
      <div className="relative">
        {IconComponent && iconPosition === "left" && (
          <IconComponent className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        )}

        <input
          {...props}
          onBlur={handleBlur}
          onChange={(e) => {
            props.onChange && props.onChange(e);
            if (!touched) setTouched(true);
          }}
          className={`w-full border rounded-3xl py-2 px-3 text-sm ${
            icon && iconPosition === "left" ? "pl-10" : ""
          } ${icon && iconPosition === "right" ? "pr-10" : ""} ${getBorderClasses()} focus:outline-none focus:ring-1 ${className}`}
        />

        {IconComponent && iconPosition === "right" && (
          <IconComponent className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        )}

        {touched && isValid === true && (
          <CheckCircleIcon className="h-5 w-5 text-green-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
        )}
        {touched && isValid === false && (
          <ExclamationCircleIcon className="h-5 w-5 text-red-500 absolute right-3 top-1/2 transform -translate-y-1/2" />
        )}
      </div>

      {touched && isValid === false && errorMessage && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputText;
