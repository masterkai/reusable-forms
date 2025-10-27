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