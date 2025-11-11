import { FieldConfig, MultiFieldValidator } from "./types";

const isNotEmpty = (value: string | string[]) => {
	console.log('value received for isNotEmpty check:', value);
	if (Array.isArray(value)) {
		console.log('value as array:', value);
		return value.length > 0;
	} else {
		console.log('value as string:', value);
		return value.trim().length > 0;
	}
};
const isTwoCharsOrMore = (value: string) => isNotEmpty(value) && value.trim().length >= 2;
const is21OrOlder = (value: string) => {
	const age = Number(value);
	return !isNaN(age) && age >= 21;
}

const isCheckboxEmpty = (value: string[]) => value.length === 0;

const createMinLengthCheck = (minLength: number) => {
	return (value: string) => isNotEmpty(value) && value.trim().length >= minLength;
}

const createMinValueCheck = (minValue: number) => (value: number) => value >= minValue;
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const timePattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/; // HH:MM 24-hour format
export const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format

export const passwordsMatch = (password: string, confirmPassword: string) => password === confirmPassword;

export const passwordsMatchValidator: MultiFieldValidator = {
	checkFn: (values: { [key: string]: string }) => values['password'] === values['confirmPassword'],
	errorMessage: `Password and Confirm Password must match.`,
	fieldsInvolved: ['password', 'confirmPassword']
};

export const checkboxNotEmptyValidator = {
	checkFn: isCheckboxEmpty,
	errorMessage: 'At least one option must be selected.'
}

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

export const createFieldsMatchCheck = (fieldAName: string, fieldBName: string) => {
	return (values: { [key: string]: any }) => values[fieldAName] === values[fieldBName];
}

export const fieldsMatchValidator = (fieldAName: FieldConfig, fieldBName: FieldConfig): MultiFieldValidator => ({
	checkFn: createFieldsMatchCheck(fieldAName.name, fieldBName.name),
	errorMessage: `${fieldAName.displayName} and ${fieldBName.displayName} must match.`,
	fieldsInvolved: [fieldAName.name, fieldBName.name]
})

// export function fieldsMatchValidator(fieldA: { name: string }, fieldB: { name: string }): MultiFieldValidator {
//
// 	return {
// 		checkFn: (values: { [key: string]: any }) => values[fieldA.name] === values[fieldB.name],
// 		errorMessage: `${fieldA.name} and ${fieldB.name} must match.`,
// 		fieldsInvolved: [fieldA.name, fieldB.name]
// 	};
// }