import React, { useEffect } from "react";
import { useMutation, useApolloClient } from "@apollo/client";

import UserForm from "../components/UserForm";
import { IS_LOGGED_IN, SIGNUP_USER } from "../gql/queries";

const SignUp = ({ history }) => {
	//Apollo client
	const client = useApolloClient();

	useEffect(() => {
		document.title = "Sign Up - Notedly";
	});

	// add the mutation hook
	const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
		onCompleted: (data) => {
			//store the JWT in localStorage
			localStorage.setItem("token", data.signUp);

			// update the local cache
			client.writeQuery({
				query: IS_LOGGED_IN,
				data: {
					status: { isLoggedIn: true },
				},
			});
			// redirect the user to the homepage
			history.push("/");
		},
	});
	return (
		<>
			<UserForm action={signUp} formType="signup" />
			{/* if the data is loading, display a loading message */}
			{loading && <p>Loading....</p>}
			{/* if there is an error, display error message */}
			{error && <p>Error creating account!!</p>}
		</>
	);
};

export default SignUp;
