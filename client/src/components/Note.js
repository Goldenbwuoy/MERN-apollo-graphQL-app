import React from "react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import styled from "styled-components";

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
	return (
		<StyledNote key={note.id}>
			<MetaData>
				<MetaInfo>
					<img src={note.author.avatar} alt="" height="50px" />
				</MetaInfo>
				<MetaInfo>
					<em>by</em> {note.author.username} <br />
					{console.log(note.createdAt)}
					{format(new Date(note.createdAt), "MMM d yyyy")}
				</MetaInfo>
				<UserActions>
					<em>Favourites:</em> {note.favouriteCount}
				</UserActions>
			</MetaData>
			<ReactMarkdown children={note.content} />
		</StyledNote>
	);
};

export default Note;
