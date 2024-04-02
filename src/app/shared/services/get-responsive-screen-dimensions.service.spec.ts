import { TestBed } from '@angular/core/testing';

import { GetResponsiveScreenDimensionsService } from './get-responsive-screen-dimensions.service';

describe('GetResponsiveScreenDimensionsService', () => {
  let service: GetResponsiveScreenDimensionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetResponsiveScreenDimensionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
