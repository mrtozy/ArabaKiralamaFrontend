import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSelectOptionComponent } from './color-select-option.component';

describe('ColorSelectOptionComponent', () => {
  let component: ColorSelectOptionComponent;
  let fixture: ComponentFixture<ColorSelectOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorSelectOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
