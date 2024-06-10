import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeCalendarComponent } from './date-range-calendar.component';

describe('DateRangeCalendarComponent', () => {
  let component: DateRangeCalendarComponent;
  let fixture: ComponentFixture<DateRangeCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateRangeCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateRangeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
