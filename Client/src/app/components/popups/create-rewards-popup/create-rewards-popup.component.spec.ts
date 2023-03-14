import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRewardsPopupComponent } from './create-rewards-popup.component';

describe('CreateRewardsPopupComponent', () => {
  let component: CreateRewardsPopupComponent;
  let fixture: ComponentFixture<CreateRewardsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRewardsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRewardsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
