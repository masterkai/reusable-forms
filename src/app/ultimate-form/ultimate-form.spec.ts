import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimateForm } from './ultimate-form';

describe('UltimateForm', () => {
  let component: UltimateForm;
  let fixture: ComponentFixture<UltimateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimateForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimateForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
