import { Button } from "@chakra-ui/react";
import React, { MouseEventHandler, ReactNode } from "react";
interface ButtonProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
	children: ReactNode;
	type: "primary" | "secondary";
	rest?: any;
}

const ButtonAtom = ({ children, onClick, type, rest }: ButtonProps) => {
	return (
		<>
			{type == "primary" ? (
				<Button
					padding={"10px 25px"}
					fontSize="20px"
					borderRadius={"10px"}
					border="1px solid transparent"
					color={"#fff"}
					_active={{ transform: "scale(0.9)" }}
					transition={".2s ease-in-out"}
					_hover={{
						cursor: "pointer",
						boxShadow: "0 4px 5px 0 rgba(0,0,0,0.25)",
					}}
					onClick={onClick}
					background="linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))"
					{...rest}
				>
					{children}
				</Button>
			) : (
				<Button
					padding={"10px 25px"}
					fontSize="20px"
					borderRadius={"10px"}
					border="1px solid rgb(74, 0, 224) "
					_active={{ transform: "scale(0.9)" }}
					transition={".2s ease-in-out"}
					_hover={{
						cursor: "pointer",
						boxShadow: "0 4px 5px 0 rgba(0,0,0,0.25)",
					}}
					background="#fff"
					onClick={onClick}
					color="rgb(74, 0, 224)"
					{...rest}
				>
					{children}
				</Button>
			)}
		</>
	);
};
export default ButtonAtom;
