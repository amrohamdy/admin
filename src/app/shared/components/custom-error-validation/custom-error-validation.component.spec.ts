import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomErrorValidationComponent } from './custom-error-validation.component';

describe('CustomErrorValidationComponent', () => {
  let component: CustomErrorValidationComponent;
  let fixture: ComponentFixture<CustomErrorValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomErrorValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomErrorValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
