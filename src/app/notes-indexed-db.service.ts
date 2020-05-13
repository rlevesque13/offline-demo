import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Note } from './shared/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesIndexedDbService {
  dbVersion = 1;
  db: Dexie;
  notes: Dexie.Table<Note>;

  constructor() {
    this.db = new Dexie('notes');
    this.db.version(this.dbVersion).stores({
      notes: '++id, text'
    });

    this.notes = this.db.table('notes');
  }

  public AddNote(note: Note) {
    this.notes
      .put(note)
      .then(async () => {
        console.log('Saved in DB');
      })
      .catch(e => {
        alert('Error: ' + (e.stack || e));
      });
  }

  public GetNotes(): Promise<Note[]> {
    return this.notes.toArray();
  }
}
