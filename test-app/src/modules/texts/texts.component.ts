import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypoService } from 'src/services/typo.service';

@Component({
  selector: 'app-texts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.scss']
})
export class TextsComponent implements OnInit {

  text: any;
  constructor(private service: TypoService) {}
   
  ngOnInit() {

      this.service.getTextByLanguage('English')
      .subscribe(response => {
        this.text = response;
      });

}
}