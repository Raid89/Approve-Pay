import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityValidationComponent } from './identity-validation.component';

describe('IdentityValidationComponent', () => {
  let component: IdentityValidationComponent;
  let fixture: ComponentFixture<IdentityValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentityValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentityValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
