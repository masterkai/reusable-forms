export interface FieldConfig {
	name: string;
	displayName?: string;
	type?: string;
	hint?: string;
	validators?: { checkFn: (value: any) => boolean; errorMessage: string }[];
}