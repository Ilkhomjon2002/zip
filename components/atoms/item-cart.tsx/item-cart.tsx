import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { getFormattedCurrency } from "../../../utils/getFormattedCurrency";

import BetterLink from "../link/link";

const ItemCard = ({ id, imageURL, brand, name, amount, setPriority }: any) => {
	return (
		<Box border={"1px solid #eee "} fontSize="14px">
			<BetterLink href={`/collections/${id}`}>
				<Box h="275px" overflow={"hidden"}>
					<Image
						alt=""
						src={imageURL}
						width={220}
						height={275}
						layout="responsive"
						priority={setPriority}
					/>
				</Box>
				<Box p="8px">
					<Box fontWeight={"500"} className="brand">
						{brand}
					</Box>
					<Box color={"#777"} margin={"8px 0"}>
						{name}
					</Box>
					<Box fontWeight={"500"}>{`$${getFormattedCurrency(amount)}`}</Box>
				</Box>
			</BetterLink>
		</Box>
	);
};

export default ItemCard;
