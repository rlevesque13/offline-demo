import { TestBed } from '@angular/core/testing';

import { VideosIndexedDbService } from './videos-indexed-db.service';

describe('VideosIndexedDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideosIndexedDbService = TestBed.get(VideosIndexedDbService);
    expect(service).toBeTruthy();
  });
});
