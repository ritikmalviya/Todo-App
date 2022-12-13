const express = require('express');
const router = express.Router();

const {home, createTodo, addTask, getTodos, getTodo, deleteTodo, editTodo, deleteTask, editTask, search, isDone} = require('../controller/todoController')

/*
    * List of Routes
        1. Home
        2. createTodo
        3. addTask
        4. getTodos
        5. getTodo
        6. deleteTodo
        7. editTodo
*/

router.get('/',home)
router.post('/createTodo',createTodo)
router.post('/addTask',addTask)
router.get('/getTodos/:userId',getTodos)
router.get('/getTodo/:id',getTodo)
router.delete('/deleteTodo/:id',deleteTodo)
router.delete('/deleteTask/', deleteTask);
router.put('/editTodo/:id',editTodo)
router.put("/editTask", editTask);
router.put("/isdone", isDone);
router.post('/search/', search)

module.exports = router;