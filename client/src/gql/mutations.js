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

export { SIGN_IN_USER, SIGNUP_USER, NEW_NOTE };
