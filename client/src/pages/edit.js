import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import NoteForm from "../components/NoteForm";
import { EDIT_NOTE } from "../gql/mutations";
import { GET_ME, GET_NOTE } from "../gql/queries";

const EditNote = ({ match, history }) => {
	const id = match.params.id;

	//query hook, passing the id value as a varible
	const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
	// fetch the current user's data
	const { data: userData } = useQuery(GET_ME);

	// define the mutation
	const [editNote] = useMutation(EDIT_NOTE, {
		variables: { id },
		onCompleted: () => {
			history.push(`/note/${id}`);
		},
	});

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error! Note not found</p>;

	// if the current user and the author of the note do not match
	if (userData?.me.id !== data.note.author.id) {
		return <p>You are not authorized to edit this note</p>;
	}

	return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
