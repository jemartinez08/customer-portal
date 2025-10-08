import { TestBed } from '@angular/core/testing';

import { AiSummaryModalService } from './ai-summary-modal.service';

describe('AiSummaryModalService', () => {
  let service: AiSummaryModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiSummaryModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
