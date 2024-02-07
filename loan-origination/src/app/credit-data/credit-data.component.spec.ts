import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditDataComponent } from './credit-data.component';

describe('CreditDataComponent', () => {
  let component: CreditDataComponent;
  let fixture: ComponentFixture<CreditDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
