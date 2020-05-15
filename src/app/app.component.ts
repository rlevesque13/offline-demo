import { Component, OnInit } from '@angular/core';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'offline-demo';
  isOnline: boolean;

  constructor() {
    this.isOnline = navigator.onLine;
  }

  ngOnInit(): void {
    this.createOnline$()
      .subscribe(isOnline => {
        if (isOnline) {
          console.log('Online');
        } else {
          console.log('Offline');
        }
        this.isOnline = isOnline;
      });
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
