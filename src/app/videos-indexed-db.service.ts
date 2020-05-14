import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Video } from './shared/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideosIndexedDbService {
  dbVersion = 1;
  db: Dexie;
  videos: Dexie.Table<Video>;

  constructor() {
    this.db = new Dexie('videos');
    this.db.version(this.dbVersion).stores({
      videos: '++id'
    });

    this.videos = this.db.table('videos');
  }

  public Add(video: Video) {
    this.videos
      .put(video)
      .then(async () => {
        console.log('Saved in DB');
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e));
      });
  }

  public Get(): Promise<Video[]> {
    return this.videos.limit(100).toArray();
  }
}
