import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ProfileInterface } from '../shared/models/profile.interface';

@Injectable()
export class UserService {

    constructor(private httpClient: HttpClient) { }

    getUser(id: number) {
    return this.httpClient.get<ProfileInterface>(location.origin + '/api/v1/user/' + id);
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
}
