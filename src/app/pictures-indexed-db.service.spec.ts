import { TestBed } from '@angular/core/testing';

import { PicturesIndexedDbService } from './pictures-indexed-db.service';

describe('PicturesIndexedDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PicturesIndexedDbService = TestBed.get(PicturesIndexedDbService);
    expect(service).toBeTruthy();
  });
});
