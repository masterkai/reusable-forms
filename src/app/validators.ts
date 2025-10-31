const isNotEmpty = (value: string) => value.trim().length > 0;
const isTwoCharsOrMore = (value: string) => isNotEmpty(value) && value.trim().length >= 2;
const is21OrOlder = (value: string) => {
	const age = Number(value);
	return !isNaN(age) && age >= 21;
}

const createMinLengthCheck = (minLength: number) => {
	return (value: string) => isNotEmpty(value) && value.trim().length >= minLength;
}

const createMinValueCheck = (minValue: number) => (value: number) => value >= minValue;
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // HH:MM 24-hour format
export const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format

const createRegexCheck = (pattern: RegExp) => (value: string) => pattern.test(value);

export const createRegexValidator = (regExp: RegExp, pattern: string) => ({
	checkFn: createRegexCheck(regExp),
	errorMessage: `Field must be a valid ${pattern}`
});


export const isEmailValidator = createRegexValidator(emailPattern, 'Email address')

export const isNotEmptyValidator = {
	checkFn: isNotEmpty,
	errorMessage: 'This field cannot be empty.'
}

export const isTwoCharsOrMoreValidator = {
	checkFn: isTwoCharsOrMore,
	errorMessage: 'This field must be at least 2 characters long.'
};

export const createMinLengthValidator = (minLength: number) => ({
	checkFn: createMinLengthCheck(minLength),
	errorMessage: `This field must be at least ${minLength} characters long.`
})

export const createMinValueValidator = (minValue: number) => ({
	checkFn: createMinValueCheck(minValue),
	errorMessage: `Field must be ${minValue} or over.`
})