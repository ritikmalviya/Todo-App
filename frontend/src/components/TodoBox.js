import axios from 'axios';
import React, { useEffect } from 'react'
import TaskBox from './TaskBox';
import AddTask from "./AddTask";

const TodoBox = (props) => {
    const {data} = props;

    const deleteTodo = async (todoId) => {
      await axios.delete("/deleteTodo/" + todoId);
    };
    useEffect(() => {
    }, [data])
    

  return (
    <div className="border border-gray-500 rounded-md shadow-md hover:shadow-black w-auto mx-auto px-2 mt-16">
      <input
        readOnly={true}
        value={data.todo}
        className="bg-transparent outline-none px-4 pt-2 font-semibold"
      />
      <button onClick={() => deleteTodo(data._id)}>DELETE</button>

      {/* GET ALL THE TASK  */}
      {data.task.map((taskData) => (
        <TaskBox taskData={taskData} todoId={data._id} />
      ))}

      {/* add Task  */}
      <AddTask id={data._id}/>
    </div>
  );
}

export default TodoBox