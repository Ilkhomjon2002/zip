import { useState } from "react";
import { BsCaretDown } from "react-icons/bs";
import { Box, Modal, useDisclosure } from "@chakra-ui/react";
import SortBy from "../sortBy/sortBy";
import styled from "styled-components";
const Button = styled.button`
	color: inherit;
	background-color: white;
	border: none;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 4px;
	margin-right: 8px;
	cursor: pointer;
`;

const ModalDiv = styled.div`
	padding: 16px 20px 16px 16px;

	.items {
		.item {
			display: flex;
			align-items: center;
			margin-bottom: 16px;
			.text {
				margin: 0;
				padding: 0;
				font-size: 14px;
			}
		}
	}
`;

const SmallSort = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button onClick={onOpen}>
				<BsCaretDown />
			</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalDiv>
					<Box
						color="#4a00e0"
						font-size="18px"
						font-weight="500"
						margin-bottom="24px"
					>
						Sort by
					</Box>
					<SortBy />
				</ModalDiv>
			</Modal>
		</>
	);
};

export default SmallSort;
