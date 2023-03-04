import { Box, Card, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import BreadCrumb from "../components/atoms/breadcrumb/breadcrumb";
import ButtonAtom from "../components/atoms/button/button";
import AuthCard from "../components/organisms/signin_card/card";

const Signin = () => {
	const [isSigninCard, setIsSigninCard] = useState(false);
	const router = useRouter();
	return (
		<Flex flexDirection={"column"} gap="50px">
			<BreadCrumb
				links={[
					{ title: "Home", id: "/" },
					{ title: "Signin", id: "/signin", disabled: true },
				]}
			></BreadCrumb>
			<AuthCard
				setIsSigninCard={setIsSigninCard}
				type={isSigninCard}
			></AuthCard>
		</Flex>
	);
};

export default Signin;
