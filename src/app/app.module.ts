import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PicturesComponent } from './pictures/pictures.component';
import { RecordingsComponent } from './recordings/recordings.component';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { VideosComponent } from './videos/videos.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { VideoStreamComponent } from './video-stream/video-stream.component';
import { BarCodeScannerComponent } from './bar-code-scanner/bar-code-scanner.component';

@NgModule({
  declarations: [
    AppComponent,
    PicturesComponent,
    RecordingsComponent,
    GeolocationComponent,
    VideosComponent,
    QrCodeComponent,
    VideoStreamComponent,
    BarCodeScannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
