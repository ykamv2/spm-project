import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommunityPostPopupComponent } from './add-community-post-popup.component';

describe('AddCommunityPostPopupComponent', () => {
  let component: AddCommunityPostPopupComponent;
  let fixture: ComponentFixture<AddCommunityPostPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommunityPostPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCommunityPostPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
