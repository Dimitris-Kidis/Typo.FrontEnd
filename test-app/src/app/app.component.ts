import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllUsersViewModel } from 'src/view-models/allUsersViewModel';
import { TypoService } from '../services/typo.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
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