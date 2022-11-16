import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserForAuthenticationDto, UserForRegistrationDto } from 'src/models/auth';
import { AuthenticationService } from 'src/services/authentification.service';
import { lowercaseLetterCheck, uppercaseLetterCheck, digitCheck, specialCharCheck, noSpaceAllowed, noNumbersAllowed, noSpecialCharAllowed, noLettersAllowed, noNumbersCharsSpaces, nameLength, ageRange } from '../../../../shared/form-validators';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  private _returnUrl!: string;
  errorFlag: boolean = false;

  constructor(private _authService: AuthenticationService,
              private _router: Router,
              private _route: ActivatedRoute){}

  @ViewChild('image') image!: ElementRef;

  ngOnInit(): void {
    if (this._authService.isLoggedIn()) this._router.navigate(['/typo/main']);
    this.registrationForm = new FormGroup({
      firstName: new FormControl("", [Validators.required,
                                      nameLength,
                                      noNumbersCharsSpaces]),
      lastName: new FormControl("", [Validators.required,
                                     nameLength,
                                     noNumbersCharsSpaces]),
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
                                     specialCharCheck]),
      age: new FormControl("", [Validators.required,
                                ageRange,
                                noLettersAllowed]),
      gender: new FormControl("", [Validators.required]),
    })
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  @ViewChild('invalidRegistration') registerErrorMessage!: ElementRef;
  
  login = async (registrationFormValue: any) => {
    console.log(this.registrationForm);
    const register = { ...registrationFormValue };
    const userRegisters: UserForRegistrationDto = {
      email: register.email,
      password: register.password,
      firstName: register.firstName,
      lastName: register.lastName,
      gender: register.gender,
      age: register.age
    }
    this._authService.registerUser(userRegisters)
      .subscribe({
        next: (_: any) => {
          const userForAuth: UserForAuthenticationDto = {
            email: userRegisters.email,
            password: userRegisters.password
          };
          this._authService.loginUser(userForAuth)
            .subscribe({
              next: (res: any) => {
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
            })
        },
        error: async () => {
          if (this.form.nativeElement.classList.contains('ng-valid')) {
            await changeContent(this, "There's user with such email");
            await setBackgroundImage(this, true);
            await delay(5000);
            await setBackgroundImage(this, false);
            await changeContent(this, '');
          } else {
            await changeContent(this, "Please fill in the form");
            await setBackgroundImage(this, true);
            await delay(5000);
            await setBackgroundImage(this, false);
            await changeContent(this, '');
          }
        }
      });
  }

  @ViewChild('form') form!: ElementRef;

  checkForm () {
    if (this.form.nativeElement.classList.contains('ng-valid')) {

    }
  }
}

function delay(ms: number) {
return new Promise(resolve => setTimeout(resolve, ms));
}

function changeContent(obj: any, content: string) {
obj.registerErrorMessage.nativeElement.innerHTML = `${content}`;
}

function setBackgroundImage(obj: any, flag: boolean) {
  !flag ?
  obj.image.nativeElement.setAttribute('src', 'https://typostorage.blob.core.windows.net/avatars/reg.svg') :
  obj.image.nativeElement.setAttribute('src', 'https://typostorage.blob.core.windows.net/avatars/reg2.svg');
}