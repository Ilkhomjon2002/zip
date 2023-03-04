import { Box, Flex, Text } from "@chakra-ui/react";
import CheckBox from "../checkbox/checkbox";
const BrandFilter = ({ items, type }: any) => {
	return (
		<Box mt="32px">
			<Box mb={"16px"} fontSize="16px" fontWeight={"500"}>
				{type.slice(0, 1).toUpperCase() + type.slice(1)}
			</Box>
			{items
				.sort((a: any, b: any) => a.localeCompare(b))
				.map((value: any, index: any) => (
					<Flex alignItems={"center"} gap="5px" margin={"8px 0"} key={index}>
						<CheckBox of={value} type={"type"} />
						<Text fontSize={"14px"}>{value}</Text>
					</Flex>
				))}
		</Box>
	);
};

export default BrandFilter;
