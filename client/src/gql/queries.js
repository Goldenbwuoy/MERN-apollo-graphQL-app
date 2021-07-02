import { gql } from "@apollo/client";

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
					avatar
				}
			}
		}
	}
`;

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

const IS_LOGGED_IN = gql`
	query WriteStatus {
		status {
			isLoggedIn
		}
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

export {
	GET_NOTES,
	GET_NOTE,
	SIGN_IN_USER,
	SIGNUP_USER,
	IS_LOGGED_IN,
	NEW_NOTE,
};
