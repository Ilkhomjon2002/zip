import { useEffect, useState } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";

import getItems from "../../utils/getItems";
import SmallSort from "../../components/atoms/smallSort/smallSort";
import SmallFilter from "../../components/atoms/smallFilter/smallFilter";
import EmptyResults from "../../components/atoms/emptyResults./empytResults";
import ItemCard from "../../components/atoms/item-cart.tsx/item-cart";
import BrandFilter from "../../components/atoms/brandFilter/brandFilter";
import SortSelect from "../../components/atoms/sortSelect/sortSelect";
import { Box, Flex, Text } from "@chakra-ui/react";

const Products = ({ clothes, brands, categories }: any) => {
	const [width, setWidth] = useState(window.innerWidth);
	const filteredBrands = useSelector((state: any) => state.filter.brands);
	const filteredCategories = useSelector(
		(state: any) => state.filter.categories
	);
	const filteredSort = useSelector((state: any) => state.filter.sort);

	let filteredClothes;

	filteredClothes =
		filteredBrands.length > 0
			? [...clothes].filter((value) => filteredBrands.includes(value.brand))
			: [...clothes];

	filteredClothes =
		filteredCategories.length > 0
			? filteredClothes.filter((value) =>
					filteredCategories.includes(value.category)
			  )
			: filteredClothes;

	if (filteredSort === "price_high_to_low") {
		filteredClothes = filteredClothes.sort((a, b) => +b.amount - +a.amount);
	} else if (filteredSort === "price_low_to_high") {
		filteredClothes = filteredClothes.sort((a, b) => +a.amount - +b.amount);
	}

	useEffect(() => {
		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	return (
		<>
			<Head>
				<title>Collections</title>
			</Head>

			<Flex flex="1">
				{width > 640 && (
					<Box width="300px" padding="16px">
						<Text fontSize={"18px"} fontWeight="500">
							Filters
						</Text>
						<BrandFilter items={brands} type="brand" />
						<BrandFilter items={categories} type="category" />
					</Box>
				)}
				<Box width="100%" padding="16px" display="flex" flexDirection="column">
					<Flex alignItems={"center"}>
						<Text fontSize="18px" fontWeight="500" marginRight="auto">
							Collections
						</Text>
						{width > 640 ? (
							<SortSelect />
						) : (
							<Box>
								<SmallSort />
								<SmallFilter brandItems={brands} categoryItems={categories} />
							</Box>
						)}
					</Flex>
					{filteredClothes.length > 0 ? (
						<Box
							margin="16px 0"
							display="grid"
							gridTemplateColumns="repeat(4, 1fr)"
							gap="16px"
						>
							{filteredClothes.map((item, index) => {
								return (
									<ItemCard key={item.id} {...item} setPriority={index < 8} />
								);
							})}
						</Box>
					) : (
						<EmptyResults />
					)}
				</Box>
			</Flex>
		</>
	);
};

export const getStaticProps = (context: any) => {
	const items = getItems();

	const brands = items.reduce((previous: any, current: any) => {
		if (!previous.includes(current.brand)) {
			previous.push(current.brand);
		}

		return previous;
	}, []);

	const categories = items.reduce((previous: any, current: any) => {
		if (!previous.includes(current.category)) {
			previous.push(current.category);
		}

		return previous;
	}, []);

	return {
		props: {
			clothes: items,
			brands,
			categories,
		},
	};
};

export default Products;
