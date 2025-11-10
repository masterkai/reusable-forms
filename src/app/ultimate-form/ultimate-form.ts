import { Component, computed, effect, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FieldConfig, MultiFieldValidator, ValidateOn, Validator } from "../types";
import { TextInput } from "../text-input/text-input";
import { PasswordInput } from "../password-input/password-input";
import { NumberInput } from "../number-input/number-input";
import { RadioGroup } from "../radio-group/radio-group";
import { CheckboxGroup } from "../checkbox-group/checkbox-group";

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
		CheckboxGroup
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
					return { ...defaultFieldConfigsValues, displayName: field.name, ...field };
				}
			}) : [];
	})

	allFieldsHasValue = computed(() => {
		for (let field of this.fieldConfigs()) {
			if (!this.fieldValues()[field.name] || this.fieldValues()[field.name].toString().trim() === '') {
				return false;
			}
		}
		return true;
	})

	fieldHasBeenTouched = signal<{ [key: string]: boolean }>({});


	submit = output<any>()
	hasValidationErrors = computed(() => {
		return Object.entries(this.fieldsValidationErrors()).length > 0;
	})

	constructor() {
		effect(() => {
			if (this.validateOn() === ValidateOn.Change)
				this.fieldsValidationErrors.set(this.getValidationErrors(false));
			this.submit.emit(this.fieldValues());
			this.fieldValues()
		})
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

	getValidationErrors(isSubmit: boolean) {
		let errors: { [key: string]: string } = {};
		for (let field of this.fieldConfigs()) {
			if (this.fieldHasBeenTouched()[field.name] || isSubmit) {
				for (let { checkFn, errorMessage } of [...(this.globalValidators() ?? []), ...field.validators]) {
					const isValid = checkFn(this.fieldValues()[field.name]);
					if (!isValid) {
						errors[field.name] = errorMessage;
						break;
					}
				}
			}

		}
		for (let validator of this.multiFieldValidators() ?? []) {
			if (validator.fieldsInvolved.every(fieldName => this.fieldHasBeenTouched()[fieldName]) || isSubmit) {
				const isValid = validator.checkFn(this.fieldValues());
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


