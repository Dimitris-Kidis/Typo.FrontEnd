import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllUsersViewModel } from 'src/view-models/allUsersViewModel';
import { TypoService } from 'src/services/typo.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: AllUsersViewModel[] = [];
  text: any;
  user: any;
  
   
  constructor(private service: TypoService) {}
   
  ngOnInit() {
    
      this.service.getAllUsers()
        .subscribe(response => {
          this.users = response;
        });
  }

}
