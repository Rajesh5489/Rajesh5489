import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfDetailsViewComponent } from './shelf-details-view.component';

describe('ShelfDetailsViewComponent', () => {
  let component: ShelfDetailsViewComponent;
  let fixture: ComponentFixture<ShelfDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelfDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
