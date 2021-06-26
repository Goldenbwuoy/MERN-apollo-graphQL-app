module.exports = {
	//Resolve the author info for a note when requested
	author: async (note, args, { models }) => {
		return await models.User.findById(note.author);
	},
	// Resolve the favouritedby info for a note when requested
	favouriteBy: async (note, args, { models }) => {
		return await models.User.find({ _id: { $in: note.favouriteBy } });
	},
};
