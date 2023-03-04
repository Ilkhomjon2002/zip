import styled from "styled-components";

import { AiOutlineHeart } from "react-icons/ai";
import { Box, Flex, Stack } from "@chakra-ui/react";

const EmptyWishlist = () => {
	return (
		<Stack
			flex={"1"}
			height="80vh"
			justifyContent={"center"}
			alignItems="center"
			padding={"16px"}
		>
			<Flex
				alignItems={"center"}
				justifyContent="center"
				border="1px solid #eee"
				box-shadow="0 0 10px rgba(0, 0, 0, 0.05)"
				borderRadius={"50%"}
				padding="20px"
			>
				<AiOutlineHeart fontSize={"30px"} />
			</Flex>
			<Box mt={"24px"} className="text">
				Your wishlist is empty
			</Box>
		</Stack>
	);
};

export default EmptyWishlist;
