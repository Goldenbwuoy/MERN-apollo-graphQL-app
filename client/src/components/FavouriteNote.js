import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { TOGGLE_FAVOURITE } from "../gql/mutations";
import { GET_MY_FAVOURITES } from "../gql/queries";
import ButtonAsLink from "./ButtonAsLink";

const FavouriteNote = ({ favouriteCount, me, noteId }) => {
	// store the note's favourite count in state
	const [count, setCount] = useState(favouriteCount);
	// store if the user has favourited the note as state
	const [favourited, setFavourited] = useState(
		//check if the note exists in the user favourite list
		me.favourites.filter((note) => note.id === noteId).length > 0
	);

	// toggleFavourite mutation hook
	const [toggleFavourite] = useMutation(TOGGLE_FAVOURITE, {
		variables: {
			id: noteId,
		},
		refetchQueries: [{ query: GET_MY_FAVOURITES }],
	});

	return (
		<>
			{favourited ? (
				<ButtonAsLink
					onClick={() => {
						toggleFavourite();
						setFavourited(false);
						setCount(count - 1);
					}}
				>
					Remove Favourites
				</ButtonAsLink>
			) : (
				<ButtonAsLink
					onClick={() => {
						toggleFavourite();
						setFavourited(true);
						setCount(count + 1);
					}}
				>
					Add to Favourites
				</ButtonAsLink>
			)}
			: {count}
		</>
	);
};

export default FavouriteNote;
