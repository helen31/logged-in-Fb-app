import { Injectable } from '@angular/core';

@Injectable()
export class WebStorageService {
  userId: number;

  constructor() { }

  setLoggedInUserIdToLst(id: number): void {
      this.userId = id;
      localStorage.setItem('userId', JSON.stringify(this.userId));
  }

  getLoggedInUserId(): number {
      return this.userId ? this.userId : JSON.parse(localStorage.getItem('userId'));
  }
}
