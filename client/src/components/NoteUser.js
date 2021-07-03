import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../gql/queries";
import DeleteNote from "./DeleteNote";
import FavouriteNote from "./FavouriteNote";

const NoteUser = ({ note }) => {
	const { loading, error, data } = useQuery(GET_ME);

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error! Note not found</p>;

	return (
		<>
			<FavouriteNote
				me={data.me}
				noteId={note.id}
				favouriteCount={note.favouriteCount}
			/>
			<br />
			{data.me.id === note.author.id && (
				<>
					<Link to={`/edit/${note.id}`}>Edit</Link>
					<br />
					<DeleteNote noteId={note.id} />
				</>
			)}
		</>
	);
};

export default NoteUser;
