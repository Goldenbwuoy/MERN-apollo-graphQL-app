const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
