import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorTotalComponent } from './coordinator-total.component';

describe('CoordinatorTotalComponent', () => {
  let component: CoordinatorTotalComponent;
  let fixture: ComponentFixture<CoordinatorTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoordinatorTotalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordinatorTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
