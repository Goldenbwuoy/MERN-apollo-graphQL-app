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

const IS_LOGGED_IN = gql`
	query WriteStatus {
		status {
			isLoggedIn
		}
	}
`;

export { GET_NOTES, GET_NOTE, IS_LOGGED_IN };
