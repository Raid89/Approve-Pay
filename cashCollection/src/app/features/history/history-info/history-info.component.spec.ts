import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryInfoComponent } from './history-info.component';

describe('HistoryInfoComponent', () => {
  let component: HistoryInfoComponent;
  let fixture: ComponentFixture<HistoryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoryInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
