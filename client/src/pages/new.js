import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import NoteForm from "../components/NoteForm";
import { NEW_NOTE } from "../gql/mutations";
import { GET_NOTES } from "../gql/queries";

const NewNote = ({ history }) => {
	useEffect(() => {
		document.title = "New Note - Notedly";
	}, []);

	const [data, { loading, error }] = useMutation(NEW_NOTE, {
		refetchQueries: [{ query: GET_NOTES }],
		onCompleted: (data) => {
			// when completed, redirect the user to the note page
			history.push(`/note/${data.newNote.id}`);
		},
	});
	return (
		<>
			{/* if the data is loading, display a loading message */}
			{loading && <p>Loading....</p>}
			{/* if there is an error, display error message */}
			{error && <p>Error saving the note!!</p>}
			<NoteForm action={data} />
		</>
	);
};

export default NewNote;
