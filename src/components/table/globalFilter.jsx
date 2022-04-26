import React from "react";
import { GiArchiveResearch } from "react-icons/gi";
import { IconContext } from "react-icons";
function GlobalFilter({ filter, setFilter }) {
  return (
    <span className="flex items-center">
      <div>
        <p className="self-end">Global Search: </p>
        <input
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
          className="border-0 border-b-2 border-black bg-[#E1EFFF] outline-none placeholder:bg-[#E1EFFF]"
          placeholder="Search for anything"
        />
      </div>
      <div className="border-0 border-b-2 border-black">
        <IconContext.Provider value={{ style: { fontSize: "47px" } }}>
          <GiArchiveResearch />
        </IconContext.Provider>
      </div>
    </span>
  );
}

export default GlobalFilter;
