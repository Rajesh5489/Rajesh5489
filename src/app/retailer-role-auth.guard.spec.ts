import { TestBed } from '@angular/core/testing';

import { RetailerRoleAuthGuard } from './retailer-role-auth.guard';

describe('RetailerRoleAuthGuard', () => {
  let guard: RetailerRoleAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RetailerRoleAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
