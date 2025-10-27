import { Component, computed, input, OnInit, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FieldConfig, Validator } from "../types";

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
	incorrectField = signal<string[]>([])
	fields = input.required<(FieldConfig | string)[]>();
	fieldValues = signal<{ [key: string]: any }>({})
	fieldConfigs = computed(() => {
		return this.fields().map(field => {
			if (typeof field === 'string') {
				return {
					...defaultFieldConfigsValues,
					name: field,
					displayName: field,
				};
			} else {
				return { ...defaultFieldConfigsValues, displayName: field.name, ...field };
			}
		});
	})

	constructor() {
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
		this.incorrectField.set([]);

		for (let field of this.fieldConfigs()) {
			for (let { checkFn, errorMessage } of field.validators) {
				const isValid = checkFn(this.fieldValues()[field.name]);
				if (!isValid) {
					this.incorrectField.update(
						prev => prev.includes(field.displayName) ? prev : [...prev, field.displayName]
					)
					break;
				}
			}
		}
		if (this.incorrectField().length > 0) {
			return;
		}
		console.log('Submitting Form with values:', this.fieldValues());
	}
}
