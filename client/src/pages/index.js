import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./home";
import MyNotes from "./mynotes";
import Favourites from "./favourites";

const Pages = () => {
	return (
		<Router>
			<Route exact path="/" component={Home} />
			<Route path="/mynotes" component={MyNotes} />
			<Route path="/favourites" component={Favourites} />
		</Router>
	);
};

export default Pages;
