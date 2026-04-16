import { Component, input, output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
	selector: 'app-dropdown-selector',
	imports: [TitleCasePipe],
	templateUrl: './dropdown-selector.html',
	styleUrl: './dropdown-selector.css',
})
export class DropdownSelector {
	isDisplayNameVisible = input<boolean>(true);
	name = input.required<string>();
	displayName = input<string>();
	value = input<string>('');
	error = input<string>();
	hint = input<string>();
	options = input<string[]>([]);

	modify = output<string>();
	blur = output<void>();

	onBlur() {
		this.blur.emit();
	}

	onValueChanged(event: Event) {
		const selectElement = event.target as HTMLSelectElement;
		this.modify.emit(selectElement.value);
	}
}
