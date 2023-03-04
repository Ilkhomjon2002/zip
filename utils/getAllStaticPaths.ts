import data from "../pages/api/data.json";

const getAllStaticPaths = () => {
	return (data as any).clothes.map((item: any) => ({
		params: { cid: item.id },
	}));
};

export default getAllStaticPaths;
