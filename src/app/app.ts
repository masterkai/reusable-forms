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
		{ name: 'age', displayName: 'Age', type: 'number' },
		{ name: 'email', displayName: 'Email' },
		{ name: 'password', displayName: 'Password', type: 'password' },
	];

	protected readonly title = signal('reusable-forms');
}
