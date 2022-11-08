import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldControl } from '@angular/material/form-field';

import { UserForAuthenticationDto } from 'src/models/auth';
import { AuthenticationService } from 'src/services/authentification.service';
import { digitCheck, lowercaseLetterCheck, specialCharCheck, uppercaseLetterCheck } from '../../../../shared/form-validators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    emailPlaceholderText: string = 'text'
    loginForm!: FormGroup;
    private _returnUrl!: string;
    errorFlag: boolean = false;
  
    constructor(private _authService: AuthenticationService,
                private _router: Router,
                private _route: ActivatedRoute){}

    @ViewChild('inputEmail') inputEmail!: ElementRef;

    ngOnInit(): void {
      if (this._authService.isLoggedIn()) this._router.navigate(['/typo/main']);
      this.loginForm = new FormGroup({
        email: new FormControl("", [Validators.required,
                                       Validators.email,
                                       Validators.minLength(5),
                                       Validators.maxLength(30)]),
        password: new FormControl("", [Validators.required,
                                       Validators.minLength(8),
                                       Validators.maxLength(20),
                                       lowercaseLetterCheck,
                                       uppercaseLetterCheck,
                                       digitCheck,
                                       specialCharCheck])
      })
      this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }

    
    @ViewChild('invalidLogin') loginErrorMessage!: ElementRef;
    @ViewChild('image') image!: ElementRef;
    
    
    login = async (loginFormValue: any) => {
      console.log(this.loginForm);
      const login = { ...loginFormValue };
      const userForAuth: UserForAuthenticationDto = {
        email: login.email,
        password: login.password
      }
      this._authService.loginUser(userForAuth)
        .subscribe({
        next: async (res: any) => {
          localStorage.setItem("token", res.token);
          console.log('GOT IT ' + res.token);
          this._router.navigate(['/typo/main']).then(() => {
             window.location.reload();
          });
        },
        error:
          async () => {
            await changeContent(this, 'Invalid email or password.');
            await setBackgroundImage(this, true);
            await delay(5000);
            await setBackgroundImage(this, false);
            await changeContent(this, '');
          }
      });
    }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeContent(obj: any, content: string) {
  obj.loginErrorMessage.nativeElement.innerHTML = `${content}`;
}

function setBackgroundImage(obj: any, flag: boolean) {
  !flag ?
  obj.image.nativeElement.setAttribute('src', 'https://typostorage.blob.core.windows.net/avatars/Rectangle 97.svg') :
  obj.image.nativeElement.setAttribute('src', 'https://typostorage.blob.core.windows.net/avatars/Rectangle 938.svg');
}

