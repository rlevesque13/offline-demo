import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Recording } from '../shared/recording.model';
import { RecordingsIndexedDbService } from '../recordings-indexed-db.service';
import { from } from 'rxjs';
import { Video } from '../shared/video.model';
import { VideosIndexedDbService } from '../videos-indexed-db.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
declare var MediaRecorder: any;

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;
  stream: MediaStream;
  shouldStop: boolean;
  stopped: boolean;
  mediaRecorder: any;
  videoChunks: ArrayBuffer;

  constructor(private videosIndexedDbService: VideosIndexedDbService, private domSanitizer: DomSanitizer, private router: Router) {
    this.stopped = true;
    this.shouldStop = false;
  }

  ngOnInit() {
    const constraints = {
      video: true,
      audio: true
    };
    navigator.mediaDevices.getUserMedia(constraints).
      then((stream) => {
        this.videoPlayer.nativeElement.srcObject = stream;
        this.stream = stream;
      });

    this.router.events.subscribe(x => {
      const navigationEnd = x instanceof NavigationEnd;
      if (navigationEnd) {
        this.stream.getTracks().forEach(track => track.stop());
      }
    });
  }

  startRecording() {
    const options = { mimeType: 'video/webm', timeslice: 500 };
    this.stopped = false;
    this.shouldStop = false;
    this.mediaRecorder = new MediaRecorder(this.stream, options);
    this.videoChunks = null;

    this.mediaRecorder.addEventListener('dataavailable', (e) => {
      if (e.data.size > 0) {
        from(e.data.arrayBuffer())
          .subscribe((chunk: ArrayBuffer) => {
            if (this.videoChunks) {
              this.videoChunks = this.appendBuffer(this.videoChunks, chunk);
            } else {
              this.videoChunks = chunk;
            }

            if (this.shouldStop) {
              const base64ArrayBuffer = this.base64ArrayBuffer(this.videoChunks);
              const video = new Video();
              video.data = 'data:video/webm;base64, ' + base64ArrayBuffer;
              this.videosIndexedDbService.Add(video);
            }
          });
      }
    });

    this.mediaRecorder.addEventListener('stop', () => {
      this.stopped = true;
    });

    this.mediaRecorder.addEventListener('onerror', (e) => {
      console.log(e);
    });

    this.mediaRecorder.start(500);
  }

  appendBuffer(buffer1, buffer2): ArrayBuffer {
    const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp;
  }

  stopRecording() {
    this.shouldStop = true;
    this.mediaRecorder.stop();
  }

  base64ArrayBuffer(arrayBuffer) {
    var base64 = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    var bytes = new Uint8Array(arrayBuffer)
    var byteLength = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength = byteLength - byteRemainder

    var a, b, c, d
    var chunk

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
      d = chunk & 63               // 63       = 2^6 - 1

      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength]

      a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

      // Set the 4 least significant bits to zero
      b = (chunk & 3) << 4 // 3   = 2^2 - 1

      base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

      // tslint:disable-next-line: no-bitwise
      a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

      // Set the 2 least significant bits to zero
      c = (chunk & 15) << 2; // 15    = 2^4 - 1

      base64 += encodings[a] + encodings[b] + encodings[c] + '=';
    }

    return base64;
  }
}
