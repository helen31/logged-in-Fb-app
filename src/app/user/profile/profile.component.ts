import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { ProfileInterface } from '../../shared/models/profile.interface';
import { WebStorageService } from '../../core/web-storage.service';
import { QueryResponseInterface } from '../../shared/models/query-response.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    userId: number = null;
    profileForm: FormGroup;
    isValidForm = false;
    profileDataObj;
    image: string;
    subscriptionProfile: Subscription;

    constructor(
        private userService: UserService,
        private webStorageService: WebStorageService,
        private formBuilder: FormBuilder
    ) {
        this.userId = this.webStorageService.getLoggedInUserId();
        this.getUser(this.userId);
        this.createForm();
    }

  ngOnInit() {
      this.profileForm.valueChanges.subscribe(values => {
          Object.keys(values).forEach((key) => {
              if (values[key] != null && this.profileDataObj[key] !== values[key]) {
                this.isValidForm = true;
              }
          });
      });
      this.subscriptionProfile = this.userService.profile$.subscribe(
          (profileData) => {
              this.profileDataObj = profileData;
              this.setValuesForFormBuilderControl(this.profileDataObj);
              this.image = this.profileDataObj.image;
          }
      );
  }

  ngOnDestroy() {
      this.subscriptionProfile.unsubscribe();
  }

  getUser(id: number): void {
      this.userService.getUser(id).subscribe(
          (response: ProfileInterface) => {
              this.setNexProfileData(response.result);
          },
          (error) => {
            console.log(error);
          }
      );
  }

    editProfileHandler(): void {
        const profileData = this.userService.createProfileData(this.profileForm.value);

        this.userService.updateUser(profileData).subscribe(
            (response: ProfileInterface) => {
                this.setNexProfileData(response.result);
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

    changeListener($event): void {
        this.openFileSystem($event.target);
    }

    openFileSystem(inputValue: any) {
        const file: File = inputValue.files[0];

        this.updateProfileImg(file);
    }

    uploadImg(file) {
        this.userService.uploadProfileImg(file).subscribe(
            (response: ProfileInterface) => {
                this.setNexProfileData(response.result);
            }
        );
    }

    setNexProfileData(data): void {
        this.userService.setNextProfileData(Object.assign({}, data));
    }

    updateProfileImg(file): void {
        if (!this.profileDataObj.image) {
            this.uploadImg(file);
        } else {
            this.deleteProfileImg(file);
        }
    }

    deleteProfileImg(file): void {
        this.userService.deleteProfileImg().subscribe(
            (responce: QueryResponseInterface) => {}, error => {}, () => {
                this.uploadImg(file);
            }
        );
    }
}
