import { Component } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public loading = false;

  constructor(
    private data: DataService,
    private photoService: PhotoService
   ) {}

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }

  takePhoto() {
    this.loading = true;
    this.photoService.takePhoto();
    this.loading = false;
  }

}
