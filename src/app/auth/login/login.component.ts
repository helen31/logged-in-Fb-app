import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../auth.service';
import { UserInterface } from '../../shared/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit() {
    this.createForm();
  }

  loginHandler() {
    const userData = {
      username: this.loginForm.value.userData.user,
      password: this.loginForm.value.userData.password
    };

    this.errorMessage = false;

    // 'test2test2', 'test2test'
    this.authService.login(userData).subscribe(
        (responce: UserInterface) => {
            console.log('responce', responce);
            const userCopy = Object.assign({}, responce);

            this.authService.setTokenToLst(userCopy.token);
            this.router.navigate(['/user']);
        },
        (error: HttpErrorResponse) => {
          if (error.error.code === 422) {
            this.errorMessage = true;
            this.clearErrorMessage();
          }
        }
    );
  }

  createForm(): void {
    this.loginForm = new FormGroup({
        userData: new FormGroup({
            user: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
            password: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)])
        })
    });
  }

  clearErrorMessage() {
    setTimeout(() => {
      this.errorMessage = false;
    }, 4000);
  }

}
