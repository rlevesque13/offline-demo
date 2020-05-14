import { Component, OnInit } from '@angular/core';
import { RecordingsIndexedDbService } from '../recordings-indexed-db.service';
import { Recording } from '../shared/recording.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recordings',
  templateUrl: './recordings.component.html',
  styleUrls: ['./recordings.component.scss']
})
export class RecordingsComponent implements OnInit {
  recordings: Recording[];

  constructor(private recordingsIndexedDbService: RecordingsIndexedDbService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const recording = new Recording();
      recording.data = reader.result;
      this.recordingsIndexedDbService.Add(recording);
    };
    reader.onerror = error => {
      console.log(error);
    };
  }

  getSafeUrl(recording: Recording): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(recording.data.toString());
  }

  getRecordings() {
    this.recordingsIndexedDbService.Get()
      .then(recordings => {
        this.recordings = recordings;
      });
  }
}
