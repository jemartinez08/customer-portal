import { TestBed } from '@angular/core/testing';

import { GraphMsalService } from './graph-msal.service';

describe('GraphMsalService', () => {
  let service: GraphMsalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphMsalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
