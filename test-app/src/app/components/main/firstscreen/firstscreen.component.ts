import { Component, OnInit } from '@angular/core';
import { TextsService } from 'src/services/texts.service';

@Component({
  selector: 'app-firstscreen',
  templateUrl: './firstscreen.component.html',
  styleUrls: ['./firstscreen.component.scss']
})
export class FirstscreenComponent implements OnInit {

  textContent: string;
  textObject: Text;
  author: string = '  -  ';

  constructor(private _textService: TextsService) { }

  ngOnInit(): void {
    this._textService
      .getTextByLanguage('English')
      .subscribe((res: any) => {
        this.textObject = res;
        this.textContent = res.textContent;
        this.author += res.author;
        console.log(this.author);
      })
  }

}
