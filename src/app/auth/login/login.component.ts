import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

/* Social */

import { AuthService as  SocialAuthService } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}


  ngOnInit() {
    this.createForm();
    /* Auth FB */
    this.socialAuthService.authState.subscribe((user) => {
        console.log('user', user);
    });
  }

    signInWithFBHandler(): void {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }

    loginHandler() {
        const userData = {
          username: this.loginForm.value.userData.user.trim(),
          password: this.loginForm.value.userData.password.trim()
        };

        this.errorMessage = '';

        // 'test2test2', 'test2test'
        this.authService.login(userData).subscribe(
            (response) => {
                this.authService.setTokenToLst(response.token);
                this.router.navigate(['/user']);
            },
            (error: HttpErrorResponse) => {
                if (error.error.code === 422) {
                    error.error.result.forEach(cur => {
                        this.errorMessage += '' + cur.message;
                    });
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
          this.errorMessage = '';
        }, 4000);
    }

}
