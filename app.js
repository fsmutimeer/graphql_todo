const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

//initialize the app
const app = express();

app.get('/',(req, res)=>{
    res.send('api running')
})
//Graphql server
app.use('/graphql',
        graphqlHTTP({
            schema:graphQLSchema,
            rootValue:graphQLResolvers,
            graphiql:true
        })
)

//DATABASE Config
mongoose.connect('mongodb+srv://admin1:admin@todoapp.ixqae.mongodb.net/graphTODO?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "graphTODO",
  
})
.then(
    console.log('MONDODB Connected')
)
.catch(err=>{
    return console.error(err);
})

app.listen(process.env.PORT || 4000, ()=>console.log('server is running at http://localhost:3000'));