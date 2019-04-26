import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { ProfileInterface } from '../../shared/models/profile.interface';
import { QueryResponseInterface } from '../../shared/models/query-response.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    profileForm: FormGroup;
    isValidForm = false;
    profileDataObj;
    image: string;
    subscriptionProfile: Subscription;
    userId: number = null;
    user: ProfileInterface;

    isProfileForm = false;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe(
            (params) => {
                this.userId = params.id;
            }
        );
        if (this.isCurrentUser()) {
            this.getCurrentUser();
            this.isProfileForm = true;
        } else {
            this.getUser(this.userId);
        }
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
    if (this.subscriptionProfile) {
        this.subscriptionProfile.unsubscribe();
    }

  }

    isCurrentUser(): boolean {
        return this.activatedRoute.hasOwnProperty('data') && this.activatedRoute.data['value']['currentUser'] === true ? true : false;
    }

    getCurrentUser(): void {
        this.userService.getCurrentUser().subscribe(
            (response: QueryResponseInterface) => {
                this.setNexProfileData(response.result);
            }, (error) => {
                console.log(error);
            }
        );
    }

    getUser(id: number): void {
        this.userService.getUser(id).subscribe(
            (responce) => {
                this.user = responce.result;
                this.setNexProfileData(responce.result);
            }
        );
    }

    editProfileHandler(): void {
        const profileData = this.userService.createProfileData(this.profileForm.value);

        this.userService.updateUser(profileData).subscribe(
            (response: QueryResponseInterface) => {
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
            (response: QueryResponseInterface) => {
                this.setNexProfileData(response.result);
            }
        );
    }

    setNexProfileData(data): void {
        this.userService.setNextProfileData(data);
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
