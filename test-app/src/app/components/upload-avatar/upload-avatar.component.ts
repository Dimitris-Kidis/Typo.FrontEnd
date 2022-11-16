import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentification.service';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})

export class UploadAvatarComponent implements OnInit {
  selectedFile!: File;

  constructor(private _authService: AuthenticationService) { }

  ngOnInit(): void { }

  onChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onFileSelected() {
    if (this.selectedFile) {
      this._authService.uploadPhoto(this.selectedFile).subscribe(() => {
        window.location.reload();
      });
    }
  }

  onDeletePhoto() {
    this._authService.deletePhoto().subscribe(() => {
      window.location.reload()
    });
  }
}
  

