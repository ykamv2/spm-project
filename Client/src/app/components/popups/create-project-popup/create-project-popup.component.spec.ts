import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectPopupComponent } from './create-project-popup.component';

describe('CreateProjectPopupComponent', () => {
  let component: CreateProjectPopupComponent;
  let fixture: ComponentFixture<CreateProjectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProjectPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProjectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
