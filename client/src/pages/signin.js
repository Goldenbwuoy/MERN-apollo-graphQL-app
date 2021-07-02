import React, { useEffect } from "react";
import { useApolloClient, useMutation } from "@apollo/client";

import UserForm from "../components/UserForm";
import { IS_LOGGED_IN, SIGN_IN_USER } from "../gql/queries";

const SignIn = ({ history }) => {
	const client = useApolloClient();

	const [signIn, { loading, error }] = useMutation(SIGN_IN_USER, {
		onCompleted: (data) => {
			// store the token
			localStorage.setItem("token", data.signIn);
			//update the local cache
			client.writeQuery({
				query: IS_LOGGED_IN,
				data: {
					status: { isLoggedIn: true },
				},
			});
			// redirect user to the home page
			history.push("/");
		},
	});
	useEffect(() => {
		document.title = "Sign In - Notedly";
	});
	return (
		<>
			<UserForm action={signIn} formType="signin" />
			{/* if the data is loading, display a loading message */}
			{loading && <p>Loading....</p>}
			{/* if there is an error, display error message */}
			{error && <p>Error creating account!!</p>}
		</>
	);
};

export default SignIn;
