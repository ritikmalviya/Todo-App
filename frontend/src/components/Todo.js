import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoBox from "./TodoBox";

const Todo = (params) => {
  const {userId} = params;

  const [todoData, setTodoData] = useState([]);

  const fetchTodoData = async () => {
    const res = await axios.get("/getTodos/"+userId);
    setTodoData(res.data);
  };

  useEffect(() => {
    fetchTodoData();
  }, [todoData]);

  return (
    <div>
      <div className="flex flex-wrap items-start min-w-full">
        {/* get all the todos  */}

        {todoData.map((data) => (
          <TodoBox data={data} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
