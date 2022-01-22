const isNumericString = (string: string) => {
	return /^\d+$/.test(string);
};

export default {
	isNumericString
};