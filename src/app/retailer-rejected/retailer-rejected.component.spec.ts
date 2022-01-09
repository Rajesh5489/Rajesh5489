import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerRejectedComponent } from './retailer-rejected.component';

describe('RetailerRejectedComponent', () => {
  let component: RetailerRejectedComponent;
  let fixture: ComponentFixture<RetailerRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerRejectedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
