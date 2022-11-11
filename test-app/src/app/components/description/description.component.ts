import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  user: User = new User(0, "", "", "", "", "", 0, "", false);

  ngOnInit() {
    this.authService.getUserdata().subscribe((res: User) => this.user = res);
  }

}
