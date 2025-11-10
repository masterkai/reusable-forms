export interface FieldConfig {
	name: string;
	displayName?: string;
	type?: string;
	hint?: string;
	width?: string;
	options?: string[];
	validators?: Validator[];
}

export interface Validator {
	checkFn: (value: any) => boolean;
	errorMessage: string
}

export interface MultiFieldValidator extends Validator {
	fieldsInvolved: string[];
}

export enum ValidateOn {
	Submit = 'submit',
	Change = 'change'
}