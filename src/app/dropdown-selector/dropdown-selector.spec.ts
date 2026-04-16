import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownSelector } from './dropdown-selector';

describe('DropdownSelector', () => {
  let component: DropdownSelector;
  let fixture: ComponentFixture<DropdownSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownSelector);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'country');
    fixture.componentRef.setInput('displayName', 'Country');
    fixture.componentRef.setInput('value', 'TW');
    fixture.componentRef.setInput('hint', 'Please select country');
    fixture.componentRef.setInput('options', ['TW', 'JP']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dropdown options', () => {
    const options = fixture.nativeElement.querySelectorAll('option');
    expect(options.length).toBe(3);
    expect(options[1].value).toBe('TW');
    expect(options[2].value).toBe('JP');
  });

  it('should emit selected value on change', () => {
    spyOn(component.modify, 'emit');
    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    selectElement.value = 'JP';
    selectElement.dispatchEvent(new Event('change'));

    expect(component.modify.emit).toHaveBeenCalledWith('JP');
  });

  it('should emit blur event', () => {
    spyOn(component.blur, 'emit');
    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    selectElement.dispatchEvent(new Event('blur'));

    expect(component.blur.emit).toHaveBeenCalled();
  });
});
