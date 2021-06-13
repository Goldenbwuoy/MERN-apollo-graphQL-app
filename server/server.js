require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/");
const connectDb = require("./db");
const models = require("./models/index");

const PORT = process.env.PORT || 4000;

connectDb();

const app = express();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => {
		return { models };
	},
});

server.applyMiddleware({ app, path: "/api" });

app.listen(PORT, () => console.log(`GraphQL server running on PORT ${PORT}`));
