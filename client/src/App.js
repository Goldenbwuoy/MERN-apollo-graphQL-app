import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Pages from "./pages";
import GlobalStyle from "./components/GlobalStyle";

// configure our API URI and cache
const uri = process.env.REACT_APP_API_URI;
const cache = new InMemoryCache();

// configure Apollo client
const client = new ApolloClient({
	uri,
	cache,
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
