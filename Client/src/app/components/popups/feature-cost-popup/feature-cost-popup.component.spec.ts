import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCostPopupComponent } from './feature-cost-popup.component';

describe('FeatureCostPopupComponent', () => {
  let component: FeatureCostPopupComponent;
  let fixture: ComponentFixture<FeatureCostPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureCostPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureCostPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
