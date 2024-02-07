import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignDocumentsComponent } from './sign-documents.component';

describe('SignDocumentsComponent', () => {
  let component: SignDocumentsComponent;
  let fixture: ComponentFixture<SignDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
