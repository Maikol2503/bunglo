import { TestBed } from '@angular/core/testing';

import { LoaderBungloService } from './loader-bunglo.service';

describe('LoaderBungloService', () => {
  let service: LoaderBungloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderBungloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
