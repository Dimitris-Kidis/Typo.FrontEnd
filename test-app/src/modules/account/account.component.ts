import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypoService } from 'src/services/typo.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: any;

  constructor(private service: TypoService) {}
  
  ngOnInit(): void {

    this.service.getUserById(20)
      .subscribe(response => {
        this.user = response;
      });
  }

  getRandomUser(){
    let random = Math.floor(Math.random() * (24 - 17 + 1)) + 17;
    this.service.getUserById(random)
      .subscribe(response => {
        this.user = response;
      });
  }

}
