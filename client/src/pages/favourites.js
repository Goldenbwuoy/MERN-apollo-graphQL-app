import React, { useEffect } from "react";

const Favourites = () => {
	useEffect(() => {
		//update the doc title
		document.title = "Favourites - Notedly";
	}, []);
	return (
		<div>
			<h1>Notedly</h1>
			<p>These are my favourites</p>
		</div>
	);
};

export default Favourites;
