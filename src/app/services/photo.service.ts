import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private dataService: DataService) { }

  public takePhoto() {
    Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    }).then(
      capturedPhoto => {
        fetch(capturedPhoto.webPath).then(
          response => {
            response.blob().then(
              blob => this.dataService.postReceipt(blob).subscribe(
                message => {
                  this.dataService.addMessage(message);
                  console.log('message', message);
                }
              )
            );
          }
        );
      }
    );

  }
}
