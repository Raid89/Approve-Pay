import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionFeesComponent } from './selection-fees.component';

describe('SelectionFeesComponent', () => {
  let component: SelectionFeesComponent;
  let fixture: ComponentFixture<SelectionFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionFeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
