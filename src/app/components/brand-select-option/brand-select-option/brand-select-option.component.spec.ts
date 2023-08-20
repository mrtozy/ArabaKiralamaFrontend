import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSelectOptionComponent } from './brand-select-option.component';

describe('BrandSelectOptionComponent', () => {
  let component: BrandSelectOptionComponent;
  let fixture: ComponentFixture<BrandSelectOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandSelectOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
