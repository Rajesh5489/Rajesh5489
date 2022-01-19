import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreShelvesComponent } from './store-shelves.component';

describe('StoreShelvesComponent', () => {
  let component: StoreShelvesComponent;
  let fixture: ComponentFixture<StoreShelvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreShelvesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreShelvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
