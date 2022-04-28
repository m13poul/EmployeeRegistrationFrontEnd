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
          className="border-0 border-b-2 border-black bg-primary dark:bg-secondary dark:placeholder-primary outline-none dark:placeholder:bg-secondary dark:border-white"
          placeholder="Search for anything"
        />
      </div>
      <div className="border-0 border-b-2 border-black dark:border-white">
        <IconContext.Provider value={{ style: { fontSize: "47px" } }}>
          <GiArchiveResearch />
        </IconContext.Provider>
      </div>
    </span>
  );
}

export default GlobalFilter;
