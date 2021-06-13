const Query = require("./query.resolver");
const Mutation = require("./mutation.resolver");
const { GraphQLDateTime } = require("graphql-iso-date");

module.exports = {
	Query,
	Mutation,
	DateTime: GraphQLDateTime,
};
