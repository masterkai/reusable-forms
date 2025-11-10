import { Component, HostBinding, Input, input, output } from '@angular/core';
import { TitleCasePipe } from "@angular/common";

@Component({
	selector: 'app-number-input',
	imports: [
		TitleCasePipe
	],
	templateUrl: './number-input.html',
	styleUrl: './number-input.css',
})
export class NumberInput {
	@HostBinding('style.--column-width') @Input() columnWidth = '100%';
	isDisplayNameVisible = input.required<boolean>();
	name = input.required<string>();
	displayName = input.required<string>();
	error = input.required<string | null>();
	value = input.required<string>();
	hint = input.required<string>();
	modify = output<string>()
	blur = output<void>()
	protected readonly HTMLInputElement = HTMLInputElement;

	valueChanged(event: any) {
		const value = event.target.value;
		this.modify.emit(value);
	}

	blurred() {
		this.blur.emit();
	}
}
