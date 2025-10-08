import { TestBed } from '@angular/core/testing';

import { ChatbotModalService } from './chatbot-modal.service';

describe('ChatbotModalService', () => {
  let service: ChatbotModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
