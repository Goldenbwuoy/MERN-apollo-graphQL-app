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
		favouriteCount: {
			type: Number,
			default: 0,
		},
		favouriteBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{ timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;
