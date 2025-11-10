import { Component, input, output } from '@angular/core';
import { TitleCasePipe } from "@angular/common";

@Component({
	selector: 'app-radio-group',
	imports: [
		TitleCasePipe
	],
	templateUrl: './radio-group.html',
	styleUrl: './radio-group.css',
})
export class RadioGroup {
	name = input.required<string>()
	displayName = input<string>()
	value = input<string>()
	error = input<string>()
	hint = input<string>()
	options = input<string[]>([])

	modify = output<string>()
	blur = output<void>()

	isDisplayNameVisible = input<boolean>(true);

	onBlur() {
		this.blur.emit();
	}

	protected optionChanged(option: string) {
		this.modify.emit(option)
	}
}
