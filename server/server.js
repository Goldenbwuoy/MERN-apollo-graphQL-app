require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/");
const connectDb = require("./db");
const models = require("./models/index");

const PORT = process.env.PORT || 4000;

connectDb();

const app = express();

const getUser = (token) => {
	if (token) {
		try {
			// return the user info from the token
			return jwt.verify(token, process.env.JWT_SECRET);
		} catch (err) {
			// throw an error if there is a problem with the token
			throw new Error("Invalid token");
		}
	}
};

// apollo server setup
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		// get the user token from the headers
		const token = req.headers.authorization;
		// retrieve a user from the token
		const user = getUser(token);
		// console.log(user);
		return { models, user };
	},
});

server.applyMiddleware({ app, path: "/api" });

app.listen(PORT, () => console.log(`GraphQL server running on PORT ${PORT}`));
