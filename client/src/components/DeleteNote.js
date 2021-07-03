import { useMutation } from "@apollo/client";
import React from "react";
import { withRouter } from "react-router-dom";

import ButtonAsLink from "./ButtonAsLink";
import { DELETE_NOTE } from "../gql/mutations";
import { GET_MY_NOTES, GET_NOTES } from "../gql/queries";

const DeleteNote = ({ noteId, history }) => {
	const [deleteNote] = useMutation(DELETE_NOTE, {
		variables: {
			id: noteId,
		},
		// refetch the note list queries to update the cache
		refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
		onCompleted: (data) => {
			// redirect user to the mynotes page
			history.push("/mynotes");
		},
	});
	return <ButtonAsLink onClick={deleteNote}>Delete Note</ButtonAsLink>;
};

export default withRouter(DeleteNote);
