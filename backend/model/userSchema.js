const mongoose = require('mongoose')

const user = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: [true, "Name is Required"]
  },
  email: {
    type: String,
    unique: true,
  },
});