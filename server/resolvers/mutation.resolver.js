require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {
	AuthenticationError,
	ForbiddenError,
} = require("apollo-server-express");

const gravatar = require("../util/gravatar");

module.exports = {
	newNote: async (parent, args, { models, user }) => {
		if (!user) {
			throw new AuthenticationError(
				"You must be signed in to create a note"
			);
		}
		return await models.Note.create({
			content: args.content,
			// reference the author's mongo id
			author: mongoose.Types.ObjectId(user.id),
		});
	},
	deleteNote: async (parent, { id }, { models, user }) => {
		// throw an authentication error if not a user
		if (!user) {
			throw new AuthenticationError(
				"You must be signed in to delete a note"
			);
		}

		// find the note
		const note = await models.Note.findById(id);
		// throw a forbidden error if note owner and current user don't match
		if (note && String(note.author) !== user.id) {
			throw new ForbiddenError(
				"You don't have permission to delete the note"
			);
		}
		try {
			await note.remove();
			return true;
		} catch (err) {
			return false;
		}
	},
	updateNote: async (parent, { id, content }, { models, user }) => {
		// throw an authentication error if not a user
		if (!user) {
			throw new AuthenticationError(
				"You must be signed in to update a note"
			);
		}

		// find the note
		const note = await models.Note.findById(id);
		// throw a forbidden error if note owner and current user don't match
		if (note && String(note.author) !== user.id) {
			throw new ForbiddenError(
				"You don't have permission to update the note"
			);
		}
		return await models.Note.findOneAndUpdate(
			{ _id: id },
			{ $set: { content } },
			{ new: true }
		);
	},
	toggleFavourite: async (parent, { id }, { models, user }) => {
		// throw an authentication error if not a user
		if (!user) {
			throw new AuthenticationError();
		}

		// check if the user has already favourited the note
		let noteCheck = await models.Note.findById(id);
		const hasUser = noteCheck.favouriteBy.indexOf(user.id);

		// if the user exists in the list
		// pull then from the list and reduce the favourites by one
		if (hasUser >= 0) {
			return await models.Note.findByIdAndUpdate(
				id,
				{
					$pull: {
						favouriteBy: mongoose.Types.ObjectId(user.id),
					},
					$inc: {
						favouriteCount: -1,
					},
				},
				{ new: true }
			);
		} else {
			// is the user doesn't exist in the list
			//add them to the list and increment the favouriteCount by one
			return await models.Note.findByIdAndUpdate(
				id,
				{
					$push: {
						favouriteBy: mongoose.Types.ObjectId(user.id),
					},
					$inc: {
						favouriteCount: 1,
					},
				},
				{ new: true }
			);
		}
	},
	signUp: async (parent, { username, email, password }, { models }) => {
		email = email.trim().toLowerCase();
		const hashed = await bcrypt.hash(password, 10);
		//create a gravatar url
		const avatar = gravatar(email);
		try {
			const user = await models.User.create({
				username,
				email,
				avatar,
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
