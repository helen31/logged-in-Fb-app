import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProfileInterface } from '../shared/models/profile.interface';
import { QueryResponseInterface } from '../shared/models/query-response.interface';

@Injectable()
export class UserService {
    private profileSource = new Subject<ProfileInterface>();
    private userListSource = new ReplaySubject<ProfileInterface[]>();

    profile$ = this.profileSource.asObservable();
    userList$ = this.userListSource.asObservable();


    constructor(private httpClient: HttpClient) { }

    setNextProfileData(profileData: ProfileInterface): void {
        this.profileSource.next(Object.assign({}, profileData));
    }

    setNextUserListData(dataArr: ProfileInterface[]): void {
        this.userListSource.next(dataArr.slice(0));
    }

    getUser(id: number): Observable<ProfileInterface> {
        return this.httpClient.get(location.origin + '/api/v1/user/' + id).pipe(
            map((response: QueryResponseInterface) => response.result)
        );
    }

    getCurrentUser() {
        return this.httpClient.get<QueryResponseInterface>(location.origin + '/api/v1/user/current');
    }

    getUserList() {
        return this.httpClient.get<QueryResponseInterface>(location.origin + '/api/v1/user');
    }

    updateUser(profileData) {
        const body = profileData;
        return this.httpClient.put<QueryResponseInterface>(location.origin + '/api/v1/user/profile', body);
    }

    uploadProfileImg(file) {
        const formData: FormData = new FormData();
        formData.append('image', file);

        return this.httpClient.post(location.origin + '/api/v1/user/profile/image', formData);
    }

    deleteProfileImg() {
        return this.httpClient.delete<QueryResponseInterface>(location.origin + '/api/v1/user/profile/image');
    }

    updateUserLocation(userLocation: {lat: number, lon: number}) {
        const body = userLocation;
        return this.httpClient.put(location.origin + '/api/v1/user/location', body);
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
