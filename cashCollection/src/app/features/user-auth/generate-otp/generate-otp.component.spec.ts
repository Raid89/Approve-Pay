import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOtpComponent } from './generate-otp.component';

describe('GenerateOtpComponent', () => {
  let component: GenerateOtpComponent;
  let fixture: ComponentFixture<GenerateOtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateOtpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
