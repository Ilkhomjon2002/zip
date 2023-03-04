import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import EmptyWishlist from "../components/atoms/emptyWishList/emptyWishlist";
import SignInPromptTemplate from "../components/atoms/signinPrompt/signinPrompt";
import WishlistItemCard from "../components/atoms/wishlistItemCard/wishlistitemCard";
import getItemById from "../utils/getItemById";
import { useSelector } from "react-redux";
import BreadCrumb from "../components/atoms/breadcrumb/breadcrumb";
import { Box, Flex, Text } from "@chakra-ui/react";

const Wishlist = () => {
	const [clothes, setClothes] = useState([]);
	const [activateNotification, setActivateNotification] = useState(false);
	const [imageToBeNotified, setImageToBeNotified] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const user = useSelector((state: any) => state.auth.user);
	const wishlistItems = useSelector((state: any) => state.wishlist.items);

	useEffect(() => {
		const items = wishlistItems.map((item: any) => {
			const itemDetails = getItemById(item.id);
			console.log(item);
			return { size: item.itemSize, ...itemDetails };
		});

		setClothes(() => {
			setIsLoading(false);
			return items;
		});
	}, [wishlistItems]);

	useEffect(() => {
		if (imageToBeNotified) {
			setActivateNotification(true);
			setTimeout(() => {
				setActivateNotification(false);
			}, 3000);
		}
	}, [imageToBeNotified]);

	return (
		<>
			<Head>
				<title>Wishlist</title>
			</Head>
			<BreadCrumb
				links={[
					{ id: "/", title: "Home" },
					{ id: "/wishlist", title: "Wishlist", disabled: true },
				]}
			/>
			{!isLoading &&
				(user ? (
					clothes.length > 0 ? (
						<Box p="16px">
							<Box fontSize="18px" fontWeight="500">
								Wishlist
								<Text as="span" fontSize="16px" fontWeight="400">
									{clothes.length} items
								</Text>
							</Box>
							<Box
								margin="16px 0"
								display="grid"
								gridTemplateColumns="repeat(5, 1fr)"
								gap="16px"
							>
								{clothes.map((item: any) => (
									<WishlistItemCard
										key={item.id}
										{...item}
										setImage={setImageToBeNotified}
									/>
								))}
							</Box>
						</Box>
					) : (
						<EmptyWishlist />
					)
				) : (
					<SignInPromptTemplate type="wishlist" />
				))}
			<Flex
				background={"#333"}
				color="#fff"
				p={"16px"}
				borderRadius={"6px"}
				fontSize="14px"
				position={"fixed"}
				top="138px"
				right={"16px"}
				zIndex="10"
				alignItems={"center"}
				boxShadow={"0 0 16px rgba(0,0,0,0.16)"}
				display={activateNotification ? "flex" : "none"}
				className={`notification ${activateNotification ? "activate" : ""}`}
			>
				{imageToBeNotified && (
					<Image
						alt=""
						src={imageToBeNotified}
						width={33}
						height={41}
						layout="fixed"
						priority
					/>
				)}
				<p>Item added to cart successfully</p>
			</Flex>
		</>
	);
};
// background-color: #333;
// 	color: white;
// 	padding: 16px;
// 	border-radius: 6px;
// 	font-size: 14px;
// 	position: fixed;
// 	top: 138px;
// 	right: 16px;
// 	z-index: 10;
// 	display: flex;
// 	align-items: center;
// 	box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
// 	display: none;

// 	p {
// 		margin-left: 8px;
// 	}

// 	&.activate {
// 		display: flex;
// 		animation: ${fade} 3s;
// 	}

// 	@media (max-width: 640px) {
// 		top: auto;
// 		bottom: 16px;
// 		padding: 10px;
// 	}

export default Wishlist;
