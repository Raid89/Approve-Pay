import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTotalComponent } from './history-total.component';

describe('HistoryTotalComponent', () => {
  let component: HistoryTotalComponent;
  let fixture: ComponentFixture<HistoryTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryTotalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
