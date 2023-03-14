import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeaturePopupComponent } from './add-feature-popup.component';

describe('AddFeaturePopupComponent', () => {
  let component: AddFeaturePopupComponent;
  let fixture: ComponentFixture<AddFeaturePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeaturePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeaturePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
