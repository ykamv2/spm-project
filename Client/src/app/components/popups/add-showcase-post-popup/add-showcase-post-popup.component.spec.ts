import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowcasePostPopupComponent } from './add-showcase-post-popup.component';

describe('AddShowcasePostPopupComponent', () => {
  let component: AddShowcasePostPopupComponent;
  let fixture: ComponentFixture<AddShowcasePostPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShowcasePostPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShowcasePostPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
