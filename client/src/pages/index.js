import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./home";
import MyNotes from "./mynotes";
import Favourites from "./favourites";
import NotePage from "./note";
import Layout from "../components/Layout";
import SignUp from "./signup";
import SignIn from "./signin";

const Pages = () => {
	return (
		<Router>
			{/* Wrap the routes within the Layout component */}
			<Layout>
				<Route exact path="/" component={Home} />
				<Route path="/mynotes" component={MyNotes} />
				<Route path="/favourites" component={Favourites} />
				<Route path="/note/:id" component={NotePage} />
				<Route path="/signup" component={SignUp} />
				<Route path="/signin" component={SignIn} />
			</Layout>
		</Router>
	);
};

export default Pages;
