import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuHomeComponent } from './menu-home.component';

describe('MenuHomeComponent', () => {
  let component: MenuHomeComponent;
  let fixture: ComponentFixture<MenuHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
