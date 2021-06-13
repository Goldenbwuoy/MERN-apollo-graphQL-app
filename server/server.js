require("dotenv").config();
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const connectDb = require("./db");
const models = require("./models/index");

const PORT = process.env.PORT || 4000;

connectDb();

const typeDefs = gql`
	type Note {
		id: ID!
		content: String!
		author: String!
	}

	type Query {
		hello: String!
		notes: [Note!]!
		note(id: ID!): Note!
	}

	type Mutation {
		newNote(content: String!): Note!
	}
`;

const resolvers = {
	Query: {
		hello: () => "Hello World!!",
		notes: async () => {
			return await models.Note.find();
		},
		note: async (parent, args) => {
			return await models.Note.findById(args.id);
		},
	},
	Mutation: {
		newNote: async (parent, args) => {
			return await models.Note.create({
				content: args.content,
				author: "Golden Tendekai",
			});
		},
	},
};

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/api" });

app.listen(PORT, () => console.log(`GraphQL server running on PORT ${PORT}`));
