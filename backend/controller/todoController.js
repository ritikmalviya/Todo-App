const { query } = require("express");
const { findById } = require("../model/TodoSchema");
const Todo = require("../model/TodoSchema");

/* 
  * controller list
    1. getTodos
    2. getTodo
    3. createTodo
    4. editTodo
    5. deleteTodo
    6. addTask
    7. deleteTask
    8. editTask
    9. isDone
*/

exports.home = (req, res) => {
  res.send("Hello world");
};

exports.createTodo = async (req, res) => {
  try {
    const { todo, taskTitle, userId } = req.body;

    if (!todo) {
      res.status(400).send("Enter the Todo Name");
    }
    const todoData = {
      userId,
      todo: todo,
      task: [
        {
          taskTitle: taskTitle,
        },
      ],
    };
    const newTodo = await Todo.create(todoData);
    res.status(200).send(newTodo);
  } catch (error) {
    console.log(error);
  }
};

exports.addTask = async (req, res) => {
  try {
    const { id, taskTitle } = req.body;

    //check if id is given and exists
    if (!id && !taskTitle) throw new Error("Id and Task title must be passed");

    //check if todo exist with this id
    const todo = await Todo.findById(id);
    if (!id) throw new Error("Todo is not exist in DB");

    //insert task
    todo.task.push({ taskTitle: taskTitle });
    const updatedTask = await Todo.findByIdAndUpdate(id, todo);

    // return the todo
    res.status(200).json({
      success: true,
      message: "task added",
      updatedTask,
    });
  } catch (error) {
    console.log("Add Task: ", error);
  }
};

exports.getTodos = async (req, res) => {
  try {
    const { userId } = req.params;
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getTodo = async (req, res) => {
  try {
    console.log("first");
    const { id } = req.params;
    if (!id) console.log("please enter the id");
    const todo = await Todo.findById(id);
    res.send(todo);
  } catch (error) {
    console.log("error message", error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) res.send("please enter id");
    const deletedTodo = await Todo.findByIdAndRemove(id);
    res.status(200).json({
      success: true,
      message: "deleted the todo",
      deletedTodo,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    // get the data
    const { todoId, taskId } = req.body;
    console.log(req.body);
    //validate the data is given or not
    if (!todoId && taskId) throw new Error("Plase enter todo id and task id");
    console.log("This is the Task deletion ", todoId, " Task id ", taskId);

    //find the todo where the task is getting deleted
    const todoWhereTaskDelete = await Todo.findById(todoId);
    todoWhereTaskDelete.task.pull({ _id: taskId });
    todoWhereTaskDelete.save();
    res.status(200).json({
      success: true,
      message: "Task deleted",
      todoWhereTaskDelete,
    });
  } catch (error) {
    console.log("there is error in deleteTask: ", error);
  }
};

exports.editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { newNameofTodo } = req.body;
    if (!id) res.send("please enter id");
    if (!newNameofTodo) res.send("please enter new Todo name");
    await Todo.findByIdAndUpdate(id, { todo: newNameofTodo });
    const newTodo = await Todo.findById(id);
    res.send(newTodo);
  } catch (error) {
    console.log(error);
  }
};

exports.editTask = async (req, res) => {
  try {
    const { taskId, editedTask } = req.body;

    if (!taskId && !editedTask)
      throw new Error("Please provide task id and editedTask");

    //find the task with task id and update it
    await Todo.updateOne(
      { "task._id": taskId },
      {
        $set: {
          "task.$.taskTitle": editedTask,
        },
      }
    );
    const todoUpdate = await Todo.findOne({ "task._id": taskId });
    console.log(todoUpdate);
    res.status(200).json({
      success: true,
      message: "Task edited",
      todoUpdate,
    });
  } catch (error) {
    console.log("The error in editTask controller ", error);
  }
};
exports.isDone = async (req, res) => {
  try {
    const { taskId, isDoneBool } = req.body;

    if (!taskId) throw new Error("Please provide task id");

    //find the task with task id and update it
    await Todo.updateOne(
      { "task._id": taskId },
      {
        $set: {
          "task.$.isDone": isDoneBool,
        },
      }
    );
    const taskUpdate = await Todo.findOne({ "task._id": taskId });
    console.log(taskUpdate);
    res.status(200).json({
      success: true,
      message: "Task edited",
      taskUpdate,
    });
  } catch (error) {
    console.log("The error in editTask controller ", error);
  }
};

exports.search = async (req, res) => {
  try {
    const { search, userId } = req.body;
    const regex = new RegExp(search, "i");

    // const searchTodo = await Todo.find({ $or: [{todo:{$regex:search, $options: "i"}}, {'task.title': {$regex: query, $options: "i"}}],userId})
    // console.log(searchTodo)
    // searchTodo.map((obj)=>{
    //   let arrayOfObj = obj.task.filter(task => task.taskTitle.match(regex) !== null );
    //   obj.task = arrayOfObj
    // })

    const searchTodo = await Todo.aggregate().search({
      index: "search-todo-task",
      compound: {
        must: [
          {
            text: {
              query: userId,
              path: "userId",
            },
          },
          {
            compound: {
              should: {
                text: {
                  query: search,
                  path: {
                    "wildcard": "*",
                  },
                },
              },
            },
          },
        ],
      },
    });
    console.log(searchTodo);

    res.status(200).json({
      success: true,
      message: "Search result are",
      searchTodo,
    });
  } catch (error) {
    console.log("error in search controller ", error);
  }
};
