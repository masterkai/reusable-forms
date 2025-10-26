export interface FieldConfig {
	name: string;
	displayName?: string;
	type?: string;
	hint?: string;
	validationFns?: ((value: any) => boolean)[];
}