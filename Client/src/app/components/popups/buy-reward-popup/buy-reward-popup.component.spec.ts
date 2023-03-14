import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyRewardPopupComponent } from './buy-reward-popup.component';

describe('BuyRewardPopupComponent', () => {
  let component: BuyRewardPopupComponent;
  let fixture: ComponentFixture<BuyRewardPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyRewardPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyRewardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
