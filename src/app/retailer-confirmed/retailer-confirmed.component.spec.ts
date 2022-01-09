import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerConfirmedComponent } from './retailer-confirmed.component';

describe('RetailerConfirmedComponent', () => {
  let component: RetailerConfirmedComponent;
  let fixture: ComponentFixture<RetailerConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerConfirmedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
