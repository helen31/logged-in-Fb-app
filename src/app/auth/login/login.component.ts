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
  errorMessage: string = null;



  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit() {
    this.createForm();
  }

  loginHandler() {
    const userData = {
      username: this.loginForm.value.userData.user.trim(),
      password: this.loginForm.value.userData.password.trim()
    };

    this.errorMessage = null;

    // 'test2test2', 'test2test'
    this.authService.login(userData).subscribe(
        (responce: UserInterface) => {
            const userCopy = Object.assign({}, responce);

            this.authService.setTokenToLst(userCopy.result.token);
            this.router.navigate(['/user']);
        },
        (error: HttpErrorResponse) => {
            if (error.error.code === 422) {
                this.errorMessage = error.error.result[0].message;
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
          this.errorMessage = null;
        }, 4000);
    }

    logInWithFbHandler() {}

}
