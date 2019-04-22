import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {

    constructor(private authService: AuthService) {}

    canActivateChild() {
        return this.isActivate();
    }

    private isActivate() {
        if (this.authService.isLogin()) {
            return true;
        }
        this.authService.logout();
        return false;
    }
}
