const mongoose = require("mongoose");

/* 
    Todo Schema consist Two values 
    1. Todo Title
    2. Task Array
    both have the timestamps 
    Task have 'isDone' boolean
*/

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      require: [true, "Name is Required"],
      trim: true,
    },
    task: [
      {
        taskTitle: String,
        isDone: {
          type: Boolean,
          default: false,
        },
      },
      { timestamps: true },
    ],
    userId: {
      type: String,
      trim: true,
      require: [true, "user id is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
