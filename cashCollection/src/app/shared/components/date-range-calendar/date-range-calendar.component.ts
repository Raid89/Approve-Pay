import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-range-calendar',
  templateUrl: './date-range-calendar.component.html',
  styleUrls: ['./date-range-calendar.component.scss']
})
export class DateRangeCalendarComponent {
  @Output() setDateRange = new EventEmitter<{ start: Date | null, end: Date | null }>();
  currentMonth: Date;
  weeks: any[] = [];
  range: { start: Date | null, end: Date | null } = { start: null, end: null };
  minDate: Date;
  maxDate: Date;

  constructor() {
    this.currentMonth = new Date();
    this.maxDate = new Date();
    this.minDate = new Date();
    this.minDate.setDate(this.maxDate.getDate() - 60);
    this.generateCalendar();
  }

  generateCalendar() {
    const start = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const end = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    const numDays = end.getDate();
    const startDay = start.getDay();

    let days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= numDays; i++) {
      const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), i);
      days.push(date);
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    this.weeks = [];
    while (days.length) {
      this.weeks.push(days.splice(0, 7));
    }
  }

  prevMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateCalendar();
  }

  selectDate(date: Date) {
    if (this.isDateSelectable(date)) {
      if (!this.range.start || (this.range.start && this.range.end)) {
        this.range.start = date;
        this.range.end = null;
        debugger
      } else if (this.range.start && !this.range.end && date >= this.range.start) {
        this.range.end = date;
        this.setDateRange.emit(this.range);
      } else {
        this.range.start = date;
        this.range.end = null;
      }
    }
  }

  isInRange(date: Date) {
    if (!this.range.start || !date) return false;
    if (!this.range.end) return date.getTime() === this.range.start.getTime();
    return date >= this.range.start && date <= this.range.end;
  }

  isDateSelectable(date: Date) {
    return date >= this.minDate && date <= this.maxDate;
  }
}
