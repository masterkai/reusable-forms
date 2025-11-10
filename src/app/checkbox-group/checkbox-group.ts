import { Component, input, output } from '@angular/core';
import { TitleCasePipe } from "@angular/common";

@Component({
	selector: 'app-checkbox-group',
	imports: [
		TitleCasePipe
	],
	templateUrl: './checkbox-group.html',
	styleUrl: './checkbox-group.css',
})
export class CheckboxGroup {
	name = input.required<string>()
	isDisplayNameVisible = input<boolean>(true);
	displayName = input<string>()
	value = input<string[]>([])
	error = input<string>()
	hint = input<string>()
	options = input<string[]>()

	modify = output<string[]>()
	blur = output<void>()

	onBlur() {
		this.blur.emit();
	}

	protected optionChanged(option: string) {
		if (this.value().includes(option)) {
			this.modify.emit(this.value().filter(o => o !== option))
		} else {
			this.modify.emit(this.value().concat(option))
		}

	}
}
