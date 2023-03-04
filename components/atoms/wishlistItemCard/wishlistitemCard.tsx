import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { AiOutlineClose } from "react-icons/ai";
import BetterLink from "../link/link";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../config/firebase.config";
import Modal from "../modal/modal";
import SizePickerForBottoms from "../sizePickerForBottoms/sizePickerForBottoms";
import SizePickerForTops from "../sizePickerForTops.tsx/sizePickerForTops";
import { getFormattedCurrency } from "../../../utils/getFormattedCurrency";
import { wishlistActions } from "../../../store/wishlistSlice";

const Div = styled.div`
	font-size: 14px;
	border: 1px #eee solid;

	.item {
		position: relative;

		.delete {
			border: 1px #ddd solid;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 2px;
			position: absolute;
			top: 8px;
			right: 8px;
			z-index: 5;
			background-color: #f4f4f4;
			color: #888;
			cursor: pointer;

			.icon {
				width: 16px;
				height: 16px;
				stroke-width: 2px;
			}
		}

		a {
			text-decoration: none;
			color: inherit;
		}

		.info {
			padding: 8px;

			.brand {
				font-weight: 500;
			}

			.name {
				color: #777;
				margin: 8px 0;
			}

			.amount {
				font-weight: 500;
			}
		}
	}

	.cart {
		font: inherit;
		font-weight: 500;
		background-color: white;
		color: #4a00e0;
		display: block;
		outline: none;
		cursor: pointer;
		border: none;
		border-top: 1px #eee solid;
		padding: 8px;
		width: 100%;
	}
`;

const ModalDiv = styled.div`
	padding: 16px;

	.title {
		color: #4a00e0;
		font-size: 18px;
		font-weight: 500;
		margin-bottom: 32px;
	}

	.error {
		margin-bottom: 16px;
		color: #ff4646;
	}

	.sizes {
		display: flex;

		button {
			font: inherit;
			font-size: 14px;
			font-weight: 500;
			border: 1px #ddd solid;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 50px;
			height: 50px;
			margin-right: 8px;
			background-color: white;
			cursor: pointer;

			&.active {
				border-color: #4a00e0;
				color: #4a00e0;
			}

			&:last-child {
				margin-right: 0;
			}

			@media (hover: hover) {
				transition: border 240ms;

				&:hover {
					border-color: #4a00e0;
				}
			}
		}
	}

	.done {
		font: inherit;
		border-radius: 6px;
		background: #8e2de2;
		background: -webkit-linear-gradient(to right, #8e2de2, #4a00e0);
		background: linear-gradient(to right, #8e2de2, #4a00e0);
		color: white;
		font-weight: 500;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 32px;
		outline: none;
		cursor: pointer;
		padding: 14px 28px;
		border: none;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
`;

const WishlistItemCard = ({
	id,
	size,
	imageURL,
	brand,
	name,
	amount,
	category,
	setImage,
}: any) => {
	const [pickedSize, setPickedSize] = useState("");
	const [showSizePicker, setShowSizePicker] = useState(false);
	const [promptSize, setPromptSize] = useState(false);
	const user = useSelector((state: any) => state.auth.user);
	const cartItems = useSelector((state: any) => state.cart.items);
	const wishlistItems = useSelector((state: any) => state.wishlist.items);
	const dispatch = useDispatch();
	const cartItem = cartItems.find(
		(item: any) => item.itemId === id && item.itemSize === size
	);
	const cartItemIndex = cartItems.findIndex(
		(item: any) => item.itemId === id && item.itemSize === size
	);
	const isInCart = !!cartItem;

	const openSizePickerHandler = () => {
		setShowSizePicker(true);
	};

	const closeSizePickerHandler = () => {
		setPickedSize("");
		setShowSizePicker(false);
		setPromptSize(false);
	};

	const deleteItemHandler = () => {
		removeItemHandler();
	};

	const removeItemHandler = () => {
		console.log(wishlistItems);
		dispatch(wishlistActions.removeItem({ id, wishlistItems }));
	};

	const moveToCartHandler = (ev: React.SyntheticEvent, fromModal = false) => {
		if (size) {
			if (isInCart) {
				const updatedItem = {
					...cartItem,
					itemQuantity: (+cartItem.itemQuantity + 1).toString(),
				};
				const updatedItems = [...cartItems];
				updatedItems.splice(cartItemIndex, 1, updatedItem);
				removeItemHandler();
			} else {
				updateDoc(doc(db, user.uid, "cart"), {
					items: arrayUnion({
						itemId: id,
						itemSize: size,
						itemQuantity: "1",
					}),
				})
					.then(() => {
						removeItemHandler();
					})
					.catch((error) => console.log(error));
			}
		} else if (pickedSize) {
			const cartItem = cartItems.find(
				(item: any) => item.itemId === id && item.itemSize === pickedSize
			);
			const cartItemIndex = cartItems.findIndex(
				(item: any) => item.itemId === id && item.itemSize === pickedSize
			);
			const isInCart = !!cartItem;

			if (isInCart) {
				const updatedItem = {
					...cartItem,
					itemQuantity: (+cartItem.itemQuantity + 1).toString(),
				};
				const updatedItems = [...cartItems];
				updatedItems.splice(cartItemIndex, 1, updatedItem);
				updateDoc(doc(db, user.uid, "cart"), {
					items: updatedItems,
				})
					.then(() => {
						removeItemHandler();
					})
					.catch((error) => console.log(error));
			} else {
				updateDoc(doc(db, user.uid, "cart"), {
					items: arrayUnion({
						itemId: id,
						itemSize: pickedSize,
						itemQuantity: "1",
					}),
				})
					.then(() => {
						removeItemHandler();
					})
					.catch((error) => console.log(error));
			}
		} else {
			if (fromModal) {
				setPromptSize(true);
			} else {
				openSizePickerHandler();
			}
		}
	};
	useEffect(() => {
		console.log(id, size, imageURL, amount, category);
	});

	return (
		<>
			<Div>
				<div className="item">
					<button className="delete" onClick={deleteItemHandler}>
						<AiOutlineClose />
					</button>
					<BetterLink href={`/collections/${id}`}>
						<Image
							alt=""
							src={imageURL}
							width={220}
							height={275}
							layout="responsive"
						/>
					</BetterLink>
					<div className="info">
						<div className="brand">{brand}</div>
						<div className="name">{name}</div>
						<div className="amount">{`$${getFormattedCurrency(amount)}`}</div>
					</div>
				</div>
				<button className="cart" onClick={moveToCartHandler}>
					Move to Cart
				</button>
			</Div>
			{showSizePicker && (
				<Modal closeHandler={closeSizePickerHandler}>
					<ModalDiv>
						<div className="title">Select size</div>
						{promptSize && <div className="error">Please select a size</div>}
						<div className="sizes">
							{category === "Jeans" ? (
								<SizePickerForBottoms
									currentSize={pickedSize}
									onSetSize={setPickedSize}
								/>
							) : (
								<SizePickerForTops
									currentSize={pickedSize}
									onSetSize={setPickedSize}
								/>
							)}
						</div>
						<button
							className="done"
							// onClick={() => moveToCartHandler.bind(this, true)}
						>
							Done
						</button>
					</ModalDiv>
				</Modal>
			)}
		</>
	);
};

export default WishlistItemCard;
