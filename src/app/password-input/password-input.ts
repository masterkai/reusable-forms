import { Component, HostBinding, Input, input, output } from '@angular/core';

@Component({
	selector: 'app-password-input',
	imports: [],
	templateUrl: './password-input.html',
	styleUrl: './password-input.css',
})
export class PasswordInput {
	@HostBinding('style.--column-width') @Input() columnWidth = '100%';
	isDisplayNameVisible = input<boolean>(true);
	name = input.required<string>();
	displayName = input.required<string>();
	error = input.required<string | null>();
	value = input.required<string>();
	hint = input.required<string>();
	modify = output<string>()
	blur = output<void>()
	protected readonly HTMLInputElement = HTMLInputElement;

	capitalizeFirstLetter(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	valueChanged(event: any) {
		const value = event.target.value;
		this.modify.emit(value);
	}

	blurred() {
		this.blur.emit();
	}
}
