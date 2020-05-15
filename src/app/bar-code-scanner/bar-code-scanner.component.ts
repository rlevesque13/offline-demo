import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Quagga from 'quagga';
import { from } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-bar-code-scanner',
  templateUrl: './bar-code-scanner.component.html',
  styleUrls: ['./bar-code-scanner.component.scss']
})
export class BarCodeScannerComponent implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;
  code: any;
  devices: MediaDeviceInfo[];
  audioDeviceId: string;
  videoDeviceId: string;
  deviceIsSelected: boolean;
  stream: MediaStream;

  constructor(private router: Router) {
    this.devices = [];
    this.deviceIsSelected = false;
  }

  ngOnInit() {
    from(navigator.mediaDevices.enumerateDevices())
      .subscribe(devices => {
        devices.forEach((device: MediaDeviceInfo) => {
          if (device.kind === 'videoinput') {
            this.devices.push(device);
          }
        });
      });

    this.router.events.subscribe(x => {
      const navigationEnd = x instanceof NavigationEnd;
      if (navigationEnd) {
        Quagga.stop();
        this.stream.getTracks().forEach(track => track.stop());
      }
    });
  }

  reset() {
    Quagga.stop();
    this.stream.getTracks().forEach((track) => {
      track.stop();
    });
    this.deviceIsSelected = false;
    this.videoDeviceId = '';
  }

  onDeviceSelected() {
    this.deviceIsSelected = true;
    const videoMediaTrackConstraintSet: MediaTrackConstraintSet = { deviceId: this.videoDeviceId, facingMode: { exact: 'environment' } };

    const constraints: MediaStreamConstraints = {
      video: {
        advanced: [videoMediaTrackConstraintSet]
      }
    };

    navigator.mediaDevices.getUserMedia(constraints).
      then((stream) => {
        this.videoPlayer.nativeElement.srcObject = stream;
        this.stream = stream;
      });

    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#videoPlayer')
      },
      decoder: {
        readers: [
          'code_128_reader',
          'code_39_reader',
          'code_39_vin_reader',
          'upc_reader',
          'upc_e_reader'
        ]
      }
    }, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Initialization finished. Ready to start');
      Quagga.start();
      Quagga.onDetected((data) => {
        this.code = data.codeResult.code;
      });
    });
  }
}
