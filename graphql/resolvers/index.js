const { findById } = require('../../models/index');
const Todo = require('../../models/index');
const { description } = require('../schema');

module.exports = {
    getTodos:async ()=>{
        try {
            const todos = await Todo.find();
            return todos
            
        } catch (error) {
           console.error(error.message);
        }
    },
    getTodo:async ({id})=>{
        try {
            const todo = await Todo.findById(id);
            if(!todo)
            {
                throw new Error('Todo Can not found!')
            }
            return todo; 
        } 
        catch (error) {
            
            if(error.kind === "ObjectId")
            {
                return error.message = 'Invalid Object ID try again';
            }
            console.error(error.message);
            console.log(error.message);
            return error.message;
        }
    }
    ,
    createTodo:async (args) =>{
       try {
        const todo = new Todo({
            title:args.todoInput.title,
            description:args.todoInput.description,
            success:args.todoInput.success
        });

        if(!todo)
        {
            throw new Error('Todo Can not be created')
        }
        return await todo.save()
        
           
       } catch (error) {
          return error.message;
       }
    },
    updateTodo:async (args) =>{
        try {
            const {id} = args;
            const {title, description, success} = args.todoInput;
            const updated = {};

            if(title !== undefined)
            {
                updated.title = title;
            }
            if(description !== undefined)
            {
                updated.description = description;
            }
            if(success !== undefined)
            {
                updated.success = success;
            }

            const todo = await Todo.findByIdAndUpdate(
                id,
                updated,
                {
                    new:true
                });
            if(!todo){
                throw new Error('Can not be updated!')
            }
            return todo;


        }  catch (error) {
            console.error(error.message);
            if(error.kind === 'ObjectId')
            {
               return error.message = 'Invalid Object ID try again';
            }
            return error.message;
            
        
        }
    },
    deleteTodo:async ({id})=>{
       try {

        const todo = await Todo.findById(id);

        if(!todo){
            throw new Error("Not Found!");
        }

        await todo.remove();
        return 'Deleted Successfully'

       } catch (error) {
           console.error(error.message);
           if(error.kind === 'ObjectId')
           {
              return error.message = 'Invalid Object ID try again';

           }
           return error.message;
       }
    },
    deleteAllTodos:async ()=>{
        try {
            const deleteed = await Todo.deleteMany()
            if(!deleteed){
                throw new Error('Can not be deleted')
            }
            return 'All items Deleted Successfully';
        } catch (error) {
            console.error(error.message);
            return error.message;
        }
    },
    getTotalTodos: async () =>{
        try {
            return await Todo.countDocuments();
        } catch (error) {
            console.error(error.message);
        }
    }
}