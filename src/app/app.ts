import { Component, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { UltimateForm } from "./ultimate-form/ultimate-form";
import { FieldConfig } from "./types";

const isNotEmpty = (value: string) => value && value.trim().length > 0;
const isTwoCharsOrMore = (value: string) => isNotEmpty(value) && value.trim().length >= 2;
const is21OrOlder = (value: string) => {
	const age = Number(value);
	return !isNaN(age) && age >= 21;
}
const isCharsOrMore = (minChars: number) => {
	return (value: string) => isNotEmpty(value) && value.trim().length >= minChars;
};

@Component({
	selector: 'app-root',
	imports: [ FormsModule, UltimateForm ],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	formFields: (FieldConfig | string)[] = [
		'name',
		{ name: 'age', type: 'number', validationFns: [ is21OrOlder ] },
		{ name: 'username', validationFns: [ isTwoCharsOrMore ] },
		{ name: 'email' },
		{ name: 'password', displayName: 'Password', type: 'password', hint: 'Must be at least 8 characters long.' },
		{ name: 'myFavoriteColor', displayName: 'My Favorite Color' },
	];

	protected readonly title = signal('reusable-forms');
}
