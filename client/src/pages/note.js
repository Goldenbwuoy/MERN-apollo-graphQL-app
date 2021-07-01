import React from "react";
import { useQuery, gql } from "@apollo/client";

import Note from "../components/Note";

// the note query which accepts an ID variable
const GET_NOTE = gql`
	query note($id: ID!) {
		note(id: $id) {
			id
			createdAt
			content
			favouriteCount
			author {
				username
				id
				avatar
			}
		}
	}
`;

const NotePage = ({ match }) => {
	const id = match.params.id;

	//query hook, passing the id value as a varible
	const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error! Note not found</p>;

	return <Note note={data.note} />;
};

export default NotePage;
