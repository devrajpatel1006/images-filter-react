import React from "react";
import SocialHandle from "../SocialHandle";
import MobileNavListItem from "./MobileNavListItem";

function MobileNav() {
  return (
    <div
      className={
        "block fixed bg-primary-black text-white top-[66px] left-0 right-0 bottom-0 " +
        "pt-[31.5px] pb-[14px] overflow-y-auto z-40 overflow-x-hidden"
      }
    >
      {/* Home */}
      <ul className="list-none p-0 m-0">
        <MobileNavListItem title={"Home"} />
      </ul>

    

      <hr className="bg-white my-[24.5px] mx-[14px] h-[1px] border-none opacity-30" />

      {/* login and others */}
      <ul className="list-none p-0 m-0">
        {["Login", "Join"].map((title) => (
          <MobileNavListItem key={title} title={title} sm={true} />
        ))}
      </ul>

      </div>
  );
}

export default MobileNav;
