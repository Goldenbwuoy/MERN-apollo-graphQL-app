import React from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import styled from "styled-components";
import logo from "../img/logo.svg";
import { Link } from "react-router-dom";

const HeaderBar = styled.header`
	width: 100%;
	padding: 0.5em 1em;
	display: flex;
	height: 64px;
	position: fixed;
	align-items: center;
	background-color: #fff;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
	z-index: 1;
`;

const LogoText = styled.h1`
	margin: 0;
	padding: 0;
	display: inline;
`;

const IS_LOGGED_IN = gql`
	query ReadStatus {
		status {
			isLoggedIn
		}
		someValue {
			value
		}
	}
`;

const UserState = styled.div`
	margin-left: auto;
`;

const Header = () => {
	const client = useApolloClient();

	const { status, someValue } = client.readQuery({ query: IS_LOGGED_IN });

	console.log(someValue);

	return (
		<HeaderBar>
			<img src={logo} alt="Notedly Logo" height={40} />
			<LogoText>Notedly</LogoText>
			{/* If logged in display logout link, else display sign-in options */}
			<UserState>
				{status.isLoggedIn ? (
					<p>Log Out</p>
				) : (
					<p>
						<Link to="/signup">Sign In</Link>
						<Link to="/signup">Sign Up</Link>
					</p>
				)}
			</UserState>
		</HeaderBar>
	);
};

export default Header;
