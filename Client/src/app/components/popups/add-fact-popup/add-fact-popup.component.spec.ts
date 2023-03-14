import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFactPopupComponent } from './add-fact-popup.component';

describe('AddFactPopupComponent', () => {
  let component: AddFactPopupComponent;
  let fixture: ComponentFixture<AddFactPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFactPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFactPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
