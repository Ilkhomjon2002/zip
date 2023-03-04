import { useState } from "react";
import styled from "styled-components";

import { HiFilter } from "react-icons/hi";
import BrandFilter from "../brandFilter/brandFilter";
import CategoryFilter from "../brandFilter/brandFilter";
import Modal from "../modal/modal";

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
	padding: 16px;

	.title {
		color: #4a00e0;
		font-size: 18px;
		font-weight: 500;
		margin-bottom: 16px;
	}

	.filters {
		display: flex;
	}
`;

const SmallFilter = ({ brandItems, categoryItems }: any) => {
	const [showFilter, setShowFilter] = useState(false);

	const openFilterHandler = () => {
		setShowFilter(true);
	};

	const closeFilterHandler = () => {
		setShowFilter(false);
	};

	return (
		<>
			<Button onClick={openFilterHandler}>
				<HiFilter />
			</Button>
			{showFilter && (
				<Modal closeHandler={closeFilterHandler}>
					<ModalDiv>
						<div className="title">Filter</div>
						<div className="filters">
							<BrandFilter items={brandItems} />
							<CategoryFilter items={categoryItems} />
						</div>
					</ModalDiv>
				</Modal>
			)}
		</>
	);
};

export default SmallFilter;
