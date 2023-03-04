const currencyFormatter = new Intl.NumberFormat("en-IN");

export const getFormattedCurrency = (amount: any) =>
	currencyFormatter.format(amount);
