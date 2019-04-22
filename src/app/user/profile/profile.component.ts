import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { ProfileInterface } from '../../shared/models/profile.interface';
import { WebStorageService } from '../../core/web-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  loggedInUser = true;
  userId: number = null;
  profileForm: FormGroup;
  isValidForm = false;
  subscriptionControlsVal: Subscription;
  profileDataObj;

  constructor(
      private userService: UserService,
      private webStorageService: WebStorageService,
      private formBuilder: FormBuilder) {
      this.userId = this.webStorageService.getLoggedInUserId();
      this.getUser(this.userId);
      this.createForm();
  }

  ngOnInit() {
      this.subscriptionControlsVal = this.profileForm.valueChanges.subscribe(values => {
          Object.keys(values).forEach((key) => {
              if (values[key] != null && this.profileDataObj[key] !== values[key]) {
                this.isValidForm = true;
              }
          });
      });
  }

  ngOnDestroy() {
      this.subscriptionControlsVal.unsubscribe();
  }

  getUser(id: number): void {
      this.userService.getUser(id).subscribe(
          (res: ProfileInterface) => {
            this.profileDataObj = Object.assign({}, res.result);
            this.setValuesForFormBuilderControl(res.result);
          },
          (error) => {
            console.log(error);
          }
      );
  }

  editProfileHandler(): void {
    const profileData = this.userService.createProfileData(this.profileForm.value);

    this.userService.updateUser(profileData).subscribe(
        (res: ProfileInterface) => {
          this.profileDataObj = res.result;
        },
        (error) => {
          console.log(error);
        }
    );

  }

  createForm(): void {
    this.profileForm = this.formBuilder.group({
        first_name: null,
        last_name: null,
        gender: null
    });
  }

  setValuesForFormBuilderControl(profileData): void {
    for (const key in profileData) {
        if (this.profileForm.controls.hasOwnProperty(key)) {
            this.profileForm.controls[key].setValue(profileData[key]);
        }
    }
  }

}
