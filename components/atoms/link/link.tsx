import Link from "next/link";
import { ReactNode } from "react";

const BetterLink = ({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) => {
	return <Link href={href}>{children}</Link>;
};

export default BetterLink;
