import data from "../pages/api/data.json";

const getItemById = (itemId: number) => {
	return (data as any).clothes.find((item: any) => item.id === itemId);
};

export default getItemById;
