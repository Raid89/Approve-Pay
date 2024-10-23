import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatorInfoComponent } from './coordinator-info.component';

describe('CoordinatorInfoComponent', () => {
  let component: CoordinatorInfoComponent;
  let fixture: ComponentFixture<CoordinatorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoordinatorInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoordinatorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
