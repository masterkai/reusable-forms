import { Component, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { UltimateForm } from "./ultimate-form/ultimate-form";
import { FieldConfig } from "./types";
import {
	createMinLengthValidator,
	createMinValueValidator,
	createRegexValidator,
	datePattern,
	isEmailValidator,
	isNotEmptyValidator,
	timePattern
} from "./validators";

const isNotEmpty = (value: string) => value.trim().length > 0;
const isTwoCharsOrMore = (value: string) => isNotEmpty(value) && value.trim().length >= 2;
const is21OrOlder = (value: string) => {
	const age = Number(value);
	return !isNaN(age) && age >= 21;
}

@Component({
	selector: 'app-root',
	imports: [FormsModule, UltimateForm],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	formFields: (FieldConfig | string)[] = [
		{
			name: 'name', validators: [
				isNotEmptyValidator, createMinLengthValidator(2)
			]
		},
		{
			name: 'age',
			type: 'number',
			validators: [isNotEmptyValidator, createMinValueValidator(21)]
		},
		{
			name: 'email',
			validators: [isNotEmptyValidator, isEmailValidator]
		},
		{
			name: 'birthday',
			type: 'date',
			hint: 'Format: YYYY-MM-DD',
			validators: [isNotEmptyValidator, createRegexValidator(datePattern, 'Date must be in YYYY-MM-DD format.')]
		},
		{
			name: 'favoriteTimeOfDay',
			displayName: 'Favorite Time of Day',
			type: 'time',
			hint: 'Format: HH:MM',
			validators: [
				isNotEmptyValidator,
				createRegexValidator(timePattern, 'Time must be in HH:MM format.')
			]
		},
		{
			name: 'password',
			displayName: 'Password',
			type: 'password',
			hint: 'Must be at least 8 characters long.',
			validators: [
				isNotEmptyValidator
			]
		},
		{ name: 'myFavoriteColor', displayName: 'My Favorite Color' },
	];

	protected readonly title = signal('reusable-forms');

	protected onFormSubmit($event: any) {
		console.log('Form submitted with values:', $event);
	}
}
