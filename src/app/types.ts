export interface FieldConfig {
	name: string;
	displayName?: string;
	type?: string;
	hint?: string;
	validators?: Validator[];
}

export interface Validator {
	checkFn: (value: any) => boolean;
	errorMessage: string
}

export interface MultiFieldValidator {
	checkFn: (value: any) => boolean;
	errorMessage: string;
	fieldsInvolved: string[];
}

export enum ValidateOn {
	Submit = 'submit',
	Change = 'change'
}