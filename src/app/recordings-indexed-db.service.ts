import { Injectable } from '@angular/core';
import { Recording } from './shared/recording.model';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class RecordingsIndexedDbService {
  dbVersion = 1;
  db: Dexie;
  recordings: Dexie.Table<Recording>;

  constructor() {
    this.db = new Dexie('recordings');
    this.db.version(this.dbVersion).stores({
      recordings: '++id'
    });

    this.recordings = this.db.table('recordings');
  }

  public Add(picture: Recording) {
    this.recordings
      .put(picture)
      .then(async () => {
        console.log('Saved in DB');
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e));
      });
  }

  public Get(): Promise<Recording[]> {
    return this.recordings.limit(100).toArray();
  }
}