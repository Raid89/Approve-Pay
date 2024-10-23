import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorHistoryComponent } from './coordinator-history.component';

describe('CoordinatorHistoryComponent', () => {
  let component: CoordinatorHistoryComponent;
  let fixture: ComponentFixture<CoordinatorHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoordinatorHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordinatorHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
