import useClickOutside from "Hooks/useClickOutside";
import React, { FC, useRef, useState } from "react";
import { FilterOption } from "./../App";
import ArrowIcon from "./../assets/arrow.svg";

interface ISelectProps {
  active: FilterOption;
  setActive: React.Dispatch<FilterOption>;
  options: any[];
}

export const Select: FC<ISelectProps> = ({ active, setActive, options }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const selectRef = useRef(null);

  const showDropdown = () => {
    setIsDropdown(true);
  };

  const hideDropdown = () => {
    setIsDropdown(false);
  };
  useClickOutside(selectRef, hideDropdown);

  const handleOptionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setActive(e.currentTarget.innerText as FilterOption);
    setIsDropdown(false);
  };

  return (
    <div className="select" ref={selectRef}>
      <ArrowIcon className="select__icon" />
      <button onClick={showDropdown}>
        {active === "all" ? "Выберите фильтр" : active}
      </button>
      {isDropdown && (
        <div className="select__dropdown">
          {options.map((option, index) => (
            <div
              className="select__option"
              key={index}
              onClick={handleOptionClick}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
