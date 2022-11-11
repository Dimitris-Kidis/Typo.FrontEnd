import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentification.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  user: User = new User(0, "", "", "", "", "", 0, "", false);

  ngOnInit() {
    this.authService.getUserdata().subscribe((res: User) => this.user = res);
  }

}
