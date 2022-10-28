import { Component, OnInit } from '@angular/core';
import { CreateTextCommand } from 'src/commands/Texts/CreateTextCommand';
import { TextsService } from 'src/services/texts.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private service: TextsService) {}


  request3: CreateTextCommand = new CreateTextCommand(
    "hello hellohello hellohello hellohello hellohello hellohello hellohello hellohello hello",
    "Ray Rider",
    4,
    "English");
   

  ngOnInit() {
    // this.service.createText(this.request3).subscribe(console.log);
    // this.service.deleteTextById(16).subscribe(console.log);
  }
  
  
}