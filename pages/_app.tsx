import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/organisms/navbar/navbar";
import { Box, ChakraProvider } from "@chakra-ui/react";
import ReactReduxFirebaseWrapper from "../components/providers/react-redux-firebase";
import { Provider } from "react-redux";
import { store } from "../store/index";
export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<ChakraProvider>
				<ReactReduxFirebaseWrapper>
					<Box w={"min(95%,1300px)"} margin={"0 auto"}>
						<Navbar></Navbar>
						<Component {...pageProps} />
					</Box>
				</ReactReduxFirebaseWrapper>
			</ChakraProvider>
		</Provider>
	);
}
