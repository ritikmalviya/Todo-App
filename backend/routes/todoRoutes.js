const express = require('express');
const router = express.Router();

const {home, createTodo, addTask, getTodos, getTodo, deleteTodo, editTodo} = require('../controller/todoController')


router.get('/',home)
router.post('/createTodo',createTodo)
router.post('/addTask',addTask)
router.get('/getTodos',getTodos)
router.get('/getTodo/:id',getTodo)
router.delete('/deleteTodo/:id',deleteTodo)
router.put('/editTodo/:id',editTodo)
module.exports = router;