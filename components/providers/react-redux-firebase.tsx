import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

import { auth } from "../../config/firebase.config";
import { authActions } from "../../store/authSlice";
import { wishlistActions } from "../../store/wishlistSlice";
import { cartActions } from "../../store/cartSlice";
import { db } from "../../config/firebase.config";
import { Box, Spinner as SpinnerComponent } from "@chakra-ui/react";

const ReactReduxFirebaseWrapper = ({ children }: { children: ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	const subscriptions: any = [];

	useEffect(() => {
		const authSub = onAuthStateChanged(
			auth,
			(user: any) => {
				if (user) {
					const userInfo = {
						accessToken: user.accessToken,
						email: user.email,
						uid: user.uid,
					};
					dispatch(authActions.setUser(userInfo));

					const wishlistSub = onSnapshot(
						doc(db, user.uid, "wishlist"),
						(document: any) => {
							try {
								const items = document.data().items;
								dispatch(wishlistActions.setItems(items));

								const cartSub = onSnapshot(
									doc(db, user.uid, "cart"),
									(document: any) => {
										try {
											const items = document.data().items;
											dispatch(cartActions.setItems(items));
											setIsLoading(false);
										} catch (error) {
											setIsLoading(false);
										}
									},
									(error) => {
										setIsLoading(false);
									}
								);

								subscriptions.push(cartSub);
							} catch (error) {
								setIsLoading(false);
							}
						},
						(error) => {
							setIsLoading(false);
						}
					);

					subscriptions.push(wishlistSub);
				} else {
					dispatch(authActions.setUser(null));
					dispatch(wishlistActions.setItems([]));
					dispatch(cartActions.setItems([]));
					setIsLoading(false);
				}
			},
			(error) => {
				setIsLoading(false);
			}
		);

		subscriptions.push(authSub);

		const unSubscribeAll = () => {
			subscriptions.forEach((sub: any) => sub());
			subscriptions.length = 0;
		};

		return unSubscribeAll;
	}, []);

	return isLoading ? (
		<Box
			width={"100%"}
			height={"100%"}
			position="fixed"
			display={"flex"}
			alignItems="center"
			justifyContent={"center"}
		>
			<SpinnerComponent size={"lg"}></SpinnerComponent>
		</Box>
	) : (
		<>{children}</>
	);
};

export default ReactReduxFirebaseWrapper;
