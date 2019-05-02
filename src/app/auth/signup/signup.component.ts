import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { QueryResponseInterface } from '../../shared/models/query-response.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  signupHandler(): void {
    const userData = this.signupForm.value.userData;
    this.errorMessage = '';

    this.authService.register(userData).subscribe(
        (response) => {
            this.authService.setTokenToLst(response.accessToken.token);
            this.router.navigate(['/user']);
        },
        (error) => {
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
      this.signupForm = new FormGroup({
          userData: new FormGroup({
              username: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
              email: new FormControl(null, [Validators.required, Validators.email]),
              password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(255)])
          })
      });
  }

    clearErrorMessage() {
        setTimeout(() => {
            this.errorMessage = '';
        }, 4000);
    }

}
