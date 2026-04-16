import { Component, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { UltimateForm } from "./ultimate-form/ultimate-form";
import { FieldConfig, MultiFieldValidator, ValidateOn, Validator } from "./types";
import {
	createMinLengthValidator,
	createMinValueValidator,
	createRegexValidator,
	datePattern,
	fieldsMatchValidator,
	isEmailValidator,
	isNotEmptyValidator,
	isTwoCharsOrMoreValidator,
	timePattern
} from "./validators";

@Component({
	selector: 'app-root',
	imports: [FormsModule, UltimateForm],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	passwordFieldConfig: FieldConfig = {
		name: 'password',
		displayName: 'Password',
		type: 'password',
		hint: 'Must be at least 8 characters long.',
	}
	confirmPasswordFieldConfig: FieldConfig = {
		name: 'confirmPassword',
		displayName: 'Confirm Password',
		type: 'password',
		hint: 'Must match the password entered above.',
	}
	globalValidators: Validator[] = [isNotEmptyValidator, isTwoCharsOrMoreValidator]
	multiFieldValidators: MultiFieldValidator[] = [fieldsMatchValidator(this.passwordFieldConfig, this.confirmPasswordFieldConfig)];
	validateOn = ValidateOn;
	formFields: (FieldConfig | string)[] = [
		{
			name: 'name',
			validators: []
		},
		{
			name: 'myFavoriteFruit',
			displayName: 'My Favorite Fruit',
			type: 'radio',
			options: ['Apple', 'Banana', 'Orange', 'Mango', 'Pineapple'],
			validators: []
		},
		{
			name: 'myHobbies',
			displayName: 'My Hobbies',
			type: 'checkbox',
			options: ['Reading', 'Traveling', 'Cooking', 'Gaming', 'Sports'],
			validators: []
		},
		{
			name: 'country',
			type: 'select',
			options: [ 'USA', 'Canada', 'UK', 'Australia', 'Germany' ],
			validators: [ isNotEmptyValidator ]
		},
		{
			name: 'age',
			type: 'number',
			validators: [createMinValueValidator(21)]
		},
		{
			name: 'email',
			validators: [isEmailValidator]
		},
		{
			name: 'password',
			displayName: 'Password',
			type: 'password',
			hint: 'Must be at least 8 characters long.',
			validators: [
				...this.multiFieldValidators
			]
		},
		{
			name: 'confirmPassword',
			displayName: 'Confirm Password',
			type: 'password',
			hint: 'Must match the password entered above.',
			validators: [
				...this.multiFieldValidators
			]
		},
		{
			name: 'myFavoriteColor',
			displayName: 'My Favorite Color',
			hint: 'Just type anything you like.',
			validators: [
				isNotEmptyValidator
			]
		},
	];
	formFields2: (FieldConfig | string)[] = [
		{
			name: 'countryCode',
			validators: [createMinLengthValidator(3)],
			width: '70px'
		},
		{
			name: 'areaCode',
			validators: [],
			width: '60px'
		},
		{
			name: 'phoneNumber',
			validators: [createMinLengthValidator(8)],
			width: '100%'
		},
		{
			name: 'extensionNumber',
			validators: [createMinLengthValidator(3)],
			width: '70px'
		},
	];

	protected readonly title = signal('reusable-forms');

	protected onFormSubmit($event: any) {
		console.log('Form submitted with values:', $event);
	}
}
