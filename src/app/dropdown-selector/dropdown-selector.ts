import { Component, input } from '@angular/core';

@Component({
	selector: 'app-dropdown-selector',
	imports: [],
	templateUrl: './dropdown-selector.html',
	styleUrl: './dropdown-selector.css',
})
export class DropdownSelector {
	isDisplayNameVisible = input<boolean>(true);
}
