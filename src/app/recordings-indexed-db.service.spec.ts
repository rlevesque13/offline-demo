import { TestBed } from '@angular/core/testing';

import { RecordingsIndexedDbService } from './recordings-indexed-db.service';

describe('RecordingsIndexedDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordingsIndexedDbService = TestBed.get(RecordingsIndexedDbService);
    expect(service).toBeTruthy();
  });
});
