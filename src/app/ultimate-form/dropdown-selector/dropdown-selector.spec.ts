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

  it('should render prime select and label', () => {
    const label = fixture.nativeElement.querySelector('.group-label');
    const primeSelect = fixture.nativeElement.querySelector('p-select');

    expect(label?.textContent).toContain('Country');
    expect(primeSelect).toBeTruthy();
  });

  it('should emit selected value on value change', () => {
    spyOn(component.modify, 'emit');
    component.onValueChanged('JP');

    expect(component.modify.emit).toHaveBeenCalledWith('JP');
  });

  it('should emit blur event', () => {
    spyOn(component.blur, 'emit');
    const wrapper = fixture.nativeElement.querySelector('.wrapper');
    wrapper.dispatchEvent(new Event('focusout'));

    expect(component.blur.emit).toHaveBeenCalled();
  });
});
