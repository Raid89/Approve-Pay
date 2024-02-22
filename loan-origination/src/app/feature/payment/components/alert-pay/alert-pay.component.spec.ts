import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPayComponent } from './alert-pay.component';

describe('AlertPayComponent', () => {
  let component: AlertPayComponent;
  let fixture: ComponentFixture<AlertPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
