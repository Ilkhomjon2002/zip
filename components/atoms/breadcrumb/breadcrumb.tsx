import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useRouter } from "next/router";
interface BreadCrumbProps {
	links: any[];
}
const BreadCrumb = ({ links }: BreadCrumbProps) => {
	const router = useRouter();
	return (
		<Breadcrumb
			padding={"10px 0"}
			display="flex"
			background={"ButtonFace"}
			justifyContent="center"
		>
			{links?.map((link) => {
				return (
					<BreadcrumbItem
						onClick={() => router.replace(link.id)}
						key={link.id}
						color={link.disabled ? "rgba(0,0,0,0.5)" : "#000"}
					>
						<BreadcrumbLink>{link.title}</BreadcrumbLink>
					</BreadcrumbItem>
				);
			})}
		</Breadcrumb>
	);
};

export default BreadCrumb;
