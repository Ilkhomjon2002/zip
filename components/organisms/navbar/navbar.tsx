import {
	Box,
	Button,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHeart, AiOutlineShopping } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import ButtonAtom from "../../atoms/button/button";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase.config";
import { useSelector } from "react-redux";
import BetterLink from "../../atoms/link/link";
const Navbar = () => {
	const router = useRouter();
	const wishlistCount = useSelector(
		(state: any) => state.wishlist.items.length
	);
	const user = useSelector((state: any) => state.auth.user);
	const cartItems = useSelector((state: any) => state.cart.items);
	const cartCount = cartItems.reduce(
		(prev: any, cur: any) => prev + +cur.itemQuantity,
		0
	);
	console.log(wishlistCount);
	const signOutHandler = () => {
		signOut(auth)
			.then(() => {})
			.catch((error: any) => {
				console.log(error);
			});
	};
	return (
		<Flex justifyContent={"space-between"} alignItems="center">
			<BetterLink href="/">
				<Text as="h1" fontSize={"35px"} fontWeight="700" padding={"10px 0"}>
					ZIP
				</Text>
			</BetterLink>
			<Flex alignItems={"center"} gap="15px">
				<BetterLink href="/wishlist">
					<Box position={"relative"}>
						<AiOutlineHeart fontSize={"25px"}></AiOutlineHeart>
						{wishlistCount > 0 && (
							<Box
								right="-25%"
								top="-25%"
								position={"absolute"}
								background="orange"
								color={"#fff"}
								width="15px"
								height={"15px"}
								display="flex"
								justifyContent={"center"}
								alignItems="center"
								borderRadius={"50%"}
								fontSize="10px"
							>
								{wishlistCount}
							</Box>
						)}
					</Box>
				</BetterLink>

				<BetterLink href="/cart">
					<Box position={"relative"}>
						<AiOutlineShopping fontSize={"25px"}></AiOutlineShopping>
						{cartCount > 0 && (
							<Box
								right="-25%"
								top="-25%"
								position={"absolute"}
								background="orange"
								color={"#fff"}
								width="15px"
								height={"15px"}
								display="flex"
								justifyContent={"center"}
								alignItems="center"
								borderRadius={"50%"}
								fontSize="10px"
							>
								{cartCount}
							</Box>
						)}
					</Box>
				</BetterLink>
				<Menu>
					<MenuButton display={"flex"} border={"none"} background="none">
						<BsPersonCircle color="#000" fontSize={"25px"}></BsPersonCircle>
					</MenuButton>
					<MenuList
						background={"#fff"}
						boxShadow={"0 4px 5px 0 rgba(0,0,0,0.25)"}
						borderRadius="10px"
						fontSize="20px"
						padding="15px"
						display="flex"
						overflow={"hidden"}
						gap="5px"
						flexDirection={"column"}
					>
						<MenuItem
							background={"#fff"}
							display="flex"
							flexDirection={"column"}
							alignItems="left"
							border="none"
							gap="2px"
						>
							<Text fontWeight={"bold"} padding="0" margin={"0"}>
								{!user ? "Welcome" : "Hello"}
							</Text>
							{!user ? (
								<>
									{" "}
									<Text fontSize={"16px"}>To access wishlist or cart</Text>
									<ButtonAtom
										rest={{
											fontSize: "16px",
											padding: "5px 10px",
											width: "fit-content",
										}}
										onClick={() => {
											router.replace("/signin");
										}}
										type="secondary"
									>
										Sign in
									</ButtonAtom>
								</>
							) : (
								<Text>{user.email}</Text>
							)}
						</MenuItem>
						<Box width={"100%"} height="1px" background={"grey"}></Box>
						<BetterLink href="/collections">
							<MenuItem background={"#fff"} border="none">
								Collections
							</MenuItem>
						</BetterLink>
						<BetterLink href="/wishlist">
							<MenuItem background={"#fff"} border="none">
								Wishlist
							</MenuItem>
						</BetterLink>
						<BetterLink href="/cart">
							<MenuItem background={"#fff"} border="none">
								Cart
							</MenuItem>
						</BetterLink>

						<MenuItem
							onClick={signOutHandler}
							background={"#fff"}
							border="none"
						>
							Log out
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		</Flex>
	);
};

export default Navbar;
