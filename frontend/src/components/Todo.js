import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoBox from "./TodoBox";
import Search from "./Search";

const Todo = () => {
  const [todoData, setTodoData] = useState([]);
  const [isDone, setIsDone] = useState(false)
  const [task, setTask] = useState("Task");
  const [todo, setTodo] = useState("Task");

  const fetchTodoData = async () => {
    const res = await axios.get("/getTodos");
    setTodoData(res.data);
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

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
