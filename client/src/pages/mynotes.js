import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";

import { GET_MY_NOTES } from "../gql/queries";
import NoteFeed from "../components/NoteFeed";

const MyNotes = () => {
	const { loading, error, data } = useQuery(GET_MY_NOTES);

	useEffect(() => {
		//update the doc title
		document.title = "My Notes - Notedly";
	}, []);

	// if the data is loading, display a loading message
	if (loading) return <p>Loading...</p>;
	// if there is an error fetching the data, display the error message
	if (error) return <p>{`Error ${error.message}`}</p>;

	if (data.me.notes.length !== 0) {
		return <NoteFeed notes={data.me.notes} />;
	} else {
		return <p>You don't have any Notes yet.</p>;
	}
};

export default MyNotes;
