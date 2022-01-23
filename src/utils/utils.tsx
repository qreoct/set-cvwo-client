const isDdMmYyyyFormat = (string: string) => {
	// https://bobbyhadz.com/blog/javascript-date-validation-dd-mm-yyyy
	const regex = /^\d{2}\/\d{2}\/\d{4}$/;

	if (string.match(regex) === null) {
		return false;
	}

	const [day, month, year] = string.split('/');
	const isoFormattedStr = `${year}-${month}-${day}`;
	const date = new Date(isoFormattedStr);
	const timestamp = date.getTime();

	if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
		return false;
	}
	return date.toISOString().startsWith(isoFormattedStr);
};

const isFutureDate = (string: string) => {
	// https://stackoverflow.com/questions/21499843/javascript-validate-date-input-so-its-only-either-current-or-the-future
	const today = new Date().getTime();
	const userDDMMYYYY = string.split('/');
	const year = parseInt(userDDMMYYYY[2]);
	const monthIndex = parseInt(userDDMMYYYY[1]) - 1;
	const day = parseInt(userDDMMYYYY[0]);

	const userDate = new Date(year, monthIndex, day).getTime();
	return (today - userDate) < 0;
};

const ddMmYyyyToDateObject = (string: string): Date => {
	const userDDMMYYYY = string.split('/');
	const year = parseInt(userDDMMYYYY[2]);
	const monthIndex = parseInt(userDDMMYYYY[1]) - 1;
	const day = parseInt(userDDMMYYYY[0]);

	const userDate = new Date(year, monthIndex, day);
	console.log(userDate.toDateString());
	return userDate;
};

export default {
	isDdMmYyyyFormat, isFutureDate,
	ddMmYyyyToDateObject
};