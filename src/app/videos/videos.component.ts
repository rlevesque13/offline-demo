import { Component, OnInit } from '@angular/core';
import { VideosIndexedDbService } from '../videos-indexed-db.service';
import { Video } from '../shared/video.model';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videos: Video[];

  constructor(private videosIndexedDbService: VideosIndexedDbService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const recording = new Video();
      recording.data = reader.result;
      this.videosIndexedDbService.Add(recording);
    };
    reader.onerror = error => {
      console.log(error);
    };
  }

  getSafeUrl(video: Video): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(video.data.toString());
  }

  getVideos() {
    this.videosIndexedDbService.Get()
      .then(videos => {
        this.videos = videos;
      });
  }
}
