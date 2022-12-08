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
*/

exports.home = (req, res) => {
  res.send("Hello world");
};

exports.createTodo = async (req, res) => {
  const { todo, task } = req.body;

  if (!todo) {
    res.status(400).send("Enter the Todo Name");
  }
  const newTodo = await Todo.create({ todo: todo, task: task });
  res.status(200).send(newTodo);
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
    const todos = await Todo.find();
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

    //validate the data is given or not
    if (!todoId && taskId) throw new Error("Plase enter todo id and task id");

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
    const {taskId, editedTask } = req.body;
    
    
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
      const todoUpdate = await Todo.findOne({"task._id":taskId})
      res.status(200).json({
        success: true,
        message: 'Task edited',
        todoUpdate
      })

  } catch (error) {
    console.log("The error in editTask controller ", error);
  }
};
