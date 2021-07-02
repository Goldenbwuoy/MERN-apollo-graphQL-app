import React from "react";
import { useQuery } from "@apollo/client";

import Note from "../components/Note";
import { GET_NOTE } from "../gql/queries";

const NotePage = ({ match }) => {
	const id = match.params.id;

	//query hook, passing the id value as a varible
	const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error! Note not found</p>;

	return <Note note={data.note} />;
};

export default NotePage;
