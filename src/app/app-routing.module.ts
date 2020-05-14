import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PicturesComponent } from './pictures/pictures.component';
import { RecordingsComponent } from './recordings/recordings.component';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { VideosComponent } from './videos/videos.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { VideoStreamComponent } from './video-stream/video-stream.component';


const routes: Routes = [
  { path: 'pictures', component: PicturesComponent },
  { path: 'recordings', component: RecordingsComponent },
  { path: 'geolocation', component: GeolocationComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'qr-code', component: QrCodeComponent },
  { path: 'video-stream', component: VideoStreamComponent },
  { path: '', component: PicturesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
