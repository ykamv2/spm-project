import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecreationalComponent } from './recreational.component';

describe('RecreationalComponent', () => {
  let component: RecreationalComponent;
  let fixture: ComponentFixture<RecreationalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecreationalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecreationalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
