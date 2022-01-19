import { TestBed } from '@angular/core/testing';

import { BrandRoleAuthGuard } from './brand-role-auth.guard';

describe('BrandRoleAuthGuard', () => {
  let guard: BrandRoleAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BrandRoleAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
