module.exports = {
	// Resolve the list of notes for a user when requested
	notes: async (user, args, { models }) => {
		return await models.Note.find({ author: user._id }).sort({ _id: -1 });
	},
	// Resolve the list of favourites for a user when requested
	favourites: async (user, args, { models }) => {
		return await models.Note.find({ favouriteBy: user._id }).sort({
			_id: -1,
		});
	},
};
