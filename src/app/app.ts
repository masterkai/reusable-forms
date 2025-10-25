import { Component, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { UltimateForm } from "./ultimate-form/ultimate-form";
import { FieldConfig } from "./types";

@Component({
	selector: 'app-root',
	imports: [ FormsModule, UltimateForm ],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App {
	formFields: (FieldConfig | string)[] = [
		'name',
		{ name: 'age', type: 'number' },
		{ name: 'email' },
		{ name: 'password', displayName: 'Password', type: 'password', hint: 'Must be at least 8 characters long.' },
		{ name: 'myFavoriteColor', displayName: 'My Favorite Color' },
	];

	protected readonly title = signal('reusable-forms');
}
