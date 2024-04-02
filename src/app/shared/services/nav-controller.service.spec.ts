import { TestBed } from '@angular/core/testing';

import { NavControllerService } from './nav-controller.service';

describe('NavControllerService', () => {
  let service: NavControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
