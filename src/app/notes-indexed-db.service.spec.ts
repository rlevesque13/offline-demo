import { TestBed } from '@angular/core/testing';

import { NotesIndexedDbService } from './notes-indexed-db.service';

describe('NotesIndexedDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotesIndexedDbService = TestBed.get(NotesIndexedDbService);
    expect(service).toBeTruthy();
  });
});
