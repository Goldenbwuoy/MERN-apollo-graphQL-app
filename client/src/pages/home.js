import React from "react";
import { useQuery, gql } from "@apollo/client";

import Button from "../components/Button";

// the graphQL query stored as a variable
const GET_NOTES = gql`
	query NoteFeed($cursor: String) {
		noteFeed(cursor: $cursor) {
			cursor
			hasNextPage
			notes {
				id
				createdAt
				content
				favouriteCount
				author {
					id
					username
				}
			}
		}
	}
`;

const Home = () => {
	// query hook
	const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error!!</p>;

	return (
		<div>
			{data.noteFeed.notes.map((note) => (
				<div key={note.id}>{note.author.username}</div>
			))}
		</div>
	);
};

export default Home;
