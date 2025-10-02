import { TestBed } from '@angular/core/testing';

import { SessionModalService } from './session-modal.service';

describe('SessionModalService', () => {
  let service: SessionModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
