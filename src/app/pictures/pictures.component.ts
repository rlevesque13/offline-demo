import { Component, OnInit } from '@angular/core';
import { Picture } from '../shared/picture.model';
import { PicturesIndexedDbService } from '../pictures-indexed-db.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  pictures: Picture[];

  constructor(private picturesIndexedDbService: PicturesIndexedDbService) { }

  ngOnInit() {
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const picture = new Picture();
      picture.data = reader.result;
      this.picturesIndexedDbService.Add(picture);
    };
    reader.onerror = error => {
      console.log(error);
    };
  }

  getPictures() {
    this.picturesIndexedDbService.Get()
      .then(pictures => {
        this.pictures = pictures;
      });
  }
}
