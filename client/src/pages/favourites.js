import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import NoteFeed from "../components/NoteFeed";
import { GET_MY_FAVOURITES } from "../gql/queries";

const Favourites = () => {
	const { loading, error, data } = useQuery(GET_MY_FAVOURITES);

	useEffect(() => {
		//update the doc title
		document.title = "Favourites - Notedly";
	}, []);

	// if the data is loading, display a loading message
	if (loading) return <p>Loading...</p>;
	// if there is an error fetching the data, display the error message
	if (error) return <p>{`Error ${error.message}`}</p>;

	if (data.me.favourites.length !== 0) {
		return <NoteFeed notes={data.me.favourites} />;
	} else {
		return <p>You don't have any Favourites yet.</p>;
	}
};

export default Favourites;
