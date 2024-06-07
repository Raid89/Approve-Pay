import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCreditsComponent } from './table-credits.component';

describe('TableCreditsComponent', () => {
  let component: TableCreditsComponent;
  let fixture: ComponentFixture<TableCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCreditsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
