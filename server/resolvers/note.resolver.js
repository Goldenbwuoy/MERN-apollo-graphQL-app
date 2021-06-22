module.exports = {
	//Resolve the author info for a note when requested
	author: async (note, args, { models }) => {
		return await models.User.findById(note.author);
	},
};
