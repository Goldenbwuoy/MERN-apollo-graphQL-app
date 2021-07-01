import React from "react";
import { useQuery, gql } from "@apollo/client";
import NoteFeed from "../components/NoteFeed";

import Button from "../components/Button";

// the graphQL query stored as a variable
const GET_NOTES = gql`
	query NoteFeed($cursor: String) {
		noteFeed(cursor: $cursor) {
			cursor
			hasNextPage
			notes {
				id
				createdAt
				content
				favouriteCount
				author {
					id
					username
					avatar
				}
			}
		}
	}
`;

const Home = () => {
	// query hook
	const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error!!</p>;

	return (
		<>
			<NoteFeed notes={data.noteFeed.notes} />
			{/* Only display the Load More button if hasNextPage is true */}
			{data.noteFeed.hasNextPage && (
				<Button
					onClick={() =>
						fetchMore({
							variables: {
								cursor: data.noteFeed.cursor,
							},
							updateQuery: (
								previousResult,
								{ fetchMoreResult }
							) => {
								return {
									noteFeed: {
										cursor: fetchMoreResult.noteFeed.cursor,
										hasNextPage:
											fetchMoreResult.noteFeed
												.hasNextPage,
										// combine the new results and the old
										notes: [
											...previousResult.noteFeed.notes,
											...fetchMoreResult.noteFeed.notes,
										],
										__typename: "noteFeed",
									},
								};
							},
						})
					}
				>
					Load More
				</Button>
			)}
		</>
	);
};

export default Home;
