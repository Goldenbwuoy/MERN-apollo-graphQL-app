import React from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import styled from "styled-components";
import { useQuery, useApolloClient } from "@apollo/client";

import NoteUser from "./NoteUser";
import { IS_LOGGED_IN } from "../gql/queries";

//keep notes from extending wider than 800px
const StyledNote = styled.article`
	max-width: 800px;
	margin: 0 auto;
`;

const MetaData = styled.div`
	@media (min-width: 500px) {
		display: flex;
		align-items: top;
	}
`;

// add sone space between avatar and meta info
const MetaInfo = styled.div`
	padding-right: auto;
`;

// Align 'UserActions' to the right on large screens
const UserActions = styled.div`
	margin-left: auto;
`;

const Note = ({ note }) => {
	const client = useApolloClient();

	const { status } = client.readQuery({ query: IS_LOGGED_IN });
	return (
		<StyledNote key={note.id}>
			<MetaData>
				<MetaInfo>
					<img src={note.author.avatar} alt="" height="50px" />
				</MetaInfo>
				<MetaInfo>
					<em>by</em> {note.author.username} <br />
					{format(new Date(note.createdAt), "MMM d yyyy")}
				</MetaInfo>
				{status.isLoggedIn ? (
					<UserActions>
						<NoteUser note={note} />
					</UserActions>
				) : (
					<UserActions>
						<em>Favourites:</em> {note.favouriteCount}
					</UserActions>
				)}
			</MetaData>
			<ReactMarkdown children={note.content} />
		</StyledNote>
	);
};

export default Note;
