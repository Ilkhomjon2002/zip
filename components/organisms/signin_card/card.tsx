import { Box, Card, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import ButtonAtom from "../../atoms/button/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { validateEmail, validatePassword } from "../../../utils/formValidation";
import { auth, db } from "../../../config/firebase.config";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
interface CardProps {
	type: boolean;
	setIsSigninCard: any;
}
const AuthCard = ({ type, setIsSigninCard }: CardProps) => {
	const [emailInput, setEmailInput] = useState("");
	const [nameInput, setNameInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [startNameValidation, setStartNameValidation] = useState(false);
	const [startEmailValidation, setStartEmailValidation] = useState(false);
	const [startPasswordValidation, setStartPasswordValidation] = useState(false);
	const [serverErrorMessage, setServerErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isGuestLoading, setIsGuestLoading] = useState(false);

	const isNameValid = nameInput.length !== 0;
	const isEmailValid = emailInput.length !== 0 && validateEmail(emailInput);
	const isPasswordValid =
		passwordInput.length !== 0 && validatePassword(passwordInput);

	const router = useRouter();
	const user = useSelector((state: any) => state.auth.user);

	if (user) {
		router.replace("/collections");
	}

	const emailInputHandler = (ev: React.SyntheticEvent) => {
		setServerErrorMessage("");
		setEmailInput((ev.target as HTMLInputElement).value);
	};

	const passwordInputHandler = (ev: React.SyntheticEvent) => {
		setServerErrorMessage("");
		setPasswordInput((ev.target as HTMLInputElement).value);
	};

	const nameInputHandler = (ev: React.SyntheticEvent) => {
		setServerErrorMessage("");
		setNameInput((ev.target as HTMLInputElement).value);
	};
	const submitHandler = (ev: React.SyntheticEvent) => {
		if (type) {
			submitHandlerForSignUp(ev);
			return;
		}

		ev.preventDefault();

		setStartEmailValidation(true);
		setStartPasswordValidation(true);

		if (isEmailValid && isPasswordValid && !serverErrorMessage) {
			setIsLoading(true);
			signInWithEmailAndPassword(auth, emailInput, passwordInput)
				.then((user) => {})
				.catch((error) => {
					const errorCode = error.code;
					console.log(errorCode);

					if (errorCode === "auth/user-not-found") {
						setServerErrorMessage("Account doesn't exist.");
					} else if (errorCode === "auth/wrong-password") {
						setServerErrorMessage("Invalid password.");
					} else {
						setServerErrorMessage("Something went wrong.");
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	const signInAsGuestHandler = () => {
		setIsGuestLoading(true);
		signInWithEmailAndPassword(auth, "lovelyguest@fakemail.com", "12345678")
			.then((user) => {})
			.catch((error) => {
				const errorCode = error.code;
				console.log(errorCode);

				if (errorCode === "auth/user-not-found") {
					setServerErrorMessage("Account doesn't exist.");
				} else if (errorCode === "auth/wrong-password") {
					setServerErrorMessage("Invalid password.");
				} else {
					setServerErrorMessage("Something went wrong.");
				}
			})
			.finally(() => {
				setIsGuestLoading(false);
			});
	};
	const submitHandlerForSignUp = (ev: React.SyntheticEvent) => {
		ev.preventDefault();

		setStartNameValidation(true);
		setStartEmailValidation(true);
		setStartPasswordValidation(true);

		if (isNameValid && isEmailValid && isPasswordValid && !serverErrorMessage) {
			setIsLoading(true);
			createUserWithEmailAndPassword(auth, emailInput, passwordInput)
				.then((userCredential) => {
					const uid = userCredential.user.uid;
					setDoc(doc(db, uid, "account"), {
						name: nameInput,
						email: emailInput,
					})
						.then(() => {
							setDoc(doc(db, uid, "wishlist"), {
								items: [],
							}).then(() => {
								setDoc(doc(db, uid, "cart"), {
									items: [],
								});
							});
						})
						.catch((error) => {
							console.log(error);
						});
				})
				.catch((error) => {
					const errorCode = error.code;

					if (errorCode === "auth/email-already-in-use") {
						setServerErrorMessage("Email address already in use.");
					} else {
						setServerErrorMessage("Something went wrong.");
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};
	return (
		<Card
			margin={"0 auto"}
			display={"flex"}
			flexDirection="column"
			gap={"30px"}
			width={"min(90%,500px)"}
			padding="30px"
		>
			<Text as="h1" fontSize="30px" margin={"0 auto"}>
				ZIP
			</Text>
			{serverErrorMessage && (
				<Box
					textAlign={"center"}
					color="red"
					border={"1px solid red"}
					borderRadius="5px"
					width={"100%"}
					padding="10px"
				>
					{serverErrorMessage}
				</Box>
			)}
			<Stack gap={"10px"}>
				<Input
					value={emailInput}
					onChange={emailInputHandler}
					outline={"none"}
					border={"1px solid rgb(204, 204, 204)"}
					_selection={{ borderColor: "rgb(182, 153, 242)" }}
					placeholder="Email"
				></Input>
				{type && (
					<Input
						value={nameInput}
						onChange={nameInputHandler}
						outline={"none"}
						border={"1px solid rgb(204, 204, 204)"}
						_selection={{ borderColor: "rgb(182, 153, 242)" }}
						placeholder="Username"
					></Input>
				)}
				<Input
					value={passwordInput}
					onChange={passwordInputHandler}
					outline={"none"}
					border={"1px solid rgb(204, 204, 204)"}
					_selection={{ borderColor: "rgb(182, 153, 242)" }}
					placeholder="Password"
				></Input>

				<ButtonAtom
					rest={{
						gap: "10px",
						disabled: isLoading,
						_disabled: { opacity: "0.5" },
					}}
					type="primary"
					onClick={submitHandler}
				>
					{isLoading ? (
						<Spinner color="#fff"></Spinner>
					) : !type ? (
						"Sign In"
					) : (
						"Sign Up"
					)}
				</ButtonAtom>
			</Stack>
			<Text
				onClick={signInAsGuestHandler}
				color={"rgb(74, 0, 224)"}
				textAlign={"center"}
				cursor="pointer"
			>
				Continue as a guest
			</Text>
			<Text textAlign={"center"}>
				{!type
					? "Don`t you have an account?"
					: "Do you already have an account?"}
				<Text
					cursor={"pointer"}
					onClick={() => setIsSigninCard(!type)}
					color={"rgb(74, 0, 224)"}
				>
					{type ? "Sign In" : "Sign Up"}
				</Text>
			</Text>
		</Card>
	);
};

export default AuthCard;
