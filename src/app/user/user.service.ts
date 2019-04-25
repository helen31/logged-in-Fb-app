import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {ReplaySubject, Subject} from 'rxjs';

import { ProfileInterface, ProfileResultInterface } from '../shared/models/profile.interface';
import { QueryResponseInterface } from '../shared/models/query-response.interface';

@Injectable()
export class UserService {
    private profileSource = new Subject<ProfileResultInterface>();
    private userListSource = new ReplaySubject<ProfileResultInterface[]>();

    profile$ = this.profileSource.asObservable();
    userList$ = this.userListSource.asObservable();

    constructor(private httpClient: HttpClient) { }

    setNextProfileData(profileData: ProfileResultInterface): void {
        this.profileSource.next(profileData);
    }

    setNextUserListData(data: ProfileResultInterface[]): void {
        this.userListSource.next(data);
    }

    getUser(id: number) {
        return this.httpClient.get<ProfileInterface>(location.origin + '/api/v1/user/' + id);
    }

    getCurrentUser() {
        return this.httpClient.get<ProfileInterface>(location.origin + '/api/v1/user/current');
    }

    getUserList() {
        return this.httpClient.get<ProfileInterface>(location.origin + '/api/v1/user');
    }

    updateUser(profileData) {
        const body = profileData;
        return this.httpClient.put<ProfileInterface>(location.origin + '/api/v1/user/profile', body);
    }

    uploadProfileImg(file) {
        const formData: FormData = new FormData();
        formData.append('image', file);

        return this.httpClient.post(location.origin + '/api/v1/user/profile/image', formData);
    }

    deleteProfileImg() {
        return this.httpClient.delete<QueryResponseInterface>(location.origin + '/api/v1/user/profile/image');
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
