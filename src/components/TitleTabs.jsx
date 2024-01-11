import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useLocation } from "react-router-dom";
import DropdownElements from "./DropdownElements";
import SmallTriangle from "./SmallTriangle";

function TitleTabs() {
  const [onHover, setOnHover] = useState(false);

  // either 'trending' or 'new' has to be focused on based on the url pathname
  // the style will based on the pathname
  const location = useLocation().pathname;

  function handleHover(state) {
    setOnHover(state);
  }
  return (
    <div className="flex justify-between items-center pt-[14px] pb-[7px]" style={{    justifyContent: "center"    }}>
      <h3 className="block text-lg leading-[26px] font-semibold mt-0 mb-0 text-[#1a1a1a]">
        {location.slice(1, 7) === "search"
          ? `${location.slice(8)} Photos`
          : "Free Stock Photos"}
      </h3>
      <div className="relative">
        <div
          className={
            "inline-flex relative items-center justify-center gap-2 cursor-pointer h-full py-[4.2px] " +
            "pl-[13px] text-sm font-semibold m-0 min-h-[32px] leading-6 text-[#1a1a1a] whitespace-nowrap " +
            "border border-transparent"
          }
          onMouseOver={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
        
        </div>
      </div>
    </div>
  );
}

export default TitleTabs;
