import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/services/users.service';
import { UploadAvatarComponent } from '../upload-avatar/upload-avatar.component'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

}
