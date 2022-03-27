import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDetailsViewComponent } from './store-details-view.component';

describe('StoreDetailsViewComponent', () => {
  let component: StoreDetailsViewComponent;
  let fixture: ComponentFixture<StoreDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreDetailsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
