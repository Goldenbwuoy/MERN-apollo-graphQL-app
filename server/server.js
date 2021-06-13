const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const PORT = process.env.PORT || 4000;

const typeDefs = gql`
	type Query {
		hello: String
	}
`;

const resolvers = {
	Query: {
		hello: () => "Hello World!!",
	},
};

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: "/api" });

app.listen(PORT, () => console.log(`GraphQL server running on PORT ${PORT}`));
