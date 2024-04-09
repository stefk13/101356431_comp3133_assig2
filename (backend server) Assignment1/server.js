const express = require('express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const mongoose = require('mongoose');

const { ApolloServer } = require('apollo-server-express');

mongoose.connect('mongodb+srv://admin:pass921@cluster0.ydy4wmd.mongodb.net/COMP3133_Assignment1?retryWrites=true&w=majority', {})
  .then(() => console.log('Successful MongoDB connection'))
  .catch(err => console.error('Error MongoDB connection', err));

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log("Incoming request:", req.body); 
  next(); 
});

const server = new ApolloServer({ 
  typeDefs,
  resolvers 
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer();

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
