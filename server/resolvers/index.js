const Query = require("./query.resolver");
const Mutation = require("./mutation.resolver");
const Note = require("./note.resolver");
const User = require("./user.resolver");
const { GraphQLDateTime } = require("graphql-iso-date");

module.exports = {
	Query,
	Mutation,
	Note,
	User,
	DateTime: GraphQLDateTime,
};
