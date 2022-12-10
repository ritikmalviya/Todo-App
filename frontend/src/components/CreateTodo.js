import axios from 'axios'
import React, { useState } from 'react'

const CreateTodo = () => {
  
  const [todo, setTodo] = useState("")
  const [task, setTask] = useState("")
  const [expand, setExpand] = useState(false)

  const submitData = async() =>{
    const data = {
      todo: todo,
      taskTitle: task
    }
    const res = await axios.post("/createTodo", data);
    console.log(res)
  }
  // handle the default
  const handleSubmit = (event)=>{
    event.preventDefault();

    submitData();

    setTodo("");
    setTask("");
    setExpand(false);
  }

  return (
    <div className="mt-2">
      <form
        onSubmit={handleSubmit}
        action=""
        className="border shadow-md
                  shadow-black rounded-md
                 border-gray-500 mx-auto 
                 flex flex-col justify-center
                 w-1/2 "
      >
        {expand ? (
          <input
            type="text"
            placeholder="Todo"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            className="px-4 pt-4 outline-none bg-transparent"
          />
        ) : null}
        <input
          rows=""
          column=""
          placeholder="Write a Task..."
          onClick={() => {
            setExpand(true);
          }}
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          className="px-4 py-4 outline-none bg-transparent"
        />
        {expand ? <button type="submit">Create Todo</button> : null}
      </form>
    </div>
  );
}

export default CreateTodo