import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./home";
import MyNotes from "./mynotes";
import Favourites from "./favourites";
import Layout from "../components/Layout";

const Pages = () => {
	return (
		<Router>
			{/* Wrap the routes within the Layout component */}
			<Layout>
				<Route exact path="/" component={Home} />
				<Route path="/mynotes" component={MyNotes} />
				<Route path="/favourites" component={Favourites} />
			</Layout>
		</Router>
	);
};

export default Pages;
