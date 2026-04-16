import { Component, input, output } from '@angular/core';
import { TitleCasePipe } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
	selector: 'app-checkbox-group',
	imports: [
		TitleCasePipe,
		FormsModule,
		CheckboxModule
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
	options = input<string[]>([])

	modify = output<string[]>()
	blur = output<void>()

	onBlur() {
		this.blur.emit();
	}

	protected optionChanged(option: string, checked: boolean) {
		const currentValue = Array.isArray(this.value()) ? this.value() : [];
		if (checked && !currentValue.includes(option)) {
			this.modify.emit(currentValue.concat(option));
			return;
		}
		if (!checked && currentValue.includes(option)) {
			this.modify.emit(currentValue.filter(o => o !== option));
		}
	}

	protected isChecked(option: string) {
		const currentValue = Array.isArray(this.value()) ? this.value() : [];
		return currentValue.includes(option);
	}
}
