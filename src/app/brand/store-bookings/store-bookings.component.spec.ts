import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreBookingsComponent } from './store-bookings.component';

describe('StoreBookingsComponent', () => {
  let component: StoreBookingsComponent;
  let fixture: ComponentFixture<StoreBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreBookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
