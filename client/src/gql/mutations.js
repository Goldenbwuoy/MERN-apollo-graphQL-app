import { gql } from "@apollo/client";

const SIGN_IN_USER = gql`
	mutation signIn($email: String, $password: String!) {
		signIn(email: $email, password: $password)
	}
`;

const SIGNUP_USER = gql`
	mutation signUp($email: String!, $username: String!, $password: String!) {
		signUp(email: $email, username: $username, password: $password)
	}
`;

const NEW_NOTE = gql`
	mutation newNote($content: String!) {
		newNote(content: $content) {
			id
			content
			createdAt
			favouriteCount
			favouriteBy {
				id
				username
			}
			author {
				id
				username
			}
		}
	}
`;

const EDIT_NOTE = gql`
	mutation updateNote($id: ID!, $content: String!) {
		updateNote(id: $id, content: $content) {
			id
			content
			createdAt
			favouriteCount
			favouriteBy {
				id
				username
			}
			author {
				id
				username
			}
		}
	}
`;

const DELETE_NOTE = gql`
	mutation deleteNote($id: ID!) {
		deleteNote(id: $id)
	}
`;

const TOGGLE_FAVOURITE = gql`
	mutation toggleFavourite($id: ID!) {
		toggleFavourite(id: $id) {
			id
			favouriteCount
		}
	}
`;

export {
	SIGN_IN_USER,
	SIGNUP_USER,
	NEW_NOTE,
	EDIT_NOTE,
	DELETE_NOTE,
	TOGGLE_FAVOURITE,
};
