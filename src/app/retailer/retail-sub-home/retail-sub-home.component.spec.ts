import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailSubHomeComponent } from './retail-sub-home.component';

describe('RetailSubHomeComponent', () => {
  let component: RetailSubHomeComponent;
  let fixture: ComponentFixture<RetailSubHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailSubHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailSubHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
