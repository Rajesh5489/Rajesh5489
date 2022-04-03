import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerRequestedComponent } from './bookings.component';

describe('RetailerRequestedComponent', () => {
  let component: RetailerRequestedComponent;
  let fixture: ComponentFixture<RetailerRequestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerRequestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
