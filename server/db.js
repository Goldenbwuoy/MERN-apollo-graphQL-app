const mongoose = require("mongoose");

const connectDb = () => {
	mongoose.Promise = global.Promise;
	mongoose.connect(
		process.env.MONGODB_LOCAL_URI,
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		},
		() => console.log("Connected to mongo")
	);
	mongoose.connection.on("error", () => {
		throw new Error(
			`Unable to connect to database: ${process.env.MONGODB_LOCAL_URI}`
		);
	});
};

module.exports = connectDb;
