import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PicturesComponent } from './pictures/pictures.component';
import { AudioComponent } from './audio/audio.component';


const routes: Routes = [
  { path: 'pictures', component: PicturesComponent },
  { path: 'audio', component: AudioComponent },
  { path: '', component: PicturesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
