import { Component, computed, effect, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FieldConfig, MultiFieldValidator, ValidateOn, Validator } from "../types";
import { TextInput } from "./text-input/text-input";
import { PasswordInput } from "./password-input/password-input";
import { NumberInput } from "./number-input/number-input";
import { RadioGroup } from "./radio-group/radio-group";
import { CheckboxGroup } from "./checkbox-group/checkbox-group";
import { DropdownSelector } from './dropdown-selector/dropdown-selector';
import { Button, ButtonModule } from 'primeng/button';

const defaultFieldConfigsValues = {
	type: 'text',
	hint: '',
	validators: <Validator[]>[]
}

@Component({
	selector: 'app-ultimate-form',
  imports: [
    FormsModule,
    TextInput,
    PasswordInput,
    NumberInput,
    RadioGroup,
    CheckboxGroup,
    DropdownSelector,
    Button,
  ],
	templateUrl: './ultimate-form.html',
	styleUrl: './ultimate-form.css',
})
export class UltimateForm implements OnInit {
	isButtonVisible = input.required<boolean>();
	isDisplayNameVisible = input.required<boolean>();
	flexDirection = input<'row' | 'column'>('column');
	containerWidth = input<string>('100%');
	gapBetweenFields = input<string>('16px');
	validateOn = input.required<ValidateOn>()
	globalValidators = input<Validator[]>()
	multiFieldValidators = input<MultiFieldValidator[]>()
	fieldsValidationErrors = signal<{ [key: string]: string }>({});
	fields = input.required<(FieldConfig | string)[]>();
	fieldValues = signal<{ [key: string]: any }>({});

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
					return {
						...defaultFieldConfigsValues,
						displayName: field.name,
						...field
					};
				}
			}) : [];
	})

	allFieldsHasValue = computed(() => {
		for (let field of this.fieldConfigs()) {
			if (!this.hasValue(this.fieldValues()[field.name])) {
				return false;
			}
		}
		return true;
	})

	fieldHasBeenTouched = signal<{ [key: string]: boolean }>({});


	valueChange = output<any>()
	submit = output<any>()
	hasValidationErrors = computed(() => {
		return Object.keys(this.fieldsValidationErrors()).length > 0;
	})

	constructor() {
		effect(() => {
			const values = this.fieldValues();
			if (this.validateOn() === ValidateOn.Change) {
				this.fieldsValidationErrors.set(this.getValidationErrors(false));
			}
			this.valueChange.emit(values);
		})
	}

	ngOnInit() {
		const initialValues: { [key: string]: any } = {};
		for (let field of this.fieldConfigs()) {
			if (field.type === 'checkbox') {
				initialValues[field.name] = [];
			} else {
				initialValues[field.name] = '';
			}
		}
		this.fieldValues.set(initialValues);
	}

	onFieldChange(field: string, $event: string | string[]) {
		this.fieldValues.update(prev => {
			if (Array.isArray($event)) {
				return {
					...prev,
					[field]: [...$event]
				}
			} else {
				return {
					...prev,
					[field]: $event
				}
			}
		})
	}

	getValidationErrors(isSubmit: boolean) {
		let errors: { [key: string]: string } = {};
		const values = this.fieldValues();
		const touchedFields = this.fieldHasBeenTouched();
		const globalValidators = this.globalValidators() ?? [];
		for (let field of this.fieldConfigs()) {
			if (touchedFields[field.name] || isSubmit) {
				for (let {
					checkFn,
					errorMessage
				} of [...globalValidators, ...(field.validators ?? [])]) {
					const isValid = checkFn(values[field.name]);
					if (!isValid) {
						errors[field.name] = errorMessage;
						break;
					}
				}
			}

		}
		for (let validator of this.multiFieldValidators() ?? []) {
			if (validator.fieldsInvolved.every(fieldName => touchedFields[fieldName]) || isSubmit) {
				const isValid = validator.checkFn(values);
				if (!isValid) {
					for (let fieldName of validator.fieldsInvolved) {
						errors[fieldName] = validator.errorMessage;
					}
					break;
				}
			}

		}
		return errors;
	}

	submitForm() {
		this.fieldsValidationErrors.set(this.getValidationErrors(true));

		if (Object.keys(this.fieldsValidationErrors()).length > 0) {
			return;
		}
		this.submit.emit(this.fieldValues());
	}

	private hasValue(value: any) {
		if (Array.isArray(value)) {
			return value.length > 0;
		}
		if (typeof value === 'string') {
			return value.trim().length > 0;
		}
		return value !== null && value !== undefined;
	}

	protected setFieldToBeEdited(fieldName: string) {
		this.fieldHasBeenTouched.update(
			prev => ({
				...prev,
				[fieldName]: true
			})
		)
		if (this.validateOn() === ValidateOn.Change)
			this.fieldsValidationErrors.set(this.getValidationErrors(false));
	}
}


