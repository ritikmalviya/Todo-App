import axios from "axios";
import React, { useEffect, useState } from "react";

const AddTask = (props) => {
  const [task, setTask] = useState("");
  const { id } = props;

  const addTask = async (event) => {
    if (event.key === "Enter") {
      const data = {
        id,
        taskTitle: task,
      };
      await axios.post("/addTask", data);
      setTask("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="New Task"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
        onKeyDown={addTask}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
