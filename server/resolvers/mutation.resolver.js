require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
	AuthenticationError,
	ForbiddenError,
} = require("apollo-server-express");

module.exports = {
	newNote: async (parent, args, { models }) => {
		return await models.Note.create({
			content: args.content,
			author: "Golden Tendekai",
		});
	},
	deleteNote: async (parent, { id }, { models }) => {
		try {
			await models.Note.findOneAndRemove({ _id: id });
			return true;
		} catch (err) {
			return false;
		}
	},
	updateNote: async (parent, { id, content }, { models }) => {
		return await models.Note.findOneAndUpdate(
			{ _id: id },
			{ $set: { content } },
			{ new: true }
		);
	},
	signUp: async (parent, { username, email, password }, { models }) => {
		email = email.trim().toLowerCase();
		const hashed = await bcrypt.hash(password, 10);
		try {
			const user = await models.User.create({
				username,
				email,
				password: hashed,
			});
			return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
		} catch (err) {
			console.log(err);

			throw new Error("Error creating account");
		}
	},

	signIn: async (parent, { username, email, password }, { models }) => {
		if (email) {
			// normalize email
			email = email.trim().toLowerCase();
		}
		const user = await models.User.findOne({
			$or: [{ email }, { username }],
		});

		//throw authentication error if no user is found
		if (!user) {
			throw new AuthenticationError("Error signing in (user not found)");
		}

		//throw an authentication error if passwords don't match
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new AuthenticationError(
				"Error signing in (invalid password)"
			);
		}
		return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
	},
};
