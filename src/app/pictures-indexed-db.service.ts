import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Picture } from './shared/picture.model';

@Injectable({
  providedIn: 'root'
})
export class PicturesIndexedDbService {
  dbVersion = 1;
  db: Dexie;
  pictures: Dexie.Table<Picture>;

  constructor() {
    this.db = new Dexie('pictures');
    this.db.version(this.dbVersion).stores({
      pictures: '++id'
    });

    this.pictures = this.db.table('pictures');
  }

  public Add(picture: Picture) {
    this.pictures
      .put(picture)
      .then(async () => {
        console.log('Saved in DB');
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e));
      });
  }

  public Get(): Promise<Picture[]> {
    return this.pictures.limit(100).toArray();
  }
}
