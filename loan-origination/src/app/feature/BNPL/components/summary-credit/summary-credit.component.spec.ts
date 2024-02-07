import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCreditComponent } from './summary-credit.component';

describe('SummaryCreditComponent', () => {
  let component: SummaryCreditComponent;
  let fixture: ComponentFixture<SummaryCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryCreditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
