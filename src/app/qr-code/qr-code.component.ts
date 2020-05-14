import { Component, OnInit } from '@angular/core';
import QrCode from 'qrcode-reader';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
  result: string;
  error: boolean;

  constructor() {
    this.error = false;
  }

  ngOnInit() {
  }

  decodeQr(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const qr = new QrCode();

      qr.callback = (err, value) => {
        if (err) {
          console.error(err);
        } else {
          this.result = value.result;
        }
      };

      qr.decode(reader.result);
    };

    reader.onerror = error => {
      console.log(error);
    };
  }
}
