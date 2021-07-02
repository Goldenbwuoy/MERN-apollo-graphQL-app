import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { gql, useApolloClient } from "@apollo/client";

import Home from "./home";
import MyNotes from "./mynotes";
import Favourites from "./favourites";
import NotePage from "./note";
import Layout from "../components/Layout";
import SignUp from "./signup";
import SignIn from "./signin";

const IS_LOGGED_IN = gql`
	query ReadStatus {
		status {
			isLoggedIn
		}
	}
`;

const Pages = () => {
	return (
		<Router>
			{/* Wrap the routes within the Layout component */}
			<Layout>
				<Route exact path="/" component={Home} />
				<PrivateRoute path="/mynotes" component={MyNotes} />
				<PrivateRoute path="/favourites" component={Favourites} />
				<Route path="/note/:id" component={NotePage} />
				<Route path="/signup" component={SignUp} />
				<Route path="/signin" component={SignIn} />
			</Layout>
		</Router>
	);
};

const PrivateRoute = ({ component: Component, ...rest }) => {
	const client = useApolloClient();
	const { status } = client.readQuery({ query: IS_LOGGED_IN });

	return (
		<Route
			{...rest}
			render={(props) =>
				status.isLoggedIn === true ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: "/signin",
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

export default Pages;
