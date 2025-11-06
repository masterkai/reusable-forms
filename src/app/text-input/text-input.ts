import { Component, input, output } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
	selector: 'app-text-input',
	imports: [
		FormsModule
	],
	templateUrl: './text-input.html',
	styleUrl: './text-input.css',
})
export class TextInput {
	name = input.required<string>();
	displayName = input.required<string>();
	error = input.required<string | null>();
	value = input.required<string>();
	hint = input.required<string>();
	change = output<string>()
	blur = output<void>()
	protected readonly HTMLInputElement = HTMLInputElement;

	capitalizeFirstLetter(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	valueChanged(event: any) {
		const value = event.target.value;
		this.change.emit(value);
	}

	blurred() {
		this.blur.emit();
	}
}
