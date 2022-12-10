import axios from "axios";
import React, { useEffect, useState } from "react";

const TaskBox = (props) => {
  const { taskData, todoId } = props;
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState('');
  
  const deleteTask = async (todosId, taskId) => {
    const datas = {
      todoId: todosId,
      taskId: taskId,
    };
    await axios.delete("/deleteTask", { data: datas });
    setEdit(false)
  };

  const submitChange = async()=>{
    const data = {
      taskId: taskData._id,
      editedTask:task,
    };
    await axios.put('/editTask',data)
    setEdit(false)
  }
  useEffect(() => {
    setTask(taskData.taskTitle);
  }, [edit])
  

  return (
    <div>
      <div className="flex ml-4">
        <input
          type="checkbox"
          // checked={taskData.isDone}
          name=""
          id=""
          className="bg-transparent accent-transparent"
        />
        <input
          value={task}
          readOnly={!edit}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          className="bg-transparent outline-none px-4 pb-4 pt-4 text-sm"
        />
        {edit ? (
          <button className="mx-5" onClick={() => submitChange()}>
            Submit
          </button>
        ) : (
          <button className="mx-5" onClick={() => setEdit(true)}>
            EDIT
          </button>
        )}

        {/* DELETE BUTTON  */}
        <button onClick={() => deleteTask(todoId, taskData._id)}>DELETE</button>
      </div>
    </div>
  );
};

export default TaskBox;
