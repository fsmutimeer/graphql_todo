const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Todo {
    _id : ID!
    title:String!
    description:String!
    success:Boolean
    date:String
}

input TodoInput {
    title:String!
    description:String!
    success:Boolean
}

type Query {
    getTodos:[Todo!]!
    getTodo(id:ID):Todo
    getTotalTodos:Int
}

type Mutation {
    createTodo(todoInput:TodoInput):Todo
    updateTodo(id:ID, todoInput:TodoInput):Todo
    deleteTodo(id:ID):String
    deleteAllTodos:String
}

schema {
    query : Query
    mutation:Mutation
}

`)