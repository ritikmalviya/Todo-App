const { findById } = require("../model/TodoSchema");
const Todo = require("../model/TodoSchema");

exports.home = (req,res)=>{
    res.send('Hello world')
};

exports.createTodo = async(req,res)=>{
    const {todo} = req.body;

    if(!todo){
        res.status(400).send('Enter the Todo Name')
    }
    const newTodo = await Todo.create({todo})
    res.status(200).send(newTodo);
};

exports.addTask = async(req,res)=> {
    try{const {task,id} = req.body;
    if(!id){
        res.status(400).send('please enter id')
    }
    await Todo.findByIdAndUpdate(id,{$push:{task:task}})
    const newTodo = await Todo.findById(id)
    if(!task){
        res.status(400).send('Enter The Task Name');
    }
    res.json(newTodo)
}
    catch(err){
        console.log(err)
    }

}

exports.getTodos = async(req,res)=>{
    try {
        const todos = await Todo.find();
        res.json(todos)
    } catch (error) {
        console.log(error.message)
    }
}
exports.getTodo = async (req, res) => {
    try {
        console.log('first')
        const {id} = req.params;
        if(!id) console.log('please enter the id')
        const todo = await Todo.findById(id)
        res.send(todo);        
    } catch (error) {
        console.log('error message',error)
    }
};

exports.deleteTodo = async(req,res) =>{
    try {
        const {id} = req.params 
        if(!id) res.send('please enter id')
        const deletedTodo = await Todo.findByIdAndRemove(id)
        res.send(deletedTodo)
    } catch (error) {
        console.log(error.message)
    }

}

exports.editTodo = async(req,res)=>{
    
    try {
        const {id} = req.params
        const {newNameofTodo} = req.body;
        if(!id) res.send('please enter id')
        if(!newNameofTodo) res.send('please enter new Todo name')
        await Todo.findByIdAndUpdate(id,{todo: newNameofTodo})
        const newTodo = await Todo.findById(id);
        res.send(newTodo)
    } catch (error) {
        console.log(error)
    }
}
