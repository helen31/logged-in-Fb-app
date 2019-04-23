import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { ProfileInterface, ProfileResultInterface } from '../shared/models/profile.interface';
import { QueryResponseInterface } from '../shared/models/query-response.interface';

@Injectable()
export class UserService {
    private profileSource = new Subject<ProfileResultInterface>();

    profile$ = this.profileSource.asObservable();

    constructor(private httpClient: HttpClient) { }

    setNextProfileData(profileData: ProfileResultInterface) {
        this.profileSource.next(profileData);
    }

    getUser(id: number) {
        return this.httpClient.get<ProfileInterface>(location.origin + '/api/v1/user/' + id);
    }

    getUserList() {
        return this.httpClient.get<ProfileResultInterface[]>(location.origin + '/api/v1/user');
    }

    updateUser(profileData) {
        const body = profileData;
        return this.httpClient.put<ProfileInterface>(location.origin + '/api/v1/user/profile', body);
    }

    createProfileData(dataObj): any {
        const newProfileData = {};

        Object.keys(dataObj).forEach((key) => {
            if (dataObj[key] != null) {
                newProfileData[key] = dataObj[key];
            }
        });
        return newProfileData;
    }

    uploadProfileImg(file) {
        const formData: FormData = new FormData();
        formData.append('image', file);

        return this.httpClient.post(location.origin + '/api/v1/user/profile/image', formData);
    }

    deleteProfileImg() {
        return this.httpClient.delete<QueryResponseInterface>(location.origin + '/api/v1/user/profile/image');
    }
}
