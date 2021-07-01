import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client";
import Pages from "./pages";
import { setContext } from "apollo-link-context";
import GlobalStyle from "./components/GlobalStyle";

// configure our API URI and cache
const uri = process.env.REACT_APP_API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: localStorage.getItem("token") || "",
		},
	};
});

// configure Apollo client
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache,
	resolvers: {},
	connectToDevTools: true,
});

function App() {
	console.log(process.env.REACT_APP_API_URI);
	return (
		<ApolloProvider client={client}>
			<GlobalStyle />
			<Pages />
		</ApolloProvider>
	);
}

export default App;
