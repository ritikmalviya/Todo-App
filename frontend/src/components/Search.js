import axios from "axios";
import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoBox from "./TodoBox";

const Search = () => {
  const [searchData, setSearchData] = useState();
  const [search, setSearch] = useState("");

  const fetch = async (event) => {
    if (event.key === "Enter") {
      const data = await axios.get("/search/" + search);
      console.log("This is :", data.data.searchTodo);
      setSearchData(data.data.searchTodo);
    }
  };

  return (
    <div>
      <div className="bg-gray-600 w-1/3 rounded-md mx-auto my-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-12  
      px-6 bg-transparent placeholder:text-white outline-none"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={fetch}
        />
      </div>
      <div>
        {searchData ? (
          <div className="flex flex-wrap items-start min-w-full">
          {searchData.map((data) => (
              <TodoBox data={data} />
          )
          )}
          </div>
        ) : (
          <Todo />
        )}
      </div>
    </div>
  );
};

export default Search;
