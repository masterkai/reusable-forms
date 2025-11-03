import { Component, computed, effect, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FieldConfig, MultiFieldValidator, ValidateOn, Validator } from "../types";

const defaultFieldConfigsValues = {
	type: 'text',
	hint: '',
	validators: <Validator[]>[]
}

@Component({
	selector: 'app-ultimate-form',
	imports: [
		FormsModule
	],
	templateUrl: './ultimate-form.html',
	styleUrl: './ultimate-form.css',
})
export class UltimateForm implements OnInit {
	validateOn = input.required<ValidateOn>()
	globalValidators = input<Validator[]>()
	multiFieldValidators = input<MultiFieldValidator[]>()
	fieldsValidationErrors = signal<any>({});
	fields = input.required<(FieldConfig | string)[]>();
	fieldValues = signal<{ [key: string]: any }>({})

	fieldConfigs = computed(() => {
		return Array.isArray(this.fields()) ?
			this.fields().map(field => {
				if (typeof field === 'string') {
					return {
						...defaultFieldConfigsValues,
						name: field,
						displayName: field,
					};
				} else {
					return { ...defaultFieldConfigsValues, displayName: field.name, ...field };
				}
			}) : [];
	})


	submit = output<any>()
	protected readonly Object = Object;

	constructor() {
		effect(() => {
			this.fieldsValidationErrors.set({});

			for (let field of this.fieldConfigs()) {
				for (let { checkFn, errorMessage } of [...(this.globalValidators() ?? []), ...field.validators]) {
					const isValid = checkFn(this.fieldValues()[field.name]);
					if (!isValid) {
						this.fieldsValidationErrors.update(
							prev => prev.hasOwnProperty(field.name) ? prev : ({
								...prev,
								[field.name]: errorMessage
							})
						)
						break;
					}
				}
			}
			console.log('Current field values:', this.fieldValues())
		})
	}

	capitalizeFirstLetter(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	ngOnInit() {
		for (let field of this.fieldConfigs()) {
			this.fieldValues()[field.name] = '';
		}
	}

	onFieldChange(field: string, $event: string) {
		this.fieldValues.update(prev => ({
			...prev,
			[field]: $event
		}))

	}

	submitForm() {
		this.fieldsValidationErrors.set({});

		for (let field of this.fieldConfigs()) {
			for (let { checkFn, errorMessage } of [...(this.globalValidators() ?? []), ...field.validators]) {
				const isValid = checkFn(this.fieldValues()[field.name]);
				if (!isValid) {
					this.fieldsValidationErrors.update(
						prev => prev.includes(field.name) ? prev : ({
							...prev,
							[field.name]: errorMessage
						})
					)
					break;
				}
			}
		}
		for (let validator of this.multiFieldValidators() ?? []) {
			const isValid = validator.checkFn(this.fieldValues());
			if (!isValid) {
				for (let fieldName of validator.fieldsInvolved) {
					this.fieldsValidationErrors.update(
						prev => ({
							...prev,
							[fieldName]: validator.errorMessage
						})
					)
				}
			}
		}
		if (this.fieldsValidationErrors().length > 0) {
			return;
		}
		this.submit.emit(this.fieldValues());
	}

	protected isSubmitting() {
		return !(Object.entries(this.fieldsValidationErrors()).length === 0);
	}
}


