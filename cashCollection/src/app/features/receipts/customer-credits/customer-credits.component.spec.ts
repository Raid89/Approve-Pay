import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreditsComponent } from './customer-credits.component';

describe('CustomerCreditsComponent', () => {
  let component: CustomerCreditsComponent;
  let fixture: ComponentFixture<CustomerCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerCreditsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
